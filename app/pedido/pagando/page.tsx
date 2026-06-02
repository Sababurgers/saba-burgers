export const metadata = {
  title: "Redirigiendo al pago… — Saba Burgers",
};

export default function PagandoPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <div className="text-center max-w-[40ch]">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-paper-2 mb-6">
          <svg
            className="animate-spin text-tomato"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <span className="inline-flex items-center gap-2 bg-carbon-800/8 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-tomato animate-pulse" />
          Pago seguro
        </span>
        <h2 className="font-display text-[36px] md:text-[44px] leading-none mb-3">
          Redirigiendo al pago…
        </h2>
        <p className="text-stone">Te llevamos a Stripe en un momento. No cierres esta ventana.</p>
      </div>
    </div>
  );
}
