'use client';

// "¿Compraste y no te llega el acceso?" — el ticket #1 de soporte en el modelo
// Hotmart+webhook (18-VENTA-HOTMART). Respuesta SIEMPRE genérica exista o no
// la cuenta (anti-enumeración, mismo patrón que el login) — nunca se revela
// si un correo compró o no.

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';

export default function RecuperarAccesoPage() {
  const [correo, setCorreo] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const reenviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.trim() || enviando) return;
    setEnviando(true);

    const supabase = crearClienteSupabase();
    // shouldCreateUser: false — este formulario reenvía el acceso a quien YA compró,
    // no crea cuentas nuevas. Si el correo no existe, la llamada falla en silencio;
    // el mensaje que ve la persona es el mismo en ambos casos.
    await supabase.auth.signInWithOtp({
      email: correo.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setEnviando(false);
    setEnviado(true);
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-sm"
      >
        <Link href="/login" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-tertiary)]">
          <ArrowLeft size={14} aria-hidden="true" />
          Volver a iniciar sesión
        </Link>

        <h1 className="mt-6 text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
          ¿Compraste y no te llega el acceso?
        </h1>
        <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
          Pon el correo con el que compraste en Hotmart y te reenviamos el acceso.
        </p>

        {enviado ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] p-4"
          >
            <Check size={20} color="var(--accent-2)" aria-hidden="true" className="mt-0.5 shrink-0" />
            <p className="text-[16px] text-[var(--text-primary)]">
              Si ese correo tiene una compra activa, el acceso llega en unos minutos. Revisa también
              spam y promociones.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={reenviar} className="mt-6">
            <div className="relative">
              <Mail
                size={18}
                color="var(--text-tertiary)"
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="El correo con el que compraste"
                autoComplete="email"
                className="h-14 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] pl-11 pr-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </div>
            <button
              type="submit"
              disabled={enviando}
              className="mt-4 flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-white [touch-action:manipulation] disabled:opacity-60"
            >
              {enviando ? 'Enviando…' : 'Reenviarme el acceso'}
            </button>
          </form>
        )}

        <p className="mt-6 text-[12px] text-[var(--text-tertiary)]">
          Asegúrate de usar el MISMO correo con el que aparece tu compra en Hotmart — está en tu
          comprobante. Si sigue sin llegar,{' '}
          <a href="mailto:luciahouse483@gmail.com" className="underline">
            escríbenos
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
