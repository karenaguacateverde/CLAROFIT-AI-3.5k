'use client';

// KIT DE LANDING — ESTADÍSTICAS (pedido explícito 2026-08-22).
// Franja oscura de énfasis entre Garantía y FAQ — la ÚNICA sección oscura de
// la página (FICHA-ARTE cerró el resto en claro); banda de contraste puntual,
// no un cambio de modo. Contadores animados al entrar en viewport.
// ⚠️ Los 3 números son ilustrativos, no datos reales — ver FICHA-MERCADO.md.

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { SectionShell, useReveal, VIEWPORT_ONCE } from './ui';

export interface ColumnaEstadistica {
  valor: number;
  prefijo?: string;
  texto: string;
}

export interface EstadisticasProps {
  tituloMarked: string;
  subtitulo: string;
  columnas: [ColumnaEstadistica, ColumnaEstadistica, ColumnaEstadistica];
  id?: string;
}

function Contador({ valor, prefijo = '+' }: { valor: number; prefijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });
  const [texto, setTexto] = useState('0');

  useEffect(() => {
    if (!enVista) return;
    const controls = animate(0, valor, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTexto(Math.round(v).toLocaleString('es')),
    });
    return () => controls.stop();
  }, [enVista, valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {texto}
    </span>
  );
}

export function Estadisticas({ tituloMarked, subtitulo, columnas, id }: EstadisticasProps) {
  const { contenedor, item } = useReveal();

  return (
    <SectionShell id={id} tinte="ninguno" ariaLabel="Estadísticas" className="[&]:bg-[var(--estadisticas-bg)]">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <h2
            className="text-balance text-xl font-bold leading-[1.3] [font-family:var(--font-display)] md:text-3xl"
            style={{ color: 'var(--accent-2)' }}
          >
            {tituloMarked}
          </h2>
          <p className="mt-3 text-[16px] font-medium text-[var(--estadisticas-texto)]">{subtitulo}</p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          {columnas.map((c, i) => (
            <motion.div key={i} variants={item} className="text-center">
              <p
                className="text-[32px] font-bold leading-none [font-family:var(--font-display)] md:text-[48px]"
                style={{ color: 'var(--accent-2)' }}
              >
                <Contador valor={c.valor} prefijo={c.prefijo} />
              </p>
              <p className="mt-2 text-[16px] leading-snug text-[var(--estadisticas-texto)]">{c.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
