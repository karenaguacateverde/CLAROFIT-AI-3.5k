'use client';

// Landing de Calofit AI — compuesta desde el kit canónico (components/landing/),
// copy marcado en docs/copy/landing.md (trazado a FICHA-AVATAR.md), tokens en
// components/landing/tokens.css (tematizados con FICHA-ARTE.md). No se reinterpreta
// la estructura del kit — ver plantillas-codigo/landing/README.md.

import {
  ChefHat,
  FileText,
  ListChecks,
  Target,
} from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Logros } from '@/components/landing/Logros';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { TestimoniosCapturas } from '@/components/landing/TestimoniosCapturas';
import { Bonos } from '@/components/landing/Bonos';
import { OfertaDosOpciones } from '@/components/landing/OfertaDosOpciones';
import { Testimonios } from '@/components/landing/Testimonios';
import { Garantia } from '@/components/landing/Garantia';
import { Estadisticas } from '@/components/landing/Estadisticas';
import { Faq } from '@/components/landing/Faq';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { AvisoMeta } from '@/components/landing/AvisoMeta';
import { StickyCtaMobile } from '@/components/landing/ui';

// Modelo 2 (onboarding-first anónimo → paywall → login, ESTADO.md → Decisiones técnicas):
// el CTA lleva a /onboarding, nunca directo al checkout desde el hero.
const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Probar mi primer escaneo gratis';

