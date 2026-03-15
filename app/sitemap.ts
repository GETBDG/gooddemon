import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gooddemon.example";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/admin`,
      changeFrequency: "weekly",
      priority: 0.3
    }
  ];
}
