import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ID interno)",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Precio (€)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "weight",
      title: "Peso / Descripción corta",
      type: "string",
      description: 'Ej: "230g" o "2 uds"',
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Foto del producto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "badge",
      title: "Etiqueta",
      type: "string",
      options: {
        list: [
          { title: "Sin etiqueta", value: "" },
          { title: "Popular", value: "popular" },
          { title: "Subcampeón", value: "subcamp" },
          { title: "Nueva", value: "nueva" },
          { title: "Vegana", value: "vegana" },
          { title: "Veggie", value: "veggie" },
          { title: "Casero", value: "casero" },
          { title: "Estrella", value: "estrella" },
        ],
      },
    }),
    defineField({
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
      description: "Desactivar para ocultar temporalmente del menú",
    }),
    defineField({
      name: "featured",
      title: "Destacado en el home",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} €` : "",
        media,
      };
    },
  },
});
