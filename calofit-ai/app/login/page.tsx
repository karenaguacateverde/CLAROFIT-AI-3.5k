'use client';

// LOGIN — sin contraseña (magic link por correo) + Google OAuth, decisión ya tomada en
// ESTADO.md. Pantalla mínima a propósito: el trabajo de convencer ya lo hizo el onboarding
// y el paywall; aquí solo se necesita fricción cero para entrar.

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';

type Estado = 'inicial' | 'enviando' | 'enviado' | 'error';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState<Estado>('inicial');

  const enviarMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.trim()) return;
    setEstado('enviando');

    const supabase = crearClienteSupabase();
    const { error } = await supabase.auth.signInWithOtp({
      email: correo.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setEstado(error ? 'error' : 'enviado');
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-sm"
      >
        <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
          Entra a tu <span className="text-[var(--accent)]">Calofit</span>
        </h1>
        <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
          Sin contraseñas. Te mandamos un link mágico a tu correo.
        </p>

        {estado === 'enviado' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] p-4"
          >
            <Check size={20} color="var(--accent-2)" aria-hidden="true" className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[16px] font-semibold text-[var(--text-primary)]">Revisa tu correo</p>
              <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
                Te mandamos un link a {correo}. Tócalo desde tu celular o compu para entrar.
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={enviarMagicLink}>
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
                placeholder="tu@correo.com"
                autoComplete="email"
                className="h-14 w-full rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] pl-11 pr-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </div>

            {estado === 'error' && (
              <div className="mt-3 flex items-center gap-2 text-[12px] text-[var(--urgencia)]">
                <AlertCircle size={16} aria-hidden="true" />
                No se pudo enviar el link. Revisa tu correo e intenta de nuevo.
              </div>
            )}

            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="mt-4 flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-white shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)] [touch-action:manipulation] disabled:opacity-60"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Enviarme el link mágico'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-[12px] text-[var(--text-tertiary)]">
          Al continuar aceptas nuestros{' '}
          <a href="/terminos" className="underline">Términos</a> y{' '}
          <a href="/privacidad" className="underline">Aviso de Privacidad</a>.
        </p>
      </motion.div>
    </div>
  );
}
