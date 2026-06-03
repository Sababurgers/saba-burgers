import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe no configurado" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Sin firma" }, { status: 400 });

  let event: import("stripe").Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && session.customer_email) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const total = session.amount_total ? (session.amount_total / 100).toFixed(2).replace(".", ",") + " €" : "—";
      const m = session.metadata ?? {};
      const when = m.pickupTime === "asap" || !m.pickupTime ? "Lo antes posible" : m.pickupTime;
      const how = m.method === "delivery" ? "Delivery" : "Recoger en local";

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "reservas@sababurgers.es",
        to: process.env.RESEND_TO_EMAIL ?? "hola@sababurgers.es",
        subject: `[Pedido pagado] ${m.name ?? session.id.slice(-6)} · ${total}`,
        html: `
          <div style="font-family:sans-serif;color:#1c1814">
            <h2>Nuevo pedido pagado ✓</h2>
            <p><strong>${how}</strong> · ${when}</p>
            <p>Cliente: ${m.name ?? "—"}${m.phone ? ` · ${m.phone}` : ""}</p>
            <p>Total: <strong>${total}</strong></p>
            <p>Email cliente: ${session.customer_email}</p>
            <p style="color:#5a5249;font-size:12px">ID Stripe: <code>${session.id}</code></p>
          </div>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
