"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";

export function CartFab() {
  const pathname = usePathname();
  const router   = useRouter();
  const items    = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const count    = useCartStore((s) => s.count());
  const setQty   = useCartStore((s) => s.setQty);
  const clear    = useCartStore((s) => s.clear);

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (count === 0 || pathname.startsWith("/pedido")) return null;

  const total = subtotal.toFixed(2).replace(".", ",");

  return (
    <div ref={ref} className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col items-end gap-2">

      {/* Panel expandido */}
      <div className={`
        bg-carbon-800 text-paper rounded-2xl shadow-2xl w-[calc(100vw-2rem)] max-w-xs
        transition-all duration-200 origin-bottom-right overflow-hidden
        ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
      `}>
        <div className="p-4 flex flex-col gap-3">

          {/* Cabecera */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">Tu pedido</span>
            <button
              onClick={() => { clear(); setOpen(false); }}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40 hover:text-paper/70 transition cursor-pointer"
            >
              Vaciar
            </button>
          </div>

          {/* Lista con controles */}
          <div className="flex flex-col gap-1 max-h-56 overflow-y-auto -mx-1 px-1">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-2 py-1.5">
                {/* Nombre */}
                <span className="flex-1 text-sm text-paper/90 truncate min-w-0">{item.name}</span>

                {/* Controles cantidad */}
                <div className="flex items-center gap-1 bg-paper/8 rounded-full px-1.5 py-0.5 flex-none">
                  <button
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    className="w-5 h-5 flex items-center justify-center text-paper/60 hover:text-paper transition cursor-pointer text-base leading-none"
                    aria-label="Quitar uno"
                  >−</button>
                  <span className="font-mono text-xs w-4 text-center font-bold">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    className="w-5 h-5 flex items-center justify-center text-paper/60 hover:text-paper transition cursor-pointer text-base leading-none"
                    aria-label="Añadir uno"
                  >+</button>
                </div>

                {/* Precio */}
                <span className="font-mono text-xs text-paper/50 w-14 text-right flex-none">
                  {(item.price * item.qty).toFixed(2).replace(".", ",")} €
                </span>

                {/* Eliminar */}
                <button
                  onClick={() => setQty(item.slug, 0)}
                  className="text-paper/30 hover:text-paper/70 transition cursor-pointer flex-none"
                  aria-label={`Eliminar ${item.name}`}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-paper/10 pt-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">Total</span>
            <span className="font-mono font-bold text-base">{total} €</span>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/pedido")}
            className="w-full bg-tomato hover:bg-tomato-700 transition active:scale-[0.98] text-paper font-mono text-[11px] uppercase tracking-[0.14em] font-semibold py-3 rounded-full cursor-pointer"
          >
            Pedir →
          </button>

        </div>
      </div>

      {/* Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-tomato hover:bg-tomato-700 active:scale-[0.97] transition text-paper rounded-full shadow-2xl h-14 px-5 flex items-center gap-3 cursor-pointer"
        aria-label={`Carrito · ${count} productos · ${total} €`}
      >
        <ShoppingCart size={17} strokeWidth={2.2} />
        <span className="font-mono text-sm font-bold">{count}</span>
        <span className="w-px h-4 bg-paper/25 flex-none" />
        <span className="font-mono text-sm font-semibold">{total} €</span>
      </button>

    </div>
  );
}
