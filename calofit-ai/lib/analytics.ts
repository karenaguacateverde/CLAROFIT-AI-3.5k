'use client';

// Registro de embudo (landing → onboarding → paywall → checkout) para saber
// en qué pantalla exacta se pierde la gente. anon_id agrupa los eventos de
// una misma visita sin necesitar cuenta ni datos personales.

const CLAVE_ANON_ID = 'calofit_anon_id';

function obtenerAnonId(): string {
  let id = sessionStorage.getItem(CLAVE_ANON_ID);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(CLAVE_ANON_ID, id);
  }
  return id;
}

export function registrarEvento(evento: string, metadata?: Record<string, unknown>) {
  try {
    const anonId = obtenerAnonId();
    fetch('/api/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evento, anonId, metadata }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Nunca debe romper la experiencia del usuario.
  }
}
