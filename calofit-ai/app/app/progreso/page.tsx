'use client';

// APP INTERNA — §3 PROGRESO. Navegación real entre semanas (regla 13 de
// CLAUDE.md: toda vista temporal necesita fechas reales + navegación, nunca
// solo "esta semana"). Datos de EJEMPLO — se conectan a food_logs reales en
// la fase de servicios externos.

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const META_KCAL = 1800;

const SEMANAS = [
  {
    rango: '18-24 ago, 2026',
    dias: [
      { d: 'Lun', kcal: 1750 },
      { d: 'Mar', kcal: 1820 },
      { d: 'Mié', kcal: 1690 },
      { d: 'Jue', kcal: 1260 },
      { d: 'Vie', kcal: 0 },
      { d: 'Sáb', kcal: 0 },
      { d: 'Dom', kcal: 0 },
    ],
  },
  {
    rango: '11-17 ago, 2026',
    dias: [
      { d: 'Lun', kcal: 1900 },
      { d: 'Mar', kcal: 1780 },
      { d: 'Mié', kcal: 1650 },
      { d: 'Jue', kcal: 1820 },
      { d: 'Vie', kcal: 1710 },
      { d: 'Sáb', kcal: 2050 },
      { d: 'Dom', kcal: 1600 },
    ],
  },
];

export default function ProgresoPage() {
  const [semanaIdx, setSemanaIdx] = useState(0);
  const semana = SEMANAS[semanaIdx];
  const diasConDatos = semana.dias.filter((d) => d.kcal > 0);
  const promedio = diasConDatos.length
    ? Math.round(diasConDatos.reduce((s, d) => s + d.kcal, 0) / diasConDatos.length)
    : 0;
  const maxKcal = Math.max(META_KCAL, ...semana.dias.map((d) => d.kcal));

  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Tu progreso</h1>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSemanaIdx((i) => Math.min(i + 1, SEMANAS.length - 1))}
          disabled={semanaIdx >= SEMANAS.length - 1}
          aria-label="Semana anterior"
          className="flex size-9 items-center justify-center rounded-full bg-[var(--surface)] shadow-[var(--shadow-1)] disabled:opacity-30 [touch-action:manipulation]"
        >
          <ChevronLeft size={18} color="var(--text-secondary)" aria-hidden="true" />
        </button>
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">{semana.rango}</p>
        <button
          type="button"
          onClick={() => setSemanaIdx((i) => Math.max(i - 1, 0))}
          disabled={semanaIdx <= 0}
          aria-label="Semana siguiente"
          className="flex size-9 items-center justify-center rounded-full bg-[var(--surface)] shadow-[var(--shadow-1)] disabled:opacity-30 [touch-action:manipulation]"
        >
          <ChevronRight size={18} color="var(--text-secondary)" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Promedio de la semana
        </p>
        <p className="mt-1 text-[24px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
          {promedio.toLocaleString('es')} <span className="text-[16px] font-medium text-[var(--text-secondary)]">kcal/día</span>
        </p>

        <div className="mt-6 flex h-32 items-end justify-between gap-2">
          {semana.dias.map((d, i) => {
            const alturaPct = d.kcal > 0 ? Math.max(6, Math.round((d.kcal / maxKcal) * 100)) : 3;
            const sobreMeta = d.kcal > META_KCAL;
            return (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${alturaPct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[8px]"
                    style={{ background: sobreMeta ? 'var(--macro-proteina)' : 'var(--accent)' }}
                  />
                </div>
                <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{d.d}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[12px] text-[var(--text-tertiary)]">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Dentro de tu meta
          <span aria-hidden="true" className="ml-3 h-2 w-2 rounded-full" style={{ background: 'var(--macro-proteina)' }} />
          Por encima de tu meta
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">Historial de comidas</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {semana.dias
            .filter((d) => d.kcal > 0)
            .map((d) => (
              <li
                key={d.d}
                className="flex items-center justify-between rounded-[var(--radius-card)] bg-[var(--surface)] p-3.5 shadow-[var(--shadow-1)]"
              >
                <p className="text-[16px] font-medium text-[var(--text-primary)]">{d.d}</p>
                <p className="text-[16px] font-semibold tabular-nums text-[var(--text-primary)]">
                  {d.kcal.toLocaleString('es')} kcal
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
