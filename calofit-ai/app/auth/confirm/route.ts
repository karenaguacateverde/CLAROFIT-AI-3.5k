import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

// Verifica el link mágico por token_hash (NO por "code" de PKCE). Esto evita que el link
// falle cuando se abre en un navegador/app distinto al que lo pidió (ej. la app de Gmail
// abre su propio navegador interno) — que era la causa de tener que pedir el acceso 2 veces.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const destino = searchParams.get('destino') ?? '/app';

  if (token_hash && type) {
    const supabase = await crearClienteSupabaseServidor();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${origin}${destino}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=1`);
}
