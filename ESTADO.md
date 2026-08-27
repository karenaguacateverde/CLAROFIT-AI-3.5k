# ESTADO.md — Calofit AI

## Fase actual
App interna construida (2026-08-24) — decisión explícita del usuario de saltar el login/auth y
construir la app interna primero (fuera del orden normal de la secuencia maestra; login sigue
pendiente, ver Problemas conocidos). 4 pantallas con navegación inferior (`/app`, `/app/escanear`,
`/app/progreso`, `/app/perfil`), probadas por código (contenido, interacciones, sin errores de
consola) — sin verificación visual real por la misma limitación de captura de pantalla ya anotada.
Datos de ejemplo en las 4; el backend de IA y Supabase se conectan en la fase de "servicios externos".

## Idea
Calofit AI — app de nutrición con visión artificial: el usuario toma una foto de su plato y la IA calcula calorías y macros al instante, entrenada/contextualizada para reconocer comida casera y típica de LATAM (no solo comida industrializada o anglosajona como las apps gringas).

Diferenciadores declarados por el usuario:
- Fricción cero: registro por foto en segundos, sin buscar ingredientes ni pesar en báscula.
- Inteligencia cultural: reconoce platos caseros/típicos LATAM (tacos, arepas, milanesas, guisados).
- Ajuste conversacional: corregir la IA hablándole natural ("llevaba aguacate extra"), no reescribiendo a mano.
- Tono: nutricionista empático y motivador, no juez estricto.
- Gamificación de rachas para retención desde el día 1.
- Precio justo en moneda/contexto LATAM, sin cobros sorpresa en dólares.

## Reporte de Validación (resumen — ver conversación para el detalle completo)
**Veredicto: Viable con ajustes**
- Cal AI (líder EEUU): 4.8★, ~329K reseñas, pasó de $0 a +$50M ARR en <2 años, comprada por MyFitnessPal en 2026. Confirma que el modelo "foto → calorías" tiene demanda masiva y paga.
- MyFitnessPal: 4.7★ (2.1M reseñas) pero queja #1 es el registro manual tedioso — exactamente el dolor de Sofía (avatar).
- Punto débil de los líderes (oportunidad): cobros sorpresa en dólares, trials que se convierten sin avisar bien. Cal AI tuvo un escándalo de billing engañoso + filtración de datos en 2026. Aquí está el ángulo ganador: transparencia de precio y confianza.
- ⚠️ La "brecha LATAM" no está vacía: ya existen Nutrola (reconoce platos compuestos como bandeja paisa, registro por voz en español) y NutriScan (dice reconocer comida latina/paella). Son competencia directa, no solo inspiración — hay que diferenciarse más allá de "reconoce comida latina".
- Posicionamiento recomendado: "la app de calorías con IA que no te esconde el precio ni te mete en un trial tramposo" + "hecha para la comida de tu casa" — para la mujer ocupada de 25-40 en LATAM ya decepcionada por MyFitnessPal y por apps de IA gringas.
- Apps de referencia: Cal AI (flujo/onboarding/racha), MyFitnessPal (qué NO hacer: buscador manual), Nutrola/NutriScan (competencia directa a vigilar).

