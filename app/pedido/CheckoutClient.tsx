"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart/store";
import { placeOrder } from "./actions";
import type { Order } from "@/lib/types/order";
import type { TimeSlot } from "@/lib/data/business-hours";

// ─── Lógica de horarios ──────────────────────────────────────────────────────

function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minToHHMM(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

function getStatus(horarios: TimeSlot[]) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const isOpen = horarios.some(s => {
    const o = toMin(s.open), c = toMin(s.close);
    return c >= o ? nowMin >= o && nowMin <= c : nowMin >= o || nowMin <= c;
  });

  // Primer hueco posible: 30 min a partir de ahora, redondeado a la media hora.
  const minStart = Math.ceil((nowMin + 30) / 30) * 30;

  // Mostramos UN solo rango: el turno abierto ahora o el próximo de hoy.
  // La ventana va desde la apertura (o ahora+30) hasta media hora antes del cierre.
  const ordered = [...horarios].sort((a, b) => toMin(a.open) - toMin(b.open));
  const slots: string[] = [];

  for (const s of ordered) {
    const open = toMin(s.open);
    const close = toMin(s.close);
    if (close < open) continue; // turnos que cruzan medianoche: sin slots programados
    const windowStart = Math.max(open, minStart);
    const windowEnd = close - 30; // media hora antes del cierre
    if (windowEnd < windowStart) continue; // este turno ya no da tiempo
    for (let m = windowStart; m <= windowEnd; m += 30) slots.push(minToHHMM(m));
    break; // solo el primer turno disponible
  }

  const canOrder = isOpen || slots.length > 0;
  const nextOpen = !isOpen && slots.length > 0 ? slots[0] : null;

  return { isOpen, canOrder, nextOpen, slots };
}

// ─── Componente ──────────────────────────────────────────────────────────────

