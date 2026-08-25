'use client';

// ONBOARDING — Shell compartido de las 8 pantallas (docs/sistema/02B + 50).
// Header 56px: atrás (oculto en el paso 1) + barra de progreso SIEMPRE visible
// (efecto goal gradient) + skip opcional en pasos no críticos. Una decisión
// por pantalla — el contenido lo define cada Step, este componente solo es
// el marco. min-h-dvh, mismos tokens de FICHA-ARTE que la landing.

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export interface OnboardingShellProps {
  pasoActual: number;
  totalPasos: number;
  onAtras?: () => void;
  onSkip?: () => void;
  children: ReactNode;
}

export function OnboardingShell({ pasoActual, totalPasos, onAtras, onSkip, children }: OnboardingShellProps) {
  const reduce = useReducedMotion();
  const progreso = Math.round((pasoActual / totalPasos) * 100);

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <header className="flex h-14 items-center gap-4 px-5">
        {onAtras ? (
          <button
            type="button"
            onClick={onAtras}
            aria-label="Volver al paso anterior"
            className="flex size-11 shrink-0 items-center justify-center [touch-action:manipulation]"
          >
            <ArrowLeft size={20} color="var(--text-secondary)" aria-hidden="true" />
          </button>
        ) : (
          <span className="size-11 shrink-0" aria-hidden="true" />
        )}

        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            initial={false}
            animate={{ width: `${progreso}%` }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="shrink-0 px-2 py-3 text-[12px] font-medium text-[var(--text-tertiary)] [touch-action:manipulation]"
          >
            Saltar
          </button>
        ) : (
          <span className="w-8 shrink-0" aria-hidden="true" />
        )}
      </header>

      <main className="flex flex-1 flex-col px-5 pb-8">{children}</main>
    </div>
  );
}

/* ── <PasoCta> — el CtaButton del kit, pero con onClick (avanza el flujo
   interno) en vez de href. Mismas medidas/sombra para no romper el ritmo
   visual entre landing y onboarding. ── */
export function PasoCta({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-8 text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition-opacity duration-150 [touch-action:manipulation] disabled:opacity-40"
    >
      {children}
    </motion.button>
  );
}
