'use client';

// PASO 8/8 — PAYWALL (02B: responde las 7 preguntas). Pantalla única de venta
// — ya NO hay una pantalla previa de "urgencia/valor" (quitada 2026-08-24, el
// valor y los bonos viven AQUÍ para no repetir información). ⚠️ Precio ancla
// $27→$7 pedido explícitamente por el usuario — el mismo patrón de la landing
// (OfertaDosOpciones), ahora también en el punto real de cobro. $27 nunca fue
// el precio real. Ver riesgo documentado en FICHA-MERCADO.md. Tarjeta "Plan
// Más Vendido" sigue en rosa (--ob-rosa, pedido explícito); el CTA principal
// usa verde (--accent-2): sin morados/rosas en el botón de cierre.

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { Objetivo } from './Step2Objetivo';

const FEATURES = [
  'Foto → calorías y macros en segundos',
  'Reconoce comida casera y típica LATAM',
  'Ajuste conversacional ilimitado',
];

const BONOS_PLAN_VENDIDO = [
  'Tu plan 100% personalizado',
  'Plan de alimentación de 21 días',
  '+20 recetas de batidos naturales de calorías y proteínas',
  '+50 recetas altas en proteínas calculadas',
  'Tu planificador de comidas semanales',
  'Tu lista de compras inteligente automatizada',
];

const LINEA_TIEMPO = [
  { momento: 'Hoy', detalle: 'Acceso completo' },
  { momento: 'Día 6', detalle: 'Te avisamos' },
  { momento: 'Día 7', detalle: 'Primer cobro' },
];

const OBJETIVO_LABEL: Record<Objetivo, string> = {
  bajar: 'bajar de peso sin pasar hambre',
  sano: 'comer más sano sin complicarte',
  musculo: 'ganar músculo',
  control: 'llevar el control de tus calorías',
  otro: 'lograr tu meta',
};

export function Step8Paywall({
  nombre,
  objetivo,
  meta,
  ctaHref,
}: {
  nombre: string;
  objetivo: Objetivo;
  meta: number;
  ctaHref: string;
}) {
  const [plan, setPlan] = useState<'basico' | 'vendido'>('vendido');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col"
    >
      <h1 className="text-balance text-2xl font-bold leading-[1.25] [font-family:var(--font-display)]">
        {nombre ? `${nombre}, tu` : 'Tu'} plan está listo
      </h1>
      <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
        Armado para {OBJETIVO_LABEL[objetivo]}, con tu meta de {meta.toLocaleString('es')} kcal/día.
      </p>

      <ul className="mt-6 flex flex-col gap-2">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-3 text-[16px] text-[var(--text-primary)]">
            <span
              aria-hidden="true"
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
            >
              <Check size={13} strokeWidth={2.5} color="var(--accent)" aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Línea de tiempo de cobro — 3 puntos, arriba del Plan Básico (transparencia obligatoria) */}
      <div className="mt-6 flex items-start justify-between gap-2">
        {LINEA_TIEMPO.map((t, i) => (
          <div key={t.momento} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <span
                className={`h-0.5 flex-1 ${i === 0 ? 'bg-transparent' : 'bg-[color-mix(in_oklab,var(--accent)_30%,transparent)]'}`}
              />
              <span
                aria-hidden="true"
                className="flex size-3 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
              />
              <span
                className={`h-0.5 flex-1 ${i === LINEA_TIEMPO.length - 1 ? 'bg-transparent' : 'bg-[color-mix(in_oklab,var(--accent)_30%,transparent)]'}`}
              />
            </div>
            <p className="mt-2 text-[12px] font-bold text-[var(--text-primary)]">{t.momento}</p>
            <p className="text-[12px] text-[var(--text-tertiary)]">{t.detalle}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setPlan('basico')}
          className={`relative rounded-[var(--radius-card)] border p-4 pt-6 text-left [touch-action:manipulation] ${
            plan === 'basico'
              ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)]'
              : 'border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] bg-[var(--surface)]'
          }`}
        >
          <span
            aria-hidden="true"
            className="absolute left-4 top-0 flex size-6 -translate-y-1/2 items-center justify-center rounded-[8px] bg-[var(--accent)] text-[12px] font-bold text-[var(--bg)]"
          >
            1
          </span>
          <span className="text-[16px] font-semibold text-[var(--text-primary)]">Plan Básico</span>
          <p className="mt-1 text-[24px] font-bold leading-none [font-family:var(--font-display)]">
            $4<span className="text-[16px] font-medium text-[var(--text-secondary)]">/mes</span>
          </p>
          <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">
            7 días gratis, luego se cobra $48/año automáticamente en tu moneda local.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setPlan('vendido')}
          className="rounded-[var(--radius-card)] border-2 p-4 text-left [touch-action:manipulation]"
          style={{
            borderColor: plan === 'vendido' ? 'var(--ob-rosa)' : 'color-mix(in oklab, var(--text-tertiary) 25%, transparent)',
            background: plan === 'vendido' ? 'color-mix(in oklab, var(--ob-rosa) 6%, transparent)' : 'var(--surface)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[16px] font-semibold text-[var(--text-primary)]">Plan Más Vendido</span>
            <span
              className="rounded-[var(--radius-button)] px-2 py-1 text-[12px] font-bold text-white"
              style={{ background: 'var(--ob-rosa)' }}
            >
              MÁS VENDIDO
            </span>
          </div>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-[16px] text-[var(--text-tertiary)] line-through">$27</span>
            <span className="text-[24px] font-bold leading-none [font-family:var(--font-display)]" style={{ color: 'var(--ob-rosa)' }}>
              $7<span className="text-[16px] font-medium text-[var(--text-secondary)]">/mes</span>
            </span>
          </p>
          <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">7 días gratis, luego $7/mes. Cancelas cuando quieras.</p>

          <p className="mt-4 text-[16px] font-bold text-[var(--text-primary)]">🎁 Lo que obtendrás hoy con tu plan:</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {BONOS_PLAN_VENDIDO.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[12px] font-medium text-[var(--text-primary)]">
                <span aria-hidden="true">✅</span>
                {b}
              </li>
            ))}
          </ul>
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src="/landing/sello-garantia.webp"
            alt="7 días de garantía — devolución de dinero"
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 object-contain"
          />
          <p className="text-[12px] text-[var(--text-secondary)]">
            Garantía de 7 días — devolución de dinero, sin preguntas.
          </p>
        </div>
        <img
          src="/landing/oferta-metodos-pago.png"
          alt="Pagos confiables — Visa, Mastercard, Diners Club, American Express, PayU, PayPal"
          width={280}
          height={58}
          loading="lazy"
          className="h-auto w-full max-w-64 object-contain"
        />
      </div>

      <div className="mt-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            window.location.href = ctaHref;
          }}
          className="flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] px-6 text-center text-[16px] font-bold text-white [touch-action:manipulation]"
          style={{
            background: 'var(--accent-2)',
            boxShadow:
              '0 6px 0 color-mix(in oklab, var(--accent-2) 60%, black), 0 14px 28px color-mix(in oklab, var(--accent-2) 40%, transparent)',
          }}
        >
          Empezar mis 7 días gratis y desbloquear todo
        </motion.button>
      </div>
      <a
        href="/"
        className="mt-3 block text-center text-[12px] font-medium text-[var(--text-tertiary)] underline-offset-4 hover:underline"
      >
        Ahora no
      </a>
    </motion.div>
  );
}
