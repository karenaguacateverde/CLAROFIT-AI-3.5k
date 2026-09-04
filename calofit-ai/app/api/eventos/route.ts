import { NextResponse } from 'next/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

// Registra eventos de embudo (landing/onboarding/paywall) para saber en qué
// pantalla se pierde la gente. event_log tiene RLS sin políticas (solo
// service_role), así que este endpoint es el único camino de escritura.
export async function POST(request: Request) {
  try {
    const { evento, anonId, metadata } = await request.json();
    if (!evento || typeof evento !== 'string') {
      return NextResponse.json({ error: 'evento requerido' }, { status: 400 });
    }

    const admin = crearClienteSupabaseAdmin();
    await admin.from('event_log').insert({
      evento,
      anon_id: typeof anonId === 'string' ? anonId : null,
      metadata: metadata ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('api/eventos: error registrando evento', e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false });
  }
}
