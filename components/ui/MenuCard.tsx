"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart/store";
export interface MenuCardProduct {
  slug: string;
  name: string;
  price: number;
  weight?: string;
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
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="bg-paper border border-carbon-800/12 rounded-lg overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-paper-3 relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full grid items-end p-3 font-mono text-[11px] tracking-[0.18em] text-stone uppercase"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)" }}
          >
            <span>{product.name}</span>
          </div>
        )}
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full font-semibold",
              BADGE_STYLES[product.badge] ?? "bg-stone text-paper"
            )}
          >
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
      </div>
      <div className="px-5 py-3 border-t border-carbon-800/8 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">
          {product.weight ?? ""}
        </span>
        <button
          onClick={handleAdd}
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.14em] px-4 py-2 rounded-full font-semibold transition active:scale-95",
            added
              ? "bg-success text-paper pointer-events-none"
              : "bg-tomato hover:bg-tomato-700 text-paper"
          )}
        >
          {added ? "✓ Añadido" : "Añadir +"}
        </button>
      </div>
    </article>
  );
}
