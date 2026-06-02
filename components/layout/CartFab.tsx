"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";

export function CartFab() {
  const pathname  = usePathname();
  const router    = useRouter();
  const items     = useCartStore((s) => s.items);
  const subtotal  = useCartStore((s) => s.subtotal());
  const count     = useCartStore((s) => s.count());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

          {/* Lista de productos */}
          <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-tomato text-paper flex items-center justify-center font-mono text-[10px] font-bold flex-none">
                    {item.qty}
                  </span>
                  <span className="text-sm text-paper/90 truncate">{item.name}</span>
                </div>
                <span className="font-mono text-xs text-paper/50 flex-none">
                  {(item.price * item.qty).toFixed(2).replace(".", ",")} €
                </span>
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