export default function LandingCalofitAI() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="Calofit AI"
        loginHref="/entrar"
        h1Marked="¿Llevas meses entrenando duro y [acento]la panza abdominal sigue exactamente igual[/acento]?"
        subtitleMarked="Calofit AI convierte tu cámara en un escáner inteligente para calcular calorías y macros al instante con una foto, sin que tengas que privarte de tu comida ni pesar cada gramo."
        ctaLabel={CTA_LABEL}
        scrollHintLabel="Descubre todo lo que incluye 👇"
        visual={
          <img
            src="/landing/frame-escaneo.jpg"
            alt="Calofit AI — conoce las calorías de tu comida en segundos"
            width={768}
            height={1146}
            loading="eager"
            className="h-full w-full object-cover"
          />
        }
      />

      {/* 4. LOGROS — reemplaza a Solución (pedido explícito 2026-08-22) */}
      <Logros
        tituloMarked="Lo que lograrás con [acento]Calofit AI[/acento]"
        subtituloMarked="El fin de las cuentas manuales y la incertidumbre de cuántas calorías estás comiendo."
        logros={[
          {
            numero: '01',
            titulo: 'Come sin tener que calcular tus calorías manualmente',
            detalle: 'Olvídate de la calculadora y de pesar cada gramo. Toma una foto a tu plato y listo.',
          },
          {
            numero: '02',
            titulo: 'Registra cualquier plato de tu comida casera',
            detalle: 'Registra tus guisos y platos de todos los días sin dietas imposibles ni complicaciones.',
          },
          {
            numero: '03',
            titulo: 'Obtén tus macros y tu proteína real en segundos',
            detalle: 'Conoce qué estás consumiendo para que veas cambios reales en tu cuerpo sin perder tiempo.',
          },
        ]}
      />

      {/* 5. LA APP POR DENTRO — screenshots reales del usuario */}
      <AppPorDentro
        tituloMarked="Así se ve por dentro Calofit AI: [acento]el contador de calorías inteligente[/acento]."
        subtitulo="Mira lo fácil que es registrar tus comidas reales en segundos."
        frames={[
          { src: '/landing/dentro-1-bowl.webp', label: 'Ideas para tu tazón de proteínas', propioMarco: false },
          { src: '/landing/dentro-3-control.webp', label: 'Rastreo diario de calorías', propioMarco: true },
          { src: '/landing/dentro-2-pasta.webp', label: 'Mira qué hay en tu plato', propioMarco: true },
          { src: '/landing/dentro-4-progreso.webp', label: 'Seguimiento del progreso', propioMarco: true },
          { src: '/landing/dentro-5-comparar.webp', label: 'Mira el cambio', propioMarco: true },
          { src: '/landing/dentro-6-alimentos.webp', label: 'Reconoce comida casera y típica LATAM', propioMarco: false },
        ]}
        ctaLabel="Quiero registrarme con el bono 7 días gratis"
        ctaHref={CTA_HREF}
        precioTachado="$27"
        precioActual="$7"
        escasezPorcentaje={82}
        escasezLabel="Quedan pocos cupos con este precio"
        garantiaLabel="7 días de garantía incondicional"
        metodosPagoImg="/landing/oferta-metodos-pago.png"
      />

      {/* 5B. TESTIMONIOS CON CAPTURAS REALES — pedido explícito 2026-08-22 */}
      <TestimoniosCapturas
        titulo="Lo que dicen nuestros clientes de Calofit AI"
        testimonios={[
          { img: '/landing/testimonio-1.webp', nombre: 'Vannesa Mora', pais: 'Colombia', bandera: '🇨🇴' },
          { img: '/landing/testimonio-2.webp', nombre: 'Carlos Fuentes', pais: 'España', bandera: '🇪🇸' },
          { img: '/landing/testimonio-3.webp', nombre: 'Monica Torres', pais: 'Estados Unidos', bandera: '🇺🇸' },
        ]}
        ctaLabel="Haz clic y regístrate ahora con el 65% OFF"
        ctaHref={CTA_HREF}
        ctaSubtexto="Si te registras ahora te llevas 6 bonos de regalo 🎁"
      />

      {/* 5C. BONOS — 4 entregables digitales reales, distintos de las funciones
          de la app (evita prometer features fuera del MVP en la oferta) */}
      <Bonos
        tituloMarked="Además, si te unes hoy [acento]también te llevas[/acento]:"
        bonos={[
          {
            icon: ChefHat,
            img: '/landing/bono-recetas.webp',
            nombre: '40 recetas bajas en calorías, listas en 10 minutos',
            detalle: 'Comidas caseras rápidas para los días que no tienes tiempo de cocinar.',
          },
          {
            icon: FileText,
            img: '/landing/bono-snacks.webp',
            nombre: 'Recetas de dulces y snacks altos en proteína',
            detalle: 'Antojos que sí encajan en tu meta diaria de macros.',
          },
          {
            icon: ListChecks,
            img: '/landing/bono-lista-compra.webp',
            nombre: 'Lista de compra para bajar de peso sin gastar de más',
            detalle: 'Qué comprar cada semana sin pasarte del presupuesto.',
          },
          {
            icon: Target,
            img: '/landing/bono-macros.webp',
            nombre: 'Plantilla de tu meta de macros',
            detalle: 'Tu objetivo de calorías y macros calculado y listo para guardar.',
          },
        ]}
      />

      {/* 6B. OFERTA FINAL — 2 planes lado a lado (pedido explícito 2026-08-22) */}
      <OfertaDosOpciones
        mockupPremium="/landing/oferta-mockup-bonos.webp"
        selloGarantia="/landing/sello-garantia.webp"
        metodosPago="/landing/oferta-metodos-pago.png"
        ctaHref={CTA_HREF}
      />

      {/* 6C. TESTIMONIOS — ilustrativo, pedido explícito 2026-08-22 (ver nota en FICHA-MERCADO.md) */}
      <Testimonios
        calificacion="4.9"
        totalResenas={1496}
        desglose={[
          { etiqueta: 'Fantástico', porcentaje: 93.6 },
          { etiqueta: 'Buenísimo', porcentaje: 3.8 },
          { etiqueta: 'Bien', porcentaje: 2.3 },
        ]}
        testimonios={[
          {
            frase: '¡Por fin entiendo mis calorías!',
            texto: 'Llevaba meses estancada sin saber por qué no bajaba la panza. Con Calofit AI le tomo foto a mi plato y veo mis macros exactos al instante. Es súper adictivo y muy fácil de usar.',
            nombre: 'Lucía Méndez',
            pais: 'México',
            bandera: '🇲🇽',
          },
          {
            frase: 'El plan de 21 días es brutal',
            texto: 'El plan de 21 días me cambió la vida por completo. Las recetas son deliciosas, prácticas y con ingredientes que sí tengo en mi refrigerador. Nada de dietas imposibles.',
            nombre: 'Mateo Fernández',
            pais: 'Argentina',
            bandera: '🇦🇷',
          },
          {
            frase: 'Adiós a la báscula de cocina',
            texto: 'Odiaba tener que pesar cada gramo de comida antes de comer. Ahora solo saco el celular, escaneo mi plato casero y la app hace todo el cálculo de proteína por mí. Una maravilla.',
            nombre: 'Sofía Benítez',
            pais: 'Colombia',
            bandera: '🇨🇴',
          },
          {
            frase: 'Recetas caseras reales',
            texto: 'Lo que más me gusta es que la IA entiende la comida de nuestra cultura, no puras ensaladas aburridas de gimnasio. Las recetas del plan están riquísimas.',
            nombre: 'Javier Ordóñez',
            pais: 'España',
            bandera: '🇪🇸',
          },
          {
            frase: 'Control de proteína sin esfuerzo',
            texto: 'Siempre fallaba en llegar a mi meta de proteína diaria porque me daba flojera calcular. Con esta aplicación es tan rápido que ya no hay excusas. Mis cambios en el espejo se notan.',
            nombre: 'Valeria Ríos',
            pais: 'Chile',
            bandera: '🇨🇱',
          },
          {
            frase: 'La mejor inversión para mi salud',
            texto: 'Probé de todo antes y siempre lo dejaba a los tres días por lo complicado que era registrar las calorías. Calofit AI lo simplificó al 100%. Vale cada centavo.',
            nombre: 'Esteban Rojas',
            pais: 'Costa Rica',
            bandera: '🇨🇷',
          },
          {
            frase: 'Increíble precisión al instante',
            texto: 'Parece magia. Le tomas la foto al guiso de la abuela o al almuerzo del día y te desglosa las calorías y macros perfecto. Me ayudó a entender por fin cómo comer bien.',
            nombre: 'Mariana Silva',
            pais: 'Perú',
            bandera: '🇵🇪',
          },
          {
            frase: 'Resultados reales sin pasar hambre',
            texto: 'Empecé el plan de 21 días dudando, pero la flexibilidad que te da la app para registrar tus platos reales sin prohibiciones hace que por fin sea sostenible en el tiempo.',
            nombre: 'Andrés Parra',
            pais: 'Uruguay',
            bandera: '🇺🇾',
          },
          {
            frase: 'Súper práctico para el día a día',
            texto: 'Trabajo todo el día y no tengo tiempo para contar macros manualmente. Tomar una foto de 3 segundos resolvió mi problema nutricional. 100% recomendada.',
            nombre: 'Camila Domínguez',
            pais: 'Estados Unidos',
            bandera: '🇺🇸',
          },
          {
            frase: 'Por fin veo cambios en la panza',
            texto: 'El problema nunca era mi cuerpo, era que estaba volando a ciegas con los números. Desde que uso Calofit AI y sigo sus guías, la ropa me queda suelta otra vez.',
            nombre: 'Diego Navarro',
            pais: 'Ecuador',
            bandera: '🇪🇨',
          },
        ]}
      />

      {/* 7. GARANTÍA — nombre propio + condición concreta + piso Hotmart real (FICHA-MERCADO) */}
      <Garantia
        sello="/landing/sello-garantia.webp"
        nombre="Garantía de Satisfacción con 0 Riesgo"
        condicionMarked="Estamos seguros que Calofit AI superará tus expectativas. Es por eso que te ofrecemos una garantía de satisfacción total de 7 días. Si no es lo que esperabas, contáctanos y te reembolsaremos el 100% de tu dinero, sin preguntas."
      />

      {/* 7B. ESTADÍSTICAS — pedido explícito 2026-08-22 (ver nota en FICHA-MERCADO.md) */}
      <Estadisticas
        tituloMarked="¿Sabías que controlar las calorías de lo que comes es la clave definitiva para transformar tu cuerpo?"
        subtitulo="Mira lo que revelan los datos de nutrición:"
        columnas={[
          { valor: 7000000, texto: 'Usuarios que controlan sus calorías al instante con IA.' },
          { valor: 1000, texto: 'Expertos recomiendan este método sin prohibiciones.' },
          { valor: 6257314, texto: 'Personas que bajaron de peso solo tomando fotos a su plato.' },
        ]}
      />

      {/* 8. FAQ — objeciones reales de FICHA-AVATAR.md */}
      <Faq
        items={[
          {
            pregunta: '¿La IA le va a atinar a un plato casero o un guisado?',
            respuestaMarked:
              'Está entrenada para reconocer comida típica LATAM, no solo bowls gringos — y si se equivoca, [b]se lo corriges hablando, no rellenando formularios[/b].',
          },
          {
            pregunta: '¿Me van a cobrar algo escondido?',
            respuestaMarked:
              'No. Ves el precio exacto antes de poner tu tarjeta, sin trials tramposos que cobran solos.',
          },
          {
            pregunta: 'Ya probé apps de calorías y las abandoné, ¿por qué esta sí?',
            respuestaMarked:
              'Porque no hay buscador ni báscula: [b]una foto reemplaza los 15-20 minutos de registro manual[/b].',
          },
          {
            pregunta: '¿Es mejor que MyFitnessPal?',
            respuestaMarked:
              'La queja más común de MyFitnessPal es el buscador manual — [b]aquí una foto reemplaza esa búsqueda[/b], y reconocemos comida casera y típica LATAM que su buscador en inglés no siempre encuentra.',
          },
          {
            pregunta: '¿Cuánto tardo en ver mi primer resultado?',
            respuestaMarked:
              'Tu primera foto te da calorías y macros en 3 segundos — sin esperar nada.',
          },
          {
            pregunta: '¿Qué pasa si no me sirve?',
            respuestaMarked:
              'Tienes 7 días de prueba y la Garantía de Satisfacción con 0 Riesgo: [b]un correo y te devolvemos todo[/b].',
          },
        ]}
        ctaLabel="Sí, quiero los 7 días de prueba gratis"
        ctaHref={CTA_HREF}
      />

      {/* 10. FOOTER LEGAL — enlaces PENDIENTES de contenido real (ver 47) */}
      <FooterLegal
        appName="Calofit AI"
        soporteEmail="luciahouse483@gmail.com"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
          { label: 'Aviso de IA', href: '/aviso-ia' },
        ]}
      />

      {/* 10B. AVISO META/FACEBOOK — pedido explícito 2026-08-22 */}
      <AvisoMeta appName="Calofit AI" />

      {/* Sticky CTA mobile — observa #hero, #oferta y #cta-final */}
      <StickyCtaMobile
        labelComercial="Quiero registrarme con el bono 7 días gratis"
        href={CTA_HREF}
        precioTachado="$27"
        precioActual="$7"
        escasezPorcentaje={82}
        escasezLabel="Quedan pocos cupos con este precio"
        garantiaLabel="7 días de garantía incondicional"
        metodosPagoImg="/landing/oferta-metodos-pago.png"
      />
    </div>
  );
}
