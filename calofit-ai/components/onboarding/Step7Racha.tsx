'use client';

// PASO 7/8 — CREAR DESEO (trabajo #4). Previsualiza el loop de retención
// (racha) que sostiene la app día a día — el usuario ve lo que va a construir.

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { PasoCta } from './OnboardingShell';

export function Step7Racha({ nombre, onContinuar }: { nombre: string; onContinuar: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col items-center justify-center text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="flex size-20 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)]"
      >
        <Flame size={40} color="var(--accent)" aria-hidden="true" />
      </motion.span>

      <p className="mt-6 text-[48px] font-bold leading-none [font-family:var(--font-display)]">Día 1</p>
      <p className="mt-2 max-w-xs text-[16px] text-[var(--text-secondary)]">
        {nombre ? `${nombre}, arrancaste` : 'Arrancaste'} tu racha. Cada día que registras tu comida, suma —
        sin culpa si un día se rompe.
      </p>

      <div className="mt-10 w-full">
        <PasoCta onClick={onContinuar}>Quiero mantener mi racha</PasoCta>
      </div>
    </motion.div>
  );
}
