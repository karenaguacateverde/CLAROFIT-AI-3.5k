'use client';

// KIT DE LANDING — §4B CAPAS DE RETENCIÓN (extensión del blueprint 55, entre
// §5 App por dentro y §6 Oferta): grilla de 3 beneficios de hábito, cada uno
// con IconChip tone="accent" (positivo, a diferencia del tone="muted" de
// Problema). Solo features REALES del MVP (ESTADO.md → Constitución del
// Producto) — nada de "recetario"/"retos" que están fuera del alcance v1
// (gate de integridad 61: la landing no promete lo que la app no tiene).

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { IconChip, Kicker, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface BeneficioRetencion {
  icon: LucideIcon;
  titulo: string;
  detalle: string;
}

export interface RetencionProps {
  kicker?: string;
  /** Copy MARCADO del título (máx 8 palabras). */
  tituloMarked: string;
  /** 3 beneficios de hábito/retención. */
  beneficios: [BeneficioRetencion, BeneficioRetencion, BeneficioRetencion];
  id?: string;
}

export function Retencion({ kicker = 'MÁS QUE CONTAR CALORÍAS', tituloMarked, beneficios, id }: RetencionProps) {
  warnCopy('Retención → título', tituloMarked, 8);
  warnRango('Retención → beneficios', beneficios.length, 3, 3);
  beneficios.forEach((b, i) => warnCopy(`Retención → beneficio ${i + 1}`, b.detalle, 16));
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} elevacion="base" ariaLabel="Construimos hábitos">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <Kicker>{kicker}</Kicker>
          <h2 className="text-balance text-[32px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-[48px]">
            <MarkedCopy text={tituloMarked} />
          </h2>
        </motion.div>

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {beneficios.map((b, i) => (
            <motion.li
              key={i}
              variants={item}
              className="rounded-[var(--radius-card)] bg-[var(--surface)] p-6 shadow-[var(--shadow-1)]"
            >
              <IconChip icon={b.icon} tone="accent" />
              <h3 className="mt-4 text-[16px] font-semibold text-[var(--text-primary)]">{b.titulo}</h3>
              <p className="mt-2 text-[16px] leading-snug text-[var(--text-secondary)]">{b.detalle}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </SectionShell>
  );
}
