'use client';

// KIT DE LANDING — ui.tsx
// Piezas compartidas de las 10 secciones. La estructura premium vive AQUÍ
// (chips 44px, hairline degradada, checkmarks custom, sticky CTA con safe-area,
// alternancia base/elevado, reveal con reduced-motion): las secciones componen,
// no re-estilan. Consume SOLO los tokens de tokens.css.

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ── <Accent> — la palabra que vende, en el acento del kit ─────────────────── */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[var(--accent)]">{children}</span>;
}

/* ── <Kicker> — caps 12px/600 tracking +0.08em en acento (máx 1 por sección) ── */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
      {children}
    </p>
  );
}

/* ── <IconChip> — ícono SVG 22px dentro de chip 44px (55: jamás emoji) ──────
   tone 'accent' para secciones cálidas · 'muted' para íconos de dolor (§2:
   neutro apagado, nunca checks verdes). La FORMA la decide --radius-button:
   una sola forma de chip por página. */
export function IconChip({ icon: Icono, tone = 'accent' }: { icon: LucideIcon; tone?: 'accent' | 'muted' }) {
  const acento = tone === 'accent';
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] border ${
        acento
          ? 'border-[color-mix(in_oklab,var(--accent)_22%,transparent)] bg-[var(--chip-bg)]'
          : 'border-[color-mix(in_oklab,var(--text-tertiary)_35%,transparent)] bg-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)]'
      }`}
    >
      <Icono size={22} strokeWidth={2} color={acento ? 'var(--accent)' : 'var(--text-secondary)'} aria-hidden="true" />
    </span>
  );
}

/* ── <Hairline> — borde degradado 1-2px, técnica padding-box/border-box (49 §13).
   Señal de "esto importa": máx 1-3 usos por página (plan recomendado, garantía,
   chip del mecanismo). emphasis = EL elemento de la vista (2px, acento 55%). ── */
export function Hairline({
  emphasis = false,
  surface = 'surface',
  className = '',
  children,
}: {
  emphasis?: boolean;
  surface?: 'surface' | 'surface-2' | 'bg';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] ${className}`}
      style={{
        border: `${emphasis ? 2 : 1}px solid transparent`,
        background:
          `linear-gradient(var(--${surface}), var(--${surface})) padding-box, ` +
          `linear-gradient(135deg, color-mix(in oklab, var(--accent) ${emphasis ? 55 : 40}%, transparent), transparent 60%) border-box`,
      }}
    >
      {children}
    </div>
  );
}

/* ── <CheckCustom> — círculo acento 12% + check SVG (55 repertorio #9).
   Nunca el ✓ del sistema ni emoji. ── */
export function CheckCustom() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
    >
      <Check size={13} strokeWidth={2.5} color="var(--accent)" aria-hidden="true" />
    </span>
  );
}

/* ── <SectionShell> — ritmo vertical y alternancia base↔elevado (55 T1).
   64px mobile / 96px desktop; compacta (garantía) 48/64. flush pega las
   secciones que son UN movimiento visual (problema+agitación). ── */
// Tintes de sección (2026-08-22, pedido explícito: "que no todo el fondo se
// vea opaco blanco"): SOLO los 2 tokens de marca ya establecidos (--accent
// naranja, --accent-2 verde) a opacidad muy baja — nunca colores nuevos, para
// no romper la restricción cromática de FICHA-ARTE.
const TINTES = {
  ninguno: '',
  menta: 'color-mix(in oklab, var(--accent-2) 6%, var(--bg))',
  durazno: 'color-mix(in oklab, var(--accent) 6%, var(--bg))',
  surface: 'var(--surface)',
} as const;