## Ficha de Avatar (aportada por el usuario — completa, tomada como base sin repetir el trabajo)
- **Cliente ideal:** Sofía Ramírez, 31 años, LATAM, trabaja 9-6 de oficina, almuerza corriendo, llega cansada y con ansiedad de comer rico por la noche. Se siente hinchada, culpable, con meses intentando "portarse bien" sin lograrlo.
- **Problema #1:** la fricción mental del registro manual (buscar ingrediente por ingrediente, pesar en báscula) la hace abandonar la app y la dieta en menos de 2 semanas.
- **Deseo principal:** comer rico y sin estrés, sabiendo sus calorías con solo sacar el teléfono, viendo resultados reales en el espejo sin pasar hambre.
- **Nivel de consciencia (Schwartz):** consciente del problema y de la solución (sabe que existen apps de calorías y que necesita déficit calórico), pero escéptica y quemada por las opciones actuales.
- **Soluciones anteriores que odió:** MyFitnessPal (buscador manual), dietas estrictas (ansiedad, abandono en 4 días), apps de IA gringas tipo Cal AI genérico (no reconocen comida hispana, alucinan porciones, cobros sorpresa).
- **10 dolores, 10 deseos, objeciones y lenguaje literal del cliente:** documentados en el mensaje del usuario — reutilizar tal cual para copy de venta (ya viene en las palabras exactas del cliente).
- **Segmento secundario:** persona fitness principiante que quiere transformar su cuerpo pero no entiende bien macros/calorías.
- **Ángulo de oro:** "No peses tu comida. Solo tómale una foto." — bajar de peso comiendo rico, sin básculas, sin esfuerzo, en 3 segundos.
- **Razones de compra confirmadas:** ahorro de tiempo, evitar esfuerzo, escapar del dolor mental/culpa, comodidad, salud, elogios sociales, aceptación/confianza en el propio cuerpo.

## Decisiones tomadas
- Fuente de la idea: documento propio del usuario (PDF con investigación de mercado, avatar y propuesta de valor) — no se repite la investigación de avatar, sí se hizo validación de mercado con fuentes reales (stores, Indie Hackers).
- Ángulo de venta ajustado: transparencia de precio + comida casera real, no solo "reconoce comida latina" (por la competencia de Nutrola/NutriScan).

## Constitución del Producto (B3 — aprobada por el usuario)
- **Primera victoria (combinación 1+5):** la foto que reconoce SU comida real y entrega calorías/macros en segundos, seguida de "Día 1 de tu racha 🔥" para engancharla desde el primer uso.
- **3 funciones del MVP:**
  1. Registro por foto con IA (foto → calorías/macros en segundos, reconocimiento de comida casera/LATAM)
  2. Ajuste conversacional (corregir la IA hablándole natural, sin formularios)
  3. Racha + resumen diario/semanal (gamificación de retención + progreso hacia meta de kcal)
  Fuera del MVP (v2): planes de comida generados, comunidad social, integración báscula/wearables, recetas.
- **Nunca debe hacer:**
  1. Inventar calorías cuando no está segura — debe decirlo y pedir ajuste, no alucinar un número.
  2. Cobrar sin avisar el precio antes / trials que se convierten sin avisar.
  3. Usar culpa como motivador (nada de "fallaste hoy"; tono nutricionista empático).
  4. Compartir datos del usuario (fotos, peso, hábitos) con terceros sin permiso explícito.
- **Promesa central:** "No peses tu comida. Solo tómale una foto — y paga lo que dice el precio, sin sorpresas."

## Decisiones técnicas (decididas por el agente, no requieren aprobación del usuario — ver CLAUDE.md → PREGUNTAR vs DECIDIR)
- **Nicho de monetización (02C, tabla C — Fitness/Nutrición/Tracking):** primera victoria = primer análisis; paywall tras el primer análisis; monetización trial + anual, créditos si el costo de IA por acción lo justifica; retención por check-ins/racha.
- **Modelo de negocio:** Modelo 2 — Onboarding + Paywall de prueba, variante **preview anónimo → paywall → login/auth** (la primera foto se puede probar sin cuenta, se guarda temporal en el navegador; el login se pide para conservar el progreso y tras pagar).
- **Trial:** 5-7 días (el "aha" es inmediato — foto a resultado en segundos). Definir el número exacto y precio real en FICHA-MERCADO (investigación de precios LATOM pendiente antes de fijar el paywall final).
- **Framework:** Next.js (App Router) — la app necesita landing pública con SEO/marketing además de la app interna tras login.
- **Auth:** Supabase Auth, passwordless (magic link) + Google OAuth — mínima fricción, sin passwords que recordar.
- **Arquitectura de IA:** llamada síncrona a un modelo de visión (foto → JSON de calorías/macros) vía endpoint propio del servidor (BFF) — nunca la clave del proveedor de IA en el frontend. Latencia objetivo <5s con skeleton de carga. Créditos por plan (no tokens) para controlar costo por usuario intensivo — cifras exactas se validan contra el margen en la Sesión 6.
- **Modelo de datos (borrador, se refina en 25):** `profiles` (meta kcal/macros, plan), `food_logs` (foto, calorías, macros, timestamp, editado_por_usuario), `user_progress` (racha, último check-in), `user_quota` (créditos de IA del período). RLS por `auth.uid()` en todas las tablas.

