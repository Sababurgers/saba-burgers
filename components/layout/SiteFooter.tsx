import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";

const COLS = [
  {
    title: "Sitio",
    links: [
      { href: "/carta", label: "Carta" },
      { href: "/reservas", label: "Reservas" },
      { href: "/nuestro-producto", label: "Nuestro producto" },
      { href: "/ubicacion", label: "Ubicación" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: "tel:+34722364407", label: "722 364 407" },
      { href: "https://wa.me/34722364407", label: "WhatsApp" },
      { href: "https://instagram.com/sababurgers", label: "Instagram" },
      { href: "https://tiktok.com/@sababurgers", label: "TikTok" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/aviso-legal", label: "Aviso legal" },
      { href: "/politica-de-privacidad", label: "Privacidad" },
      { href: "/politica-de-cookies", label: "Cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-carbon-900 text-paper">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 pb-6 border-b border-paper/10">
          <div className="col-span-2 md:col-span-1">
            <Lockup size="sm" variant="cream" />
            <p className="mt-3 text-sm text-paper/70 max-w-[36ch]">
              Hamburguesas con alma. L&apos;Olleria, Valencia. Desde 2022.
            </p>
            <p className="mt-2 text-sm text-paper/70">
              🥈 Subcampeones Burger Showdown Alicante 2025
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60 mb-3 font-medium">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/80 hover:text-gold transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-2 pt-4 font-mono text-[11px] text-paper/60">
          <span>© 2026 Saba Burgers S.L. · C. Ausìás March, 22, 46850 L&apos;Olleria</span>
          <span>Hecho con alma en L&apos;Olleria</span>
        </div>
      </div>
    </footer>
  );
}
