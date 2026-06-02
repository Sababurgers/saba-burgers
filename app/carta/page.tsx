import { MenuCard } from "@/components/ui/MenuCard";
import { CartaTabs } from "@/components/ui/CartaTabs";
import { getProducts, getCategories } from "@/lib/sanity/queries";

export const metadata = {
  title: "Carta — Saba Burgers",
  description: "Smashburgers, acompañamientos, veggies, postres y bebidas. La carta completa de Saba Burgers.",
};

const CATEGORY_DESC: Record<string, string> = {
  smashburgers:  "Carne fresca prensada al momento sobre plancha de hierro. 250–320 g.",
  "para-compartir": "Para compartir o no. Por norma general, no.",
  veggies:       "Sin carne, sin atajos. Misma cocina, distinta receta.",
  postres:       "Para cerrar la noche. Recetas caseras, hechas en el día.",
  bebidas:       "Refrescos, cervezas de barril y algún capricho.",
};

const BG_BY_INDEX = ["bg-paper", "bg-paper-2", "bg-paper", "bg-paper-2", "bg-paper"];

export default async function CartaPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

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
            {categories.length} categorías. Cuatro principales que sí o sí tienes que probar.
          </p>
        </div>
      </section>

      {/* TABS */}
      <CartaTabs categories={categories} />

      {/* SECTIONS */}
      {categories.map((cat, i) => {
        const catProducts = products.filter((p) => p.category === cat.slug);
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.slug} id={cat.slug} className={BG_BY_INDEX[i] ?? "bg-paper"}>
            <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-14">
              <header className="mb-7">
                <h3 className="font-display text-[36px] md:text-[42px] leading-none mb-2 [text-shadow:0.07em_0.07em_0_var(--color-gold-700)]">
                  {cat.name}
                </h3>
                <p className="text-stone max-w-[50ch]">{CATEGORY_DESC[cat.slug] ?? ""}</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {catProducts.map((p) => (
                  <MenuCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
