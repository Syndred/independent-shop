import type { Collection } from "lib/shopify/types";
import { products } from "./products";

export const collections: Collection[] = [
  {
    handle: "",
    title: "All",
    description: "All products",
    seo: { title: "All", description: "All products" },
    path: "/search",
    updatedAt: new Date().toISOString(),
  },
  {
    handle: "health-care",
    title: "Health & Care",
    description: "Pulse oximeters for home and family care",
    seo: { title: "Health & Care", description: "Health products" },
    path: "/search/health-care",
    updatedAt: new Date().toISOString(),
  },
  {
    handle: "seasonal-hot-deals",
    title: "Seasonal Hot Deals",
    description: "Limited-time offers",
    seo: { title: "Seasonal Hot Deals", description: "Hot deals" },
    path: "/search/seasonal-hot-deals",
    updatedAt: new Date().toISOString(),
  },
];

export function getCollectionProductsByHandle(collection: string) {
  if (collection === "health-care") {
    return products.filter((product) => product.tags.includes("health"));
  }
  if (collection === "seasonal-hot-deals") {
    return products.filter((product) => product.tags.includes("seasonal"));
  }
  return products;
}
