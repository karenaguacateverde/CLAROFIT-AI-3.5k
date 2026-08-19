# FICHA DE DIRECCIÓN DE ARTE — Calofit AI

## Referencia del usuario (CONTRATO)
- ¿Hay imagen(es) de referencia del usuario?: SÍ → capturas de Cal AI (carrusel de marketing, modo oscuro cálido) + capturas de la app real de Cal AI en modo claro (descartadas como base — el usuario confirmó que quiere el estilo oscuro/cálido para TODA la app, no solo landing)
- Extracción (mirada directo en las imágenes):
  - Modo: oscuro · Fondo: #241610 (marrón chocolate casi negro, con degradado sutil a negro en bordes) · Superficie/card: #3A2418 (marrón más claro que el fondo) · Texto 1º: #F7EEE3 (crema) / Texto 2º: #B8A697 (tostado apagado)
  - Acento(s): #FF7A1F (naranja vibrante) — aparece en CTAs, racha, formas curvas translúcidas de fondo, badges de "Log meal"
  - Semánticos visibles: proteína/verde #8BC34A · carbos/naranja #FF9F43 · grasas/azul #4FC3F7 (anillos y donas de macros)
  - Display: grotesca redondeada cálida — candidatas: Plus Jakarta Sans, Sora, General Sans (pendiente elegir 1 al montar tokens)
  - Body: misma familia, peso regular/medium
  - Radio: cards ~20-24px · botones totalmente redondos (píldora)
  - Espaciado: medio — cards con padding generoso (~16-20px)
  - Sombras: ninguna/sutil — el contraste lo da el color, no la elevación
  - Bordes: no visibles, todo por bloques de color
  - Textura/gradiente: SÍ — blobs/olas naranjas translúcidas detrás del contenido, degradado marrón→negro de fondo
  - Gráficos/dataviz: donas de progreso multicolor (macros), barras naranjas (tendencia de calorías)
  - Íconos: rellenos, coloridos, estilo amigable/redondeado (íconos de macro en circulitos de color)
  - Layout: dashboard tipo tarjetas apiladas + carrusel de onboarding con mascota
  - Detalle firma: las olas naranjas translúcidas detrás del mockup + la dona de macros multicolor
- Prohibiciones anti-IA que la referencia LEVANTA: modo oscuro + acento vibrante + formas translúcidas tipo glow — permitidas porque las pidió el usuario explícitamente (protocolo REFERENCIA=CONTRATO, 16). Se valida contraste AA al montar tokens reales.

## Personalidad compilada
- 3 adjetivos: cálido, energético, motivador
- Motion (a compilar en Sesión 2 con 11): spring rebote medio · duración base ~250-300ms · celebraciones intensidad alta en hitos de racha/gemas · radio tendencial 20-24px

## Brand kit (borrador — se valida y ajusta al montar globals.css)
- Fondo: #241610 · Superficie: #3A2418 · Texto 1º/2º: #F7EEE3 / #B8A697
- Acento: #FF7A1F (CTAs, racha, gemas, blobs decorativos)
- Semánticos: proteína #8BC34A · carbos #FF9F43 · grasas #4FC3F7 · error #FF5252
- Display/Body: por elegir entre Plus Jakarta Sans / Sora / General Sans (Sesión 2, al montar el proyecto)
- Radio: 20-24px cards, píldora en botones · Espaciado base: 4·8·12·16·24·32·48·64
- Dispositivo ownable: blobs naranjas translúcidos detrás de las tarjetas clave (home, racha, gemas)

## Trazabilidad y vetos
- Protocolo A/B/C: PENDIENTE — se ejecuta al montar el proyecto (Sesión 2): 3 interpretaciones fieles a esta paleta, que divergen solo en composición/densidad
- Paleta derivada de: referencia del usuario (capturas de Cal AI, carrusel de marketing oscuro) — tomada tal cual, es un contrato de fidelidad
- Modo (oscuro) DERIVADO por: mandato explícito del usuario, no asumido por defecto

## Actualización de referencia (2026-08-19, segunda vuelta) — CONTRATO VIGENTE
El usuario compartió el carrusel real de App Store de Cal AI (6 pantallas) + 6 prompts propios de
ingeniería inversa. Esto REEMPLAZA la interpretación clara/plana intentada a mitad de sesión y
confirma modo oscuro como definitivo (no se vuelve a redecidir):
- Modo: OSCURO cálido, confirmado por segunda vez con referencia explícita — ya no se toca.
- Superficies: tarjetas "glass" (vidrio esmerilado) flotando sobre fotos reales de comida —
  fondo semitransparente + blur, no bloques de color sólido.
- Comida: FOTOGRAFÍA real (o simulación foto-realista de alto detalle), no íconos planos ni
  renders vectoriales simples — es el detalle que distingue "app seria" de "mockup genérico".
- Mascota 3D (SOLO onboarding, no en el dashboard/comida diaria): aguacate tierno estilo
  Pixar/3D suave, reemplaza al robot del original de Cal AI — brazos pequeños, textura glossy,
  luz cálida de acento. Aparece en la pantalla "la IA está armando tu plan", nunca sobre los
  íconos de alimentos (ese uso ya fue rechazado por el usuario por verse infantil).
- 6 pantallas ancla identificadas: dashboard/resumen diario, estadísticas (racha + tendencia +
  dona semanal), recetario (buscador + grid con fotos), escaneo (cámara + detección en vivo),
  desglose de plato (foto + panel glass de macros/ingredientes), onboarding con el aguacate.

## Actualización de referencia (2026-08-19, tercera vuelta) — CONTRATO DEFINITIVO, YA NO SE REDECIDE
El usuario dio un nuevo prompt de referencia: "3D luminous glassmorphism" sobre fondo BLANCO
estéril, no oscuro. Reemplaza la vuelta anterior (oscuro). El usuario confirmó explícitamente
que esta es la dirección DEFINITIVA — no se vuelve a alternar entre claro/oscuro.
- Modo: CLARO, fondo blanco/gris muy claro casi estéril — DEFINITIVO.
- Device de superficie: glass luminoso — paneles translúcidos con borde biselado que brilla
  (glow de color sutil en el borde, no solo blur), no glass plano.
- Acentos: naranja vibrante (calorías/CTAs) + verde salud (progreso/checks/métricas) — dos
  acentos, no uno solo (excepción justificada: uno es "acción/dato", el otro es "salud/logro").
- Anillos de progreso: "3D luminosos" — con resplandor de color alrededor del anillo, no plano.
- Logo: manzana estilizada simple (glifo geométrico, no ilustración detallada).
- Mascota 3D (aguacate/brócoli tierno): se mantiene SOLO para momentos de logro/racha
  (insignia con trofeo), igual que antes solo en onboarding — nunca sobre la comida del día a día.
- 4 pantallas ancla de este prompt: dashboard (con logo + 3 anillos + comida reciente), escaneo
  con etiquetas flotantes por ingrediente, análisis detallado del plato, racha/progreso con
  gráfica de línea + insignia de logro con mascota.

## Idioma UI: español latino neutro · Fecha de cierre: CERRADO — modo CLARO + glass luminoso + naranja/verde, definitivo 2026-08-19 · Aprobada por el usuario: SÍ, explícitamente definitivo (no se vuelve a alternar)
