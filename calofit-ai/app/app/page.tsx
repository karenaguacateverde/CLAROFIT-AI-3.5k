// APP INTERNA — §1 HOY (pantalla principal). Server Component: lee las comidas
// y la meta del usuario ya autenticado directo de Supabase (RLS filtra solo
// lo suyo). Reemplaza los datos de ejemplo — conectado 2026-08-26.

import { Utensils } from 'lucide-react';
import { HoyCliente } from './HoyCliente';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export default async function HoyPage() {
  const supabase = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const inicioHoy = new Date();
  inicioHoy.setHours(0, 0, 0, 0);

  const [{ data: perfil }, { data: comidas }] = await Promise.all([
    supabase.from('profiles').select('nombre, meta_kcal').eq('id', user!.id).single(),
    supabase
      .from('food_logs')
      .select('id, plato, kcal, carbs_g, proteina_g, grasa_g, registrado_en')
      .eq('user_id', user!.id)
      .gte('registrado_en', inicioHoy.toISOString())
      .order('registrado_en', { ascending: false }),
  ]);

  const lista = comidas ?? [];
  const consumidas = lista.reduce((sum, c) => sum + c.kcal, 0);
  const carbs = lista.reduce((sum, c) => sum + c.carbs_g, 0);
  const proteina = lista.reduce((sum, c) => sum + c.proteina_g, 0);
  const grasa = lista.reduce((sum, c) => sum + c.grasa_g, 0);
  const metaKcal = perfil?.meta_kcal ?? 1800;

  const fecha = new Date().toLocaleDateString('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <HoyCliente
      nombre={perfil?.nombre ?? 'ahí'}
      fecha={fecha.charAt(0).toUpperCase() + fecha.slice(1)}
      metaKcal={metaKcal}
      consumidas={consumidas}
      macros={[
        { label: 'Carbs', color: 'var(--macro-carbs)', gramos: carbs, meta: Math.round((metaKcal * 0.5) / 4) },
        { label: 'Proteína', color: 'var(--macro-proteina)', gramos: proteina, meta: Math.round((metaKcal * 0.3) / 4) },
        { label: 'Grasa', color: 'var(--macro-grasa)', gramos: grasa, meta: Math.round((metaKcal * 0.2) / 9) },
      ]}
      comidas={lista.map((c) => ({
        icon: Utensils,
        nombre: c.plato,
        hora: new Date(c.registrado_en).toLocaleTimeString('es', { hour: 'numeric', minute: '2-digit' }),
        kcal: c.kcal,
      }))}
    />
  );
}
