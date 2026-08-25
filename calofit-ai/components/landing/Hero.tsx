'use client';

// KIT DE LANDING — §1 HERO (blueprint: 55 §1)
// Reglas embebidas: H1 bold completo con acento vía copy marcado · subtítulo con
// tope duro de 14 palabras (warn + truncado) · CTA vivo ≥52px con sombra tintada ·
// franja de prueba social como slot (SOLO datos reales — 19 §1) · mesh sutil de
// fondo YA incluido · carga inmediata (fade simple, nada que compita con el LCP).

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { CtaButton } from './ui';
import { MarkedCopy, truncarMarcado, warnCopy } from './MarkedCopy';

export interface HeroProps {
  appName: string;
  /** Logo real del proyecto; sin él, marca mínima con el acento. */
  logo?: ReactNode;
  loginHref?: string;
  loginLabel?: string;
  /** Copy MARCADO de docs/copy/landing.md — máx 8-10 palabras, 1-3 en [acento]. */
  h1Marked: string;
  /** Copy MARCADO — máx 14 palabras (52): el kit trunca y avisa si excede. */
  subtitleMarked: string;
  /** 1ª persona + beneficio ("Probar mi primer escaneo") — nunca "Registrarse".
   *  Sin ctaHref, la portada queda SIN botón (pedido explícito 2026-08-22):
   *  ctaLabel se usa entonces como texto plano de confianza bajo el subtítulo. */
  ctaLabel: string;
  /** Destino según el MODELO de 02C: checkout Hotmart (M1) u /onboarding (M2).
   *  Omitirlo quita el botón de la portada. */
  ctaHref?: string;
  /** Franja bajo el CTA/texto de confianza (posición FIJA de 19 §1). */
  socialProof?: ReactNode;
  /** Línea con efecto "espejo" que invita a seguir bajando (p. ej. "Descubre todo lo que incluye 👇"). */
  scrollHintLabel?: string;
  /** Screenshot real o mini-demo honesto. Sin visual → placeholder honesto (55 §1.3). */
  visual?: ReactNode;
  /** Sugerencia CONCRETA de qué imagen poner en el placeholder — nunca "imagen aquí". */
  visualPlaceholderSugerencia?: string;
  id?: string;
}

export function Hero({
  appName,
  logo,
  loginHref,
  loginLabel = 'Entrar',
  h1Marked,
  subtitleMarked,
  ctaLabel,
  ctaHref,
  socialProof,
  scrollHintLabel,
  visual,
  visualPlaceholderSugerencia = 'captura de la pantalla principal con datos reales',
  id = 'hero',
}: HeroProps) {
  warnCopy('Hero → h1', h1Marked, 10);
  warnCopy('Hero → subtítulo', subtitleMarked, 14);
  // Tope subido a 40 (2026-08-22, pedido explícito): el copy debe entrar EXACTO,
  // no truncado — el default de 14 sigue avisando por consola si se excede.
  const subtitulo = truncarMarcado(subtitleMarked, 40);

  return (
    <section id={id} className="relative overflow-hidden">
      {/* Fondo con profundidad: mesh/radial sutil del acento — nunca fill plano */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 480px at 50% -10%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%), ' +
            'radial-gradient(640px 420px at 100% 0%, color-mix(in oklab, var(--accent-2) 6%, transparent) 0%, transparent 55%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5">
        {/* Header 64px: marca a la izquierda, SOLO "Entrar" terciario a la derecha (19) */}
        <header className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
            {logo ?? <span aria-hidden="true" className="size-6 rounded-[8px] bg-[var(--accent)]" />}
            {appName}
          </a>
          {loginHref && (
            <a href={loginHref} className="px-2 py-3 text-[16px] font-medium text-[var(--text-tertiary)]">
              {loginLabel}
            </a>
          )}
        </header>

        {/* Carga inmediata: fade simple 300ms — el LCP manda (55 T4) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-4xl flex-col items-center pt-10 text-center md:pt-16"
        >
          {/* H1: tamaño controlado en mobile (pedido explícito 2026-08-22: text-xl ≈20px,
              nada "gigante" — crece moderado en desktop) */}
          <h1 className="text-balance text-xl font-bold leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-3xl">
            <MarkedCopy text={h1Marked} />
          </h1>

          <p className="mt-3 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
            <MarkedCopy text={subtitulo} />
          </p>

          {ctaHref && (
            <div className="mt-6 w-full sm:w-auto">
              <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
            </div>
          )}

          {/* Franja de prueba social: 8-12px bajo el CTA — SOLO números reales */}
          {socialProof && (
            <div className="mt-3 text-[12px] text-[var(--text-secondary)]">{socialProof}</div>
          )}

          {/* Texto "espejo": invita a seguir bajando sin ser un botón */}
          {scrollHintLabel && (
            <p className="text-espejo mt-6 text-[16px] font-bold">{scrollHintLabel}</p>
          )}

          {/* Visual del producto: tamaño moderado en mobile, crece en desktop */}
          <div className="mt-6 w-full max-w-sm sm:max-w-md md:max-w-xl">
            {visual ? (
              // Glow ambiental verde+naranja (2026-08-22, pedido explícito): dos sombras
              // difuminadas grandes en los tokens de marca, nunca colores nuevos.
              <div
                className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent)_18%,transparent)]"
                style={{
                  boxShadow:
                    '-24px -16px 64px color-mix(in oklab, var(--accent-2) 22%, transparent), ' +
                    '24px 24px 64px color-mix(in oklab, var(--accent) 22%, transparent)',
                }}
              >
                {visual}
              </div>
            ) : (
              /* Placeholder HONESTO (55 §1.3): dashed + ratio fijo (CLS 0) + sugerencia.
                 Queda anotado como pendiente en ESTADO.md hasta montar el visual real. */
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_45%,transparent)] bg-[color-mix(in_oklab,var(--accent)_5%,transparent)] px-8">
                <Camera size={20} color="var(--text-secondary)" aria-hidden="true" />
                <p className="max-w-[36ch] text-center text-[16px] font-medium leading-snug text-[var(--text-secondary)]">
                  Sugerencia: {visualPlaceholderSugerencia}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
