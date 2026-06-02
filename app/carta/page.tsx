import { MenuCard } from "@/components/ui/MenuCard";
import { CATEGORIES, getProductsByCategory } from "@/lib/data/products";

export const metadata = {
  title: "Carta — Saba Burgers",
  description: "Smashburgers, acompañamientos, veggies, postres y bebidas. La carta completa de Saba Burgers.",
};

const BG_BY_INDEX = ["bg-paper", "bg-paper-2", "bg-paper", "bg-paper-2", "bg-paper"];

export default function CartaPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-carbon-800 text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-8">
          <span className="inline-flex items-center gap-2 bg-paper/8 border border-paper/15 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            13:00–16:30 · 20:00–23:30 · Lun a Dom
          </span>
          <h1 className="font-display text-[64px] md:text-[96px] leading-[0.92] text-gold mt-2 mb-3 [text-shadow:0.05em_0.05em_0_#0F0D0B]">
            Carta
          </h1>
          <p className="text-paper/80 max-w-[50ch]">
            {CATEGORIES.length} categorías. Cuatro principales que sí o sí tienes que probar.
          </p>
        </div>
      </section>

      {/* TABS — sticky debajo del header (68px de altura aprox) */}
      <nav
        className="bg-paper border-b border-carbon-800/12 sticky top-[68px] z-20"
        aria-label="Categorías de la carta"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-3.5 flex gap-6 items-center overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`relative font-mono text-[11px] uppercase tracking-[0.18em] py-2 flex-none transition-colors ${
                i === 0 ? "text-carbon-800" : "text-stone hover:text-carbon-800"
              }`}
            >
              {cat.label}
              {i === 0 && (
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-tomato" />
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* SECTIONS */}
      {CATEGORIES.map((cat, i) => {
        const products = getProductsByCategory(cat.id);
        if (products.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className={BG_BY_INDEX[i] ?? "bg-paper"}>
            <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-14">
              <header className="mb-7">
                <h3 className="font-display text-[36px] md:text-[42px] leading-none mb-2 [text-shadow:0.07em_0.07em_0_var(--color-gold-700)]">
                  {cat.label}
                </h3>
                <p className="text-stone max-w-[50ch]">{cat.description}</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products.map((p) => (
                  <MenuCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
