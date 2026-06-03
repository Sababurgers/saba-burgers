"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct as Product } from "@/lib/types/product";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  weight?: string;
  imageUrl?: string;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(product) {
        set((state) => {
          const existing = state.items.find((i) => i.slug === product.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                weight: product.weight,
                imageUrl: product.imageUrl,
                qty: 1,
              },
            ],
          };
        });
      },

      removeItem(slug) {
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) }));
      },

      setQty(slug, qty) {
        if (qty <= 0) {
          get().removeItem(slug);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        }));
      },

      clear() {
        set({ items: [] });
      },

      count() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },

      subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0);
      },
    }),
    {
      name: "saba_cart",
    }
  )
);
