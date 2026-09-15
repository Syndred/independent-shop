import type { Product } from "lib/shopify/types";
import { productMedia } from "./product-images";

// Source: owner-supplied 1688 listing, reviewed 2026-09-15.
// Original supplier photos are restored; current configuration, specifications,
// stock and export approval still require confirmation.
const catalog = [
  {
    handle: "upper-arm-blood-pressure-monitor",
    title: "Upper-arm Blood Pressure Monitor",
    category: "blood-pressure-monitors",
    model: null,
    format: "Upper-arm cuff",
    description:
      "Upper-arm blood pressure monitor sourcing for wholesale buyers. Request the exact model, cuff sizes, instruction manual and destination-specific documentation.",
    checks: [
      "Exact model and manufacturer",
      "Cuff circumference and included cuff",
      "Power supply and voice language",
      "Measurement specifications and validation evidence",
    ],
  },
  {
    handle: "wrist-blood-pressure-monitor",
    title: "Wrist Blood Pressure Monitor",
    category: "blood-pressure-monitors",
    model: null,
    format: "Wrist cuff",
    description:
      "Wrist blood pressure monitor sourcing for compact home health assortments. Confirm the model, wrist fit, positioning instructions and packaging before sampling.",
    checks: [
      "Exact model and manufacturer",
      "Wrist circumference and positioning instructions",
      "Power supply and voice language",
      "Measurement specifications and validation evidence",
    ],
  },
  {
    handle: "lk87-pulse-oximeter",
    title: "LK87 Fingertip Pulse Oximeter",
    category: "pulse-oximeters",
    model: "LK87",
    format: "Fingertip",
    description:
      "LK87 fingertip pulse oximeter for wholesale sourcing. Ask for current model photos, display options, intended users and a complete quotation for your destination.",
    checks: [
      "Display type and included readings",
      "Intended users and finger-size range",
      "Power supply and included accessories",
      "Measurement specifications and supporting documents",
    ],
  },
  {
    handle: "lk89-pulse-oximeter",
    title: "LK89 Fingertip Pulse Oximeter",
    category: "pulse-oximeters",
    model: "LK89",
    format: "Fingertip",
    description:
      "LK89 fingertip pulse oximeter for wholesale buyers comparing display configurations. The supplier listing includes LED and TFT variants; confirm the exact version in your quote.",
    checks: [
      "LED or TFT configuration and model label",
      "Intended users and finger-size range",
      "Power supply and included accessories",
      "Measurement specifications and supporting documents",
    ],
  },
  {
    handle: "sy108-mesh-nebulizer",
    title: "SY108 Mesh Nebulizer",
    category: "mesh-nebulizers",
    model: "SY108",
    format: "Handheld mesh nebulizer",
    description:
      "SY108 handheld mesh nebulizer for wholesale sourcing. Request the current configuration, cup and accessory details, instruction manual and sample terms.",
    checks: [
      "Power supply and charging configuration",
      "Cup capacity and included masks or mouthpiece",
      "Aerosol specifications and test documentation",
      "Cleaning instructions and replacement components",
    ],
  },
  {
    handle: "zs101-mesh-nebulizer",
    title: "ZS101 Mesh Nebulizer",
    category: "mesh-nebulizers",
    model: "ZS101",
    format: "Handheld mesh nebulizer",
    description:
      "ZS101 handheld mesh nebulizer for wholesale buyers. Confirm the battery configuration, cup, accessories and current specification sheet before a sample or bulk order.",
    checks: [
      "Battery configuration and transport documents",
      "Cup capacity and included masks or mouthpiece",
      "Aerosol specifications and test documentation",
      "Cleaning instructions and replacement components",
    ],
  },
] as const;

export const products: Product[] = catalog.map((item) => ({
  id: item.handle,
  handle: item.handle,
  title: item.title,
  model: item.model,
  category: item.category,
  format: item.format,
  confirmationItems: [...item.checks],
  photoVerified: false,
  availableForSale: false,
  description: item.description,
  descriptionHtml: `<p>${item.description}</p><p>MOQ, sample availability, OEM/ODM feasibility, price, lead time and compliance documents are confirmed by quotation for the selected configuration and destination.</p>`,
  options: [],
  variants: [],
  // Legacy template compatibility only; these values are never a public price.
  priceRange: {
    minVariantPrice: { amount: "0", currencyCode: "USD" },
    maxVariantPrice: { amount: "0", currencyCode: "USD" },
  },
  featuredImage: productMedia[item.handle]?.main[0] ?? {
    url: "/catalog-photo-pending.svg",
    altText:
      "Product photo available on request; exact model image awaiting confirmation",
    width: 800,
    height: 600,
  },
  images: productMedia[item.handle]?.main ?? [],
  media: productMedia[item.handle] ?? { main: [], sku: [], detail: null },
  seo: {
    title: `${item.title} Wholesale & Sample Inquiry`,
    description: item.description,
  },
  tags: ["health", item.category],
  updatedAt: "2026-09-15T00:00:00.000Z",
}));

export function findProductByHandle(handle: string): Product | undefined {
  return products.find((product) => product.handle === handle);
}
export function findVariantById(variantId: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}
