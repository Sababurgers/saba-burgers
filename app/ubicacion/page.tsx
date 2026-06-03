import Link from "next/link";
import { LOCATION } from "@/lib/data/locations";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { getSiteSettings } from "@/lib/sanity/queries";
import { BUSINESS_HOURS } from "@/lib/data/business-hours";

export const revalidate = 60;

export const metadata = {
  title: "Ubicación — Saba Burgers · L'Olleria, Valencia",
  description: "Encuéntranos en C. Ausìás March, 22, 46850 L'Olleria, Valencia. Take away y reservas.",
};

export default async function UbicacionPage() {
  const settings = await getSiteSettings();
  const horarios = settings.horarios?.length ? settings.horarios : BUSINESS_HOURS;
  return (
    <>
      {/* HERO */}
      <section className="bg-carbon-800 text-paper">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-8 md:pt-12 pb-7">
          <span className="inline-flex items-center gap-2 bg-paper/8 border border-paper/15 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            L&apos;OLLERIA · VALENCIA
          </span>
          <h1 className="font-display text-[56px] md:text-[80px] leading-[0.92] text-gold mt-5 mb-2">
            Ubicación
          </h1>
          <p className="text-paper/80 max-w-[50ch]">
            Un solo local, hecho con calma. Pasa a recoger, llama para reservar o escríbenos por
            WhatsApp.
          </p>
        </div>
      </section>

      {/* MAP + INFO */}
      <section className="bg-paper-2">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* GOOGLE MAPS EMBED */}
          <div className="rounded-lg min-h-[420px] lg:min-h-[520px] overflow-hidden border border-carbon-800/10">
            <iframe
              src="https://maps.google.com/maps?q=C.+Ausi%C3%A0s+March+22%2C+46850+L%27Olleria%2C+Valencia&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saba Burgers — C. Ausìás March 22, L'Olleria"
            />
          </div>

          {/* INFO CARD */}
          <div className="flex flex-col gap-3.5">
            <article className="bg-paper rounded-lg p-6 border border-carbon-800/12 flex flex-col gap-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
                  {LOCATION.name}
                </span>
                <h3 className="font-section font-bold text-xl mt-1">{LOCATION.address}</h3>
                <p className="text-stone text-sm mt-0.5">{LOCATION.neighborhood}</p>
              </div>
              <div className="h-px bg-carbon-800/10" />
              <div className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">Horario</span>
                  <span className="font-mono text-sm text-right">{LOCATION.hours}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">Teléfono</span>
                  <span className="font-mono text-sm">{LOCATION.phone}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">Servicio</span>
                  <span className="font-mono text-sm">{LOCATION.services}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone">Estado</span>
                  <OpenStatus horarios={horarios} variant="dark" />
                </div>
              </div>
              <div className="h-px bg-carbon-800/10" />
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={LOCATION.whatsapp}
                  className="bg-tomato hover:bg-tomato-700 transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-4 py-3 rounded-full font-semibold text-center"
                >
                  WhatsApp →
                </a>
                <a
                  href={`tel:+34${LOCATION.phone.replace(/\s/g, "")}`}
                  className="border border-carbon-800/20 hover:border-carbon-800/40 transition font-mono text-xs uppercase tracking-[0.14em] px-4 py-3 rounded-full font-semibold text-center"
                >
                  Llamar
                </a>
                <a
                  href={LOCATION.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-carbon-800/20 hover:border-carbon-800/40 transition font-mono text-xs uppercase tracking-[0.14em] px-4 py-3 rounded-full font-semibold text-center"
                >
                  ↗ Cómo llegar
                </a>
              </div>
            </article>
            <Link
              href="/pedido"
              className="w-full bg-carbon-800 hover:bg-carbon-900 transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-4 py-3.5 rounded-full font-semibold text-center"
            >
              Hacer pedido →
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="bg-paper border-t border-carbon-800/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-10 md:py-14">
          <header className="mb-6 max-w-[60ch]">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">El local</span>
            <h3 className="font-display text-[28px] md:text-[36px] leading-none mt-2">Por dentro</h3>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {["Foto · Fachada", "Foto · Interior", "Foto · Detalle"].map((label) => (
              <div
                key={label}
                className="aspect-[4/3] rounded-xl bg-paper-3 grid place-items-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(0,0,0,.04) 0 6px, transparent 6px 12px)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
