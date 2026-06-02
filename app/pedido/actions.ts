"use server";

import type { CartItem } from "@/lib/cart/store";

export async function createCheckoutSession(
  items: CartItem[],
  method: "delivery" | "pickup"
): Promise<string | null> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    console.warn("STRIPE_SECRET_KEY no configurada — redirigiendo a confirmación sin pago.");
    return null;
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);

  const shippingCost = method === "delivery" ? 250 : 0;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    payment_method_types: ["card", "bizum"] as never,
    line_items: [
      ...items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      ...(shippingCost > 0
        ? [
            {
              price_data: {
                currency: "eur",
                product_data: { name: "Envío" },
                unit_amount: shippingCost,
              },
              quantity: 1,
            },
          ]
        : []),
    ],
    success_url: `${process.env.SITE_URL ?? "http://localhost:3000"}/pedido/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL ?? "http://localhost:3000"}/pedido`,
  });

  return session.url;
}
