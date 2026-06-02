import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TIMELINE } from "@/lib/data/timeline";

export const metadata = {
  title: "Historia — Saba Burgers",
  description: "Una hamburguesa, un local, dos hermanos, cuatro años. La historia de Saba Burgers.",
};

export default function HistoriaPage() {
  return (
    <>
      {/* COVER */}
      <section className="bg-carbon-800 text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-3/60">
            Historia · Saba Burgers
          </span>
          <h1 className="font-display text-[80px] md:text-[120px] leading-[0.92] text-gold mt-3 mb-4 [text-shadow:0.06em_0.06em_0_#050402]">
            SABA
          </h1>
          <p className="text-paper-3/80 text-lg max-w-[50ch] mx-auto">
            Una hamburguesa, un local, dos hermanos, cuatro años. La historia más corta posible — pero hace falta contarla.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-8 items-start">
          <div>
            <p className="font-section text-[20px] md:text-2xl font-medium leading-[1.4]">
              Empezó en 2022, en una cocina prestada de Benimaclet, con una sola plancha y la idea fija de hacer una smashburger sin atajos.
            </p>
            <blockquote className="mt-6 bg-paper-2 border-l-[3px] border-gold p-5 rounded-r-md font-section italic text-lg">
              “No queríamos abrir una hamburguesería. Queríamos comer la nuestra todos los días.”
            </blockquote>
          </div>
          <div className="flex flex-col gap-3 text-[15px]">
            <p>
              Federico y Saba — dos hermanos, ingenieros que cocinaban más de lo que les tocaba — pasaron seis meses probando recetas en su casa. La carne, la mejor que pudieron conseguir. El pan, encargado a un horno de la calle de al lado. La salsa, una mezcla de mostaza tostada, mayonesa casera y algo más que no decimos.
            </p>
            <p>
              Cuando la receta estuvo lista, abrieron un mostrador de 4 metros cuadrados en Russafa. Sin mesas, sin delivery propio, sin redes sociales. Solo una plancha caliente y un cartel que decía “SABA — abrimos a las 20”.
            </p>
            <p>
              La primera semana hicieron 12 hamburguesas. La segunda, 40. A los tres meses, no daban abasto. A los seis, abrieron en El Carmen. A los dos años, en El Cabanyal.
            </p>
          </div>
          <div className="text-[15px]">
            <p>
              Hoy somos 18 personas. Seguimos haciendo una sola cosa, pero la hacemos como si la fuéramos a comer nosotros. Porque, casi siempre, lo hacemos.
            </p>
            <p className="mt-6 text-stone text-[13px]">
              — <b>Federico &amp; Saba</b><br />Dueños y cocineros
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-paper-2 border-y border-carbon-800/12">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-14">
          <h3 className="font-display text-[36px] md:text-[42px] leading-none mb-6 [text-shadow:0.075em_0.075em_0_var(--color-gold)]">
            Hitos
          </h3>
          <div className="flex flex-col">
            {TIMELINE.map((m, i) => (
              <div
                key={m.year}
                className={`grid grid-cols-1 md:grid-cols-[80px_1fr_2fr] gap-2 md:gap-6 py-4 ${
                  i > 0 ? "border-t border-carbon-800/12" : ""
                }`}
              >
                <div className="font-display text-[28px] md:text-[32px] text-gold leading-none [text-shadow:0.06em_0.06em_0_var(--color-carbon-800)]">
                  {m.year}
                </div>
                <b className="font-section font-bold text-lg">{m.title}</b>
                <p className="text-stone text-sm">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tomato text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14 md:py-16 grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <Chip dot className="bg-paper/10 text-paper mb-3">Después de leer esto</Chip>
            <h3 className="font-display text-[40px] md:text-[48px] leading-[0.95] mb-2 [text-shadow:0.075em_0.075em_0_var(--color-tomato-700)]">
              Pruébala
            </h3>
            <p className="opacity-90 max-w-[42ch]">
              Si has llegado hasta aquí, te debemos una. Pide o reserva — el resto lo hacemos nosotros.
            </p>
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
