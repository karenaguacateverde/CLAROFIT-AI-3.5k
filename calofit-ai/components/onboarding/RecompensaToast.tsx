'use client';

// GAMIFICACIÓN — toast de recompensa entre pasos (pedido explícito 2026-08-24).
// Verduras/frutas con expresión, CERO animales — sin librería de ilustración
// disponible en el proyecto, se resuelve con emoji grande (excepción explícita
// del usuario a la regla "sin emojis como íconos", ver CLAUDE.md → UX). Puntos
// acumulados en memoria, no persistidos — es feedback del momento, no un dato real.

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const MASCOTAS = ['🥑', '🥦', '🍓', '🍋', '🥕'];

export function RecompensaToast({ trigger, puntos }: { trigger: number; puntos: number }) {
  const [visible, setVisible] = useState(false);
  const [mascota, setMascota] = useState(MASCOTAS[0]);

  useEffect(() => {
    if (trigger === 0) return;
    setMascota(MASCOTAS[trigger % MASCOTAS.length]);
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(id);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--surface)] px-4 py-2 shadow-[var(--shadow-2)]"
          >
            <span className="text-xl" aria-hidden="true">
              {mascota}
            </span>
            <span className="text-[16px] font-semibold text-[var(--accent-2)]">+10 puntos de salud</span>
            <span className="text-[12px] text-[var(--text-tertiary)]">({puntos})</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
