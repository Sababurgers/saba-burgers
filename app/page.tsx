import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MenuCard } from "@/components/ui/MenuCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { REVIEWS, REVIEW_STATS } from "@/lib/data/reviews";

export const dynamic = "force-dynamic";
import { getFeaturedProducts, getSiteSettings } from "@/lib/sanity/queries";
import { horariosLabel, BUSINESS_HOURS } from "@/lib/data/business-hours";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedProducts(3), getSiteSettings()]);
  const slots = settings.horarios?.length ? settings.horarios : BUSINESS_HOURS;

  return (
    <>
      {/* HERO */}
      <section className="bg-carbon-800 text-paper relative overflow-hidden">
        <div
          className="md:hidden absolute inset-0 bg-carbon-700"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(224,161,58,.06) 0 10px, transparent 10px 20px)" }}
          aria-hidden
        />
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(15,13,11,0.55) 0%, rgba(15,13,11,0.4) 40%, rgba(15,13,11,0.92) 100%)" }}
          aria-hidden
        />
        <div
          className="absolute -right-24 -top-20 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(224,161,58,.18), transparent 70%)" }}
          aria-hidden
        />
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-10 pb-16 md:pt-14 md:pb-24 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 bg-paper/8 border border-paper/15 rounded-full px-3 py-1.5 mb-7 font-mono text-[11px] uppercase tracking-[0.14em]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {horariosLabel(slots)}
            </span>
            <h1 className="font-display text-[56px] md:text-[88px] leading-[0.92] mb-5 ">
              Hamburguesas<br />
              <span className="text-gold">con alma.</span>
            </h1>
            <p className="text-paper/80 text-lg max-w-[42ch] mb-7">
              Carne fresca prensada al momento, queso amarillo fundido bajo campana y pan brioche
              tostado en plancha. Eso es todo. Eso es Saba.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/carta"><Button size="lg">Pedir ahora →</Button></Link>
            </div>
            <dl className="mt-9 pt-6 border-t border-paper/10 grid grid-cols-3 gap-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Tiempo</dt>
                <dd className="mt-1 text-sm font-medium">15 min · take away</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Reservas</dt>
                <dd className="mt-1 text-sm font-medium">722 364 407</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Premio</dt>
                <dd className="mt-1 text-sm font-medium">🥈 Burger Showdown &apos;25</dd>
              </div>
            </dl>
          </div>
          {/* Hero image */}
          <div className="hidden md:block aspect-square rounded-2xl overflow-hidden relative">
            {settings.heroImage ? (
              <img src={settings.heroImage} alt="Saba Burgers" className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full bg-carbon-700 grid place-items-center font-mono text-[11px] tracking-[0.18em] text-paper/60 uppercase"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(224,161,58,.06) 0 10px, transparent 10px 20px)" }}
              >
                <span>Hero shot · La Saba · 1:1</span>
              </div>
            )}
            <div className="absolute right-5 top-5 w-20 h-20 rounded-full bg-gold text-carbon-800 grid place-items-center font-display text-xs leading-none text-center -rotate-12">
              HECHA<br />A MANO
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-gold text-carbon-800 py-4 overflow-hidden">
        <div className="flex items-center gap-12 font-display text-2xl whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          <span className="px-6">SMASH</span><span className="opacity-70">★</span>
          <span>HECHA A MANO</span><span className="opacity-70">★</span>
          <span>DESDE 2022</span><span className="opacity-70">★</span>
          <span>SMASHBURGER</span><span className="opacity-70">★</span>
          <span>L&apos;OLLERIA</span><span className="opacity-70">★</span>
          <span className="px-6">SMASH</span><span className="opacity-70">★</span>
          <span>HECHA A MANO</span><span className="opacity-70">★</span>
          <span>DESDE 2022</span><span className="opacity-70">★</span>
          <span>SMASHBURGER</span><span className="opacity-70">★</span>
          <span>L&apos;OLLERIA</span><span className="opacity-70">★</span>
        </div>
      </div>

      {/* AWARD STRIP */}
      <div className="bg-paper border-b border-carbon-800/10 py-5">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center">
          <span className="text-2xl" aria-hidden>🥈</span>
          <span className="font-section font-bold text-base md:text-lg">
            Subcampeones · Burger Showdown Alicante 2025
          </span>
        </div>
      </div>

      {/* FEATURED */}
      <section className="bg-paper-2">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <SectionHeader title="De la casa" subtitle="Las que más piden. Si es tu primera vez, empieza por La Saba." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((p) => <MenuCard key={p._id} product={p} />)}
          </div>
          <div className="mt-8">
            <Link href="/carta"><Button variant="ghost">Ver toda la carta →</Button></Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-carbon-800 text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <SectionHeader title="Por qué Saba" variant="dark" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { stat: "250g", img: settings.whySaba1, placeholder: "Carne fresca", desc: "Carne fresca, prensada al momento. Nunca congelada. Nunca pre-formada." },
              { stat: "15min", img: settings.whySaba2, placeholder: "Plancha caliente", desc: "Tiempo del primer click al primer mordisco. Recogida o delivery." },
              { stat: "100%", img: settings.whySaba3, placeholder: "Cocina / detalle", desc: "Pan artesanal, masa casera, salsas hechas aquí. Cada plato pasa por nuestras manos." },
            ].map(({ stat, img, placeholder, desc }) => (
              <div key={stat} className="bg-paper/5 border border-paper/10 rounded-lg overflow-hidden flex flex-col">
                <div className="aspect-[16/10] flex-none overflow-hidden">
                  {img ? (
                    <img src={img} alt={placeholder} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full bg-carbon-700 grid place-items-center font-mono text-[10px] uppercase tracking-[0.18em] text-paper/30"
                      style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(224,161,58,.06) 0 10px, transparent 10px 20px)" }}
                    >
                      {placeholder}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h4 className="font-display text-4xl text-gold leading-none">{stat}</h4>
                  <p className="text-paper/80 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <SectionHeader
            title="Lo que dicen"
            subtitle={`${REVIEW_STATS.total.toLocaleString("es-ES")} reseñas en ${REVIEW_STATS.source} · ★ ${REVIEW_STATS.average}`}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <article key={r.id} className="bg-paper border border-carbon-800/12 rounded-lg p-6 flex flex-col gap-3.5">
                <div className="font-display text-lg text-gold tracking-wider">{"★".repeat(r.rating)}</div>
                <p className="font-section font-bold text-lg leading-[1.35]">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-paper-3 grid place-items-center font-display text-sm">{r.initial}</div>
                  <b className="text-[13px]">{r.author}</b>
                  <span className="font-mono text-[11px] text-stone ml-auto">{r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tomato text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <h3 className="font-display text-[44px] md:text-[56px] leading-[0.95] mb-3 ">
              ¿Y entonces?
            </h3>
            <p className="max-w-[42ch] opacity-90">Pide por delivery o reserva una mesa. En 15 minutos tienes tu pedido listo.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/pedido"><Button size="lg" className="bg-paper text-tomato hover:bg-paper-2">Pedir ahora</Button></Link>
            <Link href="/reservas"><Button size="lg" variant="dark-ghost">Reservar</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
