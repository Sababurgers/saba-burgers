import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/lib/sanity/schemas";

export default defineConfig({
  name: "saba-burgers",
  title: "Saba Burgers CMS",
  projectId: "fnksuhl8",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
