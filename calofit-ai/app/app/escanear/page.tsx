'use client';

// APP INTERNA — §2 ESCANEAR (la función #1 del MVP). Conectado a Gemini de
// verdad vía /api/escanear (BFF — la clave nunca llega al navegador). El
// ajuste conversacional sigue simulado (no es la IA de visión, es un
// diferenciador aparte) — se conecta cuando se defina esa arquitectura.

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Check, Camera, AlertCircle } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';

type Estado = 'inicial' | 'analizando' | 'listo' | 'error';

interface Resultado {
  plato: string;
  kcal: number;
  carbs_g: number;
  proteina_g: number;
  grasa_g: number;
  confianza: 'alta' | 'media' | 'baja';
}

export default function EscanearPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [estado, setEstado] = useState<Estado>('inicial');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ajustes, setAjustes] = useState<string[]>([]);

  const onFotoElegida = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setPreviewUrl(URL.createObjectURL(archivo));
    setEstado('analizando');
    setErrorMsg('');

    try {
      const imagenB64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const resultadoStr = reader.result as string;
          resolve(resultadoStr.split(',')[1] ?? '');
        };
        reader.onerror = reject;
        reader.readAsDataURL(archivo);
      });

      const res = await fetch('/api/escanear', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ imagenB64 }),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json?.error ?? 'No se pudo analizar el plato. Intenta de nuevo.');
        setEstado('error');
        return;
      }

      setResultado(json);
      setEstado('listo');
    } catch {
      setErrorMsg('No hay conexión o el servidor no respondió. Intenta de nuevo.');
      setEstado('error');
    }
  };

  const enviarAjuste = () => {
    const texto = mensaje.trim();
    if (!texto || !resultado) return;
    // Demo: el ajuste conversacional todavía no llama a la IA — suma un delta visible.
    setResultado((r) => (r ? { ...r, kcal: r.kcal + 60, proteina_g: r.proteina_g + 3 } : r));
    setAjustes((a) => [...a, texto]);
    setMensaje('');
  };

  const guardarEnMiDia = async () => {
    if (!resultado) return;
    const supabase = crearClienteSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('food_logs').insert({
      user_id: user.id,
      plato: resultado.plato,
      kcal: resultado.kcal,
      carbs_g: resultado.carbs_g,
      proteina_g: resultado.proteina_g,
      grasa_g: resultado.grasa_g,
      confianza: resultado.confianza,
    });

    router.push('/app');
  };

  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Escanear plato</h1>
      <p className="mt-1 text-[16px] text-[var(--text-secondary)]">Tómale una foto, tal como lo sirves.</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFotoElegida}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative mt-6 block w-full overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] shadow-[var(--shadow-2)] [touch-action:manipulation]"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Tu plato"
            width={400}
            height={520}
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-[var(--surface-2)] px-8">
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
            >
              <Camera size={26} color="var(--accent)" aria-hidden="true" />
            </span>
            <p className="text-center text-[16px] font-medium text-[var(--text-secondary)]">
              Toca para tomar o elegir una foto
            </p>
          </div>
        )}

        <AnimatePresence>
          {estado === 'analizando' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--text-primary)_55%,transparent)]"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="flex size-10 items-center justify-center rounded-full bg-[var(--bg)]"
              >
                <Sparkles size={18} color="var(--accent)" aria-hidden="true" />
              </motion.span>
              <span className="text-[16px] font-semibold text-[var(--bg)]">Analizando tu plato…</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {estado === 'error' && (
        <div className="mt-4 flex items-start gap-2 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--urgencia)_8%,transparent)] p-3.5">
          <AlertCircle size={18} color="var(--urgencia)" aria-hidden="true" className="mt-0.5 shrink-0" />
          <div>
            <p className="text-[16px] font-medium text-[var(--text-primary)]">{errorMsg}</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-1 text-[12px] font-semibold text-[var(--accent)]"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {estado === 'listo' && resultado && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
                {resultado.plato}
              </p>
              <p className="mt-1 text-[32px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
                {resultado.kcal} kcal
              </p>
              {resultado.confianza !== 'alta' && (
                <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">
                  Confianza {resultado.confianza} — ajusta abajo si algo no cuadra.
                </p>
              )}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[16px] font-bold tabular-nums" style={{ color: 'var(--macro-carbs)' }}>
                    {resultado.carbs_g}g
                  </p>
                  <p className="text-[12px] text-[var(--text-tertiary)]">Carbs</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold tabular-nums" style={{ color: 'var(--macro-proteina)' }}>
                    {resultado.proteina_g}g
                  </p>
                  <p className="text-[12px] text-[var(--text-tertiary)]">Proteína</p>
                </div>
                <div>
                  <p className="text-[16px] font-bold tabular-nums" style={{ color: 'var(--macro-grasa)' }}>
                    {resultado.grasa_g}g
                  </p>
                  <p className="text-[12px] text-[var(--text-tertiary)]">Grasa</p>
                </div>
              </div>
            </div>

            {/* Ajuste conversacional — el diferenciador #3 del MVP (todavía simulado) */}
            <div className="mt-4">
              <p className="text-[12px] font-semibold text-[var(--text-secondary)]">
                ¿Le faltó o le sobró algo? Dilo natural:
              </p>
              {ajustes.length > 0 && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {ajustes.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
                      <Check size={13} color="var(--accent-2)" aria-hidden="true" />
                      Ajustado: “{a}”
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && enviarAjuste()}
                  placeholder="Ej: llevaba aguacate extra"
                  className="h-12 flex-1 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={enviarAjuste}
                  aria-label="Enviar ajuste"
                  className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] [touch-action:manipulation]"
                >
                  <Send size={18} color="var(--bg)" aria-hidden="true" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={guardarEnMiDia}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)] [touch-action:manipulation]"
            >
              Guardar en mi día
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
