'use client';

// APP INTERNA — §1 HOY (pantalla principal, el "protagonista" de la app).
// Datos de EJEMPLO (32: nunca se enseña vacía) — se conectan a Supabase real
// en la fase de "servicios externos" de la secuencia maestra.

import { motion } from 'motion/react';
import { ChefHat, Salad, Soup } from 'lucide-react';
import { DonutCalorias, MacroBar, StreakChip } from '@/components/app/ui';

const META_KCAL = 1800;
const CONSUMIDAS_KCAL = 1260;

const MACROS = [
  { label: 'Carbs', color: 'var(--macro-carbs)', gramos: 142, meta: 184 },
  { label: 'Proteína', color: 'var(--macro-proteina)', gramos: 88, meta: 130 },
  { label: 'Grasa', color: 'var(--macro-grasa)', gramos: 54, meta: 60 },
];

const COMIDAS_HOY = [
  { icon: Soup, nombre: 'Sancocho colombiano', hora: '8:14 a.m.', kcal: 350 },
  { icon: ChefHat, nombre: 'Arepa con carne desmechada', hora: '1:32 p.m.', kcal: 450 },
  { icon: Salad, nombre: 'Ceviche con camote y choclo', hora: '4:50 p.m.', kcal: 460 },
];

export default function HoyPage() {
  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-[var(--text-tertiary)]">Jueves, 21 de agosto</p>
          <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Hola, Sofía</h1>
        </div>
        <StreakChip dias={1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] bg-[var(--surface)] py-8 shadow-[var(--shadow-1)]"
      >
        <DonutCalorias consumidas={CONSUMIDAS_KCAL} meta={META_KCAL} />
        <div className="mt-6 flex w-full gap-4 px-6">
          {MACROS.map((m) => (
            <MacroBar key={m.label} label={m.label} color={m.color} gramos={m.gramos} metaGramos={m.meta} />
          ))}
        </div>
      </motion.div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">Comidas de hoy</h2>
          <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{COMIDAS_HOY.length} registradas</p>
        </div>

        <ul className="mt-3 flex flex-col gap-2.5">
          {COMIDAS_HOY.map((c, i) => {
            const Icono = c.icon;
            return (
              <motion.li
                key={c.nombre}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-3 shadow-[var(--shadow-1)]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
                >
                  <Icono size={20} color="var(--accent)" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-medium text-[var(--text-primary)]">{c.nombre}</p>
                  <p className="text-[12px] text-[var(--text-tertiary)]">{c.hora}</p>
                </div>
                <p className="shrink-0 text-[16px] font-semibold tabular-nums text-[var(--text-primary)]">{c.kcal} kcal</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
