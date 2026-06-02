"use server";

import { z } from "zod";

const ReservationSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  partySize: z.coerce.number().int().min(1).max(10),
  name: z.string().min(2, "Mínimo 2 caracteres").max(80),
  phone: z.string().min(8, "Teléfono muy corto").max(20),
  email: z.string().email("Email inválido"),
  notes: z.string().max(300).optional(),
});

export type ReservationInput = z.infer<typeof ReservationSchema>;

export async function createReservation(input: ReservationInput) {
  const parsed = ReservationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: "Datos inválidos",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    const { date, time, partySize, name, email, notes } = parsed.data;

    const html = `
      <div style="font-family:sans-serif;color:#1c1814;max-width:600px">
        <div style="background:#1c1814;padding:24px 32px">
          <span style="color:#e0a13a;font-size:28px;font-weight:900;letter-spacing:0.05em">SABA</span>
        </div>
        <div style="padding:32px">
          <h2 style="margin:0 0 16px;font-size:24px">Reserva confirmada ✓</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#5a5249;font-family:monospace;text-transform:uppercase;font-size:11px">Día</td><td style="padding:8px 0;font-family:monospace">${date}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5249;font-family:monospace;text-transform:uppercase;font-size:11px">Hora</td><td style="padding:8px 0;font-family:monospace">${time}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5249;font-family:monospace;text-transform:uppercase;font-size:11px">Personas</td><td style="padding:8px 0;font-family:monospace">${partySize}</td></tr>
            <tr><td style="padding:8px 0;color:#5a5249;font-family:monospace;text-transform:uppercase;font-size:11px">Local</td><td style="padding:8px 0;font-family:monospace">C. Ausìás March, 22 · L'Olleria</td></tr>
            ${notes ? `<tr><td style="padding:8px 0;color:#5a5249;font-family:monospace;text-transform:uppercase;font-size:11px">Notas</td><td style="padding:8px 0">${notes}</td></tr>` : ""}
          </table>
          <p style="font-size:13px;color:#5a5249;margin-top:24px">Si necesitas cambiar o cancelar, escríbenos al <a href="https://wa.me/34722364407" style="color:#c8412a">722 364 407</a>.</p>
        </div>
      </div>
    `;

    await Promise.allSettled([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "reservas@sababurgers.es",
        to: email,
        subject: `Reserva Saba · ${date} a las ${time}`,
        html,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "reservas@sababurgers.es",
        to: process.env.RESEND_TO_EMAIL ?? "hola@sababurgers.es",
        subject: `[Nueva reserva] ${name} · ${date} ${time} · ${partySize} pers.`,
        html: `<pre>${JSON.stringify(parsed.data, null, 2)}</pre>`,
      }),
    ]);
  } else {
    console.log("[RESERVATION — sin Resend]", parsed.data);
  }

  return {
    ok: true as const,
    reservationId: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
  };
}
