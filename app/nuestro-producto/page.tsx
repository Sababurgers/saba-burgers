import Link from "next/link";

export const metadata = {
  title: "Nuestro producto — Saba Burgers",
  description: "Hamburguesas con alma. Ingredientes frescos, masa casera, subcampeones del Burger Showdown Alicante 2025.",
};

const PHOTOS = [
  { label: "Foto 1 · Burger close-up", span: "col-span-2 md:col-span-3 md:row-span-2 aspect-square md:aspect-auto" },
  { label: "Foto 2 · Sala / local", span: "col-span-2 md:col-span-3 aspect-[16/9] md:aspect-auto" },
  { label: "Foto 3 · Tarta", span: "aspect-square md:aspect-auto" },
  { label: "Foto 4 · Patatas", span: "aspect-square md:aspect-auto" },
  { label: "Foto 5 · Detalle", span: "aspect-square md:aspect-auto" },
];

export default function NuestroProductoPage() {
  return (
    <>
      {/* HERO CON FONDO */}
      <section className="relative bg-carbon-900 text-paper overflow-hidden">
        <div
          className="absolute inset-0 bg-carbon-700 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper/25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(224,161,58,.06) 0 10px, transparent 10px 20px)",
          }}
        >
          Foto fondo · burger / interior
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,13,11,0.3) 0%, rgba(15,13,11,0.55) 55%, rgba(15,13,11,0.92) 100%)",
          }}
        />
        <div className="relative max-w-screen-xl mx-auto px-6 md:px-8 pt-24 md:pt-40 pb-16 md:pb-24 text-center min-h-[500px] md:min-h-[600px] flex flex-col justify-end">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/80">
            Hamburguesas con alma
          </span>
          <h1 className="font-display text-[64px] md:text-[96px] leading-[0.92] text-gold mt-3 mb-4">
            Nuestro producto
          </h1>
          <p className="text-paper text-lg max-w-[52ch] mx-auto">
            Un local. Una plancha. Una idea fija: hacer la hamburguesa que querríamos comer cada
            día. Y por la que valga la pena venir a L&apos;Olleria.
          </p>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-8 items-start">
          <div>
            <p className="font-section text-[20px] md:text-2xl font-medium leading-[1.4]">
              Saba Burgers, en el corazón de L&apos;Olleria. Una hamburguesera con compromiso
              absoluto con la calidad y la autenticidad — desde el ambiente hasta el último bocado.
            </p>
            <figure className="mt-7 relative pl-12">
              <svg
                className="absolute -top-1 left-0 text-gold"
                width="40"
                height="32"
                viewBox="0 0 32 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M0 24V14C0 6.3 5.4 0 12 0v5c-3.3 0-6 2.7-6 6h6v13H0zm18 0V14c0-7.7 5.4-14 12-14v5c-3.3 0-6 2.7-6 6h6v13H18z" />
              </svg>
              <blockquote>
                <p className="font-section italic text-[18px] md:text-[20px] leading-snug text-carbon-800">
                  Cuidado meticuloso en la elaboración. Ingredientes frescos y artesanales, sabores
                  intensos y un servicio cercano.
                </p>
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
                — Reseña de un cliente
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-col gap-3 text-[15px] leading-relaxed">
            <p>
              Lo primero que llama la atención son los entrantes. Los <b>nachos</b>, con la masa de
              los totopos hecha aquí, el guacamole batido al momento y la carne que los
              acompaña — todo casero, con cuidado meticuloso. Los <b>tequeños</b>, con su sabor a
              queso excepcional y una textura tierna, son un comienzo perfecto que invita a seguir.
            </p>
            <p>
              Pero la verdadera estrella son las hamburguesas. Cada una se construye sobre un{" "}
              <b>pan artesanal</b> suave y sabroso que sujeta sin esfuerzo la{" "}
              <b>carne madurada</b>, intensamente sabrosa y jugosa. Ideal para los amantes de la
              proteína de calidad. Ingredientes frescos, salsas caseras y un equilibrio de sabores
              que roza la perfección — de la clásica smash a propuestas como la Saba con{" "}
              <b>kataifi</b>.
            </p>
            <p>
              Cerramos con tartas caseras: la de queso <b>Lotus</b>, con un dulzor contenido, y la
              de <b>Oreo</b>. Ejemplos de la calidad casera que caracteriza al restaurante. Y una
              atención personalizada y amable.
            </p>
          </div>
          <div className="text-[15px] leading-relaxed">
            <p>
              Eso es Saba: no solo comida, una experiencia completa. Ambiente acogedor, ingredientes
              frescos, sabores intensos y un servicio cercano — en el corazón de L&apos;Olleria.
            </p>
            <p className="mt-6 text-stone text-[13px]">
              — <b>El equipo Saba</b>
              <br />
              L&apos;Olleria, Valencia
            </p>
          </div>
        </div>
      </section>

      {/* AWARD + TRUST SIGNALS */}
      <section className="bg-paper-2 border-y border-carbon-800/12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <header className="mb-8 md:mb-10 max-w-[60ch]">
            <h2 className="font-display text-[36px] md:text-[52px] leading-none">
              Ven a probar nuestras burgers
            </h2>
            <p className="text-stone mt-3 text-base md:text-lg">
              Tres razones que nos definen — y un premio nacional que las respalda.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-5">
            {/* BIG AWARD CARD */}
            <article className="bg-carbon-800 text-paper rounded-xl p-8 md:p-10 flex flex-col gap-5 relative overflow-hidden">
              <div
                className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(224,161,58,.35), transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className="text-6xl md:text-7xl leading-none" aria-hidden>🥈</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold border border-gold/40 rounded-full px-3 py-1.5 whitespace-nowrap">
                  Premio nacional
                </span>
              </div>
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60 mb-2">
                  Burger Showdown · Alicante 2025
                </p>
                <h3 className="font-display text-[36px] md:text-[52px] leading-[0.95] text-gold mb-5">
                  Subcampeones<br />nacionales
                </h3>
                <div className="text-paper/85 text-base md:text-[17px] leading-relaxed max-w-[55ch] space-y-3.5">
                  <p>Hacer una buena hamburguesa no es casualidad. Empieza por los ingredientes.</p>
                  <p>
                    En 2025 llegamos a la final de Burger Showdown Alicante — una competición
                    nacional donde cada ronda exige creatividad, estrategia y una propuesta nueva,
                    valorada por voto popular y jurado experto. El segundo puesto es el resultado de
                    trabajo, mucha dedicación y ganas de hacerlo bien.
                  </p>
                  <p>
                    Y seguimos igual de comprometidos con lo que más importa: ingredientes de
                    calidad, sabor de verdad y mucho cariño en cada hamburguesa.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/carta"
                      className="inline-block bg-gold hover:bg-gold/90 active:scale-[0.98] transition text-carbon-800 font-mono text-xs uppercase tracking-[0.14em] px-5 py-3 rounded-full font-semibold"
                    >
                      Ver burgers →
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* 2 STACKED TRUST SIGNALS */}
            <div className="grid grid-cols-1 gap-5">
              {[
                {
                  photo: "Foto · Burger en plancha",
                  title: "✨ Hechas con alma",
                  desc: "Cada hamburguesa se prensa al momento sobre plancha caliente. Carne madurada, pan artesanal del horno. Ni una congelada, ni una con prisa.",
                },
                {
                  photo: "Foto · Nachos / tequeños",
                  title: "🏡 100 % casero",
                  desc: "Nachos y tequeños desde la masa. Salsas y postres del día. Producto de la comarca. Cadena corta, sabor largo.",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="bg-paper border border-carbon-800/12 rounded-xl overflow-hidden flex flex-col"
                >
                  <div
                    className="aspect-[16/9] bg-paper-3 grid place-items-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone flex-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)",
                    }}
                  >
                    {card.photo}
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-2.5 flex-1">
                    <h4 className="font-section font-bold text-xl md:text-2xl">{card.title}</h4>
                    <p className="text-stone text-sm md:text-base">{card.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PHOTO GRID */}
          <div className="mt-8 md:mt-10">
            <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 md:h-[520px]">
              {PHOTOS.map((photo) => (
                <div
                  key={photo.label}
                  className={`${photo.span} rounded-xl bg-paper-3 grid place-items-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone`}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)",
                  }}
                >
                  {photo.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tomato text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14 md:py-16 grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-paper/10 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-paper" />
              Después de leer esto
            </span>
            <h3 className="font-display text-[40px] md:text-[48px] leading-[0.95] mb-2 [text-shadow:0.075em_0.075em_0_var(--color-tomato-700)]">
              Pruébala
            </h3>
            <p className="opacity-90 max-w-[42ch]">
              Si has llegado hasta aquí, te debemos una. Pide o reserva — el resto lo hacemos
              nosotros.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/pedido"
              className="bg-paper text-tomato hover:bg-paper-2 transition font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
            >
              Pedir ahora
            </Link>
            <Link
              href="/reservas"
              className="border border-paper/40 hover:border-paper transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
            >
              Reservar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
