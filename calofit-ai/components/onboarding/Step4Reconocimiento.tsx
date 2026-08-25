'use client';

// PASO 4/8 — Reconocimiento (50 → A5). Desculpabiliza con la CAUSA, en el
// lenguaje literal del avatar — NUNCA un ánimo genérico intercambiable.
// El mensaje cambia según el dolor elegido en el paso 3 (personalización real).

import { motion } from 'motion/react';
import { HeartHandshake } from 'lucide-react';
import { PasoCta } from './OnboardingShell';
import type { Dolor } from './Step3Dolor';

const MENSAJES: Record<Dolor, string> = {
  bascula:
    'No te falta disciplina — pesar cada gramo agotaría a cualquiera. Por eso Calofit AI usa una foto, no una báscula.',
  buscador:
    'No es que seas floja para esto — es que buscar cada ingrediente a mano es un trabajo de oficina, no algo que debas hacer para comer. Por eso una foto reemplaza esa búsqueda.',
  noreconoce:
    'No es tu comida la rara — es que la mayoría de apps solo entrenaron con bowls gringos. Calofit AI está pensada para tu comida casera y típica LATAM.',
  cobros:
    'Tu desconfianza tiene sentido — te han cobrado sin avisar antes. Acá ves el precio exacto antes de poner tu tarjeta, siempre.',
  otros:
    'Gracias por contarnos — lo que viviste con otras apps es justo lo que Calofit AI está pensada para resolver.',
};

export function Step4Reconocimiento({ dolor, onContinuar }: { dolor: Dolor; onContinuar: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col items-center justify-center text-center"
    >
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
      >
        <HeartHandshake size={28} color="var(--accent)" aria-hidden="true" />
      </span>

      <p className="mt-6 max-w-xs text-balance text-xl font-semibold leading-[1.35] [font-family:var(--font-display)]">
        {MENSAJES[dolor]}
      </p>

      <div className="mt-10 w-full">
        <PasoCta onClick={onContinuar}>Lo entiendo — sigamos</PasoCta>
      </div>
    </motion.div>
  );
}
