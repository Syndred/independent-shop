import { products } from "lib/data/products";
import { collections } from "lib/data/collections";
import { pages } from "lib/data/pages";
import { baseUrl } from "lib/utils";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/contact",
    ...collections.map((c) => c.path),
    ...products.map((p) => `/product/${p.handle}`),
    ...pages.map((p) => `/${p.handle}`),
  ];
  return [...new Set(paths)].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: "2026-09-15T00:00:00.000Z",
  }));
}
