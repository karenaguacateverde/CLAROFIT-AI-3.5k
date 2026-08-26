'use client';

// APP INTERNA — piezas compartidas de Hoy/Escanear/Progreso/Perfil.
// Mismos tokens que landing/onboarding (FICHA-ARTE: claro, naranja+verde).
// Sin backend todavía: los datos que consumen estos componentes son props,
// nunca fetch — cada pantalla decide si usa datos de ejemplo o reales.

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Home, ScanLine, LineChart, User, Plus } from 'lucide-react';

const TABS = [
  { href: '/app', icon: Home, label: 'Hoy' },
  { href: '/app/progreso', icon: LineChart, label: 'Progreso' },
  { href: '/app/perfil', icon: User, label: 'Perfil' },
] as const;

/* ── <BottomNav> — 3 tabs + FAB central elevado a /app/escanear (55: nav SIEMPRE al fondo). ── */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)]">
      <div className="relative mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {TABS.slice(0, 2).map((t) => (
          <TabLink key={t.href} tab={t} activo={pathname === t.href} />
        ))}

        {/* FAB central: escanear — la acción #1 de la app, siempre a mano */}
        <Link
          href="/app/escanear"
          aria-label="Escanear un plato"
          className="relative -top-5 flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_8px_20px_color-mix(in_oklab,var(--accent)_45%,transparent)] [touch-action:manipulation]"
        >
          <Plus size={26} color="var(--bg)" strokeWidth={2.5} aria-hidden="true" />
        </Link>

        {TABS.slice(2).map((t) => (
          <TabLink key={t.href} tab={t} activo={pathname === t.href} />
        ))}
      </div>
    </nav>
  );
}

function TabLink({ tab, activo }: { tab: (typeof TABS)[number]; activo: boolean }) {
  const Icono = tab.icon;
  return (
    <Link
      href={tab.href}
      className="flex w-16 flex-col items-center gap-1 py-2 [touch-action:manipulation]"
      aria-current={activo ? 'page' : undefined}
    >
      <Icono size={22} color={activo ? 'var(--accent)' : 'var(--text-tertiary)'} strokeWidth={activo ? 2.4 : 2} aria-hidden="true" />
      <span className={`text-[12px] font-medium ${activo ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`}>
        {tab.label}
      </span>
    </Link>
  );
}

/* ── <DonutCalorias> — anillo animado consumido/meta (55: conteo héroe siempre anima). ── */
export function DonutCalorias({ consumidas, meta }: { consumidas: number; meta: number }) {
  const [texto, setTexto] = useState(0);
  const progresoPct = Math.min(100, Math.round((consumidas / meta) * 100));
  const restantes = Math.max(0, meta - consumidas);
  const size = 176;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  // Siempre arriba del todo en "Hoy" — anima al montar, sin gating de scroll.
  // rAF manual (no el helper animate() de motion — ver nota en el paso de
  // Progreso/Escanear si se reintenta esa vía): confiable y sin dependencias.
  useEffect(() => {
    let frame: number;
    const inicio = performance.now();
    const duracion = 1400;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion);
      const eased = 1 - Math.pow(1 - t, 3);
      setTexto(Math.round(eased * consumidas));
      if (t < 1) frame = requestAnimationFrame(paso);
    };
    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
  }, [consumidas]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (circ * progresoPct) / 100 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <p className="text-[32px] font-bold leading-none tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
          {texto}
        </p>
        <p className="mt-1 text-[12px] font-medium text-[var(--text-tertiary)]">de {meta.toLocaleString('es')} kcal</p>
        <p className="mt-0.5 text-[12px] font-semibold text-[var(--accent)]">{restantes} restantes</p>
      </div>
    </div>
  );
}

/* ── <MacroBar> — barra semántica con gramos consumidos/meta. ── */
export function MacroBar({
  label,
  color,
  gramos,
  metaGramos,
}: {
  label: string;
  color: string;
  gramos: number;
  metaGramos: number;
}) {
  const pct = Math.min(100, Math.round((gramos / metaGramos) * 100));
  return (
    <div className="flex-1">
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-semibold text-[var(--text-secondary)]">{label}</p>
        <p className="text-[12px] tabular-nums text-[var(--text-tertiary)]">
          {gramos}/{metaGramos}g
        </p>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ── <StreakChip> — racha con flama, siempre visible en Hoy. ── */
export function StreakChip({ dias }: { dias: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-3 py-1.5">
      <span aria-hidden="true" className="text-[16px]">
        🔥
      </span>
      <span className="text-[12px] font-bold text-[var(--accent)]">{dias} días</span>
    </div>
  );
}
