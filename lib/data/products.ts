import type { Product } from "lib/shopify/types";
import { buildProductMedia, buildSkuVariants } from "./product-images";

const money = (amount: string, currencyCode = "USD") => ({
  amount,
  currencyCode,
});

const oneVariants = buildSkuVariants(
  "one",
  "Premium Pulse Oximeter",
  "POX-001",
  "29.99",
);
const oneMedia = buildProductMedia("one", "Premium Pulse Oximeter");

const twoVariants = buildSkuVariants(
  "two",
  "Kids Pulse Oximeter",
  "KPOX-001",
  "34.99",
);
const twoMedia = buildProductMedia("two", "Kids Pulse Oximeter");

const threeVariants = buildSkuVariants(
  "three",
  "Mini Bluetooth Speaker",
  "SPK-001",
  "19.99",
);
const threeMedia = buildProductMedia("three", "Mini Bluetooth Speaker");

const fourVariants = buildSkuVariants(
  "four",
  "Advanced Pulse Oximeter",
  "POX-004",
  "39.99",
);
const fourMedia = buildProductMedia("four", "Advanced Pulse Oximeter");

export const products: Product[] = [
  {
    id: "pulse-ox-001",
    handle: "premium-pulse-oximeter",
    availableForSale: true,
    title: "Premium Pulse Oximeter",
    description:
      "Fast, simple oxygen saturation checks for home use, travel, and daily family care.",
    descriptionHtml:
      "<p>Fast, simple oxygen saturation checks for home use, travel, and daily family care.</p><ul><li>Easy one-button operation</li><li>Clear OLED display</li><li>Compact and lightweight</li></ul>",
    options: oneVariants.options,
    priceRange: {
      maxVariantPrice: money("29.99"),
      minVariantPrice: money("29.99"),
    },
    variants: oneVariants.variants,
    featuredImage: oneMedia.main[0]!,
    images: oneMedia.main,
    media: oneMedia,
    seo: {
      title: "Premium Pulse Oximeter",
      description: "Home pulse oximeter",
    },
    tags: ["health", "featured"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "kids-ox-001",
    handle: "kids-pulse-oximeter",
    availableForSale: true,
    title: "Kids Pulse Oximeter",
    description:
      "Made for family routines with a simple fit and friendly, easy-to-read display.",
    descriptionHtml:
      "<p>Made for family routines with a simple fit and friendly, easy-to-read display.</p><ul><li>Kid-friendly sizing</li><li>Simple display</li><li>Comfortable daily use</li></ul>",
    options: twoVariants.options,
    priceRange: {
      maxVariantPrice: money("34.99"),
      minVariantPrice: money("34.99"),
    },
    variants: twoVariants.variants,
    featuredImage: twoMedia.main[0]!,
    images: twoMedia.main,
    media: twoMedia,
    seo: { title: "Kids Pulse Oximeter", description: "Kids pulse oximeter" },
    tags: ["health"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seasonal-001",
    handle: "mini-speaker",
    availableForSale: true,
    title: "Mini Bluetooth Speaker",
    description:
      "A simple seasonal add-on product for impulse purchase tests.",
    descriptionHtml:
      "<p>A simple seasonal add-on product for impulse purchase tests.</p>",
    options: threeVariants.options,
    priceRange: {
      maxVariantPrice: money("19.99"),
      minVariantPrice: money("19.99"),
    },
    variants: threeVariants.variants,
    featuredImage: threeMedia.main[0]!,
    images: threeMedia.main,
    media: threeMedia,
    seo: { title: "Mini Bluetooth Speaker", description: "Seasonal product" },
    tags: ["seasonal"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pulse-ox-004",
    handle: "advanced-pulse-oximeter",
    availableForSale: true,
    title: "Advanced Pulse Oximeter",
    description:
      "High-clarity display and refined build for daily SpO2 monitoring at home or on the go.",
    descriptionHtml:
      "<p>High-clarity display and refined build for daily SpO2 monitoring at home or on the go.</p><ul><li>Crisp OLED readout</li><li>One-button operation</li><li>Travel-ready size</li></ul>",
    options: fourVariants.options,
    priceRange: {
      maxVariantPrice: money("39.99"),
      minVariantPrice: money("39.99"),
    },
    variants: fourVariants.variants,
    featuredImage: fourMedia.main[0]!,
    images: fourMedia.main,
    media: fourMedia,
    seo: {
      title: "Advanced Pulse Oximeter",
      description: "Advanced home pulse oximeter",
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
