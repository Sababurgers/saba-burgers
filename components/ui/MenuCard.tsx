"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart/store";
import type { CartProduct } from "@/lib/types/product";

export interface MenuCardProduct extends CartProduct {
  description?: string;
  badge?: string | null;
  imageUrl?: string;
}

const BADGE_STYLES: Record<string, string> = {
  popular:  "bg-tomato text-paper",
  subcamp:  "bg-gold text-carbon-800",
  nueva:    "bg-gold text-carbon-800",
  vegana:   "bg-success text-paper",
  casero:   "bg-tomato text-paper",
  estrella: "bg-tomato text-paper",
  veggie:   "bg-success text-paper",
};

const BADGE_LABEL: Record<string, string> = {
  popular:  "Popular",
  subcamp:  "Subcamp.",
  nueva:    "Nueva",
  vegana:   "Vegana",
  casero:   "Casero",
  estrella: "Estrella",
  veggie:   "Veggie",
};

export function MenuCard({ product }: { product: MenuCardProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleAdd() {
    if (added) return;
    for (let i = 0; i < count; i++) addItem(product);
    setAdded(true);
    timerRef.current = setTimeout(() => {
      setAdded(false);
      setCount(1);
    }, 1200);
  }

  return (
    <article className="bg-paper border border-carbon-800/12 rounded-lg overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-paper-3 relative overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full grid items-end p-3 font-mono text-[11px] tracking-[0.18em] text-stone uppercase"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)" }}
          >
            <span>{product.name}</span>
          </div>
        )}
        {product.badge && (
          <span className={cn(
            "absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full font-semibold",
            BADGE_STYLES[product.badge] ?? "bg-stone text-paper"
          )}>
            {BADGE_LABEL[product.badge] ?? product.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-section font-bold text-lg">{product.name}</h4>
          <span className="font-mono text-sm font-semibold flex-none">
            {product.price.toFixed(2).replace(".", ",")} €
          </span>
        </div>
        <p className="text-stone text-sm flex-1">{product.description}</p>
        {product.weight && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone/70 mt-1">
            {product.weight}
          </span>
        )}
      </div>

      <div className="px-5 pb-5 flex items-center gap-3">
        {/* Selector de cantidad */}
        <div className="flex items-center gap-2 border border-carbon-800/15 rounded-full px-1 py-1" data-cart-action="qty">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            disabled={count <= 1}
            data-cart-action="qty"
            className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-base leading-none transition hover:bg-carbon-800/8 disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
            aria-label="Quitar uno"
          >
            −
          </button>
          <span className="font-mono text-sm font-semibold w-4 text-center">{count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            data-cart-action="qty"
            className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-base leading-none transition hover:bg-carbon-800/8 cursor-pointer"
            aria-label="Añadir uno"
          >
            +
          </button>
        </div>

        {/* Botón añadir */}
        <button
          onClick={handleAdd}
          data-cart-action="add"
          className={cn(
            "flex-1 font-mono text-[11px] uppercase tracking-[0.14em] py-3 rounded-full font-semibold transition cursor-pointer select-none",
            added
              ? "bg-success text-paper pointer-events-none"
              : "bg-tomato hover:bg-tomato-700 active:scale-95 text-paper"
          )}
        >
          {added ? "✓ Añadido" : "Añadir"}
        </button>
      </div>
    </article>
  );
}
