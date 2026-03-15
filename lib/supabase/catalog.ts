import type { SupabaseClient } from "@supabase/supabase-js";
import type { Collection, Product } from "@/lib/types";

type ImageRecord = {
  src: string;
  alt: string;
};

type ProductRow = {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  price: number;
  compare_at_price: number | null;
  collection_handle: string;
  category: string;
  color: string;
  badges: string[] | null;
  sizes: string[] | null;
  stock: number;
  description: string;
  material: string;
  fit: string;
  care: string;
  shipping: string;
  spotlight: string;
  images: ImageRecord[] | null;
};

type CollectionRow = {
  handle: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  hero_image: string;
  tags: string[] | null;
};

function normalizeImages(images: ImageRecord[] | null, name: string) {
  if (!images || images.length === 0) {
    return [
      { src: "/images/product-tee-front.svg", alt: `${name} image 1` },
      { src: "/images/product-tee-front.svg", alt: `${name} image 2` },
      { src: "/images/product-tee-front.svg", alt: `${name} image 3` }
    ];
  }

  return images;
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    handle: row.handle,
    name: row.name,
    tagline: row.tagline,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ?? undefined,
    collection: row.collection_handle,
    category: row.category,
    color: row.color,
    badges: (row.badges ?? []) as Product["badges"],
    sizes: row.sizes ?? [],
    stock: row.stock,
    description: row.description,
    material: row.material,
    fit: row.fit,
    care: row.care,
    shipping: row.shipping,
    spotlight: row.spotlight,
    images: normalizeImages(row.images, row.name)
  };
}

export function mapCollectionRow(row: CollectionRow): Collection {
  return {
    handle: row.handle,
    name: row.name,
    eyebrow: row.eyebrow,
    description: row.description,
    accent: row.accent,
    heroImage: row.hero_image,
    tags: row.tags ?? []
  };
}

export function mapProductToRow(product: Product): ProductRow {
  return {
    id: product.id,
    handle: product.handle,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    compare_at_price: product.compareAtPrice ?? null,
    collection_handle: product.collection,
    category: product.category,
    color: product.color,
    badges: product.badges,
    sizes: product.sizes,
    stock: product.stock,
    description: product.description,
    material: product.material,
    fit: product.fit,
    care: product.care,
    shipping: product.shipping,
    spotlight: product.spotlight,
    images: product.images
  };
}

export function mapCollectionToRow(collection: Collection): CollectionRow {
  return {
    handle: collection.handle,
    name: collection.name,
    eyebrow: collection.eyebrow,
    description: collection.description,
    accent: collection.accent,
    hero_image: collection.heroImage,
    tags: collection.tags
  };
}

export async function fetchCollections(client: SupabaseClient) {
  const { data, error } = await client
    .from("collections")
    .select("handle,name,eyebrow,description,accent,hero_image,tags")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as CollectionRow[]).map(mapCollectionRow);
}

export async function fetchProducts(client: SupabaseClient) {
  const { data, error } = await client
    .from("products")
    .select(
      "id,handle,name,tagline,price,compare_at_price,collection_handle,category,color,badges,sizes,stock,description,material,fit,care,shipping,spotlight,images"
    )
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as ProductRow[]).map(mapProductRow);
}

export async function upsertCollection(client: SupabaseClient, collection: Collection) {
  const { error } = await client
    .from("collections")
    .upsert(mapCollectionToRow(collection), { onConflict: "handle" });

  if (error) {
    throw error;
  }
}

export async function upsertProduct(client: SupabaseClient, product: Product) {
  const { error } = await client
    .from("products")
    .upsert(mapProductToRow(product), { onConflict: "id" });

  if (error) {
    throw error;
  }
}

export async function deleteCollection(client: SupabaseClient, handle: string) {
  const { error } = await client.from("collections").delete().eq("handle", handle);

  if (error) {
    throw error;
  }
}

export async function deleteProduct(client: SupabaseClient, productId: string) {
  const { error } = await client.from("products").delete().eq("id", productId);

  if (error) {
    throw error;
  }
}
