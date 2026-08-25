'use client';

// APP INTERNA — §4 PERFIL. Sin auth todavía: "Cerrar sesión" y los ajustes
// de cuenta son placeholders honestos (deshabilitados con nota), no botones
// que fingen funcionar — se conectan en la fase de login/auth.

import { Target, Flame, Bell, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const AJUSTES: { icon: LucideIcon; label: string; valor?: string }[] = [
  { icon: Target, label: 'Meta diaria', valor: '1,800 kcal' },
  { icon: Bell, label: 'Notificaciones', valor: 'Activadas' },
  { icon: ShieldCheck, label: 'Privacidad y datos' },
];

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Tu perfil</h1>

      <div className="mt-6 flex items-center gap-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--chip-bg)] text-[20px] font-bold text-[var(--accent)]"
        >
          S
        </span>
        <div>
          <p className="text-[16px] font-semibold text-[var(--text-primary)]">Sofía</p>
          <p className="text-[12px] text-[var(--text-tertiary)]">Bajar de peso sin pasar hambre</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] p-4">
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--bg)]"
        >
          <Flame size={20} color="var(--accent)" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[16px] font-bold text-[var(--text-primary)]">1 día de racha</p>
          <p className="text-[12px] text-[var(--text-tertiary)]">Sigue registrando para no perderla</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Ajustes</p>
        <ul className="mt-2 flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-1)]">
          {AJUSTES.map((a, i) => {
            const Icono = a.icon;
            return (
              <li
                key={a.label}
                className={`flex min-h-14 items-center gap-3 px-4 ${
                  i > 0 ? 'border-t border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)]' : ''
                }`}
              >
                <Icono size={20} color="var(--text-secondary)" aria-hidden="true" />
                <span className="flex-1 text-[16px] text-[var(--text-primary)]">{a.label}</span>
                {a.valor && <span className="text-[12px] text-[var(--text-tertiary)]">{a.valor}</span>}
                <ChevronRight size={16} color="var(--text-tertiary)" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        disabled
        title="Disponible cuando exista login (siguiente fase)"
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] text-[16px] font-semibold text-[var(--text-tertiary)] opacity-60"
      >
        <LogOut size={18} aria-hidden="true" />
        Cerrar sesión
      </button>
      <p className="mt-2 text-center text-[12px] text-[var(--text-tertiary)]">
        Disponible cuando se conecte el login (siguiente fase del proyecto).
      </p>
    </div>
  );
}
