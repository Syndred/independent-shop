import type { Product } from "lib/shopify/types";
import { buildProductMedia, buildSkuVariants } from "./product-images";

const money = (amount: string, currencyCode = "USD") => ({
  amount,
  currencyCode,
});

const oneVariants = buildSkuVariants(
  "one",
  "Premium Pulse Oximeter",
  "SY108",
  "188.00",
);
const oneMedia = buildProductMedia("one", "Premium Pulse Oximeter");

const twoVariants = buildSkuVariants(
  "two",
  "Pediatric Pulse Oximeter",
  "ZS101",
  "150.00",
);
const twoMedia = buildProductMedia("two", "Pediatric Pulse Oximeter");

const threeVariants = buildSkuVariants(
  "three",
  "Mini Handheld Nebulizer",
  "ZS102",
  "158.00",
);
const threeMedia = buildProductMedia("three", "Mini Handheld Nebulizer");

const fourVariants = buildSkuVariants(
  "four",
  "Advanced Pulse Oximeter",
  "ZS103",
  "150.00",
);
const fourMedia = buildProductMedia("four", "Advanced Pulse Oximeter");

export const products: Product[] = [
  {
    id: "pulse-ox-001",
    handle: "premium-pulse-oximeter",
    availableForSale: true,
    title: "Premium Pulse Oximeter",
    description:
      "SY108 rechargeable lithium-battery pulse oximeter supplied in 50-unit wholesale lots.",
    descriptionHtml:
      "<p>SY108 rechargeable lithium-battery pulse oximeter for wholesale buyers, clinics, distributors, and online sellers.</p><ul><li>Built-in rechargeable lithium battery</li><li>50-unit wholesale lot: $188</li><li>Compact pulse oximeter format for catalog sourcing</li></ul>",
    options: oneVariants.options,
    priceRange: {
      maxVariantPrice: money("188.00"),
      minVariantPrice: money("188.00"),
    },
    variants: oneVariants.variants,
    featuredImage: oneMedia.main[0]!,
    images: oneMedia.main,
    media: oneMedia,
    seo: {
      title: "Premium Pulse Oximeter SY108 Wholesale",
      description:
        "SY108 rechargeable pulse oximeter wholesale lot. Built-in lithium battery, 50 units from $188.",
    },
    tags: ["health", "featured"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "kids-ox-001",
    handle: "kids-pulse-oximeter",
    availableForSale: true,
    title: "Pediatric Pulse Oximeter",
    description:
      "ZS101 pediatric pulse oximeter for child-friendly wholesale catalog sourcing.",
    descriptionHtml:
      "<p>ZS101 pediatric pulse oximeter for clinics, pharmacies, distributors, and retailers sourcing child-friendly pulse oximeter models.</p><ul><li>Pediatric pulse oximeter keyword-focused product line</li><li>50-unit wholesale lot: $150</li><li>Compact display and child-friendly positioning</li></ul>",
    options: twoVariants.options,
    priceRange: {
      maxVariantPrice: money("150.00"),
      minVariantPrice: money("150.00"),
    },
    variants: twoVariants.variants,
    featuredImage: twoMedia.main[0]!,
    images: twoMedia.main,
    media: twoMedia,
    seo: {
      title: "Pediatric Pulse Oximeter ZS101 Wholesale",
      description:
        "Pediatric pulse oximeter ZS101 for wholesale buyers. 50-unit bulk lot from $150.",
    },
    tags: ["health"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seasonal-001",
    handle: "mini-speaker",
    availableForSale: true,
    title: "Mini Handheld Nebulizer",
    description:
      "ZS102 mini handheld nebulizer supplied in 50-unit wholesale lots.",
    descriptionHtml:
      "<p>ZS102 mini handheld nebulizer for health-device catalog sourcing and wholesale orders.</p><ul><li>Rechargeable mini handheld nebulizer line</li><li>50-unit wholesale lot: $158</li><li>Suitable for respiratory care product catalogs</li></ul>",
    options: threeVariants.options,
    priceRange: {
      maxVariantPrice: money("158.00"),
      minVariantPrice: money("158.00"),
    },
    variants: threeVariants.variants,
    featuredImage: threeMedia.main[0]!,
    images: threeMedia.main,
    media: threeMedia,
    seo: {
      title: "Mini Handheld Nebulizer ZS102 Wholesale",
      description:
        "ZS102 mini handheld nebulizer wholesale lot. 50 units from $158 for health product sourcing.",
    },
    tags: ["health", "featured"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pulse-ox-004",
    handle: "advanced-pulse-oximeter",
    availableForSale: true,
    title: "Advanced Pulse Oximeter",
    description:
      "ZS103 advanced pulse oximeter supplied in 50-unit wholesale lots.",
    descriptionHtml:
      "<p>ZS103 advanced pulse oximeter for wholesale buyers comparing compact SpO2 monitor options.</p><ul><li>Advanced pulse oximeter sourcing line</li><li>50-unit wholesale lot: $150</li><li>Catalog-ready product images and specification support</li></ul>",
    options: fourVariants.options,
    priceRange: {
      maxVariantPrice: money("150.00"),
      minVariantPrice: money("150.00"),
    },
    variants: fourVariants.variants,
    featuredImage: fourMedia.main[0]!,
    images: fourMedia.main,
    media: fourMedia,
    seo: {
      title: "Advanced Pulse Oximeter ZS103 Wholesale",
      description:
        "ZS103 advanced pulse oximeter wholesale lot. 50 units from $150 for distributors and clinics.",
    },
    tags: ["health", "featured"],
    updatedAt: new Date().toISOString(),
  },
];

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
