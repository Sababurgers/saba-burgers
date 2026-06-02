import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "Pedido — Saba Burgers",
  description: "Pide tu Saba con recogida o delivery. Paga con tarjeta, Bizum o en el local.",
};

export default function PedidoPage() {
  return (
    <div className="bg-paper-2">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-14">
        <header className="mb-6">
          <h1 className="font-display text-[36px] md:text-[42px] leading-none mb-2">Tu pedido</h1>
          <p className="text-stone">
            Revísalo, complétalo y paga cuando estés listo. Te avisamos cuando esté en camino.
          </p>
        </header>
        <CheckoutClient />
      </div>
    </div>
  );
}
