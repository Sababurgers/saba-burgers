"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart/store";
import { createCheckoutSession } from "./actions";

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const setQty = useCartStore((s) => s.setQty);
  const clear = useCartStore((s) => s.clear);

  const [method, setMethod] = useState<"delivery" | "pickup">("pickup");
  const [payMethod, setPayMethod] = useState<"online" | "local">("online");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const shipping = method === "delivery" ? 2.5 : 0;
  const total = subtotal + shipping;

  function fmt(n: number) {
    return n.toFixed(2).replace(".", ",") + " €";
  }

  if (items.length === 0) {
    return (
      <div className="bg-paper border border-carbon-800/12 rounded-lg p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-paper-3 grid place-items-center mx-auto mb-4 text-3xl">🍔</div>
        <h2 className="font-section font-bold text-2xl mb-2">Tu pedido está vacío</h2>
        <p className="text-stone max-w-[40ch] mx-auto mb-6">
          Date una vuelta por la carta y añade lo que te apetezca. Te esperamos.
        </p>
        <Link
          href="/carta"
          className="inline-block bg-tomato hover:bg-tomato-700 transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
        >
          Ver la carta →
        </Link>
      </div>
    );
  }

  async function handlePay() {
    if (!name.trim() || !email.trim()) {
      alert("Por favor, completa tu nombre y email.");
      return;
    }
    setLoading(true);
    try {
      if (payMethod === "online") {
        router.push("/pedido/pagando");
        const url = await createCheckoutSession(items, method);
        if (url) {
          window.location.href = url;
        } else {
          router.push("/pedido/confirmacion");
        }
      } else {
        clear();
        router.push("/pedido/confirmacion");
      }
    } catch {
      alert("Ha habido un error. Por favor, inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        {/* STEP 1 — items */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className="w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none bg-success text-paper">1</span>
            Tu pedido
          </h4>
          <div className="flex flex-col">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-3.5 py-3 border-t border-carbon-800/8 first:border-t-0">
                <div
                  className="w-16 h-16 rounded-md bg-paper-3 flex-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <b className="font-section text-[15px]">{item.name}</b>
                  {item.weight && (
                    <span className="block text-stone text-xs">{item.weight}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-paper-3 rounded-full px-2 py-1 font-mono text-[13px]">
                  <button
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    className="w-5 h-5 grid place-items-center hover:text-tomato transition"
                    aria-label="Quitar uno"
                  >
                    −
                  </button>
                  <span className="min-w-[1ch] text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    className="w-5 h-5 grid place-items-center hover:text-tomato transition"
                    aria-label="Sumar uno"
                  >
                    +
                  </button>
                </div>
                <span className="font-mono text-sm w-20 text-right flex-none">
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/carta"
            className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-tomato hover:text-tomato-700 transition"
          >
            + Añadir otro
          </Link>
        </section>

        {/* STEP 2 — método */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className="w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none bg-carbon-800 text-gold">2</span>
            ¿Cómo lo quieres?
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            <label
              className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${
                method === "delivery"
                  ? "border-tomato bg-tomato/5"
                  : "border-carbon-800/12 hover:border-carbon-800/30"
              }`}
            >
              <input
                type="radio"
                name="method"
                value="delivery"
                checked={method === "delivery"}
                onChange={() => setMethod("delivery")}
                className="sr-only"
              />
              <b className="block text-sm">🛵 Delivery</b>
              <span className="text-stone text-xs">Llega en 25–35 min</span>
            </label>
            <label
              className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${
                method === "pickup"
                  ? "border-tomato bg-tomato/5"
                  : "border-carbon-800/12 hover:border-carbon-800/30"
              }`}
            >
              <input
                type="radio"
                name="method"
                value="pickup"
                checked={method === "pickup"}
                onChange={() => setMethod("pickup")}
                className="sr-only"
              />
              <b className="block text-sm">📍 Recoger en local</b>
              <span className="text-stone text-xs">Listo en 12 min</span>
            </label>
          </div>
          {method === "delivery" && (
            <div className="mt-4 flex flex-col gap-2.5">
              <div className="grid grid-cols-[2fr_1fr] gap-2.5">
                <input
                  type="text"
                  placeholder="Calle y número"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
                />
                <input
                  type="text"
                  placeholder="Piso"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
                />
              </div>
              <input
                type="text"
                placeholder="Notas para el repartidor (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
              />
            </div>
          )}
        </section>

        {/* STEP 3 — datos y pago */}
        <section className="bg-paper border border-carbon-800/12 rounded-lg p-6">
          <h4 className="flex items-center gap-2.5 font-section font-bold text-lg mb-4">
            <span className="w-7 h-7 rounded-full grid place-items-center font-display text-sm leading-none bg-carbon-800 text-gold">3</span>
            Datos y pago
          </h4>
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Nombre y apellidos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
                required
              />
              <input
                type="tel"
                placeholder="Móvil (+34)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
              />
            </div>
            <input
              type="email"
              placeholder="Email para el comprobante"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-paper-2 border border-carbon-800/12 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800"
              required
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone mt-2">
              Método de pago
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <label
                className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${
                  payMethod === "online"
                    ? "border-tomato bg-tomato/5"
                    : "border-carbon-800/12 hover:border-carbon-800/30"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="online"
                  checked={payMethod === "online"}
                  onChange={() => setPayMethod("online")}
                  className="sr-only"
                />
                <b className="block text-sm">💳 Online</b>
                <span className="text-stone text-xs">
                  Tarjeta, Bizum o Apple Pay · seguro con Stripe
                </span>
              </label>
              <label
                className={`block border-[1.5px] rounded-md p-3.5 cursor-pointer transition ${
                  payMethod === "local"
                    ? "border-tomato bg-tomato/5"
                    : "border-carbon-800/12 hover:border-carbon-800/30"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  value="local"
                  checked={payMethod === "local"}
                  onChange={() => setPayMethod("local")}
                  className="sr-only"
                />
                <b className="block text-sm">💶 En el local</b>
                <span className="text-stone text-xs">Efectivo o tarjeta al recoger</span>
              </label>
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT — summary */}
      <aside className="bg-carbon-800 text-paper rounded-lg p-7 lg:sticky lg:top-[88px] self-start border border-carbon-700">
        <h4 className="font-display text-3xl text-gold mb-4">Resumen</h4>
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
        <button
          onClick={handlePay}
          disabled={loading}
          className="mt-5 w-full bg-tomato hover:bg-tomato-700 disabled:opacity-60 disabled:cursor-not-allowed transition text-paper font-mono text-xs uppercase tracking-[0.14em] py-3.5 rounded-full font-semibold"
        >
          {loading ? "Procesando…" : "Pagar →"}
        </button>
        <p className="mt-3 text-xs text-paper/60 text-center">
          {method === "delivery" ? "Llegada estimada: ~30 min · " : "Listo en: ~12 min · "}
          Pago seguro
        </p>
      </aside>
    </div>
  );
}
