import { LegalLayout, LegalSeccion } from '@/components/legal/LegalLayout';

export default function AvisoIAPage() {
  return (
    <LegalLayout titulo="Aviso sobre el uso de Inteligencia Artificial" actualizado="26 de agosto de 2026">
      <LegalSeccion titulo="Esto es orientación, no consejo profesional">
        <p>
          Calofit AI usa un modelo de inteligencia artificial para estimar las calorías y macronutrientes
          de una foto de tu comida. <strong>Esta estimación puede ser incorrecta o incompleta</strong> — la
          IA puede confundir ingredientes, calcular mal las porciones, o no reconocer bien un plato poco
          común.
        </p>
        <p>
          Los resultados que ves son <strong>orientación generada por IA, no consejo médico, nutricional
          ni profesional de ningún tipo</strong>. Calofit AI no diagnostica condiciones de salud ni
          reemplaza a un nutricionista, médico o profesional certificado.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="Tú decides, bajo tu responsabilidad">
        <p>
          Las decisiones que tomes sobre tu alimentación, salud o rutina a partir de lo que la app te
          muestra son responsabilidad tuya. Si tienes una condición de salud, alergias, o sigues un
          tratamiento médico, consulta siempre con un profesional antes de tomar decisiones importantes
          basadas en estos datos.
        </p>
      </LegalSeccion>

      <LegalSeccion titulo="Cómo funciona técnicamente">
        <p>
          Cuando subes una foto, se envía a un proveedor externo de inteligencia artificial (Google
          Gemini) para su análisis. El proveedor procesa la imagen y devuelve una estimación; la imagen no
          se guarda en nuestros servidores. Ver más detalle en nuestra{' '}
          <a href="/privacidad" className="underline">
            Política de Privacidad
          </a>
          .
        </p>
      </LegalSeccion>
    </LegalLayout>
  );
}
