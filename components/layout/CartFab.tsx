"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";

export function CartFab() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const count = useCartStore((s) => s.count());

  const isOnPedido = pathname.startsWith("/pedido");

  if (count === 0 || isOnPedido) return null;

  const displayTotal = (subtotal + 0).toFixed(2).replace(".", ",");

  return (
    <Link
      href="/pedido"
      className="fixed left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-6 md:max-w-fit z-40 bg-tomato hover:bg-tomato-700 active:scale-[0.98] transition text-paper rounded-full shadow-2xl px-5 py-3.5 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] font-semibold"
      aria-label={`Ver pedido — ${count} ${count === 1 ? "producto" : "productos"}`}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart size={16} />
        Ver pedido · {count} {count === 1 ? "producto" : "productos"}
      </span>
      <span>{displayTotal} € →</span>
    </Link>
  );
}
