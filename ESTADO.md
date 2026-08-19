# ESTADO.md — Calofit AI

## Fase actual
Sesión 1 — Validación, AVATAR, monetización y arquitectura (en curso: Constitución del Producto)

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
Sesión 2 (identidad visual): el usuario ya aprobó paleta y modo (FICHA-ARTE.md, referencia-mandato de Cal AI, oscuro/cálido/naranja) y se le preguntó si arrancamos a montar el proyecto de código + las 3 variantes A/B/C. Esperando su confirmación ("¿Seguimos con eso?") antes de escribir código o generar `direcciones-abc.html`.

## Problemas conocidos
- PENDIENTE-ABC: `direcciones-abc.html` (comparativa de 3 interpretaciones A/B/C exigida por el protocolo del 54) todavía NO existe. Motivo: la paleta/modo se cerraron por referencia-mandato del usuario (Cal AI), pero las 3 variantes de COMPOSICIÓN aún no se construyeron — eso requiere escribir código del proyecto (Next.js), que es un paso grande y todavía no tiene el OK del usuario para arrancar. En cuanto confirme, se genera `direcciones-abc.html` + `docs/revisiones/direcciones-abc.png` antes de cerrar la Sesión 2.
