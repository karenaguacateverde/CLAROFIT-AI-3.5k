// APP INTERNA — §4 PERFIL. Server Component: lee el perfil real de Supabase.
// "Cerrar sesión" conectado de verdad — conectado 2026-08-26.

import Link from 'next/link';
import { Target, Flame, Bell, ShieldCheck, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { CerrarSesionBoton } from './CerrarSesionBoton';
import { EliminarCuentaBoton } from './EliminarCuentaBoton';

export default async function PerfilPage() {
  const supabase = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: perfil } = await supabase
    .from('profiles')
    .select('nombre, objetivo, meta_kcal')
    .eq('id', user!.id)
    .single();

  const nombre = perfil?.nombre ?? user?.email?.split('@')[0] ?? 'Tú';
  const inicial = nombre.charAt(0).toUpperCase();

  const AJUSTES: { icon: LucideIcon; label: string; valor?: string; href?: string }[] = [
    { icon: Target, label: 'Meta diaria', valor: `${(perfil?.meta_kcal ?? 1800).toLocaleString('es')} kcal` },
    { icon: Bell, label: 'Notificaciones', valor: 'Activadas' },
    { icon: ShieldCheck, label: 'Privacidad y datos', href: '/privacidad' },
  ];

  return (
    <div className="mx-auto max-w-md px-5 pt-6">
      <h1 className="text-xl font-bold leading-[1.2] [font-family:var(--font-display)]">Tu perfil</h1>

      <div className="mt-6 flex items-center gap-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--chip-bg)] text-[24px] font-bold text-[var(--accent)]"
        >
          {inicial}
        </span>
        <div>
          <p className="text-[16px] font-semibold text-[var(--text-primary)]">{nombre}</p>
          <p className="text-[12px] text-[var(--text-tertiary)]">{user?.email}</p>
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
            const contenido = (
              <>
                <Icono size={20} color="var(--text-secondary)" aria-hidden="true" />
                <span className="flex-1 text-[16px] text-[var(--text-primary)]">{a.label}</span>
                {a.valor && <span className="text-[12px] text-[var(--text-tertiary)]">{a.valor}</span>}
                <ChevronRight size={16} color="var(--text-tertiary)" aria-hidden="true" />
              </>
            );
            const claseFila = `flex min-h-14 items-center gap-3 px-4 ${
              i > 0 ? 'border-t border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)]' : ''
            }`;
            return a.href ? (
              <Link key={a.label} href={a.href} className={claseFila}>
                {contenido}
              </Link>
            ) : (
              <li key={a.label} className={claseFila}>
                {contenido}
              </li>
            );
          })}
        </ul>
      </div>

      <CerrarSesionBoton />
      <EliminarCuentaBoton />
    </div>
  );
}
