'use client';

// ONBOARDING — orquesta los 8 pasos (docs/sistema/02B). 2026-08-24: se quitó
// la pantalla intermedia de "urgencia y valor" (pedido explícito) — Racha
// pasa directo al Paywall, que ahora integra su propio bloque de valor/bonos
// para no repetir información. Estado en memoria (sin cuenta todavía —
// Modelo 2: preview anónimo → paywall → login/auth, ESTADO.md → Decisiones
// técnicas). El botón final del paywall apunta a /login, que se construye en
// la siguiente fase de la secuencia maestra (todavía no existe).

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { RecompensaToast } from '@/components/onboarding/RecompensaToast';
import { Step1Nombre } from '@/components/onboarding/Step1Nombre';
import { Step2Objetivo, type Objetivo } from '@/components/onboarding/Step2Objetivo';
import { Step3Dolor, type Dolor } from '@/components/onboarding/Step3Dolor';
import { Step4Reconocimiento } from '@/components/onboarding/Step4Reconocimiento';
import { Step5Escaneo } from '@/components/onboarding/Step5Escaneo';
import { Step6Resultado } from '@/components/onboarding/Step6Resultado';
import { Step7Racha } from '@/components/onboarding/Step7Racha';
import { Step8Paywall } from '@/components/onboarding/Step8Paywall';

const TOTAL_PASOS = 8;

export default function OnboardingPage() {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null);
  const [objetivoOtro, setObjetivoOtro] = useState('');
  const [dolor, setDolor] = useState<Dolor | null>(null);
  const [dolorOtro, setDolorOtro] = useState('');
  const [meta, setMeta] = useState<number | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [recompensaTrigger, setRecompensaTrigger] = useState(0);

  const avanzar = () => {
    setPaso((p) => Math.min(p + 1, TOTAL_PASOS));
    setPuntos((p) => p + 10);
    setRecompensaTrigger((t) => t + 1);
  };
  const retroceder = () => setPaso((p) => Math.max(p - 1, 1));

  return (
    <OnboardingShell pasoActual={paso} totalPasos={TOTAL_PASOS} onAtras={paso > 1 ? retroceder : undefined}>
      <RecompensaToast trigger={recompensaTrigger} puntos={puntos} />
      <AnimatePresence mode="wait">
        {paso === 1 && (
          <Step1Nombre
            key="1"
            valorInicial={nombre}
            onContinuar={(v) => {
              setNombre(v);
              avanzar();
            }}
          />
        )}
        {paso === 2 && (
          <Step2Objetivo
            key="2"
            nombre={nombre}
            valorInicial={objetivo}
            onOtroTexto={setObjetivoOtro}
            onContinuar={(v) => {
              setObjetivo(v);
              avanzar();
            }}
          />
        )}
        {paso === 3 && (
          <Step3Dolor
            key="3"
            valorInicial={dolor}
            onOtroTexto={setDolorOtro}
            onContinuar={(v) => {
              setDolor(v);
              avanzar();
            }}
          />
        )}
        {paso === 4 && dolor && <Step4Reconocimiento key="4" dolor={dolor} onContinuar={avanzar} />}
        {paso === 5 && <Step5Escaneo key="5" onContinuar={avanzar} />}
        {paso === 6 && objetivo && (
          <Step6Resultado
            key="6"
            nombre={nombre}
            objetivo={objetivo}
            metaInicial={meta}
            onContinuar={(v) => {
              setMeta(v);
              avanzar();
            }}
          />
        )}
        {paso === 7 && <Step7Racha key="7" nombre={nombre} onContinuar={avanzar} />}
        {paso === 8 && objetivo && meta && (
          <Step8Paywall key="8" nombre={nombre} objetivo={objetivo} meta={meta} />
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}
