import { Resend } from "resend";
import type { LeadFormData } from "@/app/actions/leads";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — email sending is disabled");
    return null;
  }
  if (!_resend) _resend = new Resend(apiKey);
  return _resend;
}

const FROM_ADDRESS = "Stttock CRM <noreply@stttock.com>";
const NOTIFY_TO = "quotes@stttock.com";

export async function sendLeadNotification(data: LeadFormData): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const planLabel = data.plan === "cadena" ? "Cadena" : "Enterprise";
  const totalStaff =
    data.meseros + data.jefes_barra + data.managers + data.admins;

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: [NOTIFY_TO],
    subject: `[CRM] Nuevo lead ${planLabel} — ${data.negocio}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0d0d0f;color:#f0f0f0;padding:32px;border-radius:12px;">
        <p style="font-size:10px;letter-spacing:.2em;color:#555;text-transform:uppercase;margin:0 0 4px;">Stttock CRM</p>
        <h2 style="margin:0 0 24px;font-weight:300;font-size:22px;">Nuevo Lead — Plan ${planLabel}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;font-size:13px;width:130px;">Negocio</td><td style="padding:8px 0;font-size:14px;">${data.negocio}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Nombre</td><td style="padding:8px 0;font-size:14px;">${data.nombre}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Correo</td><td style="padding:8px 0;font-size:14px;"><a href="mailto:${data.correo}" style="color:#4ade80;">${data.correo}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Teléfono</td><td style="padding:8px 0;font-size:14px;"><a href="tel:${data.telefono}" style="color:#4ade80;">${data.telefono}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Sucursales</td><td style="padding:8px 0;font-size:14px;">${data.sucursales}</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;">Staff total</td><td style="padding:8px 0;font-size:14px;">${totalStaff} personas</td></tr>
          <tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Desglose staff</td><td style="padding:8px 0;font-size:13px;color:#aaa;">
            Meseros: ${data.meseros} · Jefes de barra: ${data.jefes_barra} · Managers: ${data.managers} · Admins: ${data.admins}
          </td></tr>
        </table>
        <div style="margin-top:28px;">
          <a href="https://stttock.com/crm" style="background:#22c55e;color:#000;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:.05em;">Ver en CRM</a>
        </div>
        <p style="margin-top:32px;font-size:11px;color:#444;">Stttock · ${new Date().toLocaleDateString("es-MX", { dateStyle: "long" })}</p>
      </div>
    `,
  });
}
