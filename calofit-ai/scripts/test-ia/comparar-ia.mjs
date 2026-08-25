#!/usr/bin/env node
// Comparación de precisión: Gemini vs Claude vs GPT reconociendo platos
// caseros/típicos LATAM reales (Wikimedia Commons, sin marca ni texto).
// Uso: node scripts/test-ia/comparar-ia.mjs
// Lee las claves de scripts/test-ia/claves.env — NUNCA las pegues en el chat.
// (Nombre SIN punto a propósito: en Chromebook los archivos que empiezan con
// "." quedan ocultos por defecto en la app de Archivos — así se ve normal.)
// Si falta una clave, ese proveedor se salta (no rompe la comparación).

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const FOTOS_DIR = path.join(DIR, 'fotos');

// claves.env minimalista, sin dependencias externas.
function cargarEnvLocal() {
  const envPath = path.join(DIR, 'claves.env');
  const env = {};
  try {
    const contenido = readFileSync(envPath, 'utf8');
    for (const linea of contenido.split('\n')) {
      const l = linea.trim();
      if (!l || l.startsWith('#')) continue;
      const i = l.indexOf('=');
      if (i === -1) continue;
      env[l.slice(0, i).trim()] = l.slice(i + 1).trim();
    }
  } catch {
    // sin claves.env todavía — está bien, cada proveedor se salta si falta su clave
  }
  return env;
}

const ENV = cargarEnvLocal();

const PROMPT = `Eres un nutricionista analizando una foto de un plato de comida casera o típica
latinoamericana. Identifica el/los platos, y estima calorías y macros TOTALES del plato completo.
Responde SOLO con un objeto JSON, sin texto extra, con este formato exacto:
{"plato": "nombre del plato en español", "kcal": 000, "carbs_g": 00, "proteina_g": 00, "grasa_g": 00, "confianza": "alta|media|baja"}`;

function aBase64(archivo) {
  return readFileSync(path.join(FOTOS_DIR, archivo)).toString('base64');
}

async function llamarGemini(imgB64) {
  const key = ENV.GEMINI_API_KEY;
  if (!key) return { ok: false, motivo: 'GEMINI_API_KEY no configurada' };
  const modelo = 'gemini-3.6-flash';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: PROMPT }, { inline_data: { mime_type: 'image/jpeg', data: imgB64 } }],
          },
        ],
      }),
    }
  );
  const json = await res.json();
  if (!res.ok) return { ok: false, motivo: json?.error?.message || `HTTP ${res.status}` };
  const texto = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return { ok: true, texto, modelo };
}

async function llamarClaude(imgB64) {
  const key = ENV.ANTHROPIC_API_KEY;
  if (!key) return { ok: false, motivo: 'ANTHROPIC_API_KEY no configurada' };
  const modelo = 'claude-haiku-4-5';
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelo,
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PROMPT },
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imgB64 } },
          ],
        },
      ],
    }),
  });
  const json = await res.json();
  if (!res.ok) return { ok: false, motivo: json?.error?.message || `HTTP ${res.status}` };
  const texto = json?.content?.[0]?.text ?? '';
  return { ok: true, texto, modelo };
}

async function llamarOpenAI(imgB64) {
  const key = ENV.OPENAI_API_KEY;
  if (!key) return { ok: false, motivo: 'OPENAI_API_KEY no configurada' };
  const modelo = 'gpt-4o-mini';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: modelo,
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imgB64}` } },
          ],
        },
      ],
    }),
  });
  const json = await res.json();
  if (!res.ok) return { ok: false, motivo: json?.error?.message || `HTTP ${res.status}` };
  const texto = json?.choices?.[0]?.message?.content ?? '';
  return { ok: true, texto, modelo };
}

function extraerJson(texto) {
  const m = texto.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]);
  } catch {
    return null;
  }
}

async function main() {
  const fotos = readdirSync(FOTOS_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  if (fotos.length === 0) {
    console.log('No hay fotos en scripts/test-ia/fotos/');
    return;
  }

  const proveedores = [
    { nombre: 'Gemini (Google)', fn: llamarGemini },
    { nombre: 'Claude (Anthropic)', fn: llamarClaude },
    { nombre: 'GPT-4o-mini (OpenAI)', fn: llamarOpenAI },
  ];

  const resultados = [];

  for (const foto of fotos) {
    console.log(`\n=== ${foto} ===`);
    const imgB64 = aBase64(foto);
    for (const p of proveedores) {
      process.stdout.write(`  ${p.nombre}... `);
      try {
        const r = await p.fn(imgB64);
        if (!r.ok) {
          console.log(`SALTADO (${r.motivo})`);
          continue;
        }
        const datos = extraerJson(r.texto);
        if (!datos) {
          console.log(`respuesta no parseable: ${r.texto.slice(0, 100)}`);
          continue;
        }
        console.log(`${datos.plato} — ${datos.kcal} kcal (confianza: ${datos.confianza})`);
        resultados.push({ foto, proveedor: p.nombre, ...datos });
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
      }
    }
  }

  console.log('\n\n=== TABLA COMPARATIVA ===');
  console.table(
    resultados.map((r) => ({
      Foto: r.foto,
      Proveedor: r.proveedor,
      Plato: r.plato,
      Kcal: r.kcal,
      Carbs: r.carbs_g,
      Proteina: r.proteina_g,
      Grasa: r.grasa_g,
      Confianza: r.confianza,
    }))
  );
}

main();
