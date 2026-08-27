// Borrado de cuenta real — exigido por el derecho de supresión del RGPD
// (art. 17) y prometido en la Política de Privacidad. Solo borra la cuenta
// de QUIEN hace la petición (verificado por su propia sesión), nunca recibe
// un userId del cliente. profiles y food_logs caen en cascada por FK;
// ai_calls queda con user_id en null (no es dato personal identificable).

import { NextResponse } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST() {
  const supabaseSesion = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabaseSesion.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'No hay sesión activa.' }, { status: 401 });
  }

  const admin = crearClienteSupabaseAdmin();
  const { error } = await admin.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json({ error: 'No se pudo eliminar la cuenta. Intenta de nuevo.' }, { status: 500 });
  }

  await supabaseSesion.auth.signOut();
  return NextResponse.json({ ok: true });
}
