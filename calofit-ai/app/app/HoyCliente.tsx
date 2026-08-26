'use client';

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Camera } from 'lucide-react';
import Link from 'next/link';
import { DonutCalorias, MacroBar, StreakChip } from '@/components/app/ui';

interface Macro {
  label: string;
  color: string;
  gramos: number;
  meta: number;
}

interface Comida {
  icon: LucideIcon;
  nombre: string;
  hora: string;
  kcal: number;
}

export function HoyCliente({
  nombre,
  fecha,
  metaKcal,
  consumidas,
  macros,
  comidas,
}: {
  nombre: string;
  fecha: string;
  metaKcal: number;
  consumidas: number;
  macros: Macro[];
  comidas: Comida[];
}) {
  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{fecha}</p>
          <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Hola, {nombre}</h1>
        </div>
        <StreakChip dias={1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex flex-col items-center rounded-[var(--radius-card)] bg-[var(--surface)] py-8 shadow-[var(--shadow-1)]"
      >
        <DonutCalorias consumidas={consumidas} meta={metaKcal} />
        <div className="mt-6 flex w-full gap-4 px-6">
          {macros.map((m) => (
            <MacroBar key={m.label} label={m.label} color={m.color} gramos={m.gramos} metaGramos={m.meta} />
          ))}
        </div>
      </motion.div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">Comidas de hoy</h2>
          <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{comidas.length} registradas</p>
        </div>

        {comidas.length === 0 ? (
          <Link
            href="/app/escanear"
            className="mt-3 flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] px-6 py-10 text-center shadow-[var(--shadow-1)] [touch-action:manipulation]"
          >
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
            >
              <Camera size={26} color="var(--accent)" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[16px] font-semibold text-[var(--text-primary)]">Aún no registras nada hoy</p>
              <p className="mt-1 text-[16px] text-[var(--text-secondary)]">Toca aquí para escanear tu primer plato</p>
            </div>
          </Link>
        ) : (
          <ul className="mt-3 flex flex-col gap-2.5">
            {comidas.map((c, i) => {
              const Icono = c.icon;
              return (
                <motion.li
                  key={`${c.nombre}-${i}`}
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
        )}
      </div>
    </div>
  );
}
