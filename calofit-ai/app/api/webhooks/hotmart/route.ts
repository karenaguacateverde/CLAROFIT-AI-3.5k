// WEBHOOK DE HOTMART — el endpoint de pagos más atacado de la app. Si esta
// validación falla o falla abierta, cualquiera puede autootorgarse acceso Pro
// gratis. 4 defensas en orden, todas antes de tocar la base de datos:
// autenticidad (hottok) -> frescura (anti-replay) -> idempotencia (dedupe) ->
// autorización (máquina de estados). Ver docs/sistema/18-VENTA-HOTMART.md.
//
// ⚠️ Nombres de eventos y forma exacta del payload SIN VERIFICAR contra una
// compra real todavía (placeholder documentado en 18) — verificar con la
// primera compra/prueba real antes de confiar ciegamente en la métrica de
// conversión trial→pago.

import { NextResponse } from 'next/server';
import { verifyHotmart } from '@/lib/hotmart-verify';
import { statusForEvent, canTransition, type PlanStatus, PLAN_CHANGE_EVENT } from '@/lib/membership-fsm';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const REPLAY_WINDOW_MS = 5 * 60 * 1000;

async function registrarLog(
  admin: ReturnType<typeof crearClienteSupabaseAdmin>,
  eventId: string | null,
  type: string | null,
  result: 'applied' | 'duplicate' | 'illegal' | 'unauthorized' | 'error'
) {
  await admin.from('webhook_log').insert({ event_id: eventId, type, result });
}

export async function POST(req: Request) {
  const admin = crearClienteSupabaseAdmin();

  // 1. Raw body — bytes exactos, se lee ANTES de parsear.
  const rawBody = await req.text();

  // 2. Autenticidad — hottok en tiempo constante. Hotmart lo manda por header o
  //    dentro del body según la versión de la integración; se aceptan ambos.
  let payloadPreliminar: any = null;
  try {
    payloadPreliminar = JSON.parse(rawBody);
  } catch {
    // se valida abajo tras confirmar el hottok
  }
  const hottok = req.headers.get('x-hotmart-hottok') ?? payloadPreliminar?.hottok ?? undefined;

  if (!verifyHotmart(hottok)) {
    await registrarLog(admin, null, null, 'unauthorized');
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!payloadPreliminar) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
  const payload = payloadPreliminar;

  // 3. Frescura — anti-replay.
  const ts: number | undefined = payload.creation_date ?? payload.data?.purchase?.approved_date;
  if (ts && Date.now() - Number(ts) > REPLAY_WINDOW_MS) {
    return NextResponse.json({ error: 'stale' }, { status: 400 });
  }

  const event: string = payload.event;
  const eventId: string =
    payload.id ??
    payload.event_id ??
    payload.data?.purchase?.transaction ??
    `${event}:${payload.data?.buyer?.email}:${ts ?? ''}`;
  const email: string | undefined = payload.data?.buyer?.email ?? payload.email;
  const nombre: string = payload.data?.buyer?.name ?? '';
  const subscriberCode: string | undefined = payload.data?.subscription?.subscriber?.code;

  if (event === PLAN_CHANGE_EVENT) {
    // Cambio de plan mensual<->anual: no cambia el estado, solo se registra por ahora.
    // TODO: actualizar el plan/límites reales cuando exista diferenciación de features por plan.
    await registrarLog(admin, eventId, event, 'applied');
    return NextResponse.json({ received: true });
  }

  const newStatus = statusForEvent(event);
  if (!newStatus) {
    return NextResponse.json({ received: true, ignored: event });
  }

  if (!email) {
    await registrarLog(admin, eventId, event, 'error');
    return NextResponse.json({ error: 'sin correo en el payload' }, { status: 400 });
  }

  // 4. Idempotencia — Hotmart reenvía el mismo evento si el endpoint tarda o falla.
  const { error: dedupeError } = await admin
    .from('processed_events')
    .insert({ event_id: eventId, event_type: event });

  if (dedupeError) {
    // Violación de PK = ya se procesó este evento antes.
    await registrarLog(admin, eventId, event, 'duplicate');
    return NextResponse.json({ received: true, duplicate: true });
  }

  // 5. Buscar o crear la cuenta (modelo onboarding-first: puede no existir todavía).
  let userId: string | null = null;
  const { data: userIdExistente } = await admin.rpc('buscar_usuario_id_por_email', { p_email: email });
  userId = userIdExistente ?? null;

  if (!userId) {
    const { data: nuevoUsuario, error: crearError } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (crearError || !nuevoUsuario?.user) {
      // Carrera entre varios eventos casi simultáneos con el mismo correo (típico del botón
      // "Enviar test" de Hotmart, que dispara 6+ eventos a la vez): reintenta con pequeñas
      // esperas mientras el que sí ganó la carrera termina de confirmar su transacción.
      let reintento: string | null = null;
      for (let intento = 0; intento < 4 && !reintento; intento++) {
        await new Promise((r) => setTimeout(r, 300));
        const { data } = await admin.rpc('buscar_usuario_id_por_email', { p_email: email });
        reintento = data ?? null;
      }
      if (!reintento) {
        await registrarLog(admin, eventId, event, 'error');
        return NextResponse.json({ error: 'no se pudo crear la cuenta' }, { status: 500 });
      }
      userId = reintento;
    } else {
      userId = nuevoUsuario.user.id;
    }
  }

  // 6. Autorización — no dejar que un evento viejo reactive un reembolso/chargeback.
  const { data: perfilActual } = await admin
    .from('profiles')
    .select('plan_status, nombre')
    .eq('id', userId)
    .single();

  const estadoActual = (perfilActual?.plan_status as PlanStatus) ?? null;
  if (!canTransition(estadoActual, newStatus)) {
    await registrarLog(admin, eventId, event, 'illegal');
    return NextResponse.json({ received: true, ignored: 'transición no permitida' });
  }

  const cambios: Record<string, unknown> = { plan_status: newStatus, subscriber_code: subscriberCode };
  if (newStatus === 'trialing') cambios.trial_ends_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  if (newStatus === 'active' && estadoActual !== 'active') cambios.first_paid_at = new Date();
  if (!perfilActual?.nombre && nombre) cambios.nombre = nombre;

  await admin.from('profiles').update(cambios).eq('id', userId);

  await registrarLog(admin, eventId, event, 'applied');
  return NextResponse.json({ received: true });
}
