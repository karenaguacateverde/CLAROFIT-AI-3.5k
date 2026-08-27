// Máquina de estados de la membresía — evita el bug clásico: un evento viejo
// reentregado por Hotmart "resucitando" a alguien que ya reembolsó.
// ⚠️ Nombres de eventos VERIFICADOS contra el panel real de Hotmart (Herramientas →
// Webhook) antes de confiar en ellos en producción — el catálogo varía por cuenta.

export type PlanStatus =
  | 'free'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'refunded'
  | 'chargeback';

// PLACEHOLDER — verificar con una compra sandbox con trial: puede llegar como
// PURCHASE_APPROVED con valor 0, o como un evento/flag propio de "started".
const TRIAL_START_EVENT = 'SUBSCRIPTION_TRIAL_START';

export const PLAN_CHANGE_EVENT = 'SWITCH_PLAN';

const EVENT_TO_STATUS: Record<string, PlanStatus> = {
  [TRIAL_START_EVENT]: 'trialing',
  PURCHASE_APPROVED: 'active',
  PURCHASE_COMPLETE: 'active',
  PURCHASE_DELAYED: 'past_due',
  SUBSCRIPTION_CANCELLATION: 'cancelled',
  PURCHASE_EXPIRED: 'expired',
  PURCHASE_REFUNDED: 'refunded',
  PURCHASE_CHARGEBACK: 'chargeback',
};

const TERMINAL_NEGATIVE: PlanStatus[] = ['refunded', 'chargeback'];
const FULL_ACCESS: PlanStatus[] = ['trialing', 'active'];

export function statusForEvent(event: string): PlanStatus | null {
  return EVENT_TO_STATUS[event] ?? null;
}

/** ¿Es legal pasar de `from` a `to`? Bloquea reactivar un refund/chargeback con un evento viejo. */
export function canTransition(from: PlanStatus | null, to: PlanStatus): boolean {
  if (from === null) return true;
  if (TERMINAL_NEGATIVE.includes(from) && (to === 'active' || to === 'trialing')) return false;
  return true;
}

export function hasFullAccess(
  status: PlanStatus,
  now: Date,
  accessUntil?: Date | null,
  graceEndsAt?: Date | null
): boolean {
  if (FULL_ACCESS.includes(status)) return true;
  if (status === 'cancelled') return !!accessUntil && now < accessUntil;
  if (status === 'past_due') return !!graceEndsAt && now < graceEndsAt;
  return false;
}
