export type ProductCategory =
  | "smashburgers"
  | "para-compartir"
  | "veggies"
  | "postres"
  | "bebidas";

export type ProductBadge = "popular" | "subcamp" | "nueva" | "vegana" | "casero" | "estrella" | "veggie" | null;

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  category: ProductCategory;
  badge?: ProductBadge;
  image?: string;
  diet?: ("gluten-free" | "vegan" | "vegetarian")[];
}

export const CATEGORIES: { id: ProductCategory; label: string; description: string }[] = [
  {
    id: "smashburgers",
    label: "Smashburgers",
    description: "Carne fresca prensada al momento sobre plancha de hierro. 250–320 g.",
  },
  {
    id: "para-compartir",
    label: "Para compartir",
    description: "Para compartir o no. Por norma general, no.",
  },
  {
    id: "veggies",
    label: "Veggies",
    description: "Sin carne, sin atajos. Misma cocina, distinta receta.",
  },
  {
    id: "postres",
    label: "Postres",
    description: "Para cerrar la noche. Recetas caseras, hechas en el día.",
  },
  {
    id: "bebidas",
    label: "Bebidas",
    description: "Refrescos, cervezas de barril y algún capricho.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    slug: "la-saba",
    name: "La Saba",
    description: "Doble carne, doble cheddar, pepinillos en vinagre, salsa Saba, pan brioche.",
    price: 9.5,
    weight: "250 g",
    category: "smashburgers",
    badge: "popular",
  },
  {
    id: "p-2",
    slug: "doble-brasa",
    name: "Doble Brasa",
    description: "Doble medallón ahumado, cheddar curado, cebolla caramelizada, bacon, pan de patata.",
    price: 11.5,
    weight: "320 g",
    category: "smashburgers",
    badge: "subcamp",
  },
  {
    id: "p-3",
    slug: "saba-kataifi",
    name: "Saba Kataifi",
    description: "Medallón con nido de kataifi crujiente, queso fundido, cebolla pochada, mayonesa de trufa.",
    price: 12.5,
    weight: "280 g",
    category: "smashburgers",
    badge: "nueva",
  },
  {
    id: "p-4",
    slug: "saba-negra",
    name: "Saba Negra",
    description: "Carbón vegetal en el pan, cheddar añejo, champiñones a la plancha, mayonesa de chipotle.",
    price: 12.5,
    weight: "280 g",
    category: "smashburgers",
  },
  {
    id: "p-5",
    slug: "blue-bacon",
    name: "Blue Bacon",
    description: "Doble medallón, queso azul, bacon crujiente, cebolla morada, mayonesa de eneldo.",
    price: 11.0,
    weight: "280 g",
    category: "smashburgers",
  },
  {
    id: "p-6",
    slug: "la-cheese",
    name: "La Cheese",
    description: "Medallón simple, doble cheddar, pepinillos, mostaza tostada, kétchup de la casa.",
    price: 8.5,
    weight: "200 g",
    category: "smashburgers",
  },
  {
    id: "p-7",
    slug: "nachos",
    name: "Nachos Saba",
    description: "Masa de totopos hecha aquí, guacamole batido al momento, carne picada y queso fundido.",
    price: 6.8,
    weight: "Para 2",
    category: "para-compartir",
    badge: "casero",
  },
  {
    id: "p-8",
    slug: "tequenos",
    name: "Tequeños",
    description: "Masa fina y crujiente con queso fundido que tira hilos. Salsa de la casa al lado.",
    price: 5.5,
    weight: "6 uds",
    category: "para-compartir",
  },
  {
    id: "p-9",
    slug: "patatas-saba",
    name: "Patatas Saba",
    description: "Patatas rústicas, sal gruesa, romero, cheddar fundido y bacon crujiente.",
    price: 4.2,
    weight: "Para 2",
    category: "para-compartir",
  },
  {
    id: "p-10",
    slug: "aros",
    name: "Aros de cebolla",
    description: "Aros gruesos rebozados, mayonesa de chipotle ahumada al lado.",
    price: 4.5,
    weight: "Para 1",
    category: "para-compartir",
  },
  {
    id: "p-11",
    slug: "ensalada-saba",
    name: "Ensalada Saba",
    description: "Hojas verdes, aguacate, tomate cherry, parmesano, vinagreta de mostaza.",
    price: 5.8,
    weight: "Para 2",
    category: "para-compartir",
    badge: "veggie",
    diet: ["vegetarian"],
  },
  {
    id: "p-12",
    slug: "la-verde",
    name: "La Verde",
    description: "Medallón de garbanzos, queso vegano, aguacate, rúcula, mayonesa de albahaca.",
    price: 9.5,
    weight: "220 g",
    category: "veggies",
    badge: "vegana",
    diet: ["vegan"],
  },
  {
    id: "p-13",
    slug: "tarta-lotus",
    name: "Tarta de queso Lotus",
    description: "Tarta de queso casera con base y crumble de galleta Lotus. Dulzor contenido.",
    price: 5.8,
    category: "postres",
    badge: "estrella",
  },
  {
    id: "p-14",
    slug: "tarta-oreo",
    name: "Tarta de queso Oreo",
    description: "Tarta de queso casera con galleta Oreo en base y trozos por encima.",
    price: 5.8,
    category: "postres",
  },
  {
    id: "p-15",
    slug: "coca",
    name: "Coca-Cola 33 cl",
    description: "Original, Zero o Light.",
    price: 2.5,
    category: "bebidas",
  },
  {
    id: "p-16",
    slug: "limonada",
    name: "Limonada de jengibre",
    description: "Hecha en el día, jengibre fresco, menta, poco azúcar.",
    price: 3.2,
    category: "bebidas",
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 3): Product[] {
  const featured = PRODUCTS.filter(
    (p) => p.badge === "popular" || p.badge === "subcamp" || p.badge === "nueva"
  );
  return featured.slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
