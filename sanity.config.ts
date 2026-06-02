import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/lib/sanity/schemas";

export default defineConfig({
  name: "saba-burgers",
  title: "Saba Burgers CMS",
  projectId: "fnksuhl8",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Saba Burgers CMS")
          .items([
            S.listItem()
              .title("🖼️  Imágenes del sitio")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Imágenes del sitio")
              ),
            S.divider(),
            S.listItem()
              .title("🍔  Productos")
              .schemaType("product")
              .child(S.documentTypeList("product").title("Productos")),
            S.listItem()
              .title("📂  Categorías")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categorías")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
