export const metadata = {
  title: "Política de privacidad — Saba Burgers",
  description: "Cómo tratamos tus datos personales en Saba Burgers.",
};

export default function PrivacidadPage() {
  return (
    <article className="max-w-screen-md mx-auto px-6 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-[44px] md:text-[56px] leading-[0.95] mb-6">Política de privacidad</h1>
      <p className="text-stone mb-8">
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <Section title="Responsable del tratamiento">
        <ul>
          <li>Saba Burgers S.L. — CIF B-00000000 (pendiente)</li>
          <li>C. Ausìás March, 22, 46850 L&apos;Olleria, Valencia</li>
          <li>Email DPO: <a href="mailto:privacidad@sababurgers.es">privacidad@sababurgers.es</a></li>
        </ul>
      </Section>

      <Section title="Datos que tratamos">
        <ul>
          <li><b>Reservas:</b> nombre, email, teléfono, fecha y número de comensales.</li>
          <li><b>Pedidos:</b> los anteriores + dirección de entrega y datos de pago (procesados por Stripe; nosotros no almacenamos números de tarjeta).</li>
          <li><b>Navegación:</b> IP, navegador, páginas visitadas (vía cookies analíticas; ver política de cookies).</li>
        </ul>
      </Section>

      <Section title="Finalidad y base legal">
        <ul>
          <li><b>Gestionar reservas y pedidos</b> — ejecución del contrato (art. 6.1.b RGPD).</li>
          <li><b>Cumplimiento fiscal</b> — obligación legal (art. 6.1.c RGPD).</li>
          <li><b>Marketing</b> — solo si das tu consentimiento expreso (art. 6.1.a RGPD).</li>
        </ul>
      </Section>

      <Section title="Conservación">
        <p>
          Los datos de pedido y reserva se conservan durante el tiempo necesario para prestar el servicio y, posteriormente, durante 6 años por obligaciones fiscales.
        </p>
      </Section>

      <Section title="Encargados del tratamiento">
        <p>Compartimos datos estrictamente necesarios con:</p>
        <ul>
          <li><b>Stripe Payments Europe Ltd.</b> (Irlanda) — procesamiento de pagos.</li>
          <li><b>Resend Inc.</b> (EE. UU.) — envío de emails transaccionales (cláusulas contractuales tipo).</li>
          <li><b>Vercel Inc.</b> (EE. UU.) — hosting (cláusulas contractuales tipo).</li>
          <li><b>Glovo / Uber Eats</b> — solo si pides a través de sus plataformas.</li>
        </ul>
      </Section>

      <Section title="Tus derechos">
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a{" "}
          <a href="mailto:privacidad@sababurgers.es">privacidad@sababurgers.es</a>. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>).
        </p>
      </Section>

      <p className="text-stone text-sm mt-8">Última actualización: mayo de 2026.</p>
    </article>
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
