"use server";

import type { Order, ValidatedOrder } from "@/lib/types/order";
import { getProducts, getSiteSettings } from "@/lib/sanity/queries";
import { BUSINESS_HOURS } from "@/lib/data/business-hours";
import { validateOrder } from "@/lib/orders/validate";
import { notifyNewOrder } from "@/lib/orders/notify";

export interface PlaceOrderResult {
  ok: boolean;
  error?: string;
  redirectUrl?: string; // URL de pago de Stripe (pago online con clave configurada)
  confirmed?: boolean;  // pedido cerrado sin pasar por Stripe (en local o modo demo)
}

// Crea la sesión de pago de Stripe a partir de un pedido ya validado.
async function createStripeSession(order: ValidatedOrder, stripeKey: string): Promise<string | null> {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    payment_method_types: ["card", "bizum"] as never,
    customer_email: order.customer.email,
    metadata: {
      method: order.method,
      pickupTime: order.pickupTime,
      name: order.customer.name,
      phone: order.customer.phone,
    },
    line_items: [
      ...order.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      ...(order.shipping > 0
        ? [
            {
              price_data: {
                currency: "eur",
                product_data: { name: "Envío" },
                unit_amount: Math.round(order.shipping * 100),
              },
              quantity: 1,
            },
          ]
        : []),
    ],
    success_url: `${siteUrl}/pedido/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pedido`,
  });

  return session.url;
}

export async function placeOrder(order: Order): Promise<PlaceOrderResult> {
  // 1) Validar contra Sanity (precios + horario + datos)
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const horarios = settings.horarios?.length ? settings.horarios : BUSINESS_HOURS;
  const result = validateOrder(order, products, horarios);
  if (!result.ok) return { ok: false, error: result.error };

  const validated = result.order;

  // 2) Pago online
  if (order.payMethod === "online") {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      // Sin Stripe configurado → modo demo: registramos y confirmamos directamente.
      await notifyNewOrder(validated);
      return { ok: true, confirmed: true };
    }
    try {
      const url = await createStripeSession(validated, stripeKey);
      // El aviso definitivo se manda desde el webhook tras confirmarse el pago.
      if (url) return { ok: true, redirectUrl: url };
      return { ok: false, error: "No se pudo iniciar el pago. Inténtalo de nuevo." };
    } catch (err) {
      console.error("[PEDIDO] Error creando la sesión de Stripe:", err);
      return { ok: false, error: "No se pudo iniciar el pago. Inténtalo de nuevo." };
    }
  }

  // 3) Pago en el local → registrar + avisar
  await notifyNewOrder(validated);
  return { ok: true, confirmed: true };
}
