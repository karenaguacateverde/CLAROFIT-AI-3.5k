'use client';

// KIT DE LANDING — LOGROS (reemplaza a Solución, pedido explícito 2026-08-22):
// título + subtítulo + 3 puntos numerados "01/02/03" con lead-in en negrita.
// Tamaños moderados a propósito — nada "gigante" en mobile.

import { motion } from 'motion/react';
import { Kicker, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';
import { MarkedCopy, warnCopy } from './MarkedCopy';

export interface Logro {
  numero: string;
  /** Lead-in en negrita (p. ej. "Come sin tener que calcular tus calorías manualmente"). */
  titulo: string;
  detalle: string;
}

export interface LogrosProps {
  kicker?: string;
  tituloMarked: string;
  subtituloMarked: string;
  logros: [Logro, Logro, Logro];
  id?: string;
}

export function Logros({ kicker = 'LO QUE LOGRARÁS', tituloMarked, subtituloMarked, logros, id }: LogrosProps) {
  warnCopy('Logros → título', tituloMarked, 8);
  warnCopy('Logros → subtítulo', subtituloMarked, 20);
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} tinte="menta" ariaLabel="Lo que lograrás">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <Kicker>{kicker}</Kicker>
          <h2 className="text-balance text-xl font-bold leading-[1.25] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-3xl">
            <MarkedCopy text={tituloMarked} />
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            <MarkedCopy text={subtituloMarked} />
          </p>
        </motion.div>

        <ol className="mx-auto mt-10 flex max-w-2xl flex-col gap-6">
          {logros.map((l) => (
            <motion.li key={l.numero} variants={item} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--accent-2)_22%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)] text-[16px] font-bold tabular-nums text-[var(--accent-2)]"
              >
                {l.numero}
              </span>
              <p className="pt-1 text-[16px] leading-snug text-[var(--text-primary)]">
                <span className="font-semibold">{l.titulo}: </span>
                <span className="text-[var(--text-secondary)]">{l.detalle}</span>
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </SectionShell>
  );
}
