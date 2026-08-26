import { NextResponse } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const destino = searchParams.get('destino') ?? '/app';

  if (code) {
    const supabase = await crearClienteSupabaseServidor();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${destino}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=1`);
}
