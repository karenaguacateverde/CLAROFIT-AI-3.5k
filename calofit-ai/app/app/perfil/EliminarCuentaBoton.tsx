'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle } from 'lucide-react';

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

        <div className="mt-3 flex items-start gap-2 rounded-[var(--radius-card)] bg-[var(--surface)] p-3">
          <AlertTriangle size={16} color="var(--urgencia)" aria-hidden="true" className="mt-0.5 shrink-0" />
          <p className="text-[12px] text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Importante:</strong> borrar tu cuenta aquí NO
            cancela tu suscripción de pago en Hotmart. Si tienes una suscripción activa, cancélala primero
            en Hotmart (en el correo de tu compra o en{' '}
            <a
              href="https://sac.hotmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              sac.hotmart.com
            </a>
            ), o seguirán cobrándote aunque tu cuenta ya no exista.
          </p>
        </div>

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
