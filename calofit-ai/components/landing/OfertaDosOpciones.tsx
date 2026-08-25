'use client';

// KIT DE LANDING — OFERTA FINAL EN 2 TARJETAS (pedido explícito 2026-08-22,
// estructura "Plan Básico" vs "Plan Premium" estilo comparativo). El plan
// premium usa un precio ancla ($27 tachado → $7) que el usuario pidió DOS
// veces tras la advertencia de riesgo — ver nota en FICHA-MERCADO.md. El
// plan básico SÍ usa los precios reales del negocio ($7 mensual tachado →
// $4 anual, FICHA-MERCADO §1).

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCustom, CtaButton, Hairline, SectionShell, useReveal, VIEWPORT_ONCE } from './ui';

/** Fecha de hoy en español — SIEMPRE el día real, nunca una fecha fija que
 *  quede vieja (pedido explícito 2026-08-22). Se calcula en el cliente para
 *  no desincronizar con la fecha del servidor. */
function useFechaHoy(): string {
  const [fecha, setFecha] = useState('');
  useEffect(() => {
    setFecha(new Date().toLocaleDateString('es', { day: 'numeric', month: 'long' }));
  }, []);
  return fecha;
}

export interface BonoConValor {
  emoji?: string;
  texto: string;
  valorTachado?: string;
}

export interface OfertaDosOpcionesProps {
  mockupPremium: string;
  selloGarantia: string;
  metodosPago: string;
  ctaHref: string;
  id?: string;
}

export function OfertaDosOpciones({ mockupPremium, selloGarantia, metodosPago, ctaHref, id }: OfertaDosOpcionesProps) {
  const { contenedor, item } = useReveal();
  const fechaHoy = useFechaHoy();

  const beneficiosBasico: BonoConValor[] = [
    { texto: 'Acceso principal a la app Calofit AI' },
    { texto: 'Garantía incondicional de 7 días' },
  ];

  const beneficiosPremium: BonoConValor[] = [
    { emoji: '🎁', texto: '40 recetas bajas en calorías, listas en 10 minutos', valorTachado: '$15' },
    { emoji: '🎁', texto: 'Recetas de dulces y snacks altos en proteína', valorTachado: '$17' },
    { emoji: '🎁', texto: 'Lista de compra para bajar de peso sin gastar de más', valorTachado: '$12' },
    { emoji: '🎁', texto: 'Plantilla de tu meta de macros', valorTachado: '$14' },
    { emoji: '🎁', texto: 'Guía para agregar tus comidas favoritas', valorTachado: '$19' },
    { texto: 'Acceso de por vida y actualizaciones' },
    { texto: 'Garantía incondicional de 7 días' },
  ];

  return (
    <SectionShell id={id} tinte="surface" ariaLabel="Elige tu plan">
      <motion.div variants={contenedor} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <motion.div variants={item} className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[32px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)] md:text-[48px]">
            Elige la mejor oferta para ti
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          {/* PLAN BÁSICO — precios reales ya definidos (FICHA-MERCADO §1) */}
          <motion.div variants={item}>
            <Hairline surface="surface" className="shadow-[var(--shadow-1)]">
              <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  Plan Básico
                </p>
                <p className="mt-3 text-[16px] text-[var(--text-tertiary)] line-through">Antes $7/mes</p>
                <p className="mt-1 text-[48px] font-bold leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
                  $4<span className="text-[16px] font-medium text-[var(--text-secondary)]">/mes</span>
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {beneficiosBasico.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[16px] text-[var(--text-primary)]">
                      <CheckCustom />
                      <span>{b.texto}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <CtaButton href={ctaHref} fullMobile>
                    ¡SÍ! QUIERO ESTA OPCIÓN
                  </CtaButton>
                </div>
              </div>
            </Hairline>
          </motion.div>

          {/* PLAN PREMIUM — destacado, borde+glow, precio ancla pedido explícito */}
          <motion.div variants={item}>
            <div className="glow-despues overflow-hidden rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-[var(--surface)]">
              <p className="bg-[var(--accent)] py-2 text-center text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--bg)]">
                Más vendido
              </p>
              <img
                src={mockupPremium}
                alt="Calofit AI Premium — app + bonos incluidos"
                width={640}
                height={360}
                loading="lazy"
                className="w-full object-contain"
              />
              <div className="p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  Plan Premium — oferta imbatible · Por tiempo limitado
                </p>
                <p className="mt-3 text-[16px] font-semibold text-[var(--urgencia)] line-through">
                  Antes: $27 USD
                </p>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  Ahora{fechaHoy ? `, ${fechaHoy}` : ''}
                </p>
                <p className="mt-1 text-[48px] font-bold leading-none text-[var(--accent-2)] [font-family:var(--font-display)]">
                  $7 USD
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Descuento especial solo por hoy', 'Paga en tu moneda local', '¡Acceso inmediato!'].map((b) => (
                    <span
                      key={b}
                      className="rounded-[var(--radius-button)] bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-3 py-1 text-[12px] font-semibold text-[var(--accent-2)]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 flex flex-col gap-3">
                  {beneficiosPremium.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[16px] text-[var(--text-primary)]">
                      <CheckCustom />
                      <span className="flex-1">
                        {b.emoji ? `${b.emoji} ` : ''}
                        {b.texto}
                      </span>
                      {b.valorTachado && (
                        <span className="shrink-0 text-[12px] text-[var(--text-tertiary)] line-through">
                          ({b.valorTachado})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <motion.a
                    whileTap={{ scale: 0.97 }}
                    href={ctaHref}
                    className="flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] px-4 text-center text-[16px] font-bold text-[var(--bg)] [touch-action:manipulation]"
                    style={{
                      background: 'var(--urgencia)',
                      boxShadow:
                        '0 6px 0 color-mix(in oklab, var(--urgencia) 60%, black), 0 14px 28px color-mix(in oklab, var(--urgencia) 40%, transparent)',
                    }}
                  >
                    ¡SI, QUIERO LA OFERTA!
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elementos finales comunes: métodos de pago + garantía */}
        <motion.div variants={item} className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 text-center">
          <img
            src={metodosPago}
            alt="Pagos confiables — Visa, Mastercard, Diners Club, American Express, PayU, PayPal"
            width={480}
            height={100}
            loading="lazy"
            className="w-full max-w-sm object-contain"
          />
          <div className="flex items-center gap-2">
            <img src={selloGarantia} alt="7 días de garantía" width={40} height={40} loading="lazy" className="h-10 w-10 object-contain" />
            <p className="text-[12px] text-[var(--text-secondary)]">
              Pago seguro y respaldado por 7 días de garantía — sin preguntas.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}
