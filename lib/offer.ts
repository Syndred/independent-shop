import { products } from "lib/data/products";
import type { Product } from "lib/shopify/types";

export type OfferCountry = {
  slug: string;
  label: string;
  shippingCopy: string;
};

export type OfferBuyerType = {
  slug: string;
  label: string;
  fitCopy: string;
};

export type OfferContext = {
  slug: string;
  isCanonical: boolean;
  product: Product;
  country: OfferCountry;
  buyerType: OfferBuyerType;
};

const countries: Record<string, OfferCountry> = {
  global: {
    slug: "global",
    label: "Global Buyers",
    shippingCopy:
      "Destination, shipping route, and trade terms are confirmed with your quotation.",
  },
  uae: {
    slug: "uae",
    label: "UAE",
    shippingCopy:
      "Share your UAE destination and order details so the suitable shipping route and terms can be quoted.",
  },
  "saudi-arabia": {
    slug: "saudi-arabia",
    label: "Saudi Arabia",
    shippingCopy:
      "Share your Saudi destination and order details so the suitable shipping route and terms can be quoted.",
  },
  mexico: {
    slug: "mexico",
    label: "Mexico",
    shippingCopy:
      "Share your Mexico destination and order details so the suitable shipping route and terms can be quoted.",
  },
  philippines: {
    slug: "philippines",
    label: "the Philippines",
    shippingCopy:
      "Share your Philippines destination and order details so the suitable shipping route and terms can be quoted.",
  },
  "south-africa": {
    slug: "south-africa",
    label: "South Africa",
    shippingCopy:
      "Share your South Africa destination and order details so the suitable shipping route and terms can be quoted.",
  },
  usa: {
    slug: "usa",
    label: "the United States",
    shippingCopy:
      "Share your US destination and order details so the suitable shipping route and terms can be quoted.",
  },
  uk: {
    slug: "uk",
    label: "the United Kingdom",
    shippingCopy:
      "Share your UK destination and order details so the suitable shipping route and terms can be quoted.",
  },
};

const buyerTypes: Record<string, OfferBuyerType> = {
  distributor: {
    slug: "distributor",
    label: "Distributors",
    fitCopy:
      "Built for buyers comparing a dependable product line, repeat orders, and channel-ready support.",
  },
  wholesaler: {
    slug: "wholesaler",
    label: "Wholesalers",
    fitCopy:
      "Built for wholesale buyers evaluating assortment, MOQ, packaging, and repeat supply.",
  },
  importer: {
    slug: "importer",
    label: "Importers",
    fitCopy:
      "Built for importers who need destination details, documents, and order terms confirmed before purchase.",
  },
  "retail-chain": {
    slug: "retail-chain",
    label: "Retail Chains",
    fitCopy:
      "Built for retail procurement teams comparing specifications, packaging, and replenishment requirements.",
  },
  "ecommerce-brand": {
    slug: "ecommerce-brand",
    label: "Ecommerce Brands",
    fitCopy:
      "Built for ecommerce brands discussing private label, packaging, content, and repeat-order needs.",
  },
  "supply-company": {
    slug: "supply-company",
    label: "Supply Companies",
    fitCopy:
      "Built for supply companies sourcing practical health and care products for business customers.",
  },
  retailer: {
    slug: "retailer",
    label: "Retailers",
    fitCopy:
      "Built for retailers comparing product fit, order quantities, and customer-use scenarios.",
  },
};

function normalizeSlug(value: string): string | undefined {
  try {
    const normalized = decodeURIComponent(value).trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) return undefined;
    return normalized;
  } catch {
    return undefined;
  }
}

function findProduct(slug: string): Product | undefined {
  return [...products]
    .sort((left, right) => right.handle.length - left.handle.length)
    .find(
      (product) =>
        slug === product.handle || slug.startsWith(`${product.handle}-`),
    );
}

export function resolveOffer(slug: string): OfferContext | undefined {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) return undefined;
  const product = findProduct(normalizedSlug);
  if (!product) return undefined;

  const suffix = normalizedSlug.slice(product.handle.length).replace(/^-/, "");
  const countrySlugs = Object.keys(countries).sort(
    (left, right) => right.length - left.length,
  );
  const buyerSlugs = Object.keys(buyerTypes).sort(
    (left, right) => right.length - left.length,
  );

  let countrySlug = "global";
  let buyerSlug = "distributor";
  let valid = suffix === "";

  for (const countryCandidate of countrySlugs) {
    if (suffix === countryCandidate) {
      countrySlug = countryCandidate;
      valid = true;
      break;
    }
    for (const buyerCandidate of buyerSlugs) {
      if (suffix === `${countryCandidate}-${buyerCandidate}`) {
        countrySlug = countryCandidate;
        buyerSlug = buyerCandidate;
        valid = true;
        break;
      }
      if (suffix === `${buyerCandidate}-${countryCandidate}`) {
        countrySlug = countryCandidate;
        buyerSlug = buyerCandidate;
        valid = true;
        break;
      }
    }
    if (valid) break;
  }

  if (!valid) {
    const buyerOnly = buyerSlugs.find((candidate) => suffix === candidate);
    if (buyerOnly) {
      buyerSlug = buyerOnly;
      valid = true;
    }
  }

  if (!valid) return undefined;

  const country = countries[countrySlug]!;
  const buyerType = buyerTypes[buyerSlug]!;
  const canonicalSlug = `${product.handle}-${country.slug}-${buyerType.slug}`;

  return {
    slug: canonicalSlug,
    isCanonical: slug === canonicalSlug,
    product,
    country,
    buyerType,
  };
}

/** Personalized sales links are retained for CRM continuity, never indexed. */
export function indexedOfferSlugs(): string[] {
  return [];
}
export function isIndexedOffer(_slug: string): boolean {
  return false;
}

export function supportedOfferCountries(): OfferCountry[] {
  return Object.values(countries);
}

export function supportedOfferBuyerTypes(): OfferBuyerType[] {
  return Object.values(buyerTypes);
}
