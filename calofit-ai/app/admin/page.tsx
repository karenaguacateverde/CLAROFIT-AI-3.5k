// PANEL DE ADMINISTRACIÓN — solo para el dueño (correo verificado en el
// servidor, no solo una ruta escondida). Los datos se leen con la llave de
// servicio de Supabase (nunca en el navegador) porque saltan el RLS a
// propósito para ver totales de todos los usuarios — ver lib/supabase/admin.ts.
// Secciones sin datos reales todavía (ventas, LTV/CAC, errores) se muestran
// como "no medido", nunca inventadas — se llenan solas al conectar Hotmart.

import { notFound, redirect } from 'next/navigation';
import { AlertTriangle, CheckCircle2, Users, Camera, Sparkles, DollarSign, Activity } from 'lucide-react';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

const ADMIN_EMAIL = 'luciahouse483@gmail.com';

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
  const platoTop = [...conteoPlatos.entries()].sort((a, b) => b[1] - a[1])[0];

  const listaIA = llamadasIA ?? [];
  const costoTotalIA = listaIA.reduce((s, c) => s + Number(c.costo_estimado_usd), 0);
  const llamadasExitosas = listaIA.filter((c) => c.exito).length;
  const tasaExitoIA = listaIA.length ? Math.round((llamadasExitosas / listaIA.length) * 100) : null;

  const hoyISO = new Date();
  hoyISO.setHours(0, 0, 0, 0);
  const costoHoy = listaIA
    .filter((c) => new Date(c.created_at) >= hoyISO)
    .reduce((s, c) => s + Number(c.costo_estimado_usd), 0);

  const avisos: string[] = [];
  if (tasaExitoIA !== null && tasaExitoIA < 80) {
    avisos.push(
      `El ${100 - tasaExitoIA}% de los escaneos de IA están fallando — revisa la clave de Gemini o el límite de uso.`
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="text-2xl font-bold leading-[1.2] [font-family:var(--font-display)]">
        Panel del dueño
      </h1>
      <p className="mt-1 text-[16px] text-[var(--text-secondary)]">Solo tú puedes ver esto.</p>

      <div
        className={`mt-6 flex items-start gap-3 rounded-[var(--radius-card)] p-4 ${
          avisos.length
            ? 'bg-[color-mix(in_oklab,var(--urgencia)_10%,transparent)]'
            : 'bg-[color-mix(in_oklab,var(--accent-2)_10%,transparent)]'
        }`}
      >
        {avisos.length ? (
          <AlertTriangle size={20} color="var(--urgencia)" aria-hidden="true" className="mt-0.5 shrink-0" />
        ) : (
          <CheckCircle2 size={20} color="var(--accent-2)" aria-hidden="true" className="mt-0.5 shrink-0" />
        )}
        <div>
          <p className="text-[16px] font-semibold text-[var(--text-primary)]">
            {avisos.length ? 'Hay algo que revisar' : 'Todo en orden este mes'}
          </p>
          {avisos.length ? (
            <ul className="mt-1 flex flex-col gap-1 text-[16px] text-[var(--text-secondary)]">
              {avisos.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-[16px] text-[var(--text-secondary)]">
              Todavía no hay suficiente historial para detectar problemas — normal en esta etapa.
            </p>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <DollarSign size={18} color="var(--accent)" aria-hidden="true" />
          Ventas y ganancia real
        </h2>
        <div className="mt-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
          <p className="text-[16px] text-[var(--text-tertiary)]">
            No medido todavía — se llena solo cuando conectes Hotmart (ingresos, cancelaciones, MRR,
            ganancia real después de costos, LTV y CAC por canal).
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <Users size={18} color="var(--accent)" aria-hidden="true" />
          Usuarios
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Metrica label="Registrados" valor={totalUsuarios ?? 0} />
          <Metrica label="Con al menos 1 escaneo" valor={usuariosConEscaneo} />
        </div>
        <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">
          Retención D1/D7/D30: no medido todavía — hace falta más historial de días para calcularla.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <Camera size={18} color="var(--accent)" aria-hidden="true" />
          Uso
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Metrica label="Total de escaneos" valor={listaEscaneos.length} />
          <Metrica label="Promedio kcal/plato" valor={promedioKcal} />
        </div>
        {platoTop && (
          <p className="mt-2 text-[16px] text-[var(--text-secondary)]">
            Plato más registrado: <strong className="text-[var(--text-primary)]">{platoTop[0]}</strong>{' '}
            ({platoTop[1]} veces)
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <Sparkles size={18} color="var(--accent)" aria-hidden="true" />
          Costo de IA (estimado)
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Metrica label="Gastado hoy" valor={`$${costoHoy.toFixed(3)}`} />
          <Metrica label="Gastado en total" valor={`$${costoTotalIA.toFixed(3)}`} />
        </div>
        <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">
          {listaIA.length} llamadas registradas
          {tasaExitoIA !== null && ` · ${tasaExitoIA}% exitosas`} — estimado por llamada, no es la
          factura exacta de Google todavía.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <Activity size={18} color="var(--accent)" aria-hidden="true" />
          Errores
        </h2>
        <div className="mt-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
          <p className="text-[16px] text-[var(--text-tertiary)]">
            No medido todavía — falta conectar un servicio de monitoreo de errores (ver 31 del sistema).
          </p>
        </div>
      </section>
    </div>
  );
}

function Metrica({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-1)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)]">
        {label}
      </p>
      <p className="mt-1 text-[24px] font-bold leading-none tabular-nums [font-family:var(--font-display)]">
        {valor}
      </p>
    </div>
  );
}
