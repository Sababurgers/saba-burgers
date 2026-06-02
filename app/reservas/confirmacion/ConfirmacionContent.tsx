"use client";

import { useSearchParams } from "next/navigation";

function formatDateES(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

export function ConfirmacionContent() {
  const params = useSearchParams();
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "—";
  const people = params.get("people") ?? "—";
  const id = params.get("id") ?? "RES-000000";

  return (
    <div className="bg-paper border border-carbon-800/12 rounded-lg p-6 max-w-md mx-auto text-left">
      {[
        ["Nº reserva", id],
        ["Día", date ? formatDateES(date) : "—"],
        ["Hora", time],
        ["Personas", people],
        ["Local", "C. Ausìás March, 22 · L'Olleria"],
      ].map(([label, value]) => (
        <div key={label} className="flex items-center justify-between py-3 border-b border-carbon-800/8 last:border-b-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            {label}
          </span>
          <span className="font-mono text-sm font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
}
