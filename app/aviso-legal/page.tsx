export const metadata = {
  title: "Aviso legal — Saba Burgers",
  description: "Información legal de Saba Burgers S.L.",
};

export default function AvisoLegalPage() {
  return (
    <article className="max-w-screen-md mx-auto px-6 md:px-8 py-12 md:py-16 prose-saba">
      <h1 className="font-display text-[44px] md:text-[56px] leading-[0.95] mb-6">Aviso legal</h1>
      <p className="text-stone mb-8">
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE).
      </p>

      <Section title="Titular del sitio web">
        <p><b>Saba Burgers S.L.</b> (en adelante, “Saba Burgers”).</p>
        <ul>
          <li>CIF: B-00000000 (pendiente)</li>
          <li>Domicilio social: C. Ausìás March, 22, 46850 L&apos;Olleria, Valencia, España</li>
          <li>Email: <a href="mailto:hola@sababurgers.es">hola@sababurgers.es</a></li>
          <li>Teléfono: 722 364 407</li>
        </ul>
      </Section>

      <Section title="Objeto">
        <p>
          Las presentes condiciones regulan el uso del sitio web <b>sababurgers.es</b>, que Saba Burgers pone a disposición de los usuarios para informar sobre sus productos y permitir la realización de pedidos online y reservas de mesa.
        </p>
      </Section>

      <Section title="Propiedad intelectual">
        <p>
          Todos los contenidos del sitio (textos, imágenes, marcas, diseño) son propiedad de Saba Burgers S.L. o cuentan con autorización para su uso. Queda prohibida su reproducción sin consentimiento previo por escrito.
        </p>
      </Section>

      <Section title="Responsabilidad">
        <p>
          Saba Burgers no se hace responsable de los daños derivados del uso indebido del sitio, ni de la disponibilidad continua del mismo. Nos reservamos el derecho de modificar los contenidos sin previo aviso.
        </p>
      </Section>

      <Section title="Legislación aplicable">
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Valencia.
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
