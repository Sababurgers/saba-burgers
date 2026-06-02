"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "saba_consent";

type Consent = "all" | "essential" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined" && localStorage.getItem(KEY)) as Consent;
    setConsent(stored ?? null);
  }, []);

  if (!mounted || consent !== null) return null;

  const accept = (value: "all" | "essential") => {
    localStorage.setItem(KEY, value);
    setConsent(value);
    // Phase 5: si "all", inicializar Google Analytics aquí.
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-carbon-800 text-paper rounded-lg shadow-2xl border border-paper/10 p-5"
    >
      <h3 className="font-section font-bold text-base mb-1.5">🍪 Cookies en este sitio</h3>
      <p className="text-paper-3/80 text-[13px] leading-[1.5] mb-3.5">
        Usamos cookies técnicas para que el sitio funcione, y opcionalmente analíticas para entender qué partes visitáis más.{" "}
        <Link href="/politica-de-cookies" className="underline hover:text-gold">Más info</Link>.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => accept("all")}
          className="bg-gold text-carbon-800 font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 rounded-pill font-semibold hover:bg-gold/90 transition-colors"
        >
          Aceptar todas
        </button>
        <button
          onClick={() => accept("essential")}
          className="border border-paper/30 font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 rounded-pill hover:border-paper/60 transition-colors"
        >
          Solo esenciales
        </button>
      </div>
    </div>
  );
}
