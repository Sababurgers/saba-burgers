import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
  });

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    // ─── HORARIOS ───────────────────────────────────────────
    defineField({
      name: "horariosSection",
      title: "── Horarios ──────────────────",
      type: "string",
      readOnly: true,
      initialValue: "",
    }),
    defineField({
      name: "horarios",
      title: "Turnos de apertura",
      type: "array",
      description: "Cada turno tiene hora de apertura y cierre (formato 24h, ej: 13:00)",
      of: [
        {
          type: "object",
          name: "turno",
          title: "Turno",
          fields: [
            defineField({
              name: "open", title: "Apertura (24h)", type: "string",
              placeholder: "13:00",
              validation: (R) => R.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "formato", invert: false }).error("Formato incorrecto. Usa HH:MM en 24h, ej: 13:00"),
            }),
            defineField({
              name: "close", title: "Cierre (24h)", type: "string",
              placeholder: "16:30",
              validation: (R) => R.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "formato", invert: false }).error("Formato incorrecto. Usa HH:MM en 24h, ej: 16:30"),
            }),
          ],
          preview: {
            select: { title: "open", subtitle: "close" },
          },
        },
      ],
    }),

    // ─── HOME ───────────────────────────────────────────────
    defineField({
      name: "homeSection",
      title: "── Home ──────────────────────",
      type: "string",
      readOnly: true,
      initialValue: "",
    }),
    imageField("heroImage", "Hero — Foto principal (derecha del título)"),
    imageField("whySaba1", "Por qué Saba — Foto 1 (Carne fresca)"),
    imageField("whySaba2", "Por qué Saba — Foto 2 (Plancha caliente)"),
    imageField("whySaba3", "Por qué Saba — Foto 3 (Cocina / detalle)"),

    // ─── RESERVAS ───────────────────────────────────────────
    defineField({
      name: "reservasSection",
      title: "── Reservas ──────────────────",
      type: "string",
      readOnly: true,
      initialValue: "",
    }),
    imageField("heroReservas", "Reservas — Fondo del hero (opcional)"),
    imageField("reservasSidebar", "Reservas — Foto del lateral"),

    // ─── UBICACIÓN ──────────────────────────────────────────
    defineField({
      name: "ubicacionSection",
      title: "── Ubicación ─────────────────",
      type: "string",
      readOnly: true,
      initialValue: "",
    }),
    imageField("heroUbicacion", "Ubicación — Fondo del hero (opcional)"),
    imageField("ubicacionFoto1", "Ubicación — Galería foto 1 (Fachada)"),
    imageField("ubicacionFoto2", "Ubicación — Galería foto 2 (Interior)"),
    imageField("ubicacionFoto3", "Ubicación — Galería foto 3 (Detalle)"),

    // ─── NUESTRO PRODUCTO ───────────────────────────────────
    defineField({
      name: "nuestroProductoSection",
      title: "── Nuestro Producto ──────────",
      type: "string",
      readOnly: true,
      initialValue: "",
    }),
    imageField("heroNuestroProducto", "Nuestro Producto — Fondo del hero"),
    imageField("npFoto1", "Nuestro Producto — Galería foto 1"),
    imageField("npFoto2", "Nuestro Producto — Galería foto 2"),
    imageField("npFoto3", "Nuestro Producto — Galería foto 3"),
    imageField("npFoto4", "Nuestro Producto — Galería foto 4"),
    imageField("npFoto5", "Nuestro Producto — Galería foto 5"),
  ],
  preview: {
    prepare: () => ({ title: "Ajustes del sitio" }),
  },
});
