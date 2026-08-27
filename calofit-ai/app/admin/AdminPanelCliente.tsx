'use client';

// Panel del dueño — versión "premium": pestañas, gráfica de gasto de IA,
// tooltips en los términos técnicos, tarjetas con profundidad (mismo sistema
// 3D luminoso del resto de la app, no un estilo nuevo inventado).

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  Camera,
  Sparkles,
  DollarSign,
  Activity,
  TrendingUp,
  Info,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Pestana = 'resumen' | 'ventas' | 'usuarios' | 'uso' | 'ia' | 'errores';

const PESTANAS: { id: Pestana; label: string }[] = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'ventas', label: 'Ventas' },
  { id: 'usuarios', label: 'Usuarios' },
  { id: 'uso', label: 'Uso' },
  { id: 'ia', label: 'Costo de IA' },
  { id: 'errores', label: 'Errores' },
];

interface Props {
  avisos: string[];
  totalUsuarios: number;
  usuariosConEscaneo: number;
  totalEscaneos: number;
  promedioKcal: number;
  platoTop: [string, number] | null;
  costoHoy: number;
  costoTotalIA: number;
  llamadasIA: number;
  tasaExitoIA: number | null;
  costoPorDia: { d: string; usd: number }[];
  origenOnboarding: number;
  origenApp: number;
}

