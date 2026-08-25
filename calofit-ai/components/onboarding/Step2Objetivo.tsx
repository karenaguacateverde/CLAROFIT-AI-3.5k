'use client';

// PASO 2/9 — Segmentación (1 de 2). Eco del DESEO de la ficha de avatar:
// "comer rico y sin estrés... resultados reales en el espejo, sin pasar
// hambre" — define qué mensaje de resultado y qué rango de meta usar después.
// Incluye "Otro" con texto libre (pedido explícito 2026-08-24).

import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Salad, Dumbbell, LineChart, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PasoCta } from './OnboardingShell';

export type Objetivo = 'bajar' | 'sano' | 'musculo' | 'control' | 'otro';

const OPCIONES: { valor: Objetivo; icon: LucideIcon; label: string }[] = [
  { valor: 'bajar', icon: Flame, label: 'Bajar de peso sin pasar hambre' },
  { valor: 'sano', icon: Salad, label: 'Comer más sano sin complicarme' },
  { valor: 'musculo', icon: Dumbbell, label: 'Ganar músculo' },
  { valor: 'control', icon: LineChart, label: 'Solo llevar el control' },
  { valor: 'otro', icon: Sparkles, label: 'Otro' },
];

export function Step2Objetivo({
  nombre,
  valorInicial,
  onContinuar,
  onOtroTexto,
}: {
  nombre: string;
  valorInicial: Objetivo | null;
  onContinuar: (objetivo: Objetivo) => void;
  onOtroTexto: (texto: string) => void;
}) {
  const [seleccionado, setSeleccionado] = useState<Objetivo | null>(valorInicial);
  const [otro, setOtro] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col justify-center"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        {nombre ? `${nombre}, ¿` : '¿'}qué buscas lograr?
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-secondary)]">Elige lo que más se parezca a ti.</p>

      <div className="mt-8 flex flex-col gap-3">
        {OPCIONES.map((o) => {
          const Icono = o.icon;
          const activo = seleccionado === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              onClick={() => {
                setSeleccionado(o.valor);
                // Opciones normales avanzan de una — "Otro" espera el texto (abajo).
                if (o.valor !== 'otro') onContinuar(o.valor);
              }}
              className={`flex min-h-14 items-center gap-4 rounded-[var(--radius-card)] border px-5 py-4 text-left [touch-action:manipulation] ${
                activo
                  ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
              >
                <Icono size={22} color="var(--accent)" aria-hidden="true" />
              </span>
              <span className="text-[16px] font-medium text-[var(--text-primary)]">{o.label}</span>
            </button>
          );
        })}

        {seleccionado === 'otro' && (
          <input
            autoFocus
            type="text"
            value={otro}
            onChange={(e) => {
              setOtro(e.target.value);
              onOtroTexto(e.target.value);
            }}
            placeholder="Cuéntanos tu meta..."
            className="h-14 w-full rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[var(--surface)] px-5 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
          />
        )}
      </div>

      {seleccionado === 'otro' && (
        <div className="mt-8">
          <PasoCta onClick={() => onContinuar('otro')} disabled={!otro.trim()}>
            Continuar
          </PasoCta>
        </div>
      )}
    </motion.div>
  );
}
