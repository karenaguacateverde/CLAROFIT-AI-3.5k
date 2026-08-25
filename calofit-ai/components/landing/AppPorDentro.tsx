'use client';

// KIT DE LANDING — §5 LA APP POR DENTRO (blueprint: 55 §5)
// Carrusel de frames a ALTURA FIJA con scroll-snap + avance automático 5s +
// mask-fade lateral (el corte nunca es seco). Sin dots (2026-08-22, pedido
// explícito). Sin screenshot → frame PLACEHOLDER gris con el nombre de la
// pantalla futura (pendiente en ESTADO.md).

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Kicker, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface FrameCarrusel {
  /** Screenshot REAL a 375px. Sin src → placeholder honesto. */
  src?: string;
  alt?: string;
  /** Label bajo el frame: nombre-RESULTADO de la pantalla ("Tu semana, ya planificada"). */
  label: string;
  /** Nombre de la pantalla futura para el placeholder ("Plan del día"). */
  nombrePantalla?: string;
  /** true = la imagen YA trae su propio marco/mockup de teléfono impreso —
   *  se muestra "pelada", sin borde/chrome extra, solo a la misma altura fija. */
  propioMarco?: boolean;
}

export interface AppPorDentroProps {
  /** Sin kicker por defecto (2026-08-22): evita duplicar "así se ve por dentro"
   *  cuando el título ya lo dice — pásalo solo si de verdad suma algo distinto. */
  kicker?: string;
  /** Copy MARCADO del título (máx 8 palabras). */
  tituloMarked: string;
  /** Subtítulo opcional, en negro, bajo el título. */
  subtitulo?: string;
  /** 3-5 frames. */
  frames: FrameCarrusel[];
  /** CTA mid-page: mismas medidas y MISMO verbo del CTA héroe (19). */
  ctaLabel: string;
  ctaHref: string;
  /** Precio anterior tachado (p. ej. "$27"). */
  precioTachado?: string;
  /** Precio actual destacado en verde (p. ej. "$7"). */
  precioActual?: string;
  escasezPorcentaje?: number;
  escasezLabel?: string;
  garantiaLabel?: string;
  metodosPagoImg?: string;
  id?: string;
}

export function AppPorDentro({
  kicker,
  tituloMarked,
  subtitulo,
  frames,
  ctaLabel,
  ctaHref,
  precioTachado,
  precioActual,
  escasezPorcentaje,
  escasezLabel,
  garantiaLabel,
  metodosPagoImg,
  id,
}: AppPorDentroProps) {
  warnCopy('AppPorDentro → título', tituloMarked, 8);
  warnRango('AppPorDentro → frames', frames.length, 3, 6);
  const reduce = useReducedMotion();
  const { contenedor, item } = useReveal();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indiceRef = useRef(0);

  const irA = (i: number): void => {
    frameRefs.current[i]?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  // Avance automático cada 5s — navegación manual (dots/swipe) sigue disponible.
  // SOLO mientras el carrusel está a la vista: si no, scrollIntoView jalaría
  // la página de vuelta hacia arriba cada 5s aunque el usuario ya haya bajado.
  const irARef = useRef(irA);
  irARef.current = irA;
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const enPantalla = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!enPantalla) return;
      indiceRef.current = (indiceRef.current + 1) % frames.length;
      irARef.current(indiceRef.current);
    }, 5000);
    return () => clearInterval(id);
  }, [reduce, frames.length]);

  return (
    <SectionShell id={id} tinte="surface" ariaLabel="La app por dentro">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          {kicker && <Kicker>{kicker}</Kicker>}
          <h2 className="text-balance text-xl font-bold leading-[1.25] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-3xl">
            <MarkedCopy text={tituloMarked} />
          </h2>
          {subtitulo && (
            <p className="mt-2 text-[16px] font-medium text-[var(--text-primary)]">{subtitulo}</p>
          )}
        </motion.div>

        {/* Pista con scroll-snap + fade en ambos bordes (mask-image) */}
        <motion.div variants={item} className="mt-10">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(20px,calc(50%-125px))] pb-2 [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [&::-webkit-scrollbar]:hidden"
          >
            {frames.map((f, i) => (
              <div key={i} className="shrink-0 snap-center">
                {f.propioMarco ? (
                  /* La imagen YA trae su marco de teléfono impreso — se muestra
                     "pelada" (sin borde/chrome extra), solo a la altura fija común. */
                  <div
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                    className="relative h-96 w-64 overflow-hidden"
                  >
                    {f.src && (
                      <img
                        src={f.src}
                        alt={f.alt ?? f.label}
                        width={256}
                        height={384}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <div
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                    className="relative h-96 w-64 overflow-hidden rounded-[32px] border-4 bg-[var(--surface-2)] shadow-[var(--shadow-2)]"
                    style={{ borderColor: 'color-mix(in oklab, var(--text-primary) 90%, var(--accent))' }}
                  >
                    {f.src ? (
                      /* object-contain: la imagen trae su propio texto — nunca se recorta (55 §5.2) */
                      <img
                        src={f.src}
                        alt={f.alt ?? f.label}
                        width={256}
                        height={384}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      /* Placeholder honesto (55 §5.2): gris elevado + nombre + dashed —
                         nunca un frame que finja producto terminado */
                      <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)] bg-[var(--surface-2)] px-4">
                        <span className="text-center text-[16px] font-medium text-[var(--text-secondary)]">
                          {f.nombrePantalla ?? f.label}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <p className="mt-3 text-center text-[12px] font-medium text-[var(--text-secondary)]">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bloque de precio y compra — justo debajo del carrusel */}
        <motion.div variants={item} className="mx-auto mt-10 max-w-xs">
          {precioActual && (
            <p className="flex items-baseline justify-center gap-2">
              {precioTachado && (
                <span className="text-[16px] text-[var(--urgencia)] line-through">Antes: {precioTachado} USD</span>
              )}
              <span className="text-[32px] font-bold text-[var(--accent-2)] [font-family:var(--font-display)]">
                Ahora: {precioActual}
              </span>
            </p>
          )}
          {escasezLabel && (
            <div className="mt-2">
              <span className="block h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                <span
                  className="block h-full rounded-full bg-[var(--urgencia)]"
                  style={{ width: `${escasezPorcentaje ?? 80}%` }}
                />
              </span>
              <p className="mt-1 text-center text-[12px] font-medium text-[var(--urgencia)]">{escasezLabel}</p>
            </div>
          )}
          <div className="mt-4">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={ctaHref}
              className="flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] px-6 text-center text-[16px] font-bold text-[var(--bg)] [touch-action:manipulation]"
              style={{
                background: 'var(--urgencia)',
                boxShadow:
                  '0 6px 0 color-mix(in oklab, var(--urgencia) 60%, black), 0 14px 28px color-mix(in oklab, var(--urgencia) 40%, transparent)',
              }}
            >
              {ctaLabel}
            </motion.a>
          </div>
          {garantiaLabel && (
            <p className="mt-3 text-center text-[12px] font-medium text-[var(--text-secondary)]">{garantiaLabel}</p>
          )}
          {metodosPagoImg && (
            <img
              src={metodosPagoImg}
              alt="Pagos confiables"
              width={280}
              height={58}
              loading="lazy"
              className="mx-auto mt-2 h-auto w-full max-w-64 object-contain"
            />
          )}
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
