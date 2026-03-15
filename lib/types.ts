export type Badge =
  | "Limited Drop"
  | "Exclusive Release"
  | "Low Stock"
  | "Archived"
  | "Restocking";

export type Product = {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  collection: string;
  category: string;
  color: string;
  badges: Badge[];
  sizes: string[];
  stock: number;
  description: string;
  material: string;
  fit: string;
  care: string;
  shipping: string;
  images: {
    src: string;
    alt: string;
  }[];
  spotlight: string;
};

export type Collection = {
  handle: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  heroImage: string;
  tags: string[];
};

export type CategoryCard = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export type LookbookItem = {
  id: string;
  title: string;
  image: string;
  caption: string;
  productHandles: string[];
};

export type CultureItem = {
  id: string;
  title: string;
  channel: string;
  image: string;
};
