import { defineField, defineType } from "sanity";

const DAYS = [
  { title: "Lunes", value: "lun" },
  { title: "Martes", value: "mar" },
  { title: "Miércoles", value: "mie" },
  { title: "Jueves", value: "jue" },
  { title: "Viernes", value: "vie" },
  { title: "Sábado", value: "sab" },
  { title: "Domingo", value: "dom" },
];

const imageField = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: "image",
    group,
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
  });

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  groups: [
    { name: "horarios", title: "🕐 Horarios" },
    { name: "home", title: "🏠 Home" },
    { name: "reservas", title: "📅 Reservas" },
    { name: "ubicacion", title: "📍 Ubicación" },
    { name: "nuestroProducto", title: "🍔 Nuestro Producto" },
  ],
  fields: [
    // ─── HORARIOS ───────────────────────────────────────────
    defineField({
      name: "horarios",
      title: "Turnos de apertura",
      type: "array",
      group: "horarios",
      description: "Añade un turno por cada franja horaria. Formato 24h (ej: 13:00).",
      of: [
        {
          type: "object",
          name: "turno",
          title: "Turno",
          fields: [
            defineField({
              name: "days",
              title: "Días",
              type: "array",
              of: [{ type: "string" }],
              options: { list: DAYS, layout: "grid" },
              description: "Días de la semana en que aplica este turno",
            }),
            defineField({
              name: "open",
              title: "Apertura",
              type: "string",
              placeholder: "13:00",
              validation: (R) =>
                R.required()
                  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "fmt", invert: false })
                  .error("Usa formato HH:MM en 24h, ej: 13:00"),
            }),
            defineField({
              name: "close",
              title: "Cierre",
              type: "string",
              placeholder: "16:30",
              validation: (R) =>
                R.required()
                  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "fmt", invert: false })
                  .error("Usa formato HH:MM en 24h, ej: 16:30"),
            }),
          ],
          preview: {
            select: { open: "open", close: "close", days: "days" },
            prepare({ open, close, days }: { open?: string; close?: string; days?: string[] }) {
              const daysStr = days?.join(", ") ?? "Todos los días";
              return { title: `${open ?? "?"} – ${close ?? "?"}`, subtitle: daysStr };
            },
          },
        },
      ],
    }),

    // ─── HOME ───────────────────────────────────────────────
    imageField("heroImage", "Foto principal (derecha del título)", "home"),
    imageField("whySaba1", "Por qué Saba — Foto 1 (Carne fresca)", "home"),
    imageField("whySaba2", "Por qué Saba — Foto 2 (Plancha caliente)", "home"),
    imageField("whySaba3", "Por qué Saba — Foto 3 (Cocina / detalle)", "home"),

    // ─── RESERVAS ───────────────────────────────────────────
    imageField("heroReservas", "Fondo del hero (opcional)", "reservas"),
    imageField("reservasSidebar", "Foto del lateral", "reservas"),

    // ─── UBICACIÓN ──────────────────────────────────────────
    imageField("heroUbicacion", "Fondo del hero (opcional)", "ubicacion"),
    imageField("ubicacionFoto1", "Galería — Foto 1 (Fachada)", "ubicacion"),
    imageField("ubicacionFoto2", "Galería — Foto 2 (Interior)", "ubicacion"),
    imageField("ubicacionFoto3", "Galería — Foto 3 (Detalle)", "ubicacion"),

    // ─── NUESTRO PRODUCTO ───────────────────────────────────
    imageField("heroNuestroProducto", "Fondo del hero", "nuestroProducto"),
    imageField("npFoto1", "Galería — Foto 1", "nuestroProducto"),
    imageField("npFoto2", "Galería — Foto 2", "nuestroProducto"),
    imageField("npFoto3", "Galería — Foto 3", "nuestroProducto"),
    imageField("npFoto4", "Galería — Foto 4", "nuestroProducto"),
    imageField("npFoto5", "Galería — Foto 5", "nuestroProducto"),
  ],
  preview: {
    prepare: () => ({ title: "Ajustes del sitio" }),
  },
});
