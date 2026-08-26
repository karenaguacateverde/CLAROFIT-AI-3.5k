'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';

export function CerrarSesionBoton() {
  const router = useRouter();

  const cerrarSesion = async () => {
    const supabase = crearClienteSupabase();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={cerrarSesion}
      className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] text-[16px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]"
    >
      <LogOut size={18} aria-hidden="true" />
      Cerrar sesión
    </button>
  );
}
