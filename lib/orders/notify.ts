// Aviso de pedido nuevo. Si RESEND_API_KEY está configurada, manda un email
// al local y un comprobante al cliente (mismo patrón que las reservas). Si no,
// deja constancia en consola (modo demo).

import type { ValidatedOrder } from "@/lib/types/order";

function eur(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

function orderText(order: ValidatedOrder): string {
  const lines = order.items.map((i) => `  · ${i.qty}× ${i.name} — ${eur(i.lineTotal)}`).join("\n");
  const when = order.pickupTime === "asap" ? "Lo antes posible" : order.pickupTime;
  const how = order.method === "delivery" ? "Delivery" : "Recoger en local";
  const pay = order.payMethod === "online" ? "Pagado online" : "Paga en el local";
  const addr = order.delivery
    ? `\nDirección: ${order.delivery.address}${order.delivery.floor ? `, ${order.delivery.floor}` : ""}` +
      (order.delivery.notes ? `\nNotas: ${order.delivery.notes}` : "")
    : "";
  return (
    `${how} · ${when} · ${pay}\n\n` +
    `${lines}\n\n` +
    `Subtotal: ${eur(order.subtotal)}\n` +
    `Envío: ${order.shipping ? eur(order.shipping) : "Gratis"}\n` +
    `TOTAL: ${eur(order.total)}\n\n` +
    `Cliente: ${order.customer.name}\n` +
    `Móvil: ${order.customer.phone}\n` +
    `Email: ${order.customer.email}` +
    addr
  );
}

export async function notifyNewOrder(order: ValidatedOrder): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const text = orderText(order);

  // Modo demo: sin clave, solo dejamos rastro en los logs del servidor.
  if (!resendKey) {
    console.log("[PEDIDO — sin Resend]\n" + text);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "reservas@sababurgers.es";
  const toLocal = process.env.RESEND_TO_EMAIL ?? "hola@sababurgers.es";

  // No rompemos el pedido por un fallo de email: allSettled + log.
  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: toLocal,
      subject: `[Nuevo pedido] ${order.customer.name} · ${eur(order.total)}`,
      text,
    }),
    resend.emails.send({
      from,
      to: order.customer.email,
      subject: "Hemos recibido tu pedido — Saba Burgers",
      text: `¡Gracias por tu pedido, ${order.customer.name}!\n\n${text}\n\nTe avisaremos cuando esté listo.`,
    }),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[PEDIDO] Error enviando email:", r.reason);
  }
}