export function AdminPanelCliente(props: Props) {
  const [pestana, setPestana] = useState<Pestana>('resumen');

  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <div className="sticky top-0 z-10 border-b border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 pt-6">
          <h1 className="text-2xl font-bold leading-[1.2] [font-family:var(--font-display)]">
            Panel del dueño
          </h1>
          <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">Solo tú puedes ver esto.</p>

          <div className="mt-4 flex gap-1 overflow-x-auto pb-3 [scrollbar-width:none]">
            {PESTANAS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPestana(p.id)}
                className={`shrink-0 rounded-[var(--radius-button)] px-4 py-2 text-[12px] font-semibold [touch-action:manipulation] ${
                  pestana === p.id
                    ? 'bg-[var(--accent)] text-white shadow-[0_4px_16px_color-mix(in_oklab,var(--accent)_35%,transparent)]'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-1)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={pestana}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {pestana === 'resumen' && <VistaResumen {...props} />}
            {pestana === 'ventas' && <VistaVentas />}
            {pestana === 'usuarios' && <VistaUsuarios {...props} />}
            {pestana === 'uso' && <VistaUso {...props} />}
            {pestana === 'ia' && <VistaIA {...props} />}
            {pestana === 'errores' && <VistaErrores />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VistaResumen(props: Props) {
  return (
    <div className="flex flex-col gap-5">
      <Aviso avisos={props.avisos} />
      <div className="grid grid-cols-2 gap-3">
        <Metrica
          icon={Users}
          label="Usuarios"
          valor={props.totalUsuarios}
          tooltip="Cuántas personas se registraron en total, tengan o no un escaneo hecho."
        />
        <Metrica
          icon={Camera}
          label="Escaneos"
          valor={props.totalEscaneos}
          tooltip="Total de platos analizados por la IA, sumando todos los usuarios."
        />
        <Metrica
          icon={Sparkles}
          label="Costo IA (hoy)"
          valor={`$${props.costoHoy.toFixed(3)}`}
          tooltip="Estimado de lo que ha costado usar Gemini hoy. No es la factura exacta de Google todavía."
        />
        <Metrica
          icon={DollarSign}
          label="Ingresos (mes)"
          valor="No medido"
          chico
          tooltip="Se activa cuando conectes Hotmart — por ahora no hay pagos reales que contar."
        />
      </div>
      <GraficaCostoIA costoPorDia={props.costoPorDia} />
    </div>
  );
}

function VistaVentas() {
  return (
    <SeccionVacia
      icon={DollarSign}
      titulo="Ventas y ganancia real"
      texto="No medido todavía — se llena solo cuando conectes Hotmart: ingresos, cancelaciones, MRR (ingreso mensual recurrente), y la ganancia real después de restar Hotmart, IA, impuestos e infraestructura."
    />
  );
}

function VistaUsuarios(props: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <Metrica
          icon={Users}
          label="Registrados"
          valor={props.totalUsuarios}
          tooltip="Cuántas cuentas existen en total."
        />
        <Metrica
          icon={Camera}
          label="Con 1+ escaneo"
          valor={props.usuariosConEscaneo}
          tooltip="Cuántos de los registrados llegaron a usar la función principal (escanear un plato) — mide si la app 'engancha' de verdad."
        />
      </div>
      <TarjetaInfo
        titulo="Retención D1 / D7 / D30"
        texto="No medido todavía — hace falta más historial de días para calcular cuánta gente regresa al día siguiente, a la semana y al mes."
        tooltip="Retención D1/D7/D30 = de la gente que se registró un día dado, qué % volvió a usar la app 1, 7 y 30 días después. Es la métrica que más predice si un negocio de suscripción sobrevive."
      />
    </div>
  );
}

function VistaUso(props: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <Metrica icon={Camera} label="Total de escaneos" valor={props.totalEscaneos} />
        <Metrica icon={TrendingUp} label="Promedio kcal/plato" valor={props.promedioKcal} />
      </div>
      {props.platoTop && (
        <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
            Plato más registrado
          </p>
          <p className="mt-1 text-[24px] font-bold [font-family:var(--font-display)]">
            {props.platoTop[0]}
          </p>
          <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">
            {props.platoTop[1]} {props.platoTop[1] === 1 ? 'vez' : 'veces'}
          </p>
        </div>
      )}
      <TarjetaInfo
        titulo="Embudo del onboarding"
        texto="No medido todavía — falta registrar cada paso del onboarding (evento por evento) para saber en cuál pantalla se va la gente antes de pagar."
      />
    </div>
  );
}

function VistaIA(props: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <Metrica icon={Sparkles} label="Gastado hoy" valor={`$${props.costoHoy.toFixed(3)}`} />
        <Metrica icon={DollarSign} label="Gastado en total" valor={`$${props.costoTotalIA.toFixed(3)}`} />
      </div>
      <GraficaCostoIA costoPorDia={props.costoPorDia} />
      <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">Detalle</p>
        <div className="mt-3 flex flex-col gap-2 text-[16px] text-[var(--text-secondary)]">
          <FilaDetalle label="Llamadas totales" valor={props.llamadasIA} />
          <FilaDetalle
            label="Tasa de éxito"
            valor={props.tasaExitoIA !== null ? `${props.tasaExitoIA}%` : 'Sin datos'}
          />
          <FilaDetalle label="Desde el onboarding" valor={props.origenOnboarding} />
          <FilaDetalle label="Desde la app" valor={props.origenApp} />
        </div>
        <p className="mt-4 flex items-start gap-2 text-[12px] text-[var(--text-tertiary)]">
          <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          Costo estimado en $0.002 por llamada a Gemini — es una referencia, no la factura exacta de
          Google. Se puede afinar más adelante con el uso real.
        </p>
      </div>
    </div>
  );
}

function VistaErrores() {
  return (
    <SeccionVacia
      icon={Activity}
      titulo="Errores"
      texto="No medido todavía — falta conectar un servicio de monitoreo de errores (como Sentry) para ver aquí un resumen de qué está fallando en la app."
    />
  );
}

function Aviso({ avisos }: { avisos: string[] }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-1)] ${
        avisos.length
          ? 'bg-[color-mix(in_oklab,var(--urgencia)_10%,transparent)]'
          : 'bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)]'
      }`}
    >
      {avisos.length ? (
        <AlertTriangle size={20} color="var(--urgencia)" aria-hidden="true" className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={20} color="var(--accent-2)" aria-hidden="true" className="mt-0.5 shrink-0" />
      )}
      <div>
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">
          {avisos.length ? 'Hay algo que revisar' : 'Todo en orden este mes'}
        </p>
        {avisos.length ? (
          <ul className="mt-1 flex flex-col gap-1 text-[12px] text-[var(--text-secondary)]">
            {avisos.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
            Todavía no hay suficiente historial para detectar problemas — normal en esta etapa.
          </p>
        )}
      </div>
    </div>
  );
}