## Pendiente / siguiente paso
- ⚠️ Nota de dirección de arte: este archivo aún dice "oscuro/cálido/naranja" pero FICHA-ARTE.md
  quedó DEFINITIVA en claro ("3D luminous glassmorphism", tercera vuelta) — la landing y el
  onboarding (veredicto visual pendiente en ambos, ver Problemas conocidos) ya están construidos
  en claro. Corregir esta línea la próxima vez que se edite este
  archivo a fondo.
- Landing (veredicto visual pendiente, ver Problemas conocidos) completa (Hero, Logros, App por
  dentro, Testimonios ×2, Bonos, Oferta, Garantía,
  Estadísticas, FAQ, Footer + Aviso Meta) — construida, a pedido explícito del usuario, con varios
  conocidos), a pedido explícito del usuario, con varios
  elementos de marketing FABRICADOS (testimonios, calificación 4.9, +7M usuarios, precio ancla
  $27→$7) que el usuario confirmó querer pese a la advertencia de riesgo legal/reputacional — ver
  el detalle completo en `FICHA-MERCADO.md` (sección de riesgos de integridad). **Ninguno de esos
  elementos debe copiarse al onboarding ni a futuras pantallas sin la misma advertencia.**
- Onboarding de 8 pasos construido (veredicto visual pendiente, ver Problemas conocidos) y probado
  de punta a punta, reestructurado 2026-08-24:
  Nombre → Objetivo (+"Otro" libre) → Dolor (+"Otros" libre) → Reconocimiento → Escaneo demo →
  Meta diaria (+"Otro" custom) → Racha Día 1 → Paywall (la pantalla intermedia de "Urgencia y
  valor" se QUITÓ a pedido explícito — el valor y los bonos ahora viven dentro del propio paywall,
  para no repetir información). Gamificación: toast de recompensa con emoji de verdura/fruta
  (🥑🥦🍓🍋🥕) + puntos de salud acumulados en memoria (no persistidos) al avanzar cada paso.
  El paywall tiene: línea de tiempo de cobro (Hoy=acceso · Día 6=aviso · Día 7=primer cobro,
  transparencia real de cuándo se cobra), 2 planes — "Plan Básico" ($4/mes, real, con indicador
  "1") y "Plan Más Vendido" ($27→$7/mes, ancla de marketing, con los 6 bonos integrados como
  checklist ✅ dentro de la propia tarjeta) —, sellos de garantía/pago y CTA verde (sin morados ni
  rosas). El "Plan Más Vendido" promete recetas/plan de 21 días/planificador/lista de compras que
  no existen — ver el riesgo completo en `FICHA-MERCADO.md` §8.
  El escaneo del paso 5 es una DEMO simulada (sin backend de IA todavía) — así se declara en el
  código y debería seguir declarándose en cualquier copy futuro.
  El botón final del paywall apunta a `/login`, que **todavía no existe** — es el siguiente paso
  de la secuencia maestra (login/auth → app interna → servicios externos).
- **Compromisos de producto pendientes (aceptados por el usuario, no construir ahora):** 20 recetas
  reales, planificador de comidas semanales, lista de compras inteligente automatizada. Prometidos
  en el paywall del onboarding — construir antes de vender de verdad, o quitar la promesa.
- Siguiente paso sugerido: construir `/login` (passwordless + Google OAuth, ya decidido arriba)
  para que el paywall tenga a dónde llevar al usuario.

