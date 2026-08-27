import { LegalLayout, LegalSeccion } from '@/components/legal/LegalLayout';

export default function TerminosPage() {
  return (
    <LegalLayout titulo="Términos y Condiciones" actualizado="26 de agosto de 2026">
      <LegalSeccion titulo="1. Qué es Calofit AI">
        <p>
          Calofit AI es una aplicación que estima calorías y macronutrientes a partir de una foto de tu
          comida, usando inteligencia artificial. Está pensada como una herramienta de apoyo para llevar un
          registro de tu alimentación — no reemplaza el consejo de un nutricionista, médico o profesional
          de la salud (ver nuestro{' '}
          <a href="/aviso-ia" className="underline">
            Aviso sobre el uso de IA
          </a>
          ).
        </p>
        <p>
          <strong>Lo que Calofit AI NO hace:</strong> no diagnostica condiciones médicas, no sustituye un
          plan nutricional profesional, y las estimaciones de calorías/macros pueden tener errores — la IA
          puede equivocarse, especialmente con platos poco comunes o fotos de mala calidad.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="2. Tu cuenta">
        <p>
          Necesitas crear una cuenta con tu correo electrónico para usar Calofit AI. Eres responsable de
          mantener el acceso a tu correo seguro, ya que es la única forma de iniciar sesión (no usamos
          contraseñas).
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="3. Uso aceptable">
        <p>Al usar Calofit AI aceptas no:</p>
        <ul className="flex flex-col gap-2">
          <li>• Subir fotos que no sean de comida, o contenido ilegal, ofensivo o dañino.</li>
          <li>• Intentar dañar, sobrecargar o acceder sin autorización a nuestros sistemas.</li>
          <li>• Usar la app para fines distintos al seguimiento personal de tu alimentación.</li>
        </ul>
        <p>
          Nos reservamos el derecho de suspender o cerrar cuentas que incumplan estas condiciones, con
          aviso previo cuando sea razonablemente posible.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="4. Suscripción y pagos">
        <p>
          Calofit AI se contrata como una suscripción con renovación automática, procesada a través de{' '}
          <strong>Hotmart</strong>. El precio, la periodicidad (mensual o anual) y la fecha de tu próximo
          cobro se muestran claramente antes de que confirmes el pago. Puedes cancelar en cualquier momento
          desde tu cuenta o el portal de compras de Hotmart — la cancelación es tan fácil como la
          contratación, y deja de cobrarte desde el siguiente ciclo.
        </p>
        <p>
          Ver también nuestra{' '}
          <a href="/reembolsos" className="underline">
            Política de Reembolsos
          </a>
          .
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="5. Propiedad de los resultados de la IA">
        <p>
          Los análisis de calorías/macros que la IA genera a partir de tus fotos son tuyos, para tu uso
          personal dentro de la app. No reclamamos propiedad sobre tus fotos ni sobre los resultados
          generados para ti.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="6. Limitación de responsabilidad">
        <p>
          Calofit AI se ofrece "tal cual". En la medida permitida por la ley, no somos responsables de
          decisiones que tomes basándote en las estimaciones de la IA, incluyendo decisiones de salud,
          dieta o ejercicio. Los cálculos de calorías/macros pueden ser incorrectos o incompletos —
          verifica siempre con criterio propio o con un profesional cuando la decisión importe de verdad.
          Ver el detalle completo en nuestro{' '}
          <a href="/aviso-ia" className="underline">
            Aviso sobre el uso de IA
          </a>
          .
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="7. Ley aplicable">
        <p>
          Estos Términos se rigen por la legislación española. Cualquier disputa se someterá a los
          juzgados y tribunales competentes de España, sin perjuicio de los derechos que la normativa de
          protección al consumidor de tu país de residencia te reconozca.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="8. Contacto">
        <p>
          Para cualquier duda sobre estos Términos, escríbenos a{' '}
          <a href="mailto:luciahouse483@gmail.com" className="underline">
            luciahouse483@gmail.com
          </a>
          .
        </p>
      </LegalSeccion>
    </LegalLayout>
  );
}
