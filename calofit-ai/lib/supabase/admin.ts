import { createClient } from '@supabase/supabase-js';

// Cliente de servicio SOLO para el panel de administración — usa la llave
// secreta (nunca llega al navegador), se salta el RLS a propósito porque el
// dueño necesita ver totales de TODOS los usuarios. Nunca importar esto desde
// un componente de cliente.
export function crearClienteSupabaseAdmin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
