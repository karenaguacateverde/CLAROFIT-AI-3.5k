'use client';

// PASO 5/8 — ACTIVACIÓN (el trabajo #3 de los 5). El usuario HACE algo, no lee
// sobre la app. Demo honesta: foto de ejemplo real, análisis SIMULADO (el
// backend de IA se conecta en la fase de "servicios externos" de la secuencia
// maestra — no existe todavía). Nunca se presenta como una llamada real a IA.

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PasoCta } from './OnboardingShell';

export function Step5Escaneo({ onContinuar }: { onContinuar: () => void }) {
  const [estado, setEstado] = useState<'inicial' | 'analizando' | 'listo'>('inicial');

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
        Así se ve un análisis real — toca el plato para probarlo.
      </p>

      <div className="relative mx-auto mt-8 w-full max-w-xs overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)] shadow-[var(--shadow-2)]">
        <img
          src="/landing/frame-escaneo.jpg"
          alt="Plato de ejemplo para probar el Escaneo Casero"
          width={400}
          height={520}
          className="aspect-[4/5] w-full object-cover"
        />

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
          {estado === 'listo' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 bottom-0 rounded-t-[var(--radius-card)] bg-[var(--surface)] p-4"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
                Análisis completado
              </p>
              <p className="mt-1 text-[24px] font-bold leading-none [font-family:var(--font-display)]">520 kcal</p>
              <div className="mt-2 flex gap-4 text-[12px] text-[var(--text-secondary)]">
                <span>Carbs 63%</span>
                <span>Proteína 31%</span>
                <span>Grasa 17%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {estado === 'inicial' && (
        <button
          type="button"
          onClick={() => {
            setEstado('analizando');
            setTimeout(() => setEstado('listo'), 1500);
          }}
          className="mx-auto mt-6 text-[16px] font-semibold text-[var(--accent)] [touch-action:manipulation]"
        >
          Toca para analizar →
        </button>
      )}

      <div className="mt-auto pt-10">
        <PasoCta onClick={onContinuar} disabled={estado !== 'listo'}>
          {estado === 'listo' ? 'Genial, sigamos' : 'Analiza el plato para continuar'}
        </PasoCta>
      </div>
    </motion.div>
  );
}
