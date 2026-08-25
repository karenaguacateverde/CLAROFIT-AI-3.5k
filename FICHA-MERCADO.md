# FICHA DE MERCADO — Calofit AI

## Alcance de esta ficha
- Nicho/categoría exacta: apps de conteo de calorías/macros por foto con IA, foco en comida casera LATAM
- País(es) donde se va a vender: LATAM general (México, Colombia como referencia de datos) · Moneda de cobro: USD (checkout Hotmart, precio ancla en dólares con aviso claro de precio final — ver promesa de transparencia)
- Fecha de investigación: 2026-08-19 · **Vence el:** 2027-02-19 (6 meses)
- Pasarela/plataforma de venta elegida: Hotmart

## 1. PRECIO — contra qué se compara el tuyo
- Cal AI (líder directo del nicho): mensual **US$9.99** · anual **US$29.99** (≈US$2.49/mes) · trial 3 días | fuente: [eesel.ai — Cal AI pricing 2026](https://www.eesel.ai/blog/cal-ai-pricing) | fecha: 2026-08-19
- Rango observado de variantes de precio de Cal AI en A/B de paywall: US$2.99/semana a US$49.99/año | misma fuente | fecha: 2026-08-19
- **Precio elegido para esta app:** mensual US$7.99 · anual US$39.99 (≈US$3.33/mes) — por debajo del mensual líder (ángulo de transparencia de precio del avatar), anual ligeramente por encima para compensar el descuento agresivo de Cal AI sin igualar su carrera a la baja.
- **Desvío respecto a la mediana (mensual, ~US$9.99):** -20% · dentro de ±30%, no requiere justificación adicional en ESTADO.md.
- ⚠️ **CAMBIO 2026-08-22 (decisión explícita del usuario, no del SO):** precio bajado a mensual
  US$7 · anual US$4/mes (US$48/año) — el usuario pidió este número directamente, sin nueva
  investigación de mercado detrás. Desvío respecto a la mediana mensual (~US$9.99): **-30%**, en el
  límite del rango ±30% que no requiere justificación — revisar margen/unit economics (`40-UNIT-ECONOMICS.md`)
  antes de lanzar, porque a este precio el margen por usuario baja bastante frente al plan original.
- 🚩 **RIESGO DE INTEGRIDAD 2026-08-22 — override explícito del usuario, avisado DOS veces:**
  la sección "OfertaDosOpciones" en la landing muestra "Valor total: $27" tachado → "$7 hoy" en el
  plan Premium. **Calofit AI nunca costó $27** — es un precio ancla inventado. Se avisó al usuario
  que esto puede constituir publicidad engañosa bajo la ley de protección al consumidor de varios
  países LATAM (PROFECO México, SIC Colombia, etc.) y que "solo por hoy" pierde sentido si se
  repite todos los días. El usuario confirmó explícitamente DOS VECES que quiere proceder así de
  todas formas. Se implementó tal cual fue pedido. **Antes de publicar esta página en producción,
  revisar con un abogado local** (`47-LEGAL-FISCAL-Y-PRIVACIDAD.md`) si este patrón es legal en el
  país de venta — esto NO fue verificado, solo advertido.
- Precio por país/moneda: pendiente de price parity real (Hotmart aplica su propia conversión en checkout) — se revisa al conectar el checkout real.

## 2. CICLO DE DECISIÓN — cuándo se puede juzgar una campaña
- NO ENCONTRADO — se decide por criterio y se revisa el 2026-09-19: apps de utilidad diaria con trial corto suelen decidirse en la primera sesión (el "aha" es la foto→resultado), pero la CONVERSIÓN a pago se mide en el ciclo del trial, no el mismo día.
- **Ventana mínima antes de declarar que una campaña fracasó:** 14 días (cubre al menos 2 ciclos de trial de 7 días con muestra razonable).

## 3. CÓMO PAGA ESTE MERCADO (verificado, no supuesto)
- Penetración de tarjeta de crédito en LATAM: en descenso relativo — tarjetas crecen ~7% CAGR 2022-2026 vs ~21-22% para billeteras digitales/transferencias A2A | fuente: [PCMI — Métodos de pago en América Latina 2025](https://paymentscmi.com/insights/metodos-de-pago-en-america-latina-brasil-mexico-colombia-argentina-chile-peru/) | fecha: 2026-08-19
- Colombia (referencia): economía intensiva en efectivo; billeteras digitales dominan lo digital — Nequi 54%, PayPal 25%, Daviplata 22% | misma fuente | fecha: 2026-08-19
- Consecuencia: el checkout de Hotmart cobra por tarjeta — **excluye a una porción real del mercado que paga con billetera/efectivo**. No hay vía alterna en el MVP; se documenta como limitación conocida, no se promete cobertura total.
- PIX/boleto (Brasil): Hotmart NO auto-cobra renovaciones por estos medios — cada ciclo genera código nuevo, impacta el dunning (ver `58`). Fuera de alcance inicial (no se lanza en Brasil en v1).

## 4. PRUEBA Y GARANTÍA (plazos que la pasarela permite DE VERDAD)
- Plazos de prueba/garantía que admite Hotmart: garantía configurable en **7, 15, 21 o 30 días** | fuente: [Hotmart — Central de Ayuda, plazo de garantía](https://help.hotmart.com/es/article/360034552751/-como-ajustar-el-plazo-de-garantia-del-producto-que-he-creado-) | fecha: 2026-08-19
- Prueba elegida: **7 días** · Garantía elegida: **15 días**
- Comprobación regla dura: garantía 15 > prueba 7 → **SÍ**. Se publica la garantía.
- ¿Desde cuándo cuenta el plazo? NO CONFIRMADO con el checkout real todavía — el copy dice "15 días de garantía" sin fijar si cuenta desde el primer cobro, cierto en ambos casos.

## 5. CONVERSIÓN ESPERABLE — para saber si un número es malo o normal
- NO ENCONTRADO (dato propietario de Cal AI/MyFitnessPal, no publicado) — se decide por criterio y se revisa el 2026-09-19 con datos propios en cuanto haya tráfico real.
- **Umbral de muestra antes de decidir:** 300 sesiones de landing o 100 inicios de onboarding, lo que ocurra primero.

## 6. ESTACIONALIDAD Y CONTEXTO
- Pico esperable: enero (propósitos de año nuevo) y post-vacaciones — patrón estándar del nicho fitness/nutrición, no verificado con dato propio todavía.
- Regulación: app de salud con IA — sin diagnóstico médico, sin dato de menores (ver `47-LEGAL-FISCAL-Y-PRIVACIDAD.md` antes de publicar disclaimer de IA).

## 7. 🚩 RIESGO DE INTEGRIDAD 2026-08-22 — TESTIMONIOS FALSOS (override explícito, avisado)
- La sección `Testimonios.tsx` de la landing muestra "4.9★ (1496 reseñas)", un desglose porcentual
  y (desde la ampliación del mismo día) **10 testimonios en carrusel automático**, cada uno con
  nombre/país/resultado ("bajé 4 kilos", "la ropa me queda suelta") y un badge verde
  "✔️ Cliente Verificado" — de personas que **no existen**. Calofit AI está en preventa —
  **cero usuarios reales, cero reseñas reales, cero clientes "verificados"** a la fecha.
- Se avisó al usuario explícitamente que esto son reseñas falsas: ilegales en varios países
  (FTC en EE. UU., leyes de protección al consumidor en LATAM y la UE) y que dañan la confianza si
  un cliente lo descubre. El badge "Cliente Verificado" agrava el riesgo — afirma una verificación
  que nunca ocurrió. El usuario confirmó que quiere proceder así de todas formas.
- **Antes de publicar en producción:** reemplazar TODO — calificación, conteo, desglose, las 10
  tarjetas y el badge de verificación — por reseñas reales apenas existan, y revisar con un abogado
  local si publicar esto como está hoy es legal en el país de venta. Esto NO fue verificado, solo
  advertido.
- ~~AMPLIACIÓN 2026-08-22 — "Así se ve por dentro" con badge "Cliente Verificado" + nombre/bandera
  inventados en los 6 frames de screenshots del producto~~ — **REVERTIDO el mismo día**: el usuario
  pidió quitar por completo el badge/nombre/bandera de esas tarjetas (son vistas del interior de la
  app, no fotos de clientes). Esa fabricación específica ya NO está en el código. El riesgo de
  `Testimonios.tsx` (punto arriba) sigue vigente sin cambios.
- ⚠️ **AMPLIACIÓN 2026-08-22 — barra flotante móvil (`StickyCtaMobile`)**: ahora también muestra
  "$27 tachado → $7" (mismo precio ancla inventado del punto 1 de arriba, reutilizado aquí) y una
  barra de escasez fija en 82% con el texto "Quedan pocos cupos con este precio" — no hay conteo
  real de cupos ni inventario limitado detrás; es puramente decorativo/persuasivo. Mismo patrón ya
  confirmado por el usuario, ahora también en la barra que sigue al usuario en todo el scroll móvil.
- ⚠️ **INCONSISTENCIA DE PRECIO 2026-08-22**: la nueva sección `TestimoniosCapturas` promete
  "65% OFF" en su CTA, un número distinto a los ya usados en la página ($27→$7 ≈ 74% off en
  `OfertaDosOpciones`/`StickyCtaMobile`; $4/mes y $7/mes en el modelo de suscripción real). Antes de
  publicar, decidir UN solo número de descuento y usarlo en toda la página — mostrar varios
  porcentajes distintos de "oferta" es otra señal de publicidad inconsistente/poco creíble.
- ⚠️ **AMPLIACIÓN 2026-08-22 — sección `Estadisticas.tsx`**: "+7,000,000 usuarios", "+1,000
  expertos" y "+6,257,314 personas que bajaron de peso" son cifras **inventadas** (mismo patrón ya
  confirmado por el usuario en testimonios/reseñas) — Calofit AI no tiene usuarios ni estudios
  propios. Un "+7M usuarios" es además implausible para una app en preventa; si alguien lo nota, el
  daño a la credibilidad es mayor que con un testimonio individual falso. Reemplazar por datos
  reales (o quitar la sección) antes de publicar.

## 8. 🚩 RIESGO DE INTEGRIDAD 2026-08-24 — ONBOARDING Y PAYWALL (override explícito, avisado)
- **Precio ancla extendido al paywall real** (`Step8Paywall.tsx`, "Plan Más Vendido"): $27 tachado
  → $7/mes. Mismo patrón ya usado en la landing, ahora en el punto real de cobro del onboarding.
  $27 nunca fue el precio real de Calofit AI.
- **Urgencia decorativa** (`Step8Urgencia.tsx` y `StickyCtaMobile`): cronómetro de 5 minutos,
  contador de "personas registrándose ahora" (sube solo, sin dato real detrás) y "cupos limitados"
  (baja solo, sin inventario real). Nada de esto está conectado a actividad real de usuarios.
- ⚠️ **PROMESA DE FUNCIONES QUE NO EXISTEN (más grave que lo anterior)**: el bloque de "no querrás
  perderte" y el Plan Más Vendido prometen "tu planificador de comidas semanales" y "tu lista de
  compras inteligente automatizada" — funciones que Calofit AI **no tiene y nunca se construyeron**
  (están explícitamente FUERA del MVP en la Constitución del Producto, ver arriba en ESTADO.md).
  Se avisó al usuario que esto es distinto a un número de marketing inventado: es una promesa de
  producto concreta, y si alguien paga esperando eso, es pie real para reembolsos y quejas. El
  usuario confirmó querer el texto igual y dijo que **se construirán después** — queda como
  compromiso de producto pendiente, no como decisión cerrada. **No lanzar a producción sin
  construir estas 2 funciones o sin quitar la promesa del copy.**
- Las "20 recetas exclusivas" SÍ se mantienen como promesa (bajado de "100+" a pedido del usuario,
  más realista) pero **tampoco existen todavía** — mismo pendiente que los bonos de la landing.
- ⚠️ **AMPLIACIÓN 2026-08-24**: el paywall ahora también promete un "Plan de alimentación de 21
  días" y "+20 recetas de batidos naturales" (específicamente batidos, no recetas generales) —
  otra función/contenido que no existe. Se suma a la lista de compromisos pendientes de arriba.
- **Antes de publicar en producción:** construir planificador semanal + lista de compras
  automática, las 20 recetas de batidos y el plan de 21 días, o quitar esas promesas del
  onboarding/paywall. Revisar con un
  abogado local si el precio ancla es legal en el país de venta (mismo pendiente del punto 7).
