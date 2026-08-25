'use client';

// PASO 3/9 — Segmentación (2 de 2). Eco de los DOLORES de la ficha de avatar
// (báscula, buscador manual, no reconoce comida real, cobros sorpresa) — la
// respuesta alimenta el mensaje de reconocimiento del paso 4 (nunca genérico).
// Incluye "Otros" con texto libre (pedido explícito 2026-08-24).

import { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Search, ChefHat, Wallet, MessageCircleQuestion } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PasoCta } from './OnboardingShell';

export type Dolor = 'bascula' | 'buscador' | 'noreconoce' | 'cobros' | 'otros';

const OPCIONES: { valor: Dolor; icon: LucideIcon; label: string }[] = [
  { valor: 'bascula', icon: Scale, label: 'Pesar todo en una báscula' },
  { valor: 'buscador', icon: Search, label: 'Buscar cada ingrediente a mano' },
  { valor: 'noreconoce', icon: ChefHat, label: 'No reconocía mi comida real' },
  { valor: 'cobros', icon: Wallet, label: 'Cobros sorpresa que no esperaba' },
  { valor: 'otros', icon: MessageCircleQuestion, label: 'Otros' },
];

export function Step3Dolor({
  valorInicial,
  onContinuar,
  onOtroTexto,
}: {
  valorInicial: Dolor | null;
  onContinuar: (dolor: Dolor) => void;
  onOtroTexto: (texto: string) => void;
}) {
  const [seleccionado, setSeleccionado] = useState<Dolor | null>(valorInicial);
  const [otro, setOtro] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col justify-center"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        ¿Qué te ha hecho abandonar otras apps de calorías?
      </h1>

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
                if (o.valor !== 'otros') onContinuar(o.valor);
              }}
              className={`flex min-h-14 items-center gap-4 rounded-[var(--radius-card)] border px-5 py-4 text-left [touch-action:manipulation] ${
                activo
                  ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]"
              >
                <Icono size={22} color="var(--text-secondary)" aria-hidden="true" />
              </span>
              <span className="text-[16px] font-medium text-[var(--text-primary)]">{o.label}</span>
            </button>
          );
        })}

        {seleccionado === 'otros' && (
          <input
            autoFocus
            type="text"
            value={otro}
            onChange={(e) => {
              setOtro(e.target.value);
              onOtroTexto(e.target.value);
            }}
            placeholder="Cuéntanos qué te pasó..."
            className="h-14 w-full rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[var(--surface)] px-5 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
          />
        )}
      </div>

      {seleccionado === 'otros' && (
        <div className="mt-8">
          <PasoCta onClick={() => onContinuar('otros')} disabled={!otro.trim()}>
            Continuar
          </PasoCta>
        </div>
      )}
    </motion.div>
  );
}
