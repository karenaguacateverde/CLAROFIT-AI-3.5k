import { LegalLayout, LegalSeccion, Resaltado } from '@/components/legal/LegalLayout';

export default function PrivacidadPage() {
  return (
    <LegalLayout titulo="Política de Privacidad" actualizado="26 de agosto de 2026">
      <LegalSeccion titulo="1. Quién trata tus datos">
        <p>
          Calofit AI es operada actualmente por <strong>Karen Barreño</strong>, persona física residente
          en España, hasta que se constituya una sociedad. Puedes contactarnos
          en cualquier momento en{' '}
          <a href="mailto:luciahouse483@gmail.com" className="underline">
            luciahouse483@gmail.com
          </a>{' '}
          para cualquier duda sobre tus datos.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="2. Qué datos recopilamos">
        <ul className="flex flex-col gap-2">
          <li>• <strong>Nombre y correo electrónico</strong>, para crear tu cuenta y comunicarnos contigo.</li>
          <li>
            • <strong>Fotos de tus platos de comida</strong>, que envías para que la IA calcule calorías y
            macros. Las fotos se envían directamente al proveedor de IA para su análisis y{' '}
            <Resaltado>no se guardan en nuestros servidores</Resaltado> — solo se guarda el resultado del
            análisis (el nombre del plato y sus calorías/macros), no la imagen.
          </li>
          <li>• <strong>Registros de comidas</strong> que analizas (plato, calorías, macros, fecha y hora).</li>
          <li>• <strong>Datos de uso básicos</strong> de la app, para saber qué funciona y qué falla.</li>
        </ul>
        <p>
          No te pedimos ubicación, fecha de nacimiento, teléfono, ni datos financieros — los pagos los
          procesa directamente nuestra pasarela de pago (Hotmart), nunca los vemos ni los guardamos
          nosotros.
        </p>
        <p>
          Darnos tu nombre y correo es necesario para poder crear tu cuenta — sin ellos no podemos
          ofrecerte el servicio. Subir fotos es voluntario: es la función principal de la app, pero puedes
          decidir no usarla en cualquier momento.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="3. Para qué usamos tus datos y con qué base legal">
        <p>Tratamos tus datos bajo dos bases legales del RGPD (Reglamento General de Protección de Datos):</p>
        <ul className="flex flex-col gap-2">
          <li>
            • <strong>Ejecución del contrato</strong> (art. 6.1.b RGPD): para darte el servicio que
            contrataste — crear tu cuenta, analizar tus fotos, guardar tu historial, cobrarte la
            suscripción.
          </li>
          <li>
            • <strong>Tu consentimiento</strong> (art. 6.1.a RGPD): al aceptar esta política y nuestros
            Términos en el registro, autorizas el envío de tus fotos a un proveedor de IA externo (ver
            sección 4).
          </li>
        </ul>
        <p>
          Puedes retirar tu consentimiento en cualquier momento (por ejemplo, dejando de usar el escaneo
          de fotos, o eliminando tu cuenta) sin que eso afecte la licitud del tratamiento hecho antes de
          retirarlo.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="4B. Decisiones automatizadas y transparencia de IA">
        <p>
          Calofit AI usa un sistema de inteligencia artificial para generar automáticamente el resultado
          de calorías y macros a partir de tu foto — es una función central de la app, así que no hay
          revisión humana de cada resultado individual. Esto <strong>no es una decisión automatizada con
          efectos legales o significativos sobre ti</strong> en el sentido del art. 22 RGPD: es
          información orientativa que tú interpretas y decides usar o no (ver nuestro{' '}
          <a href="/aviso-ia" className="underline">
            Aviso sobre el uso de IA
          </a>
          ). Conforme al Reglamento europeo de IA (2026), te informamos con claridad, dentro de la propia
          app, cada vez que estás viendo un resultado generado por IA.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="4. Con quién compartimos tus datos (subprocesadores)">
        <p>Nunca vendemos tus datos. Los compartimos solo con los proveedores que necesitamos para operar:</p>
        <ul className="flex flex-col gap-2">
          <li>
            • <strong>Supabase</strong> — base de datos, autenticación e inicio de sesión. Aloja tu cuenta
            y tu historial de comidas.
          </li>
          <li>
            • <strong>Google (Gemini API)</strong> — analiza las fotos que subes para calcular calorías y
            macros. Esto implica una <strong>transferencia internacional de datos a Estados Unidos</strong>{' '}
            (ver sección 5).
          </li>
          <li>• <strong>Vercel</strong> — aloja la aplicación web (el servidor que sirve Calofit AI).</li>
          <li>• <strong>Resend</strong> — envía los correos de inicio de sesión (el "link mágico").</li>
          <li>
            • <strong>Hotmart</strong> — procesa el pago de tu suscripción. Hotmart nunca nos comparte el
            número completo de tu tarjeta.
          </li>
          <li>
            • <strong>Meta (Facebook/Instagram)</strong> — solo si aceptaste el aviso de cookies, para
            medir el rendimiento de nuestros anuncios.
          </li>
        </ul>
      </LegalSeccion>

      <LegalSeccion titulo="5. Transferencia internacional de datos (IA)">
        <p>
          Cuando subes una foto de tu comida, esa imagen viaja a los servidores de Google (Gemini API) en
          Estados Unidos para ser analizada. Es una transferencia internacional de datos fuera del Espacio
          Económico Europeo, y se realiza bajo los mecanismos de garantía que ofrece el proveedor
          (cláusulas contractuales tipo / marco de adecuación vigente con EE. UU.). Al aceptar esta
          política, autorizas este envío. La imagen se procesa y se descarta — no queda almacenada del
          lado de Calofit AI.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="6. Cuánto tiempo guardamos tus datos">
        <p>
          Mientras tu cuenta exista, guardamos tu perfil y tu historial de comidas para que puedas ver tu
          progreso. Si eliminas tu cuenta, todo lo anterior se borra de inmediato de nuestra base de datos
          activa (ver sección 7). Puede quedar en copias de seguridad técnicas de corta duración hasta
          que el ciclo normal de respaldo las sobrescriba (no es una copia que consultemos ni usemos —
          es solo para poder recuperar el servicio ante una falla técnica).
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="7. Tus derechos y cómo eliminar tu cuenta">
        <p>
          Bajo el RGPD tienes derecho a acceder, rectificar, eliminar, oponerte, limitar el tratamiento y
          pedir la portabilidad de tus datos. Puedes ejercerlos así:
        </p>
        <ul className="flex flex-col gap-2">
          <li>
            • <Resaltado>Eliminar tu cuenta tú mismo, en cualquier momento:</Resaltado> ve a tu Perfil
            dentro de la app y toca "Eliminar mi cuenta". Esto borra tu perfil, tu historial de comidas y
            tu acceso de inmediato, sin necesidad de escribirnos.
          </li>
          <li>
            • Para cualquier otro derecho (acceso, rectificación, portabilidad), escríbenos a{' '}
            <a href="mailto:luciahouse483@gmail.com" className="underline">
              luciahouse483@gmail.com
            </a>{' '}
            y te respondemos en un plazo razonable.
          </li>
          <li>
            • También puedes presentar una reclamación ante la Agencia Española de Protección de Datos
            (AEPD) si consideras que no hemos tratado bien tus datos.
          </li>
        </ul>
      </LegalSeccion>

      <LegalSeccion titulo="8. Cookies">
        <p>
          Usamos cookies técnicas necesarias para mantener tu sesión iniciada — esas no se pueden
          rechazar, son indispensables para que la app funcione.
        </p>
        <p>
          También usamos el <strong>Píxel de Meta</strong> (Facebook/Instagram) para medir qué tan bien
          funcionan nuestros anuncios — mide si alguien que vio un anuncio nuestro terminó usando la app.
          Esta cookie <strong>solo se activa si tú la aceptas</strong> en el aviso que aparece al entrar
          al sitio; puedes rechazarla y la app funciona igual. Meta procesa esa información según su
          propia política de privacidad.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="9. Menores de edad">
        <p>
          Calofit AI está pensada para mayores de 18 años. No recopilamos intencionalmente datos de
          menores. Si detectamos una cuenta de un menor, la eliminaremos.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="10. Si nos escribes o compras desde otro país">
        <p>
          Tratamos tus datos conforme al RGPD europeo, que es de los estándares de protección de datos
          más exigentes del mundo — por eso aplicamos los mismos derechos y garantías de esta política a
          cualquier persona que use Calofit AI, sin importar desde qué país nos escribas o compres. Si tu
          país tiene una ley de protección de datos propia (por ejemplo, la LGPD en Brasil, la Ley 1581 en
          Colombia o la LFPDPPP en México) con derechos adicionales específicos, contáctanos y los
          atendemos igual.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="11. Cambios a esta política">
        <p>
          Si hacemos un cambio importante en cómo tratamos tus datos, te avisaremos por correo antes de
          que entre en vigor. La fecha de la última actualización siempre está visible arriba de esta
          página.
        </p>
      </LegalSeccion>
    </LegalLayout>
  );
}
