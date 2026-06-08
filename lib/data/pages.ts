import type { Page } from "lib/shopify/types";

export const pages: Page[] = [
  {
    id: "page-shipping",
    title: "Shipping",
    handle: "shipping",
    body: "Shipping info",
    bodySummary: "Shipping info",
    seo: { title: "Shipping", description: "Shipping details" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
