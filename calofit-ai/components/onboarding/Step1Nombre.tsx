'use client';

// PASO 1/8 — Identidad. Una pregunta, personaliza TODO el resto del flujo
// (reconocimiento, resultado, racha) — no es decorativo (02B regla 2).

import { useState } from 'react';
import { motion } from 'motion/react';
import { PasoCta } from './OnboardingShell';

export function Step1Nombre({ valorInicial, onContinuar }: { valorInicial: string; onContinuar: (nombre: string) => void }) {
  const [nombre, setNombre] = useState(valorInicial);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col justify-center"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        ¡Hola! Para empezar, ¿cómo quieres que te llamemos?
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
        Así vamos a personalizar tu plan de principio a fin.
      </p>

      <input
        autoFocus
        type="text"
        inputMode="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        className="mt-8 h-14 w-full rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-5 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && nombre.trim()) onContinuar(nombre.trim());
        }}
      />

      <div className="mt-auto pt-10">
        <PasoCta onClick={() => onContinuar(nombre.trim())} disabled={!nombre.trim()}>
          Continuar
        </PasoCta>
      </div>
    </motion.div>
  );
}