## Problemas conocidos
- ✅ **Login CONSTRUIDO (2026-08-25):** `/login` (magic link por correo + Google OAuth vía Supabase
  Auth), `middleware.ts` protege `/app/*` (sin sesión → redirige a `/login`, verificado). El CTA
  final del paywall (`Step8Paywall.tsx`) ya apunta a `/login`. Falta: conectar el botón "Cerrar
  sesión" de `/app/perfil` (hoy deshabilitado) y decidir si el flujo de onboarding pasa por login
  ANTES o DESPUÉS del paywall (hoy es después, como estaba planeado).
- ✅ **Backend de IA CONECTADO (2026-08-25):** `/app/escanear` ya llama a Gemini de verdad vía
  `app/api/escanear/route.ts` (BFF — `GEMINI_API_KEY` solo en el servidor, en `.env.local`, nunca
  en el navegador). Probado con foto real (gallo pinto → 650 kcal, confianza alta). Modelo:
  `gemini-3.6-flash` — elegido tras investigación de costo (~3x más barato que Claude Haiku en
  vision) y prueba de precisión con 6 platos LATAM reales, todos reconocidos correctamente
  (`scripts/test-ia/comparar-ia.mjs`, resultados en el historial de esta sesión).
  ✅ **Escaneo del onboarding también es real (2026-08-26):** `Step5Escaneo.tsx` ya llama a
  `/api/escanear` con una foto de verdad que el usuario elige — dos botones, "Tomar foto" (cámara)
  y "Subir foto" (galería), decisión final del usuario tras probar la versión solo-galería. Limitado
  a UN intento por onboarding sin importar cuál botón use (control `yaUsado`) — evita que alguien
  sin cuenta dispare muchas llamadas a Gemini y genere costo. Falta definir el límite de escaneos por plan DESPUÉS del
  paywall/trial — se decide con números exactos al conectar Hotmart (queda anotado para no perderlo).
  ⚠️ Nota de seguridad pendiente: `/api/escanear` no tiene límite de peticiones por IP todavía (solo
  el límite del lado del cliente en el onboarding) — antes de lanzar de verdad, conviene agregar un
  límite en el servidor también, por si alguien intenta saltarse el límite del navegador.
  El **ajuste conversacional** (corregir hablando) sigue simulado — es una función aparte, no
  conectada todavía.
  ✅ **Supabase CONECTADO (2026-08-26):** tablas `profiles` (con trigger que crea el perfil solo al
  registrarse) y `food_logs`, RLS activo en ambas con políticas por `(select auth.uid())`, índice en
  `food_logs.user_id`. `/app` (Hoy) y `/app/perfil` ahora son Server Components que leen datos reales;
  `/app/escanear` guarda de verdad en `food_logs` al tocar "Guardar en mi día"; `/app/progreso` navega
  semanas reales agregando `food_logs` por día. "Cerrar sesión" en Perfil ya funciona. Pendiente:
  guardar el `nombre`/`objetivo` del onboarding en `profiles` (hoy solo vive en memoria del navegador
  durante el onboarding, se pierde al llegar al login) — no es bloqueante, pero el nombre en "Hoy"
  saldrá vacío hasta que se conecte.
- ✅ **GitHub CONECTADO (2026-08-26):** repo `github.com/karenaguacateverde/CLAROFIT-AI-3.5k` —
  ⚠️ quedó como **público**, no privado como se pidió al crearlo (revisar/corregir cuando el usuario
  quiera). Push funciona por llave SSH (`git@github.com:karenaguacateverde/CLAROFIT-AI-3.5k.git`).
  Cada commit se sube directo desde aquí sin pasos manuales de la usuaria.
