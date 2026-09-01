'use client';

// Píxel de Meta — SOLO se activa después de que la persona acepta el aviso
// de cookies (banner de abajo). Nunca se carga antes del consentimiento
// (obligatorio en RGPD/ePrivacy) y coherente con lo que promete Privacidad.

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PIXEL_ID = '1375286007511867';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function cargarPixel() {
  if (window.fbq) return;
  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
}

export function MetaPixel({ consentido }: { consentido: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!consentido) return;
    cargarPixel();
  }, [consentido]);

  useEffect(() => {
    if (!consentido || !window.fbq) return;
    window.fbq('track', 'PageView');
  }, [pathname, consentido]);

  return null;
}

/** Dispara un evento estándar de Meta (ej. al llegar al paywall o iniciar el checkout). */
export function trackMeta(evento: string, datos?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', evento, datos);
  }
}
