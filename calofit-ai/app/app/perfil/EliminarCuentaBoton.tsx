'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export function EliminarCuentaBoton() {
  const router = useRouter();
  const [confirmando, setConfirmando] = useState(false);
  const [borrando, setBorrando] = useState(false);

  const eliminar = async () => {
    setBorrando(true);
    const res = await fetch('/api/cuenta/eliminar', { method: 'POST' });
    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      setBorrando(false);
    }
  };

  if (confirmando) {
    return (
      <div className="mt-4 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--urgencia)_8%,transparent)] p-4">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">
          ¿Seguro? Esto borra tu cuenta y todo tu historial para siempre.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setConfirmando(false)}
            className="h-11 flex-1 rounded-[var(--radius-button)] bg-[var(--surface)] text-[16px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={eliminar}
            disabled={borrando}
            className="h-11 flex-1 rounded-[var(--radius-button)] bg-[var(--urgencia)] text-[16px] font-semibold text-white [touch-action:manipulation] disabled:opacity-60"
          >
            {borrando ? 'Eliminando…' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirmando(true)}
      className="mt-4 flex h-14 w-full items-center justify-center gap-2 text-[12px] font-semibold text-[var(--text-tertiary)] [touch-action:manipulation]"
    >
      <Trash2 size={14} aria-hidden="true" />
      Eliminar mi cuenta
    </button>
  );
}
