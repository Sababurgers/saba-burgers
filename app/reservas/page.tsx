import { ReservationForm } from "./ReservationForm";
import { LOCATION } from "@/lib/data/locations";
import { horariosLabel, BUSINESS_HOURS } from "@/lib/data/business-hours";
import { getSiteSettings } from "@/lib/sanity/queries";

export const metadata = {
  title: "Reservas — Saba Burgers",
  description: "Reserva tu mesa en Saba Burgers, L'Olleria. Sin tarjeta. Confirmamos por email en menos de 1 hora.",
};

export default async function ReservasPage() {
  const settings = await getSiteSettings();
  const slots = settings.horarios?.length ? settings.horarios : BUSINESS_HOURS;
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-16">
      {/* HEADER */}
      <header className="max-w-[60ch] mb-10">
        <span className="inline-flex items-center gap-2 bg-carbon-800/8 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-tomato" />
          Reservas · gratis
        </span>
        <h1 className="font-display text-[44px] md:text-[64px] leading-[0.92] mb-3 ">
          Reserva tu mesa
        </h1>
        <p className="text-stone">
          No hace falta dejar tarjeta. Confirmamos por email en menos de 1 hora. Hasta 10
          personas; para grupos más grandes, escríbenos al {LOCATION.phone}.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <ReservationForm horarios={slots} />

        {/* SIDEBAR */}
        <aside className="bg-carbon-800 text-paper rounded-lg p-7 flex flex-col gap-5">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">
              {LOCATION.name}
            </span>
            <h3 className="font-display text-[28px] text-gold leading-none mt-1.5">
              {LOCATION.address}
            </h3>
            <p className="text-paper/70 text-sm mt-1">{LOCATION.neighborhood}</p>
          </div>
          <div
            className="aspect-[4/3] rounded-md bg-carbon-700 grid place-items-center font-mono text-[11px] tracking-[0.18em] text-paper/60 uppercase"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(224,161,58,.06) 0 8px, transparent 8px 16px)",
            }}
          >
            Foto local · interior
          </div>
          <ul className="m-0 p-0 list-none">
            {[
              "Reserva sin tarjeta — confirmamos por email.",
              "Mesa reservada hasta 15 min después del horario.",
              "Para grupos de 11+, escríbenos al " + LOCATION.phone + ".",
              "¿Cumpleaños? Avísanos y te dejamos algo dulce.",
            ].map((t) => (
              <li
                key={t}
                className="py-3 border-t border-paper/10 first:border-t-0 text-paper/80 text-sm flex gap-2.5 items-start"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-none" />
                {t}
              </li>
            ))}
          </ul>
          <div className="text-paper/60 font-mono text-[11px] uppercase tracking-[0.14em]">
            Horario: {horariosLabel(slots)} · Lun a Dom
          </div>
        </aside>
      </div>
    </div>
  );
}
