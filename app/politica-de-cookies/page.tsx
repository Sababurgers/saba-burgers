export const metadata = {
  title: "Política de cookies — Saba Burgers",
  description: "Qué cookies usamos y cómo gestionarlas.",
};

export default function CookiesPage() {
  return (
    <article className="max-w-screen-md mx-auto px-6 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-[44px] md:text-[56px] leading-[0.95] mb-6">Política de cookies</h1>
      <p className="text-stone mb-8">
        Esta política explica qué son las cookies, cuáles utilizamos en sababurgers.es y cómo puedes gestionarlas.
      </p>

      <Section title="¿Qué son las cookies?">
        <p>
          Pequeños archivos que se descargan en tu dispositivo al navegar. Permiten que el sitio recuerde tus preferencias, mida el uso y, en algunos casos, ofrezca publicidad personalizada.
        </p>
      </Section>

      <Section title="Cookies que usamos">
        <table className="w-full text-sm border-collapse mt-3">
          <thead>
            <tr className="border-b border-carbon-800/12 text-left">
              <th className="py-2 pr-3">Cookie</th>
              <th className="py-2 pr-3">Tipo</th>
              <th className="py-2 pr-3">Finalidad</th>
              <th className="py-2">Duración</th>
            </tr>
          </thead>
          <tbody>
            <Row name="saba_session" type="Técnica" purpose="Mantener tu sesión y carrito" duration="Sesión" />
            <Row name="saba_consent" type="Técnica" purpose="Recordar tu elección de cookies" duration="6 meses" />
            <Row name="_ga, _ga_*" type="Analítica" purpose="Google Analytics — uso del sitio (anonimizado)" duration="13 meses" />
            <Row name="__stripe_mid" type="Funcional" purpose="Stripe — prevención de fraude" duration="1 año" />
          </tbody>
        </table>
      </Section>

      <Section title="Cómo gestionarlas">
        <p>
          Puedes aceptar o rechazar el uso de cookies analíticas y de marketing al entrar en el sitio. También puedes modificar tu elección en cualquier momento desde el banner de cookies o configurando tu navegador para bloquearlas.
        </p>
      </Section>

      <Section title="Más información">
        <ul>
          <li><a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noreferrer">Guía de cookies — AEPD</a></li>
          <li><a href="/politica-de-privacidad">Nuestra política de privacidad</a></li>
        </ul>
      </Section>

      <p className="text-stone text-sm mt-8">Última actualización: mayo de 2026.</p>
    </article>
  );
}

function Row({ name, type, purpose, duration }: { name: string; type: string; purpose: string; duration: string }) {
  return (
    <tr className="border-b border-carbon-800/8">
      <td className="py-2 pr-3 font-mono text-[12px]">{name}</td>
      <td className="py-2 pr-3">{type}</td>
      <td className="py-2 pr-3 text-stone">{purpose}</td>
      <td className="py-2 font-mono text-[12px]">{duration}</td>
    </tr>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="font-section font-bold text-xl mb-2">{title}</h2>
      <div className="text-[15px] leading-[1.6] text-carbon-800/85">{children}</div>
    </section>
  );
}
