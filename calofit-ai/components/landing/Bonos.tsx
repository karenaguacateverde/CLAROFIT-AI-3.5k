'use client';

// KIT DE LANDING — §5C BONOS (extensión, entre Retención y Oferta):
// 4 bonos digitales REALES (entregables por el equipo, no features de la app
// sin construir — evita prometer "recetario"/"retos" que están fuera del MVP).
// Cada bono: chip de ícono + nombre + descripción + "incluido sin costo extra".

import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { IconChip, Kicker, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy, warnRango } from './MarkedCopy';

export interface Bono {
  icon: LucideIcon;
  nombre: string;
  detalle: string;
  /** Mockup/portada del bono — sin ella, la tarjeta queda solo con ícono (honesto). */
  img?: string;
}

export interface BonosProps {
  kicker?: string;
  /** Copy MARCADO del título (máx 10 palabras). */
  tituloMarked: string;
  /** Exactamente 4 bonos. */
  bonos: [Bono, Bono, Bono, Bono];
  id?: string;
}

export function Bonos({ kicker = 'BONOS', tituloMarked, bonos, id }: BonosProps) {
  warnCopy('Bonos → título', tituloMarked, 10);
  warnRango('Bonos → items', bonos.length, 4, 4);
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} tinte="durazno" ariaLabel="Bonos incluidos">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <Kicker>{kicker}</Kicker>
          <h2 className="text-balance text-[32px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-[48px]">
            <MarkedCopy text={tituloMarked} />
          </h2>
        </motion.div>

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {bonos.map((b, i) => (
            <motion.li
              key={i}
              variants={item}
              className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[var(--shadow-1)]"
            >
              {b.img && (
                <div className="flex items-center justify-center bg-[var(--surface-2)] p-6">
                  <img
                    src={b.img}
                    alt={b.nombre}
                    width={240}
                    height={240}
                    loading="lazy"
                    className="h-48 w-auto object-contain"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {!b.img && <IconChip icon={b.icon} tone="accent" />}
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                      Bono {i + 1}
                    </p>
                    <h3 className="mt-1 text-[16px] font-semibold text-[var(--text-primary)]">{b.nombre}</h3>
                    <p className="mt-1.5 text-[16px] leading-snug text-[var(--text-secondary)]">{b.detalle}</p>
                  </div>
                </div>
                <p className="mt-4 text-[12px] font-medium text-[var(--text-tertiary)]">
                  Incluido sin costo adicional
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </SectionShell>
  );
}
