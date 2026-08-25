'use client';

// PASO 6/8 — Personalización que se ve + micro-compromiso (02B regla 4).
// La meta se fija como RANGO honesto según su objetivo (paso 2) — no una
// cifra "calculada" que finja precisión que no tenemos.

import { useState } from 'react';
import { motion } from 'motion/react';
import { PasoCta } from './OnboardingShell';
import type { Objetivo } from './Step2Objetivo';

const RANGOS: Record<Objetivo, { valor: number; label: string }[]> = {
  bajar: [
    { valor: 1500, label: '1,500 kcal/día' },
    { valor: 1650, label: '1,650 kcal/día' },
    { valor: 1800, label: '1,800 kcal/día' },
  ],
  sano: [
    { valor: 1800, label: '1,800 kcal/día' },
    { valor: 2000, label: '2,000 kcal/día' },
    { valor: 2200, label: '2,200 kcal/día' },
  ],
  musculo: [
    { valor: 2200, label: '2,200 kcal/día' },
    { valor: 2400, label: '2,400 kcal/día' },
    { valor: 2600, label: '2,600 kcal/día' },
  ],
  control: [
    { valor: 1800, label: '1,800 kcal/día' },
    { valor: 2000, label: '2,000 kcal/día' },
    { valor: 2200, label: '2,200 kcal/día' },
  ],
  otro: [
    { valor: 1800, label: '1,800 kcal/día' },
    { valor: 2000, label: '2,000 kcal/día' },
    { valor: 2200, label: '2,200 kcal/día' },
  ],
};

export function Step6Resultado({
  nombre,
  objetivo,
  metaInicial,
  onContinuar,
}: {
  nombre: string;
  objetivo: Objetivo;
  metaInicial: number | null;
  onContinuar: (meta: number) => void;
}) {
  const opciones = RANGOS[objetivo];
  const [metaCustom, setMetaCustom] = useState('');
  const usandoCustom = metaInicial !== null && !opciones.some((o) => o.valor === metaInicial);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col justify-center"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        {nombre ? `${nombre}, tu` : 'Tu'} meta diaria
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
        Un punto de partida — la ajustas cuando quieras dentro de la app.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {opciones.map((o) => {
          const activo = metaInicial === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              onClick={() => onContinuar(o.valor)}
              className={`flex min-h-14 items-center justify-center rounded-[var(--radius-card)] border px-5 py-4 text-[16px] font-semibold [touch-action:manipulation] ${
                activo
                  ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] text-[var(--accent)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] text-[var(--text-primary)]'
              }`}
            >
              {o.label}
            </button>
          );
        })}

        <input
          type="number"
          inputMode="numeric"
          min={800}
          max={5000}
          value={metaCustom}
          onChange={(e) => setMetaCustom(e.target.value)}
          placeholder="Otro — escribe tu meta en kcal"
          className={`h-14 w-full rounded-[var(--radius-card)] border bg-[var(--surface)] px-5 text-[16px] font-semibold text-[var(--text-primary)] outline-none [touch-action:manipulation] ${
            usandoCustom ? 'border-[var(--accent)]' : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)]'
          }`}
        />
      </div>

      <div className="mt-8">
        <PasoCta
          onClick={() => {
            const n = Number(metaCustom);
            if (metaCustom && n >= 800 && n <= 5000) onContinuar(n);
            else if (metaInicial) onContinuar(metaInicial);
          }}
          disabled={!metaInicial && !(Number(metaCustom) >= 800 && Number(metaCustom) <= 5000)}
        >
          Continuar
        </PasoCta>
      </div>
    </motion.div>
  );
}