- ✅ **Publicada en Vercel (2026-08-26):** proyecto `clarofit-ai-3-5k`, dominio ESTABLE (no cambia
  entre despliegues): **https://clarofit-ai-3-5k.vercel.app** — usar SIEMPRE este, no la URL con hash
  de cada deployment. Auto-deploy activo en cada push a `master`. Variables de entorno ya configuradas
  en Vercel (las 5: Supabase x4 + GEMINI_API_KEY). `NEXT_PUBLIC_SUPABASE_URL`/`SITE URL` de Supabase
  Auth apuntando a ese dominio estable (URL Configuration del dashboard de Supabase, ya actualizado).
  `/api/escanear` con `maxDuration=60` (subido de 15 por timeout de arranque en frío en producción).
  ⚠️ Pendiente: **Google OAuth no está habilitado en Supabase** ("Unsupported provider" al tocar
  "Continuar con Google") — falta crear credenciales OAuth en Google Cloud Console y pegarlas en
  Supabase Auth → Providers → Google. El botón de Google se QUITÓ del login mientras tanto (código
  intacto en git, se puede reactivar cuando se configure). El login por correo (magic link) sí funciona.
  ✅ **Resend CONECTADO (2026-08-26):** SMTP personalizado de Supabase configurado con Resend
  (`smtp.resend.com`, remitente `onboarding@resend.dev` — dominio de prueba, solo entrega confiable a
  la cuenta dueña de Resend hasta comprar dominio propio y verificarlo en Resend). Ya no depende del
  límite gratis bajísimo de Supabase.
  ✅ **Causa raíz real del login roto, resuelta (2026-08-26):** fallaba con "Failed to execute
  'fetch'... String contains non ISO-8859-1 code point" porque `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  en Vercel se guardó corrompida (200 caracteres de punto "•" en vez del JWT real) — pasó varias veces
  al copiar/pegar en la consola de Vercel, causa exacta sin confirmar. Solución definitiva: esa URL y
  esa llave (NO son secretas, viajan al navegador de todos modos) ya NO se leen de variables de
  entorno — quedaron fijas en `lib/supabase/config.ts`, usadas por `client.ts`, `server.ts` y
  `middleware.ts`. Verificado end-to-end: el bundle desplegado tiene el JWT completo y el envío del
  magic link responde 200 real.
- ✅ **Panel de administración /admin CONSTRUIDO (2026-08-26):** protegido en 2 capas — middleware
  redirige a `/login` sin sesión, y la página verifica en el servidor que el correo sea
  `luciahouse483@gmail.com` (si no, `notFound()`, nunca revela que la ruta existe). Los datos se leen
  con `lib/supabase/admin.ts` (llave `service_role`, nunca en el navegador) porque necesita ver todos
  los usuarios saltándose el RLS a propósito. Tablas nuevas `ai_calls` (costo estimado por escaneo,
  $0.002/llamada — estimado, no factura real) y `event_log` (base para analítica futura), ambas con
  RLS activo SIN políticas (bloqueadas para anon/authenticated, solo el servidor las lee). Secciones
  con datos reales: usuarios registrados/con escaneo, total de escaneos, plato más común, costo de IA
  hoy/total. Secciones "no medido" (honestas, no inventadas): ventas, ganancia real, LTV/CAC, errores
  — se llenan al conectar Hotmart y un servicio de monitoreo de errores.
- ⚠️ **VEREDICTO PENDIENTE — landing, onboarding, paywall y la pantalla principal ("Hoy",
  `/app`)**: ninguna tiene todavía su
  `docs/revisiones/<slug>-veredicto.md` del subagente `revisor-visual` (con screenshot real a
  375px en `docs/revisiones/<slug>-375.png`). El paywall (paso 8 del onboarding, `Step8Paywall.tsx`)
  es una de las 4 pantallas que deciden el dinero y necesita SU PROPIO veredicto aparte del de
  "onboarding" — aunque viva en el mismo archivo/ruta, el gate automático de `pre-stop.sh` no lo
  detectó por cómo está redactado este párrafo (heurística de línea), pero el requisito del sistema
  aplica igual. Motivo de fondo: en esta sesión no hubo forma de guardar un screenshot del
  navegador como archivo en disco — el panel de navegador embebido no expone una ruta de archivo
  para sus capturas, y la extensión "Claude en Chrome" no está conectada en este entorno. Se
  verificó visualmente en preview (consola sin errores, tsc limpio, recorrido completo de los 8
  pasos del onboarding incluido el paywall), pero **eso NO reemplaza el veredicto del revisor** —
  el sistema lo prohíbe explícitamente (autoevaluarse está prohibido). Pendiente: retomar en un
  entorno con captura de pantalla a archivo disponible (o pedir la captura al usuario) y lanzar el
  `revisor-visual` sobre landing, onboarding, paywall y "Hoy" antes de considerarlas certificadas.
