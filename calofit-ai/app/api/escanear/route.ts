// BFF del Escaneo Casero — arquitectura ya decidida en ESTADO.md: llamada
// síncrona a un modelo de visión, la clave de Gemini SOLO vive aquí (server),
// nunca en el navegador. El cliente manda la foto en base64, este endpoint
// llama a Gemini y devuelve el JSON de calorías/macros ya validado.

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 15; // objetivo <5s real; margen para reintentos/latencia de red

const PROMPT = `Eres un nutricionista analizando una foto de un plato de comida casera o típica
latinoamericana. Identifica el/los platos, y estima calorías y macros TOTALES del plato completo.
Si no estás seguro, dilo en "confianza": no inventes un número sin base (regla del producto: nunca
alucinar calorías). Responde SOLO con un objeto JSON, sin texto extra, con este formato exacto:
{"plato": "nombre del plato en español", "kcal": 000, "carbs_g": 00, "proteina_g": 00, "grasa_g": 00, "confianza": "alta|media|baja"}`;

interface ResultadoIA {
  plato: string;
  kcal: number;
  carbs_g: number;
  proteina_g: number;
  grasa_g: number;
  confianza: 'alta' | 'media' | 'baja';
}

function extraerJson(texto: string): ResultadoIA | null {
  const m = texto.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const datos = JSON.parse(m[0]);
    if (
      typeof datos.plato === 'string' &&
      typeof datos.kcal === 'number' &&
      typeof datos.carbs_g === 'number' &&
      typeof datos.proteina_g === 'number' &&
      typeof datos.grasa_g === 'number'
    ) {
      return datos as ResultadoIA;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY no está configurada en el servidor.' },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const imagenB64 = body?.imagenB64;
  if (typeof imagenB64 !== 'string' || imagenB64.length < 100) {
    return NextResponse.json({ error: 'Falta la imagen (imagenB64).' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: PROMPT }, { inline_data: { mime_type: 'image/jpeg', data: imagenB64 } }],
            },
          ],
        }),
      }
    );

    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: json?.error?.message ?? `Gemini respondió ${res.status}` },
        { status: 502 }
      );
    }

    const texto = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const datos = extraerJson(texto);
    if (!datos) {
      return NextResponse.json({ error: 'No se pudo interpretar la respuesta de la IA.' }, { status: 502 });
    }

    return NextResponse.json(datos);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Error de red al llamar a Gemini.' },
      { status: 502 }
    );
  }
}
