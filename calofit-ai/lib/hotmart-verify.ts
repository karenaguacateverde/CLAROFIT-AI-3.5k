import crypto from 'node:crypto';

// Fail-secure: si falta el secreto, el arranque revienta — nunca corre con un valor de juguete.
const HOTTOK = process.env.HOTMART_HOTTOK;

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Verifica el hottok en tiempo constante (evita timing attacks). */
export function verifyHotmart(hottok?: string): boolean {
  if (!HOTTOK) return false; // sin secreto configurado, nunca se acepta nada
  if (!hottok) return false;
  return timingSafeEqualStr(hottok, HOTTOK);
}
