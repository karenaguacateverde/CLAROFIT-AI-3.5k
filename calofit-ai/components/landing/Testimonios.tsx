'use client';

// KIT DE LANDING — TESTIMONIOS (pedido explícito 2026-08-22, ampliado a 10 y
// carrusel automático 2026-08-22).
// ⚠️ Calificación, conteo de reseñas y testimonios son ILUSTRATIVOS, no datos
// reales — Calofit AI está en preventa, sin usuarios todavía. El usuario pidió
// esto explícitamente tras ser advertido del riesgo de reseñas falsas (ver
// nota en FICHA-MERCADO.md). Reemplazar por reseñas reales apenas existan.

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, Star } from 'lucide-react';
import { Hairline, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';

export interface Testimonio {
  frase: string;
  texto: string;
  nombre: string;
  pais: string;
  bandera: string;
}

export interface TestimoniosProps {
  calificacion: string;
  totalResenas: number;
  desglose: { etiqueta: string; porcentaje: number }[];
  testimonios: Testimonio[];
  id?: string;
}

function Estrellas({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="var(--testimonio-estrella)" color="var(--testimonio-estrella)" strokeWidth={0} />
      ))}
    </div>
  );
}

function ClienteVerificado() {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--accent-2)]">
      <BadgeCheck size={14} strokeWidth={2.5} aria-hidden="true" />
      Cliente Verificado
    </span>
  );
}

export function Testimonios({ calificacion, totalResenas, desglose, testimonios, id }: TestimoniosProps) {
  const { contenedor, item } = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Carrusel automático: avanza una tarjeta cada 5s, vuelve al inicio al llegar al final.
  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;
    const id = setInterval(() => {
      const card = track.querySelector<HTMLElement>('[data-card]');
      const paso = card ? card.offsetWidth + 16 : track.clientWidth;
      const alFinal = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({ left: alFinal ? 0 : track.scrollLeft + paso, behavior: 'smooth' });
    }, 5000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <SectionShell id={id} tinte="surface" ariaLabel="Testimonios de clientes">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <h2
            className="text-balance text-xl font-bold leading-[1.25] [font-family:var(--font-display)] md:text-3xl"
            style={{ color: 'var(--testimonio-titulo)' }}
          >
            Mira lo que dicen nuestros Clientes
          </h2>
          <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            Nuestros clientes ya están logrando resultados reales con Calofit AI
          </p>
        </motion.div>

        {/* Resumen de calificación — se mantiene igual */}
        <motion.div variants={item} className="mx-auto mt-8 max-w-2xl">
          <Hairline surface="surface" className="shadow-[var(--shadow-1)]">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-center gap-1 sm:items-start">
                <p className="text-[48px] font-bold leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
                  {calificacion}
                </p>
                <Estrellas size={18} />
                <p className="text-[12px] text-[var(--text-tertiary)]">({totalResenas.toLocaleString('es')})</p>
              </div>
              <div className="flex w-full max-w-xs flex-col gap-2">
                {desglose.map((d) => (
                  <div key={d.etiqueta} className="flex items-center gap-3 text-[12px]">
                    <span className="w-20 shrink-0 text-[var(--text-secondary)]">{d.etiqueta}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
                      <span
                        className="block h-full rounded-full bg-[var(--testimonio-estrella)]"
                        style={{ width: `${d.porcentaje}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right tabular-nums text-[var(--text-tertiary)]">
                      {d.porcentaje}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Hairline>
          <p className="mt-3 text-center text-[12px] text-[var(--text-tertiary)]">
            Mostrando {testimonios.length} de {totalResenas.toLocaleString('es')} Reseñas
          </p>
        </motion.div>

        {/* Carrusel horizontal automático — 10 tarjetas de solo texto */}
        <motion.div variants={item} className="mt-10">
          <div
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonios.map((t, i) => (
              <div
                key={i}
                data-card
                className="w-72 shrink-0 snap-start rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)] sm:w-80"
              >
                <Estrellas />
                <p className="mt-3 text-[16px] font-semibold text-[var(--testimonio-frase)]">{t.frase}</p>
                <p className="mt-2 text-[16px] leading-snug text-[var(--text-secondary)]">{t.texto}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-[12px] font-medium text-[var(--text-tertiary)]">
                    {t.nombre} // {t.pais} {t.bandera}
                  </p>
                </div>
                <div className="mt-2">
                  <ClienteVerificado />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
