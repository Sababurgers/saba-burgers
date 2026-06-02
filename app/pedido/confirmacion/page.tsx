"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/lib/cart/store";

export default function ConfirmacionPedidoPage() {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  const orderId = "SABA-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="bg-paper-2">
      <div className="max-w-screen-md mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-success text-paper grid place-items-center mx-auto mb-6 text-3xl shadow-lg">
          ✓
        </div>
        <span className="inline-flex items-center gap-2 bg-success/10 text-success rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Pedido confirmado
        </span>
        <h1 className="font-display text-[44px] md:text-[64px] leading-[0.92] mt-2 mb-3 ">
          ¡Brasa servida!
        </h1>
        <p className="text-stone max-w-[46ch] mx-auto mb-8">
          Hemos recibido tu pedido. Te avisamos cuando esté listo.
        </p>

        <div className="bg-paper border border-carbon-800/12 rounded-lg p-6 max-w-md mx-auto text-left mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
              Nº pedido
            </span>
            <span className="font-mono text-sm font-semibold">{orderId}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
              Estado
            </span>
            <span className="text-success font-mono text-[11px] uppercase tracking-[0.14em]">
              ● Confirmado
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
              Local
            </span>
            <span className="font-mono text-sm font-semibold">Saba · L&apos;Olleria</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-carbon-800 text-paper hover:bg-carbon-900 transition font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
          >
            Volver al inicio
          </Link>
          <Link
            href="/carta"
            className="border border-carbon-800/20 hover:border-carbon-800/40 transition font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
          >
            Pedir otra cosa
          </Link>
        </div>

        <p className="text-stone text-xs mt-8 max-w-[40ch] mx-auto">
          Hemos enviado el comprobante a tu email. Si tienes alguna duda, escríbenos por{" "}
          <a
            href="https://wa.me/34722364407"
            className="text-tomato underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </div>
  );
}