function GraficaCostoIA({ costoPorDia }: { costoPorDia: { d: string; usd: number }[] }) {
  const max = Math.max(0.01, ...costoPorDia.map((d) => d.usd));
  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]">
      <div className="flex items-center gap-1.5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
          Costo de IA — últimos 7 días
        </p>
        <TooltipInfo texto="Suma del costo estimado de cada llamada a Gemini, agrupado por día." />
      </div>
      <div className="mt-5 flex h-28 items-end justify-between gap-2">
        {costoPorDia.map((d, i) => {
          const alturaPct = d.usd > 0 ? Math.max(6, Math.round((d.usd / max) * 100)) : 3;
          return (
            <div key={`${d.d}-${i}`} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-20 w-full items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${alturaPct}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-[8px]"
                  style={{ background: 'var(--accent)' }}
                />
              </div>
              <p className="text-[12px] font-medium text-[var(--text-tertiary)]">{d.d}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Metrica({
  icon: Icono,
  label,
  valor,
  tooltip,
  chico,
}: {
  icon: LucideIcon;
  label: string;
  valor: string | number;
  tooltip?: string;
  chico?: boolean;
}) {
  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-2)]">
      <div className="flex items-center justify-between">
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
        >
          <Icono size={16} color="var(--accent)" aria-hidden="true" />
        </span>
        {tooltip && <TooltipInfo texto={tooltip} />}
      </div>
      <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
        {label}
      </p>
      <p
        className={`mt-1 font-bold leading-none tabular-nums [font-family:var(--font-display)] ${
          chico ? 'text-[16px] text-[var(--text-tertiary)]' : 'text-[24px] text-[var(--text-primary)]'
        }`}
      >
        {valor}
      </p>
    </div>
  );
}

function TarjetaInfo({ titulo, texto, tooltip }: { titulo: string; texto: string; tooltip?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
      <div className="flex items-center gap-1.5">
        <p className="text-[16px] font-semibold text-[var(--text-primary)]">{titulo}</p>
        {tooltip && <TooltipInfo texto={tooltip} />}
      </div>
      <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">{texto}</p>
    </div>
  );
}

function SeccionVacia({ icon: Icono, titulo, texto }: { icon: LucideIcon; titulo: string; texto: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-[var(--surface)] px-6 py-12 text-center shadow-[var(--shadow-2)]">
      <span
        aria-hidden="true"
        className="flex size-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]"
      >
        <Icono size={26} color="var(--accent)" aria-hidden="true" />
      </span>
      <p className="text-[16px] font-semibold text-[var(--text-primary)]">{titulo}</p>
      <p className="max-w-sm text-[12px] text-[var(--text-tertiary)]">{texto}</p>
    </div>
  );
}

function FilaDetalle({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="flex items-center justify-between border-t border-[color-mix(in_oklab,var(--text-tertiary)_12%,transparent)] pt-2 first:border-t-0 first:pt-0">
      <span className="text-[12px] text-[var(--text-tertiary)]">{label}</span>
      <span className="text-[16px] font-semibold tabular-nums text-[var(--text-primary)]">{valor}</span>
    </div>
  );
}

function TooltipInfo({ texto }: { texto: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        onBlur={() => setAbierto(false)}
        aria-label="Qué significa esto"
        className="flex size-4 items-center justify-center rounded-full text-[var(--text-tertiary)] [touch-action:manipulation]"
      >
        <Info size={14} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-6 z-20 w-56 -translate-x-1/2 rounded-[12px] bg-[var(--text-primary)] p-3 text-[12px] leading-snug text-[var(--bg)] shadow-[var(--shadow-2)]"
          >
            {texto}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
