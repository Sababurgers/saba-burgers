"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingCart, MapPin } from "lucide-react";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart/store";

const NAV = [
  { href: "/carta", label: "Carta", icon: null },
  { href: "/reservas", label: "Reservas", icon: null },
  { href: "/nuestro-producto", label: "Nuestro producto", icon: null },
  { href: "/ubicacion", label: "Ubicación", icon: MapPin },
];

interface TimeSlot { open: string; close: string; }

export function SiteNav({ horarios }: { horarios?: TimeSlot[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  return (
    <header className="bg-carbon-800 text-paper sticky top-0 z-30">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-4 flex items-center gap-6 md:gap-8">
        <Link href="/" className="flex-none">
          <Lockup size="sm" variant="gold" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-xs font-medium uppercase tracking-[0.16em] py-2 transition-colors",
                  active ? "text-paper" : "text-paper/80 hover:text-paper"
                )}
              >
                {item.icon && <item.icon size={13} strokeWidth={2.2} className="inline-block mr-1 -mt-0.5" />}
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <OpenStatus horarios={horarios} />
          <Link href="/pedido">
            <Button size="sm" className="inline-flex items-center gap-1.5">
              Pedir
              {count > 0 && (
                <span className="bg-gold text-carbon-800 px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none">
                  {count}
                </span>
              )}
              <span>→</span>
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          {count > 0 && (
            <Link
              href="/pedido"
              className="relative w-10 h-10 grid place-items-center rounded-md border border-paper/20 text-paper"
              aria-label="Ver pedido"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-tomato text-paper text-[10px] font-bold leading-none w-4 h-4 rounded-full grid place-items-center">
                {count}
              </span>
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 grid place-items-center rounded-md border border-paper/20 cursor-pointer"
            aria-label="Menú"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden border-t border-paper/10 px-6 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-[0.14em]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/pedido" onClick={() => setOpen(false)} className="mt-2">
            <Button size="md" full>
              Pedir{count > 0 ? ` (${count})` : ""} →
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
