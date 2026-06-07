import type { Cart, Collection, Menu, Page, Product } from "./types";
import { NextRequest, NextResponse } from "next/server";

const money = (amount: string, currencyCode = "USD") => ({
  amount,
  currencyCode,
});

const imageOne = (title: string) => ({
  url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1b?auto=format&fit=crop&w=1200&q=80",
  altText: title,
  width: 1200,
  height: 1200,
});

const imageTwo = (title: string) => ({
  url: "https://images.unsplash.com/photo-1581594693700-4d7ce3b98b4f?auto=format&fit=crop&w=1200&q=80",
  altText: title,
  width: 1200,
  height: 1200,
});

const products: Product[] = [
  {
    id: "pulse-ox-001",
    handle: "premium-pulse-oximeter",
    availableForSale: true,
    title: "Premium Pulse Oximeter",
    description:
      "Fast, simple oxygen saturation checks for home use, travel, and daily family care.",
    descriptionHtml:
      "<p>Fast, simple oxygen saturation checks for home use, travel, and daily family care.</p><ul><li>Easy one-button operation</li><li>Clear OLED display</li><li>Compact and lightweight</li></ul>",
    options: [{ id: "opt-1", name: "Color", values: ["Black"] }],
    priceRange: {
      maxVariantPrice: money("29.99"),
      minVariantPrice: money("29.99"),
    },
    variants: [
      {
        id: "var-1",
        sku: "POX-001-BLK",
        title: "Default Title",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Black" }],
        price: money("29.99"),
      },
    ],
    featuredImage: imageOne("Premium Pulse Oximeter"),
    images: [imageOne("Premium Pulse Oximeter"), imageTwo("Premium Pulse Oximeter")],
    seo: { title: "Premium Pulse Oximeter", description: "Home pulse oximeter" },
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
    options: [{ id: "opt-2", name: "Color", values: ["Blue"] }],
    priceRange: {
      maxVariantPrice: money("34.99"),
      minVariantPrice: money("34.99"),
    },
    variants: [
      {
        id: "var-2",
        sku: "KPOX-001-BLU",
        title: "Default Title",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "Blue" }],
        price: money("34.99"),
      },
    ],
    featuredImage: imageOne("Kids Pulse Oximeter"),
    images: [imageOne("Kids Pulse Oximeter"), imageTwo("Kids Pulse Oximeter")],
    seo: { title: "Kids Pulse Oximeter", description: "Kids pulse oximeter" },
    tags: ["health"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seasonal-001",
    handle: "mini-speaker",
    availableForSale: true,
    title: "Mini Bluetooth Speaker",
    description: "A simple seasonal add-on product for impulse purchase tests.",
    descriptionHtml:
      "<p>A simple seasonal add-on product for impulse purchase tests.</p>",
    options: [{ id: "opt-3", name: "Color", values: ["White"] }],
    priceRange: {
      maxVariantPrice: money("19.99"),
      minVariantPrice: money("19.99"),
    },
    variants: [
      {
        id: "var-3",
        sku: "SPK-001-WHT",
        title: "Default Title",
        availableForSale: true,
        selectedOptions: [{ name: "Color", value: "White" }],
        price: money("19.99"),
      },
    ],
    featuredImage: imageOne("Mini Bluetooth Speaker"),
    images: [imageOne("Mini Bluetooth Speaker"), imageTwo("Mini Bluetooth Speaker")],
    seo: { title: "Mini Bluetooth Speaker", description: "Seasonal product" },
    tags: ["seasonal"],
    updatedAt: new Date().toISOString(),
  },
];

const collections: Collection[] = [
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
    description: "Pulse oximeters and family care products",
    seo: { title: "Health & Care", description: "Health products" },
    path: "/search/health-care",
    updatedAt: new Date().toISOString(),
  },
  {
    handle: "seasonal-hot-deals",
    title: "Seasonal Hot Deals",
    description: "Add-on products for demand testing",
    seo: { title: "Seasonal Hot Deals", description: "Hot deals" },
    path: "/search/seasonal-hot-deals",
    updatedAt: new Date().toISOString(),
  },
];

const pages: Page[] = [
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

const menu: Menu[] = [
  { title: "Health & Care", path: "/search/health-care" },
  { title: "Hot Deals", path: "/search/seasonal-hot-deals" },
  { title: "Contact", path: "/#contact" },
];

const emptyCart = (): Cart => ({
  id: "demo-cart",
  checkoutUrl: "/contact",
  totalQuantity: 0,
  lines: [],
  cost: {
    subtotalAmount: money("0"),
    totalAmount: money("0"),
    totalTaxAmount: money("0"),
  },
});

export async function createCart(): Promise<Cart> {
  return emptyCart();
}

export async function addToCart(): Promise<Cart> {
  return emptyCart();
}

export async function removeFromCart(): Promise<Cart> {
  return emptyCart();
}

export async function updateCart(): Promise<Cart> {
  return emptyCart();
}

export async function getCart(): Promise<Cart | undefined> {
  return undefined;
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  return collections.find((collection) => collection.handle === handle) ?? undefined;
}

export async function getCollectionProducts({
  collection,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  if (collection === "health-care") return products.slice(0, 2);
  if (collection === "seasonal-hot-deals") return [products[2]!];
  return products;
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getMenu(): Promise<Menu[]> {
  return menu;
}

export async function getPage(handle: string): Promise<Page> {
  const page = pages.find((item) => item.handle === handle);
  if (!page) throw new Error(`Page not found: ${handle}`);
  return page;
}

export async function getPages(): Promise<Page[]> {
  return pages;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return products.find((product) => product.handle === handle);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  return products.filter((product) => product.id !== productId).slice(0, 3);
}

export async function getProducts({
  query,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  if (!query) return products;
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200, revalidated: true });
}
