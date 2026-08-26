'use client';

// PASO 5/8 — ACTIVACIÓN (el trabajo #3 de los 5). Escaneo REAL con la foto del
// propio usuario (conectado 2026-08-26) — un solo intento por onboarding, sin
// cámara (solo subir de galería) para no invitar a probar varias veces y
// disparar el costo de IA antes de que exista cuenta/pago. Después del
// paywall/trial, el límite por plan se define al conectar Hotmart.

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { PasoCta } from './OnboardingShell';

type Estado = 'inicial' | 'analizando' | 'listo' | 'error';

interface Resultado {
  plato: string;
  kcal: number;
  carbs_g: number;
  proteina_g: number;
  grasa_g: number;
}

export function Step5Escaneo({ onContinuar }: { onContinuar: () => void }) {
  const inputCamaraRef = useRef<HTMLInputElement>(null);
  const inputGaleriaRef = useRef<HTMLInputElement>(null);
  const [estado, setEstado] = useState<Estado>('inicial');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [yaUsado, setYaUsado] = useState(false);

  const onFotoElegida = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo || yaUsado) return;

    setYaUsado(true);
    setPreviewUrl(URL.createObjectURL(archivo));
    setEstado('analizando');

    try {
      const imagenB64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '');
        reader.onerror = reject;
        reader.readAsDataURL(archivo);
      });

      const res = await fetch('/api/escanear', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ imagenB64, origen: 'onboarding' }),
      });

      if (!res.ok) {
        setEstado('error');
        return;
      }

      setResultado(await res.json());
      setEstado('listo');
    } catch {
      setEstado('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        Prueba el <span className="text-[var(--accent)]">Escaneo Casero</span>
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
        Sube una foto de tu comida y mira la magia — es un análisis real.
      </p>

      <input
        ref={inputCamaraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFotoElegida}
        className="hidden"
      />
      <input
        ref={inputGaleriaRef}
        type="file"
        accept="image/*"
        onChange={onFotoElegida}
        className="hidden"
      />

      <div className="relative mx-auto mt-8 w-full max-w-xs overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] shadow-[var(--shadow-2)]">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Tu plato"
            width={400}
            height={520}
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 bg-[var(--surface-2)] px-8">
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
            >
              <Camera size={26} color="var(--accent)" aria-hidden="true" />
            </span>
            <p className="text-center text-[16px] font-medium text-[var(--text-secondary)]">
              Escanea tu plato para probarlo
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => !yaUsado && inputCamaraRef.current?.click()}
                disabled={yaUsado}
                className="flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] px-4 py-2.5 text-[12px] font-semibold text-white [touch-action:manipulation] disabled:opacity-40"
              >
                <Camera size={16} aria-hidden="true" />
                Tomar foto
              </button>
              <button
                type="button"
                onClick={() => !yaUsado && inputGaleriaRef.current?.click()}
                disabled={yaUsado}
                className="flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface)] px-4 py-2.5 text-[12px] font-semibold text-[var(--text-primary)] shadow-[var(--shadow-1)] [touch-action:manipulation] disabled:opacity-40"
              >
                <ImageIcon size={16} aria-hidden="true" />
                Subir foto
              </button>
            </div>
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

        <AnimatePresence>
          {estado === 'listo' && resultado && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 rounded-t-[var(--radius-card)] bg-[var(--surface)] p-4 text-left"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
                {resultado.plato}
              </p>
              <p className="mt-1 text-[24px] font-bold leading-none [font-family:var(--font-display)]">
                {resultado.kcal} kcal
              </p>
              <div className="mt-2 flex gap-4 text-[12px] text-[var(--text-secondary)]">
                <span>Carbs {resultado.carbs_g}g</span>
                <span>Proteína {resultado.proteina_g}g</span>
                <span>Grasa {resultado.grasa_g}g</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {estado === 'error' && (
        <div className="mx-auto mt-4 flex max-w-xs items-start gap-2 text-[12px] text-[var(--urgencia)]">
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          No se pudo analizar esa foto. Toca la imagen para intentar con otra.
        </div>
      )}

      {yaUsado && estado !== 'error' && (
        <p className="mx-auto mt-4 max-w-xs text-center text-[12px] text-[var(--text-tertiary)]">
          Este es tu adelanto gratis — al crear tu cuenta escaneas todo lo que quieras.
        </p>
      )}

      <div className="mt-auto pt-10">
        <PasoCta onClick={onContinuar} disabled={estado !== 'listo'}>
          {estado === 'listo' ? 'Genial, sigamos' : 'Sube una foto para continuar'}
        </PasoCta>
      </div>
    </motion.div>
  );
}