- ✅ **AUDITORÍA LEGAL COMPLETADA (2026-08-26)** — ver reporte completo en el chat de esa fecha.
  Resumen: las 4 páginas legales obligatorias (Privacidad, Términos, Reembolsos, Aviso de IA) NO
  EXISTÍAN — los links del footer y del login apuntaban a rutas rotas. Se crearon las 4, adaptadas a
  **RGPD** (el usuario opera desde España, no LATAM) con subprocesadores nombrados (Supabase, Google
  Gemini, Vercel, Resend, Hotmart), transferencia internacional a Gemini declarada, y coherentes con
  el producto real. Se conectó el **borrado de cuenta real** (`/api/cuenta/eliminar` + botón en
  Perfil con doble confirmación) — antes era solo una promesa sin implementar. Se agregó el
  micro-disclaimer de IA junto al resultado del escaneo (app y onboarding). Se corrigió el correo del
  footer (`soporte@calofit.ai` no existe — dominio no comprado; ahora usa el correo real). Se
  corrigió la garantía en `FICHA-MERCADO.md` (decía 15 días, el código siempre dijo 7 — se alinea
  con la realidad ya implementada).
  ⚠️ **Pendientes que solo el dueño puede cerrar:**
  - Rellenar el nombre legal completo en `app/privacidad/page.tsx` (placeholder `[TU NOMBRE
    COMPLETO]` — el usuario no lo dio, dijo "aún no tengo empresa").
  - Al crear el producto en Hotmart: configurar la garantía en **7 días** (no el default) para que
    coincida con todo el copy publicado.
  - Los 🚩 RIESGOS DE INTEGRIDAD de `FICHA-MERCADO.md` (precio ancla $27 falso, testimonios/reseñas
    inventados, estadísticas infladas, funciones prometidas que no existen — planificador semanal,
    lista de compras, recetas de batidos, plan de 21 días) siguen sin resolver — el usuario los
    confirmó explícitamente pero **no se corrigieron en esta auditoría** (es un tema de honestidad
    de marketing/producto, no de qué página legal falta) — revisar antes de lanzar de verdad.
  - No hay checkbox explícito de consentimiento en el registro (login passwordless) — solo un link
    "al continuar aceptas...". Es una práctica común y defendible bajo RGPD para esta base legal
    (ejecución de contrato), pero un checkbox no premarcado sería más robusto — decisión de producto
    del dueño, no bloqueante.
  - Validar con un abogado en España si se supera un volumen relevante de ventas o si se maneja
    algún dato de salud más allá de lo actual (calorías autoreportadas ≠ dato médico, pero conviene
    confirmarlo si el negocio crece).
- ✅ **Repaso de seguridad post-auditoría legal (2026-08-26):** prueba real del borrado de cuenta
  (usuario de prueba con perfil + comida + llamada de IA → se borró perfil y comida, la llamada de
  IA quedó sin dato personal) — funciona como se documentó. Se agregó aviso explícito de "cancela
  primero tu suscripción en Hotmart" antes de borrar (borrar la cuenta NO cancela el cobro
  recurrente — son sistemas distintos). Se encontró y corrigió un hueco real: la función que crea el
  perfil al registrarse seguía siendo ejecutable por CUALQUIERA (`PUBLIC`) vía RPC aunque ya se había
  revocado para `anon`/`authenticated` — el `REVOKE` anterior no cubría el permiso heredado de
  `PUBLIC`. Ya está cerrado (solo `postgres`/`service_role`). Verificado también que la llave secreta
  de Supabase no aparece en ningún archivo del navegador (build revisado). Sin más hallazgos.
