import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { LOCATIONS } from "@/lib/data/locations";

export const metadata = {
  title: "Locales — Saba Burgers",
  description: "Tres locales en Valencia. Russafa, El Carmen, El Cabanyal.",
};

export default function LocalesPage() {
  return (
    <>
      <section className="bg-carbon-800 text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-12 md:pt-14 pb-7">
          <Chip variant="dark" dot>{LOCATIONS.length} LOCALES EN VALENCIA</Chip>
          <h1 className="font-display text-[56px] md:text-[80px] leading-[0.92] text-gold mt-2 mb-2 [text-shadow:0.06em_0.06em_0_#050402]">
            Dónde estamos
          </h1>
          <p className="text-paper-3/80 max-w-[50ch]">
            Tres locales en Valencia. Misma carta en todos. Elige el que te quede más cerca.
          </p>
        </div>
      </section>

      <section className="bg-paper-2">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* MAP — placeholder estilizado, swap a Google Maps embed en prod */}
          <div
            className="rounded-lg min-h-[420px] lg:min-h-[520px] relative overflow-hidden order-2 lg:order-1"
            style={{
              background: "#d6cfbe",
              backgroundImage: `
                linear-gradient(135deg, rgba(255,255,255,.4) 0 1px, transparent 1px 36px),
                linear-gradient(45deg, rgba(0,0,0,.06) 0 1px, transparent 1px 28px),
                radial-gradient(circle at 30% 40%, rgba(11,113,137,.15), transparent 35%),
                radial-gradient(circle at 70% 70%, rgba(11,113,137,.15), transparent 30%)
              `,
              backgroundSize: "36px 36px, 28px 28px, auto, auto",
            }}
          >
            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.id}
                className={`absolute w-9 h-9 rounded-tl-full rounded-tr-full rounded-br-full -rotate-45 grid place-items-center font-display text-sm shadow-lg ${
                  i === 0 ? "bg-gold text-carbon-800" : "bg-tomato text-paper"
                }`}
                style={{ top: `${loc.mapPosition.y}%`, left: `${loc.mapPosition.x}%` }}
              >
                <span className="rotate-45">{i + 1}</span>
              </div>
            ))}
          </div>

          {/* LIST */}
          <div className="flex flex-col gap-3.5 order-1 lg:order-2">
            {LOCATIONS.map((loc, i) => (
              <article
                key={loc.id}
                id={loc.id}
                className={`bg-paper rounded-lg p-5 grid grid-cols-[auto_1fr_auto] gap-4 items-start ${
                  i === 0 ? "border border-tomato bg-tomato/3" : "border border-carbon-800/12"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-carbon-800 text-gold grid place-items-center font-display text-base flex-none">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-section font-bold text-lg">{loc.name}</h3>
                  <span className="block text-stone text-[13px]">{loc.address} · {loc.neighborhood}</span>
                  <span className="block text-stone text-[13px] mt-0.5">{loc.hours}</span>
                  <span className="block text-success font-mono text-[10px] uppercase tracking-[0.18em] mt-2">
                    ● Abierto · cierra hoy
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link href="/pedido"><Button size="sm">Pedir</Button></Link>
                  <a href={loc.mapsUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="ghost">
                      <Navigation size={12} /> Ir
                    </Button>
                  </a>
                </div>
              </article>
            ))}
            <div className="mt-2 p-4 rounded-md border border-carbon-800/10 text-stone text-[13px] flex gap-3 items-start">
              <MapPin size={16} className="flex-none mt-0.5 text-tomato" />
              <span>
                ¿No vives cerca? Hacemos delivery por toda Valencia con Glovo y Uber Eats, o pedido directo desde la web.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
