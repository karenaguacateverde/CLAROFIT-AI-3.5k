// Plantillas de los correos transaccionales del negocio. HTML simple e inline
// (los clientes de correo no soportan CSS moderno) — una columna, botón
// grande, sin texto grosero ni urgencia falsa. Copy en la voz de Calofit:
// cercana, sin culpa, directa.

const BASE = (contenido: string) => `
<div style="background:#f7f8fa;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;">
    <p style="margin:0 0 24px;font-size:20px;font-weight:700;color:#ff7a1f;">Calofit AI</p>
    ${contenido}
    <p style="margin:32px 0 0;font-size:12px;color:#9aa1ab;">
      ¿Dudas? Escríbenos a luciahouse483@gmail.com
    </p>
  </div>
</div>`;

const BOTON = (href: string, texto: string) => `
  <a href="${href}" style="display:inline-block;margin-top:20px;background:#ff7a1f;color:#ffffff;
    text-decoration:none;font-weight:700;font-size:16px;padding:14px 28px;border-radius:999px;">
    ${texto}
  </a>`;

export function correoAcceso(link: string) {
  return {
    asunto: '🎉 Tu acceso a Calofit AI ya está listo',
    html: BASE(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#1b2024;">¡Gracias por tu compra!</h1>
      <p style="margin:0;font-size:16px;line-height:1.5;color:#4a525c;">
        Ya puedes entrar a Calofit AI y empezar a escanear tus platos. Toca el botón de abajo —
        no necesitas contraseña.
      </p>
      ${BOTON(link, 'Entrar a Calofit AI')}
      <p style="margin:20px 0 0;font-size:12px;color:#9aa1ab;">
        Si el botón no funciona, copia este link: ${link}
      </p>
    `),
  };
}

export function correoBienvenida(nombre: string) {
  return {
    asunto: `${nombre ? nombre + ', tu' : 'Tu'} primera semana en Calofit AI`,
    html: BASE(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#1b2024;">Empecemos con el pie derecho</h1>
      <p style="margin:0;font-size:16px;line-height:1.5;color:#4a525c;">
        Lo único que necesitas para ver resultados: escanea tu comida cada vez que comas, aunque sea
        rápido. Entre más registres, más útil se vuelve tu progreso.
      </p>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.5;color:#4a525c;">
        Tip: hazlo ANTES de comer, así no se te olvida.
      </p>
    `),
  };
}

export function correoDunning() {
  return {
    asunto: 'No pudimos cobrar tu suscripción de Calofit AI',
    html: BASE(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#1b2024;">Hubo un problema con tu pago</h1>
      <p style="margin:0;font-size:16px;line-height:1.5;color:#4a525c;">
        Tu banco rechazó el cobro de este mes — puede ser fondos, una tarjeta vencida, o un bloqueo
        de seguridad. Tu acceso sigue activo por unos días mientras lo resuelves.
      </p>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.5;color:#4a525c;">
        Actualiza tu método de pago desde el correo de Hotmart o su portal de compras para no
        perder tu acceso.
      </p>
    `),
  };
}

export function correoCancelacion() {
  return {
    asunto: 'Lamentamos que te vayas de Calofit AI',
    html: BASE(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#1b2024;">Tu suscripción quedó cancelada</h1>
      <p style="margin:0;font-size:16px;line-height:1.5;color:#4a525c;">
        Vas a seguir teniendo acceso hasta el final del período que ya pagaste. Si cambias de
        opinión, puedes volver cuando quieras.
      </p>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.5;color:#4a525c;">
        Si algo no te gustó o hubo un problema, cuéntanos — nos ayuda a mejorar.
      </p>
    `),
  };
}
