import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fnksuhl8",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const CATEGORIES = [
  { slug: "smashburgers", name: "Smashburgers", order: 1 },
  { slug: "para-compartir", name: "Para compartir", order: 2 },
  { slug: "veggies", name: "Veggies", order: 3 },
  { slug: "postres", name: "Postres", order: 4 },
  { slug: "bebidas", name: "Bebidas", order: 5 },
];

const PRODUCTS = [
  { slug: "la-saba", name: "La Saba", category: "smashburgers", price: 9.5, weight: "250 g", description: "Doble carne, doble cheddar, pepinillos en vinagre, salsa Saba, pan brioche.", badge: "popular", featured: true },
  { slug: "doble-brasa", name: "Doble Brasa", category: "smashburgers", price: 11.5, weight: "320 g", description: "Doble medallón ahumado, cheddar curado, cebolla caramelizada, bacon, pan de patata.", badge: "subcamp", featured: true },
  { slug: "saba-kataifi", name: "Saba Kataifi", category: "smashburgers", price: 12.5, weight: "280 g", description: "Medallón con nido de kataifi crujiente, queso fundido, cebolla pochada, mayonesa de trufa.", badge: "nueva", featured: true },
  { slug: "saba-negra", name: "Saba Negra", category: "smashburgers", price: 12.5, weight: "280 g", description: "Carbón vegetal en el pan, cheddar añejo, champiñones a la plancha, mayonesa de chipotle." },
  { slug: "blue-bacon", name: "Blue Bacon", category: "smashburgers", price: 11.0, weight: "280 g", description: "Doble medallón, queso azul, bacon crujiente, cebolla morada, mayonesa de eneldo." },
  { slug: "la-cheese", name: "La Cheese", category: "smashburgers", price: 8.5, weight: "200 g", description: "Medallón simple, doble cheddar, pepinillos, mostaza tostada, kétchup de la casa." },
  { slug: "nachos", name: "Nachos Saba", category: "para-compartir", price: 6.8, weight: "Para 2", description: "Masa de totopos hecha aquí, guacamole batido al momento, carne picada y queso fundido.", badge: "casero" },
  { slug: "tequenos", name: "Tequeños", category: "para-compartir", price: 5.5, weight: "6 uds", description: "Masa fina y crujiente con queso fundido que tira hilos. Salsa de la casa al lado." },
  { slug: "patatas-saba", name: "Patatas Saba", category: "para-compartir", price: 4.2, weight: "Para 2", description: "Patatas rústicas, sal gruesa, romero, cheddar fundido y bacon crujiente." },
  { slug: "aros", name: "Aros de cebolla", category: "para-compartir", price: 4.5, weight: "Para 1", description: "Aros gruesos rebozados, mayonesa de chipotle ahumada al lado." },
  { slug: "ensalada-saba", name: "Ensalada Saba", category: "para-compartir", price: 5.8, weight: "Para 2", description: "Hojas verdes, aguacate, tomate cherry, parmesano, vinagreta de mostaza.", badge: "veggie" },
  { slug: "la-verde", name: "La Verde", category: "veggies", price: 9.5, weight: "220 g", description: "Medallón de garbanzos, queso vegano, aguacate, rúcula, mayonesa de albahaca.", badge: "vegana" },
  { slug: "tarta-lotus", name: "Tarta de queso Lotus", category: "postres", price: 5.8, description: "Tarta de queso casera con base y crumble de galleta Lotus. Dulzor contenido.", badge: "estrella" },
  { slug: "tarta-oreo", name: "Tarta de queso Oreo", category: "postres", price: 5.8, description: "Tarta de queso casera con galleta Oreo en base y trozos por encima." },
  { slug: "coca", name: "Coca-Cola 33 cl", category: "bebidas", price: 2.5, description: "Original, Zero o Light." },
  { slug: "limonada", name: "Limonada de jengibre", category: "bebidas", price: 3.2, description: "Hecha en el día, jengibre fresco, menta, poco azúcar." },
];

async function seed() {
  console.log("Creando categorías...");
  const categoryIds = {};

  for (const cat of CATEGORIES) {
    const doc = await client.createOrReplace({
      _type: "category",
      _id: `category-${cat.slug}`,
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      order: cat.order,
    });
    categoryIds[cat.slug] = doc._id;
    console.log(`  ✓ ${cat.name}`);
  }

  console.log("\nCreando productos...");
  for (const p of PRODUCTS) {
    await client.createOrReplace({
      _type: "product",
      _id: `product-${p.slug}`,
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      category: { _type: "reference", _ref: categoryIds[p.category] },
      price: p.price,
      weight: p.weight ?? null,
      description: p.description,
      badge: p.badge ?? "",
      available: true,
      featured: p.featured ?? false,
    });
    console.log(`  ✓ ${p.name} — ${p.price} €`);
  }

  console.log("\n✅ Todos los datos cargados en Sanity.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
