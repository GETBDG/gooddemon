import type { MetadataRoute } from "next";
import { collections, products } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gooddemon.example";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1
    },
    ...collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
