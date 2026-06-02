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
