// Validación de pedidos en el SERVIDOR. Es la fuente de verdad:
// - Recalcula los precios desde Sanity (ignora los que manda el cliente).
// - Comprueba que la hora elegida esté dentro del horario real.
// - Verifica los datos mínimos del cliente.
// Así un carrito manipulado o un pedido fuera de horario no pueden colarse.

import type { Order, ValidatedOrder } from "@/lib/types/order";
import type { SanityProduct } from "@/lib/sanity/queries";
import type { TimeSlot } from "@/lib/data/business-hours";

const SHIPPING_EUR = 2.5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidateResult =
  | { ok: true; order: ValidatedOrder }
  | { ok: false; error: string };

function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isOpenNow(horarios: TimeSlot[], nowMin: number): boolean {
  return horarios.some((s) => {
    const o = toMin(s.open), c = toMin(s.close);
    return c >= o ? nowMin >= o && nowMin <= c : nowMin >= o || nowMin <= c;
  });
}

// "asap" solo vale si está abierto ahora. Una hora concreta debe caer dentro
// de un turno, hasta media hora antes del cierre, y no estar en el pasado.
function isValidPickup(time: string, horarios: TimeSlot[], nowMin: number): boolean {
  if (time === "asap") return isOpenNow(horarios, nowMin);
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const t = toMin(time);
  if (t < nowMin) return false;
  return horarios.some((s) => {
    const o = toMin(s.open), c = toMin(s.close);
    if (c < o) return false; // turnos que cruzan medianoche: sin recogida programada
    return t >= o && t <= c - 30;
  });
}

export function validateOrder(
  order: Order,
  products: SanityProduct[],
  horarios: TimeSlot[]
): ValidateResult {
  if (!order.items?.length) return { ok: false, error: "El pedido está vacío." };

  // Datos del cliente
  if (!order.customer?.name?.trim()) return { ok: false, error: "Falta el nombre." };
  if (!order.customer?.phone?.trim()) return { ok: false, error: "Falta el móvil de contacto." };
  if (!EMAIL_RE.test(order.customer?.email ?? "")) return { ok: false, error: "El email no es válido." };
  if (order.method === "delivery" && !order.delivery?.address?.trim()) {
    return { ok: false, error: "Falta la dirección de entrega." };
  }

  // Horario (con la hora del servidor)
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (!isValidPickup(order.pickupTime, horarios, nowMin)) {
    return { ok: false, error: "La hora elegida ya no está disponible. Elige otra, por favor." };
  }

  // Precios desde Sanity — nunca de fiar los del cliente
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const items = [];
  for (const it of order.items) {
    const p = bySlug.get(it.slug);
    if (!p) return { ok: false, error: `"${it.name}" ya no está disponible.` };
    if (!Number.isInteger(it.qty) || it.qty < 1) return { ok: false, error: "Cantidad no válida." };
    items.push({ slug: p.slug, name: p.name, price: p.price, qty: it.qty, lineTotal: p.price * it.qty });
  }

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const shipping = order.method === "delivery" ? SHIPPING_EUR : 0;

  return {
    ok: true,
    order: { ...order, items, subtotal, shipping, total: subtotal + shipping },
  };
}
