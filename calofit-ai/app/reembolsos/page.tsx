import { LegalLayout, LegalSeccion, Resaltado } from '@/components/legal/LegalLayout';

export default function ReembolsosPage() {
  return (
    <LegalLayout titulo="Política de Reembolsos" actualizado="26 de agosto de 2026">
      <LegalSeccion titulo="Garantía de 7 días">
        <p>
          Si dentro de los <Resaltado>7 días</Resaltado> posteriores a tu primer pago no estás satisfecho
          con Calofit AI, escríbenos a{' '}
          <a href="mailto:luciahouse483@gmail.com" className="underline">
            luciahouse483@gmail.com
          </a>{' '}
          y <Resaltado>te devolvemos el 100% de tu dinero, sin preguntas</Resaltado>.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="Cómo se procesa">
        <p>
          Tu compra se realiza a través de <strong>Hotmart</strong>, nuestra pasarela de pago, que también
          gestiona el reembolso una vez lo aprobamos. El tiempo en que el dinero vuelve a tu método de pago
          depende de tu banco o tarjeta, no de nosotros.
        </p>
        <p>
          Si vives en Brasil, además de nuestra garantía de 7 días aplica el derecho de arrepentimiento del
          Código de Defensa del Consumidor (CDC), que Hotmart gestiona directamente.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="Prueba gratuita">
        <p>
          Si empezaste con los 7 días de prueba gratuita, puedes cancelar en cualquier momento antes de que
          termine sin que se te cobre nada. Si cancelas después del primer cobro, aplica la garantía de la
          sección anterior.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="Cancelaciones y suscripciones futuras">
        <p>
          <Resaltado>Cancelar tu suscripción es tan fácil como contratarla</Resaltado>: puedes hacerlo
          desde tu cuenta en Calofit AI o directamente desde el portal de compras de Hotmart, en cualquier
          momento. Al cancelar dejas de tener acceso al final del período que ya pagaste — no se te cobra
          de nuevo.
        </p>
      </LegalSeccion>
    </LegalLayout>
  );
}
