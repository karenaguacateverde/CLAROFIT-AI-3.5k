'use client';

// Aviso de cookies — obligatorio antes de activar el píxel de Meta (RGPD/
// ePrivacy: rechazar debe costar lo mismo que aceptar, mismo tamaño y
// prominencia en los dos botones). Coherente con la Política de Privacidad
// (sección 8): nada no esencial se carga antes de esta decisión.

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MetaPixel } from './MetaPixel';

const CLAVE = 'calofit_consentimiento_cookies_v1';

export function CookieBanner() {
  const [consentimiento, setConsentimiento] = useState<'pendiente' | 'aceptado' | 'rechazado'>('pendiente');

  useEffect(() => {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === 'aceptado' || guardado === 'rechazado') {
      setConsentimiento(guardado);
    } else {
      setConsentimiento('pendiente');
    }
  }, []);

  const elegir = (valor: 'aceptado' | 'rechazado') => {
    localStorage.setItem(CLAVE, valor);
    setConsentimiento(valor);
  };

  return (
    <>
      <MetaPixel consentido={consentimiento === 'aceptado'} />
      <AnimatePresence>
        {consentimiento === 'pendiente' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[var(--surface)] px-5 py-4 shadow-[var(--shadow-2)]"
          >
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-center text-[12px] text-[var(--text-secondary)] sm:text-left">
                Usamos cookies para medir el rendimiento de nuestros anuncios. Puedes aceptarlas o
                rechazarlas —{' '}
                <a href="/privacidad" className="underline">
                  más info
                </a>
                .
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => elegir('rechazado')}
                  className="h-11 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] px-5 text-[12px] font-semibold text-[var(--text-primary)] [touch-action:manipulation]"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => elegir('aceptado')}
                  className="h-11 rounded-[var(--radius-button)] bg-[var(--accent)] px-5 text-[12px] font-semibold text-white [touch-action:manipulation]"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
