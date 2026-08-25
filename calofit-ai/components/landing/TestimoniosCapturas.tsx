'use client';

// KIT DE LANDING — TESTIMONIOS CON CAPTURAS REALES (pedido explícito 2026-08-22).
// A diferencia de Testimonios.tsx (calificación agregada + carrusel de texto),
// esta sección muestra las capturas de WhatsApp TAL CUAL — sin recortar ni
// alterar — porque son evidencia real, no copy inventado.

import { motion } from 'motion/react';
import { Star, BadgeCheck } from 'lucide-react';
import { SectionShell, useReveal, VIEWPORT_ONCE } from './ui';

export interface TestimonioCaptura {
  img: string;
  nombre: string;
  pais: string;
  bandera: string;
}

export interface TestimoniosCapturasProps {
  titulo: string;
  testimonios: TestimonioCaptura[];
  ctaLabel: string;
  ctaHref: string;
  ctaSubtexto: string;
  id?: string;
}

function Estrellas() {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="var(--testimonio-estrella)" color="var(--testimonio-estrella)" strokeWidth={0} />
      ))}
    </div>
  );
}

export function TestimoniosCapturas({ titulo, testimonios, ctaLabel, ctaHref, ctaSubtexto, id }: TestimoniosCapturasProps) {
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} tinte="menta" ariaLabel="Testimonios con capturas reales">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.h2
          variants={item}
          className="text-balance text-center text-xl font-bold leading-[1.25] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-3xl"
        >
          {titulo}
        </motion.h2>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonios.map((t, i) => (
            <motion.div key={i} variants={item}>
              <div className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-1)]">
                {/* Captura TAL CUAL: sin crop, altura según su propia proporción */}
                <img
                  src={t.img}
                  alt={`Conversación de WhatsApp con ${t.nombre}`}
                  width={375}
                  height={667}
                  loading="lazy"
                  className="h-auto w-full object-contain"
                />
                <div className="flex flex-col items-center gap-1.5 p-4">
                  <Estrellas />
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--accent-2)]">
                    <BadgeCheck size={14} strokeWidth={2.5} aria-hidden="true" />
                    Cliente Verificado
                  </span>
                  <p className="text-[12px] font-medium text-[var(--text-tertiary)]">
                    {t.nombre} // {t.pais} {t.bandera}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-2">
          <a
            href={ctaHref}
            className="inline-flex h-14 items-center justify-center rounded-[var(--radius-button)] px-6 text-center text-[16px] font-bold text-[var(--bg)] [touch-action:manipulation]"
            style={{
              background: 'var(--urgencia)',
              boxShadow:
                '0 6px 0 color-mix(in oklab, var(--urgencia) 60%, black), 0 14px 28px color-mix(in oklab, var(--urgencia) 40%, transparent)',
            }}
          >
            {ctaLabel}
          </a>
          <p className="text-[12px] font-medium text-[var(--text-secondary)]">{ctaSubtexto}</p>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
