// Envío de correos transaccionales de marca (acceso, dunning, bienvenida) vía
// la API de Resend — separado del SMTP que usa Supabase para el login normal.
// Nunca debe tumbar el flujo que lo llama (un pago o un login no pueden
// fallar porque el correo bonito no se pudo mandar): siempre atrapa errores.

const REMITENTE = 'Calofit AI <hola@tuemprendimientoencasaa.online>';
const REMITENTE_RESPALDO = 'Calofit AI <onboarding@resend.dev>'; // mientras el dominio se verifica

export async function enviarCorreo({
  destinatario,
  asunto,
  html,
}: {
  destinatario: string;
  asunto: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('enviarCorreo: falta RESEND_API_KEY, correo no enviado', { destinatario, asunto });
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: REMITENTE, to: destinatario, subject: asunto, html }),
    });

    if (!res.ok) {
      // Reintento con el remitente de respaldo por si el dominio propio aún no está verificado.
      const detalle = await res.text().catch(() => '');
      console.error('enviarCorreo: falló con remitente propio, reintentando con respaldo', {
        destinatario,
        status: res.status,
        detalle,
      });
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({ from: REMITENTE_RESPALDO, to: destinatario, subject: asunto, html }),
      });
    }
  } catch (e) {
    console.error('enviarCorreo: error de red', { destinatario, error: e instanceof Error ? e.message : e });
  }
}
