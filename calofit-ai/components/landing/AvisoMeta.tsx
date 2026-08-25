// KIT DE LANDING — AVISO LEGAL META/FACEBOOK (pedido explícito 2026-08-22).
// Franja final, fondo distinto al footer, para el disclaimer estándar que
// piden las políticas de anuncios de Meta cuando la landing recibe tráfico
// de Facebook/Instagram Ads. Server component: sin hooks ni motion.

import { SectionShell } from './ui';

export interface AvisoMetaProps {
  appName: string;
  id?: string;
}

export function AvisoMeta({ appName, id }: AvisoMetaProps) {
  const year = new Date().getFullYear();
  return (
    <SectionShell id={id} tinte="surface" compacta ariaLabel="Avisos legales">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          Descargos de responsabilidad importantes
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--text-tertiary)]">
          Este sitio no es parte del sitio web de Facebook o Meta. Además, este sitio no está
          respaldado por Facebook o Meta de ninguna manera. Facebook es una marca registrada de
          Meta.
        </p>
        <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">
          {year} {appName} | Todos los Derechos Reservados.
        </p>
      </div>
    </SectionShell>
  );
}
