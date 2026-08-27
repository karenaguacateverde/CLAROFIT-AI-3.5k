// PANEL DE ADMINISTRACIÓN — solo para el dueño (correo verificado en el
// servidor, no solo una ruta escondida). Los datos se leen con la llave de
// servicio de Supabase (nunca en el navegador) porque saltan el RLS a
// propósito para ver totales de todos los usuarios — ver lib/supabase/admin.ts.
// Secciones sin datos reales todavía (ventas, LTV/CAC, errores) se muestran
// como "no medido", nunca inventadas — se llenan solas al conectar Hotmart.

import { notFound, redirect } from 'next/navigation';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';
import { AdminPanelCliente } from './AdminPanelCliente';

const ADMIN_EMAIL = 'luciahouse483@gmail.com';
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default async function AdminPage() {
  const supabaseSesion = await crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabaseSesion.auth.getUser();

  if (!user) redirect('/login');
  if (user.email !== ADMIN_EMAIL) notFound();

  const admin = crearClienteSupabaseAdmin();

  const [{ count: totalUsuarios }, { data: escaneos }, { data: llamadasIA }] = await Promise.all([
    admin.from('profiles').select('id', { count: 'exact', head: true }),
    admin.from('food_logs').select('plato, kcal, user_id, registrado_en'),
    admin.from('ai_calls').select('exito, costo_estimado_usd, origen, created_at'),
  ]);

  const listaEscaneos = escaneos ?? [];
  const usuariosConEscaneo = new Set(listaEscaneos.map((e) => e.user_id)).size;
  const promedioKcal = listaEscaneos.length
    ? Math.round(listaEscaneos.reduce((s, e) => s + e.kcal, 0) / listaEscaneos.length)
    : 0;

  const conteoPlatos = new Map<string, number>();
  listaEscaneos.forEach((e) => conteoPlatos.set(e.plato, (conteoPlatos.get(e.plato) ?? 0) + 1));
  const platoTop = [...conteoPlatos.entries()].sort((a, b) => b[1] - a[1])[0] ?? null;

  const listaIA = llamadasIA ?? [];
  const costoTotalIA = listaIA.reduce((s, c) => s + Number(c.costo_estimado_usd), 0);
  const llamadasExitosas = listaIA.filter((c) => c.exito).length;
  const tasaExitoIA = listaIA.length ? Math.round((llamadasExitosas / listaIA.length) * 100) : null;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const costoHoy = listaIA
    .filter((c) => new Date(c.created_at) >= hoy)
    .reduce((s, c) => s + Number(c.costo_estimado_usd), 0);

  // Últimos 7 días para la gráfica (hoy incluido, más viejo primero)
  const costoPorDia = Array.from({ length: 7 }, (_, i) => {
    const inicio = new Date(hoy);
    inicio.setDate(hoy.getDate() - (6 - i));
    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + 1);
    const total = listaIA
      .filter((c) => {
        const fecha = new Date(c.created_at);
        return fecha >= inicio && fecha < fin;
      })
      .reduce((s, c) => s + Number(c.costo_estimado_usd), 0);
    return { d: DIAS_SEMANA[(inicio.getDay() + 6) % 7], usd: total };
  });

  const avisos: string[] = [];
  if (tasaExitoIA !== null && tasaExitoIA < 80) {
    avisos.push(
      `El ${100 - tasaExitoIA}% de los escaneos de IA están fallando — revisa la clave de Gemini o el límite de uso.`
    );
  }

  return (
    <AdminPanelCliente
      avisos={avisos}
      totalUsuarios={totalUsuarios ?? 0}
      usuariosConEscaneo={usuariosConEscaneo}
      totalEscaneos={listaEscaneos.length}
      promedioKcal={promedioKcal}
      platoTop={platoTop}
      costoHoy={costoHoy}
      costoTotalIA={costoTotalIA}
      llamadasIA={listaIA.length}
      tasaExitoIA={tasaExitoIA}
      costoPorDia={costoPorDia}
      origenOnboarding={listaIA.filter((c) => c.origen === 'onboarding').length}
      origenApp={listaIA.filter((c) => c.origen === 'app').length}
    />
  );
}
