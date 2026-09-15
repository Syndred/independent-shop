import type { Collection } from "lib/shopify/types";
import { products } from "./products";
export const collections: Collection[] = [
  {
    handle: "",
    title: "All products",
    description:
      "Six home health product lines for wholesale sourcing. Request current MOQ, samples and quotations.",
    path: "/search",
  },
  {
    handle: "blood-pressure-monitors",
    title: "Blood Pressure Monitors",
    description:
      "Compare upper-arm and wrist blood pressure monitor sourcing options. Confirm cuff sizes, exact models and documentation before ordering.",
    path: "/search/blood-pressure-monitors",
  },
  {
    handle: "pulse-oximeters",
    title: "Pulse Oximeters",
    description:
      "Compare LK87 and LK89 fingertip pulse oximeters for wholesale sourcing. Confirm display configuration, intended users and documents by quotation.",
    path: "/search/pulse-oximeters",
  },
  {
    handle: "mesh-nebulizers",
    title: "Mesh Nebulizers",
    description:
      "Source SY108 and ZS101 handheld mesh nebulizers. Request specification sheets, accessories, sample costs and destination terms.",
    path: "/search/mesh-nebulizers",
  },
].map((item) => ({
  ...item,
  seo: {
    title: `${item.title} Wholesale Catalog`,
    description: item.description,
  },
  updatedAt: "2026-09-15T00:00:00.000Z",
}));
export function getCollectionProductsByHandle(collection: string) {
  return collection
    ? products.filter((product) => product.category === collection)
    : products;
}
