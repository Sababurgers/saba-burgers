import Link from "next/link";
import { Suspense } from "react";
import { ConfirmacionContent } from "./ConfirmacionContent";

export const metadata = {
  title: "Reserva confirmada — Saba Burgers",
};

export default function ReservaConfirmacionPage() {
  return (
    <div className="bg-paper-2">
      <div className="max-w-screen-md mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-success text-paper grid place-items-center mx-auto mb-6 text-3xl shadow-lg">
          ✓
        </div>
        <span className="inline-flex items-center gap-2 bg-success/10 text-success rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Reserva enviada
        </span>
        <h1 className="font-display text-[44px] md:text-[64px] leading-[0.92] mt-2 mb-3">
          Reserva completada
        </h1>
        <p className="text-stone max-w-[46ch] mx-auto mb-8">
          Hemos recibido tu reserva. Te confirmamos por email en menos de 1 hora.
        </p>

        <Suspense>
          <ConfirmacionContent />
        </Suspense>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href="/"
            className="bg-carbon-800 text-paper hover:bg-carbon-900 transition font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
          >
            Volver al inicio
          </Link>
          <Link
            href="/carta"
            className="border border-carbon-800/20 hover:border-carbon-800/40 transition font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold"
          >
            Ver la carta
          </Link>
        </div>
      </div>
    </div>
  );
}
