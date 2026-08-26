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

  const entrarConGoogle = async () => {
    const supabase = crearClienteSupabase();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
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

        <button
          type="button"
          onClick={entrarConGoogle}
          className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-[var(--radius-button)] bg-[var(--surface)] text-[16px] font-semibold text-[var(--text-primary)] shadow-[var(--shadow-1)] [touch-action:manipulation]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <path fill="#4285F4" d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 3-4.32 3-7.31Z" />
            <path fill="#34A853" d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H1.06v2.59A10 10 0 0 0 10 20Z" />
            <path fill="#FBBC05" d="M4.41 11.92a5.99 5.99 0 0 1 0-3.84V5.49H1.06a10 10 0 0 0 0 9.02l3.35-2.6Z" />
            <path fill="#EA4335" d="M10 3.96c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.6 9.6 0 0 0 10 0 10 10 0 0 0 1.06 5.49l3.35 2.6C5.2 5.72 7.4 3.96 10 3.96Z" />
          </svg>
          Continuar con Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)]" />
          <span className="text-[12px] font-medium text-[var(--text-tertiary)]">o con tu correo</span>
          <div className="h-px flex-1 bg-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)]" />
        </div>

        {estado === 'enviado' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] p-4"
          >
            <Check size={20} color="var(--accent-2)" aria-hidden="true" className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[16px] font-semibold text-[var(--text-primary)]">Revisa tu correo</p>
              <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
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
              <div className="mt-3 flex items-center gap-2 text-[14px] text-[var(--urgencia)]">
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
