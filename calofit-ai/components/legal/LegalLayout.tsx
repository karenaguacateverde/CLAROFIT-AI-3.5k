import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function LegalLayout({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  actualizado: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--text-tertiary)]"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Volver a Calofit AI
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-[1.2] [font-family:var(--font-display)]">
          {titulo}
        </h1>
        <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">Última actualización: {actualizado}</p>

        <div className="legal-prose mt-8 flex flex-col gap-5 text-[16px] leading-relaxed text-[var(--text-secondary)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSeccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">{titulo}</h2>
      <div className="mt-2 flex flex-col gap-3">{children}</div>
    </section>
  );
}

/** Resalta una frase clave (garantías, plazos, derechos) — uso puntual, no decorativo. */
export function Resaltado({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[var(--accent)]">{children}</strong>;
}