export function CheckoutClient({ horarios = [] }: { horarios?: TimeSlot[] }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);

  // Recalcula el estado de apertura cada minuto para que una pestaña
  // abierta no se quede "abierta" tras la hora de cierre.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const { isOpen, canOrder, nextOpen, slots } = getStatus(horarios);

  const [method, setMethod] = useState<"delivery" | "pickup">("pickup");
  const [payMethod, setPayMethod] = useState<"online" | "local">("online");
  // Si el local está cerrado, no puede ser "asap": arranca en el primer slot disponible.
  const [pickupTime, setPickupTime] = useState<string>(isOpen ? "asap" : (nextOpen ?? "asap"));
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refs para llevar al usuario al primer campo con error (clave en móvil).
  const timeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const shipping = method === "delivery" ? 2.5 : 0;
  const total = subtotal + shipping;

  function fmt(n: number) {
    return n.toFixed(2).replace(".", ",") + " €";
  }

  function stepStyle(step: number) {
    const filled =
      (step === 1 && items.length > 0) ||
      (step === 2 && (method === "pickup" || address.trim())) ||
      (step === 3 && name.trim() && email.trim());
    return filled ? "bg-success text-paper" : "bg-carbon-800/15 text-carbon-800";
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <div className="bg-paper border border-carbon-800/12 rounded-lg p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-paper-3 grid place-items-center mx-auto mb-4 text-3xl">🍔</div>
        <h2 className="font-section font-bold text-2xl mb-2">Tu pedido está vacío</h2>
        <p className="text-stone max-w-[40ch] mx-auto mb-6">
          Date una vuelta por la carta y añade lo que te apetezca. Te esperamos.
        </p>
        <Link href="/carta" className="inline-block bg-tomato hover:bg-tomato-700 transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold cursor-pointer">
          Ver la carta →
        </Link>
      </div>
    );
  }

  // Local cerrado sin slots disponibles
  if (!canOrder) {
    return (
      <div className="bg-paper border border-carbon-800/12 rounded-lg p-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-paper-3 grid place-items-center mx-auto mb-4 text-3xl">🕐</div>
        <h2 className="font-section font-bold text-2xl mb-2">Estamos cerrados</h2>
        <p className="text-stone max-w-[40ch] mx-auto mb-6">
          Ahora mismo no podemos preparar tu pedido. Consulta nuestro horario y vuelve cuando estemos abiertos.
        </p>
        <Link href="/ubicacion" className="inline-block bg-carbon-800 hover:bg-carbon-900 transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold cursor-pointer">
          Ver horario →
        </Link>
      </div>
    );
  }

  function fail(msg: string, ref?: React.RefObject<HTMLElement | null>) {
    setError(msg);
    const el = ref?.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el instanceof HTMLInputElement) setTimeout(() => el.focus({ preventScroll: true }), 300);
    }
  }

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handlePay() {
    setError("");
    // No se puede pedir "lo antes posible" con el local cerrado.
    if (pickupTime === "asap" && !isOpen) {
      return fail("Estamos cerrados. Elige una hora de recogida disponible.", timeRef);
    }
    // La hora elegida debe seguir siendo válida (puede caducar si pasa el tiempo).
    if (pickupTime !== "asap" && !slots.includes(pickupTime)) {
      return fail("Esa hora ya no está disponible. Elige otra, por favor.", timeRef);
    }
    if (!name.trim()) { return fail("Por favor, introduce tu nombre.", nameRef); }
    if (!phone.trim()) { return fail("Por favor, introduce tu móvil para avisarte.", phoneRef); }
    if (!emailOk(email)) { return fail("Introduce un email válido para el comprobante.", emailRef); }
    if (method === "delivery" && !address.trim()) { return fail("Por favor, introduce la dirección de entrega.", addressRef); }

    setLoading(true);
    const order: Order = {
      items: items.map((i) => ({ slug: i.slug, name: i.name, price: i.price, qty: i.qty })),
      method,
      payMethod,
      pickupTime,
      customer: { name: name.trim(), phone: phone.trim(), email: email.trim() },
      delivery: method === "delivery" ? { address: address.trim(), floor: floor.trim(), notes: notes.trim() } : undefined,
    };
    try {
      const res = await placeOrder(order);
      if (!res.ok) {
        setError(res.error ?? "No se pudo completar el pedido.");
        setLoading(false);
        return;
      }
      if (res.redirectUrl) {
        window.location.href = res.redirectUrl; // a la pasarela de Stripe
        return;
      }
      // Confirmado en el local o en modo demo: vaciamos el carrito.
      clear();
      router.push("/pedido/confirmacion");
    } catch {
      setError("Ha habido un error. Por favor, inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8 pb-28 lg:pb-0">
      {/* LEFT */}
      <div className="flex flex-col gap-4">

        {/* Banner: abre pronto */}
        {!isOpen && nextOpen && (
          <div className="bg-gold/15 border border-gold/30 rounded-lg px-5 py-4 flex items-center gap-3">
            <span className="text-xl">🕐</span>
            <div>
              <p className="font-section font-bold text-sm">Ahora estamos cerrados</p>
              <p className="text-stone text-xs mt-0.5">
                Abrimos a las <span className="font-mono font-bold text-carbon-800">{nextOpen}</span>. Puedes elegir esa hora o cualquier otra disponible más abajo.
              </p>
            </div>
          </div>
        )}

        {/* STEP 1 — items */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className={`w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none transition-colors ${stepStyle(1)}`}>1</span>
            Tu pedido
          </h4>
          <div className="flex flex-col">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-3 py-3 border-t border-carbon-800/8 first:border-t-0">
                <div className="w-12 h-12 rounded-md bg-paper-3 flex-none overflow-hidden">
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)" }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <b className="font-section text-sm block truncate">{item.name}</b>
                  <span className="font-mono text-xs text-stone">{fmt(item.price)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-paper-3 rounded-full px-2 py-1 font-mono text-[13px] flex-none">
                  <button onClick={() => setQty(item.slug, item.qty - 1)} className="w-5 h-5 grid place-items-center hover:text-tomato transition cursor-pointer" aria-label="Quitar uno">−</button>
                  <span className="w-4 text-center">{item.qty}</span>
                  <button onClick={() => setQty(item.slug, item.qty + 1)} className="w-5 h-5 grid place-items-center hover:text-tomato transition cursor-pointer" aria-label="Sumar uno">+</button>
                </div>
                <span className="font-mono text-sm text-right flex-none">{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <Link href="/carta" className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-tomato hover:text-tomato-700 transition cursor-pointer">
            + Añadir otro
          </Link>
        </section>

        {/* STEP 2 — método + hora */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className={`w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none transition-colors ${stepStyle(2)}`}>2</span>
            ¿Cómo y cuándo?
          </h4>

          {/* Método */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { value: "pickup", label: "📍 Recoger en local", sub: "Recoge cuando esté listo" },
              { value: "delivery", label: "🛵 Delivery", sub: "Te lo llevamos a casa" },
            ].map((opt) => (
              <label key={opt.value} className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${method === opt.value ? "border-tomato bg-tomato/5" : "border-carbon-800/12 hover:border-carbon-800/30"}`}>
                <input type="radio" name="method" value={opt.value} checked={method === opt.value} onChange={() => setMethod(opt.value as "delivery" | "pickup")} className="sr-only" />
                <b className="block text-sm">{opt.label}</b>
                <span className="text-stone text-xs">{opt.sub}</span>
              </label>
            ))}
          </div>

          {/* Selector de hora */}
          <div ref={timeRef} className="mt-5 scroll-mt-24">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone block mb-2.5">
              ¿A qué hora?
            </span>
            <div className="flex flex-wrap gap-2">
              {isOpen && (
                <button
                  type="button"
                  onClick={() => setPickupTime("asap")}
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 rounded-full border transition cursor-pointer ${
                    pickupTime === "asap" ? "bg-carbon-800 text-paper border-carbon-800" : "border-carbon-800/20 hover:border-carbon-800/40"
                  }`}
                >
                  Lo antes posible
                </button>
              )}
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPickupTime(slot)}
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 rounded-full border transition cursor-pointer ${
                    pickupTime === slot ? "bg-carbon-800 text-paper border-carbon-800" : "border-carbon-800/20 hover:border-carbon-800/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Dirección delivery */}
          {method === "delivery" && (
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="grid grid-cols-[2fr_1fr] gap-2.5">
                <input ref={addressRef} type="text" placeholder="Calle y número *" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm scroll-mt-24 focus:outline-none focus:border-carbon-800" />
                <input type="text" placeholder="Piso" value={floor} onChange={(e) => setFloor(e.target.value)} className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800" />
              </div>
              <input type="text" placeholder="Notas para el repartidor (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800" />
            </div>
          )}
        </section>

        {/* STEP 3 — datos y pago */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className={`w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none transition-colors ${stepStyle(3)}`}>3</span>
            Datos y pago
          </h4>
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <input ref={nameRef} type="text" placeholder="Nombre y apellidos *" value={name} onChange={(e) => setName(e.target.value)} className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm scroll-mt-24 focus:outline-none focus:border-carbon-800" />
              <input ref={phoneRef} type="tel" placeholder="Móvil (+34) *" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm scroll-mt-24 focus:outline-none focus:border-carbon-800" />
            </div>
            <input ref={emailRef} type="email" placeholder="Email para el comprobante *" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm scroll-mt-24 focus:outline-none focus:border-carbon-800" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone mt-2">Método de pago</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[
                { value: "online", label: "💳 Online", sub: "Tarjeta, Bizum o Apple Pay · seguro con Stripe" },
                { value: "local", label: "💶 En el local", sub: "Efectivo o tarjeta al recoger" },
              ].map((opt) => (
                <label key={opt.value} className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${payMethod === opt.value ? "border-tomato bg-tomato/5" : "border-carbon-800/12 hover:border-carbon-800/30"}`}>
                  <input type="radio" name="pay" value={opt.value} checked={payMethod === opt.value} onChange={() => setPayMethod(opt.value as "online" | "local")} className="sr-only" />
                  <b className="block text-sm">{opt.label}</b>
                  <span className="text-stone text-xs">{opt.sub}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT — resumen */}
      <aside className="bg-carbon-800 text-paper rounded-lg p-7 lg:sticky lg:top-[88px] self-start border border-carbon-700">
        <h4 className="font-display text-3xl text-gold mb-4">Resumen</h4>

        {pickupTime !== "asap" && (
          <div className="flex justify-between py-2 text-sm border-b border-paper/10 mb-1">
            <span>Hora</span>
            <span className="font-mono font-semibold">{pickupTime}</span>
          </div>
        )}

        <div className="flex justify-between py-2 text-sm">
          <span>Subtotal</span>
          <span className="font-mono">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between py-2 border-t border-paper/10 text-sm">
          <span>{method === "delivery" ? "Envío" : "Recogida"}</span>
          <span className="font-mono">{method === "delivery" ? fmt(shipping) : "Gratis"}</span>
        </div>
        <div className="border-t border-gold mt-3 pt-3 flex justify-between font-display text-2xl text-gold">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>

        {error && (
          <p className="mt-4 text-xs text-tomato bg-tomato/10 border border-tomato/20 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="hidden lg:block mt-4 w-full bg-tomato hover:bg-tomato-700 disabled:opacity-60 disabled:cursor-not-allowed transition text-paper font-mono text-xs uppercase tracking-[0.14em] py-3.5 rounded-full font-semibold cursor-pointer"
        >
          {loading ? "Procesando…" : payMethod === "local" ? "Finalizar pedido →" : "Pagar →"}
        </button>

        {payMethod === "online" && (
          <p className="hidden lg:block mt-3 text-xs text-paper/60 text-center">Pago seguro con Stripe</p>
        )}
      </aside>

      {/* Barra de pago fija — solo móvil */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-carbon-800/95 backdrop-blur border-t border-carbon-700 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {error && (
          <p className="mb-2 text-xs text-paper bg-tomato/90 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">Total</span>
            <span className="font-display text-xl text-gold">{fmt(total)}</span>
          </div>
          <button
            onClick={handlePay}
            disabled={loading}
            className="flex-1 bg-tomato hover:bg-tomato-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition text-paper font-mono text-xs uppercase tracking-[0.14em] py-3.5 rounded-full font-semibold cursor-pointer"
          >
            {loading ? "Procesando…" : payMethod === "local" ? "Finalizar pedido →" : "Pagar →"}
          </button>
        </div>
      </div>
    </div>
  );
}
