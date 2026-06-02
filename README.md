# SABA Burgers — Sitio web

Sitio production-ready en Next.js 15 para Saba Burgers (Valencia, España). Modular, deployable a Vercel en minutos.

---

## Stack

- **Next.js 15** (App Router, RSC) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — tokens en `app/globals.css`
- **react-hook-form + zod** — forms y validación
- **Lucide** — iconos
- **Stripe** (con Bizum + Apple/Google Pay) para pagos
- **Resend** para emails transaccionales

---

## Estructura

```
web/
├── app/
│   ├── layout.tsx                  Layout raíz · fuentes · nav · footer · banner cookies
│   ├── globals.css                 Tokens Brasa
│   ├── page.tsx                    Home
│   ├── carta/page.tsx              Carta navegable
│   ├── pedido/
│   │   ├── page.tsx                Checkout (3 pasos)
│   │   └── actions.ts              Server action Stripe (stub)
│   ├── locales/page.tsx            Mapa + lista de locales
│   ├── reservas/
│   │   ├── page.tsx                Layout + sidebar
│   │   ├── ReservationForm.tsx     Form react-hook-form
│   │   └── actions.ts              Server action Resend (stub)
│   ├── historia/page.tsx           Editorial
│   ├── aviso-legal/page.tsx        RGPD — LSSI-CE
│   ├── politica-de-privacidad/     RGPD — política
│   └── politica-de-cookies/        RGPD — cookies
│
├── components/
│   ├── brand/                      Wordmark · Lockup
│   ├── ui/                         Button · Chip · Input · MenuCard · SectionHeader
│   └── layout/                     SiteNav · SiteFooter · CookieBanner
│
├── lib/
│   ├── data/                       products · locations · reviews · timeline
│   └── utils.ts                    cn() · formatPrice() (EUR)
│
└── public/                         Imágenes
```

---

## Correrlo localmente

```bash
cd web
npm install
npm run dev
```

http://localhost:3000

---

## Configuración España

- **Moneda:** EUR · `Intl` con `es-ES`
- **Pagos:** Stripe + Bizum (no MercadoPago — no opera en ES)
- **IVA:** 10% incluido en precios (restauración)
- **Teléfonos:** +34
- **Páginas legales RGPD:** aviso legal, privacidad, cookies + banner
- **Locales ficticios:** Russafa, El Carmen, El Cabanyal (todos en `lib/data/locations.ts` — reemplazar con datos reales)

---

## Cómo modificar

### Cambiar colores / tipografías / radios
`app/globals.css` → bloque `@theme`. Una variable, cambia en todo el sitio.

### Cambiar contenido (carta, locales, reseñas, timeline)
`lib/data/*.ts` — TypeScript con tipos fuertes. Cuando migres a Sanity (Phase 5), reemplazás `PRODUCTS = [...]` por `await getProducts()` y nada más se rompe.

### Cambiar copy de páginas
Cada página vive en `app/<ruta>/page.tsx`. JSX legible y editable directo.

---

## Deploy a Vercel

1. **Push a GitHub:**
   ```bash
   git init && git add . && git commit -m "Initial: SABA web v1"
   git remote add origin git@github.com:<user>/saba-web.git
   git push -u origin main
   ```

2. **Importar en Vercel:**
   - vercel.com → "Add New Project" → Import `saba-web`
   - Framework: Next.js (autodetectado)
   - Root directory: `web/`

3. **Env vars** — copiar de `.env.example` y rellenar:
   - `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`
   - `SITE_URL`

4. **Deploy automático** al push a `main`. Preview por cada PR.

5. **Dominio:** Vercel → Settings → Domains → agregar `sababurgers.es`.

---

## Próximos pasos (Phase 5+)

- [ ] **Stripe real** — `npm i stripe`, descomentar bloque en `app/pedido/actions.ts`. Webhook en `app/api/stripe/webhook/route.ts`.
- [ ] **Bizum activo** en Stripe Dashboard (España → Settings → Payment methods).
- [ ] **Resend real** — `npm i resend`, descomentar bloque en `app/reservas/actions.ts`. HTML del email de confirmación.
- [ ] **Cart context** — `pedido/page.tsx` usa mock estático. Implementar Zustand para persistir entre páginas.
- [ ] **Imágenes reales** — placeholders rayados → `<Image>` de Next. Subir a `public/menu/` o CDN.
- [ ] **CMS Sanity** — para que el cliente edite carta y locales sin tocar código.
- [ ] **Google Analytics 4** — solo después del consentimiento del banner (`localStorage.saba_consent === 'all'`).
- [ ] **Sitemap + robots.ts + opengraph-image.tsx**.
- [ ] **Schema.org `Restaurant`** con `addressLocality: "Valencia"`, `addressCountry: "ES"`.
- [ ] **Aviso legal real** — sustituir CIF y datos registrales reales.

---

## Roadmap de funcionalidad

| Pantalla | Estado | Falta para producción |
|---|---|---|
| Home | ✅ Completa | Foto hero real |
| Carta | ✅ Completa | Fotos por producto |
| Pedido | 🟡 UI completa, Stripe stub | Conectar Stripe + cart context |
| Locales | ✅ Completa | Embed Google Maps real (o mantener ilustrado) |
| Reservas | ✅ Form funcional, email stub | Conectar Resend |
| Historia | ✅ Completa | Foto de los hermanos |
| Legal (3) | ✅ Plantillas RGPD | Revisar con abogado + datos reales |
| Banner cookies | ✅ Funcional | Conectar GA tras consent "all" |