export function SectionShell({
  id,
  elevacion = 'base',
  tinte,
  compacta = false,
  flush = 'none',
  ariaLabel,
  className = '',
  children,
}: {
  id?: string;
  elevacion?: 'base' | 'elevada';
  /** Tono de fondo de la sección — rompe la monotonía de blanco plano. */
  tinte?: keyof typeof TINTES;
  compacta?: boolean;
  flush?: 'none' | 'top' | 'bottom';
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  const pt = flush === 'top' ? 'pt-0' : compacta ? 'pt-12 md:pt-16' : 'pt-16 md:pt-24';
  const pb = flush === 'bottom' ? 'pb-8 md:pb-10' : compacta ? 'pb-12 md:pb-16' : 'pb-16 md:pb-24';
  const fondo = TINTES[tinte ?? (elevacion === 'elevada' ? 'surface' : 'ninguno')];
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${pt} ${pb} ${className}`}
      style={fondo ? { background: fondo } : undefined}
    >
      <div className="mx-auto w-full max-w-6xl px-5">{children}</div>
    </section>
  );
}

/* ── useReveal — variants de entrada whileInView con stagger, UNA sola vez,
   reduced-motion respetado (movimiento fuera, fade dentro — 55 T4). ── */
export function useReveal(stagger = 0.07): { contenedor: Variants; item: Variants } {
  const reduce = useReducedMotion();
  return {
    contenedor: {
      hidden: {},
      visible: { transition: { staggerChildren: reduce ? 0 : stagger } },
    },
    item: {
      hidden: { opacity: 0, y: reduce ? 0 : 20 },
      visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] } },
    },
  };
}

/* Props estándar para el contenedor con reveal — evita repetir en cada sección. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/* ── <CtaButton> — el CTA vivo del kit: ≥52px, whileTap 0.97, sombra tintada.
   El texto sobre acento usa --bg: si tu FICHA-ARTE rompe el contraste AA ahí,
   ajusta los tokens, no el componente. ── */
export function CtaButton({
  href,
  children,
  alto = 52,
  fullMobile = true,
}: {
  href: string;
  children: ReactNode;
  alto?: 52 | 56;
  fullMobile?: boolean;
}) {
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      href={href}
      className={`inline-flex items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-8 text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_25%,transparent)] transition-colors duration-150 hover:bg-[color-mix(in_oklab,var(--accent)_88%,var(--text-primary))] [touch-action:manipulation] ${
        'h-14'
      } ${fullMobile ? 'w-full sm:w-auto' : ''}`}
    >
      {children}
    </motion.a>
  );
}

/* ── <StickyCtaMobile> — barra fija inferior SOLO mobile (55 T2).
   Aparece cuando el hero sale del viewport; se oculta frente a la oferta y al
   CTA final; safe-area respetada. DOS estados (T2): antes de ver la oferta el
   botón hace scroll a #oferta ("ver precios"); después de verla, cambia al CTA
   comercial — nunca saltar una oferta que la persona todavía no vio. */
export function StickyCtaMobile({
  labelComercial,
  href,
  labelPre = 'Ver plan y precios',
  heroId = 'hero',
  ofertaId = 'oferta',
  ctaFinalId = 'cta-final',
  precioTachado,
  precioActual,
  escasezPorcentaje,
  escasezLabel,
  garantiaLabel,
  metodosPagoImg,
}: {
  labelComercial: string;
  href: string;
  labelPre?: string;
  heroId?: string;
  ofertaId?: string;
  ctaFinalId?: string;
  /** Precio anterior tachado (p. ej. "$27"). */
  precioTachado?: string;
  /** Precio actual destacado en verde (p. ej. "$7"). */
  precioActual?: string;
  /** 0-100: cuánto de la barra de escasez ya se "agotó". */
  escasezPorcentaje?: number;
  escasezLabel?: string;
  garantiaLabel?: string;
  metodosPagoImg?: string;
}) {
  const reduce = useReducedMotion();
  const [heroVisible, setHeroVisible] = useState(true);
  const [ofertaVisible, setOfertaVisible] = useState(false);
  const [ofertaVista, setOfertaVista] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const observar = (id: string, onChange: (visible: boolean) => void): IntersectionObserver | null => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (e) onChange(e.isIntersecting);
        },
        { threshold: 0.1 }
      );
      io.observe(el);
      return io;
    };
    const a = observar(heroId, setHeroVisible);
    const b = observar(ofertaId, (v) => {
      setOfertaVisible(v);
      if (v) setOfertaVista(true);
    });
    // Si la página no tiene sección de oferta, el botón va directo al CTA comercial.
    if (!document.getElementById(ofertaId)) setOfertaVista(true);
    const c = observar(ctaFinalId, setFinalVisible);
    return () => {
      a?.disconnect();
      b?.disconnect();
      c?.disconnect();
    };
  }, [heroId, ofertaId, ctaFinalId]);

  const visible = !heroVisible && !ofertaVisible && !finalVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reduce ? 0 : 88, opacity: reduce ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 88, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
        >
          {ofertaVista && (precioActual || escasezLabel) && (
            <div className="mb-2">
              {precioActual && (
                <p className="flex items-baseline justify-center gap-2">
                  {precioTachado && (
                    <span className="text-[16px] text-[var(--text-tertiary)] line-through">{precioTachado}</span>
                  )}
                  <span className="text-[24px] font-bold text-[var(--accent-2)] [font-family:var(--font-display)]">
                    {precioActual}
                  </span>
                </p>
              )}
              {escasezLabel && (
                <div className="mt-1.5">
                  <span className="block h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                    <span
                      className="block h-full rounded-full bg-[var(--urgencia)]"
                      style={{ width: `${escasezPorcentaje ?? 80}%` }}
                    />
                  </span>
                  <p className="mt-1 text-center text-[12px] font-medium text-[var(--urgencia)]">{escasezLabel}</p>
                </div>
              )}
            </div>
          )}

          <motion.a
            whileTap={{ scale: 0.97 }}
            href={ofertaVista ? href : `#${ofertaId}`}
            className="flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] text-[16px] font-bold text-[var(--bg)] [touch-action:manipulation]"
            style={{
              background: 'var(--urgencia)',
              boxShadow:
                '0 6px 0 color-mix(in oklab, var(--urgencia) 60%, black), 0 14px 28px color-mix(in oklab, var(--urgencia) 40%, transparent)',
            }}
          >
            {ofertaVista ? labelComercial : labelPre}
          </motion.a>

          {ofertaVista && (garantiaLabel || metodosPagoImg) && (
            <div className="mt-2 flex flex-col items-center gap-1.5">
              {garantiaLabel && (
                <p className="text-[12px] font-medium text-[var(--text-secondary)]">{garantiaLabel}</p>
              )}
              {metodosPagoImg && (
                <img
                  src={metodosPagoImg}
                  alt="Pagos confiables"
                  width={280}
                  height={58}
                  loading="lazy"
                  className="h-auto w-full max-w-64 object-contain"
                />
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
