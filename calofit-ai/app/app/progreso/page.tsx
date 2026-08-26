'use client';

// APP INTERNA — §3 PROGRESO. Navegación real entre semanas (regla 13 de
// CLAUDE.md). Conectado a food_logs real de Supabase — conectado 2026-08-26.

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';

const META_KCAL = 1800;
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function inicioDeSemana(offsetSemanas: number) {
  const hoy = new Date();
  const diaSemana = (hoy.getDay() + 6) % 7; // 0 = lunes
  const lunes = new Date(hoy);
  lunes.setHours(0, 0, 0, 0);
  lunes.setDate(hoy.getDate() - diaSemana + offsetSemanas * 7);
  return lunes;
}

export default function ProgresoPage() {
  const [semanaOffset, setSemanaOffset] = useState(0);
  const [dias, setDias] = useState<{ d: string; kcal: number }[]>(
    DIAS_SEMANA.map((d) => ({ d, kcal: 0 }))
  );
  const [cargando, setCargando] = useState(true);

  const lunes = inicioDeSemana(semanaOffset);
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  const rango = `${lunes.getDate()}-${domingo.getDate()} ${domingo.toLocaleDateString('es', { month: 'short' })}, ${domingo.getFullYear()}`;

  useEffect(() => {
    let cancelado = false;
    setCargando(true);

    const finSemana = new Date(lunes);
    finSemana.setDate(lunes.getDate() + 7);

    (async () => {
      const supabase = crearClienteSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('food_logs')
        .select('kcal, registrado_en')
        .eq('user_id', user.id)
        .gte('registrado_en', lunes.toISOString())
        .lt('registrado_en', finSemana.toISOString());

      if (cancelado) return;

      const acumulado = DIAS_SEMANA.map((d) => ({ d, kcal: 0 }));
      (data ?? []).forEach((registro) => {
        const idx = (new Date(registro.registrado_en).getDay() + 6) % 7;
        acumulado[idx].kcal += registro.kcal;
      });
      setDias(acumulado);
      setCargando(false);
    })();

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semanaOffset]);

  const diasConDatos = dias.filter((d) => d.kcal > 0);
  const promedio = diasConDatos.length
    ? Math.round(diasConDatos.reduce((s, d) => s + d.kcal, 0) / diasConDatos.length)
    : 0;
  const maxKcal = Math.max(META_KCAL, ...dias.map((d) => d.kcal));
  const esSemanaActual = semanaOffset === 0;

  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Tu progreso</h1>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSemanaOffset((i) => i - 1)}
          aria-label="Semana anterior"
          className="flex size-9 items-center justify-center rounded-full bg-[var(--surface)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
        >
          <ChevronLeft size={18} color="var(--text-secondary)" aria-hidden="true" />
        </button>
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">{rango}</p>
        <button
          type="button"
          onClick={() => setSemanaOffset((i) => Math.min(i + 1, 0))}
          disabled={esSemanaActual}
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
          {dias.map((d, i) => {
            const alturaPct = d.kcal > 0 ? Math.max(6, Math.round((d.kcal / maxKcal) * 100)) : 3;
            const sobreMeta = d.kcal > META_KCAL;
            return (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: cargando ? 0 : `${alturaPct}%` }}
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
        {diasConDatos.length === 0 ? (
          <p className="mt-3 text-[16px] text-[var(--text-secondary)]">Sin registros esta semana.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {diasConDatos.map((d) => (
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
        )}
      </div>
    </div>
  );
}
