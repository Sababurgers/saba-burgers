import { sanityClient } from "./client";

export interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  weight?: string;
  description?: string;
  badge?: string;
  available: boolean;
  featured: boolean;
  imageUrl?: string;
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  order: number;
}

const IMAGE_PROJECTION = `"imageUrl": image.asset->url`;

export async function getProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && available == true] | order(category->order asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      "category": category->slug.current,
      price,
      weight,
      description,
      badge,
      available,
      featured,
      ${IMAGE_PROJECTION}
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getCategories(): Promise<SanityCategory[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      order
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export interface SiteSettings {
  heroImage?: string;
  whySaba1?: string; whySaba2?: string; whySaba3?: string;
  heroReservas?: string; reservasSidebar?: string;
  heroUbicacion?: string;
  ubicacionFoto1?: string; ubicacionFoto2?: string; ubicacionFoto3?: string;
  heroNuestroProducto?: string;
  npFoto1?: string; npFoto2?: string; npFoto3?: string; npFoto4?: string; npFoto5?: string;
  horarios?: { open: string; close: string }[];
}

const IMG = (field: string) => `"${field}": ${field}.asset->url`;

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      ${IMG("heroImage")},
      ${IMG("whySaba1")}, ${IMG("whySaba2")}, ${IMG("whySaba3")},
      ${IMG("heroReservas")}, ${IMG("reservasSidebar")},
      ${IMG("heroUbicacion")},
      ${IMG("ubicacionFoto1")}, ${IMG("ubicacionFoto2")}, ${IMG("ubicacionFoto3")},
      ${IMG("heroNuestroProducto")},
      ${IMG("npFoto1")}, ${IMG("npFoto2")}, ${IMG("npFoto3")}, ${IMG("npFoto4")}, ${IMG("npFoto5")},
      "horarios": horarios[]{ open, close }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
  return result ?? {};
}

export async function getFeaturedProducts(limit = 3): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && available == true && featured == true][0..${limit - 1}] {
      _id,
      name,
      "slug": slug.current,
      "category": category->slug.current,
      price,
      weight,
      description,
      badge,
      available,
      featured,
      ${IMAGE_PROJECTION}
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
