import {
  addLineToCart,
  getHydratedCart,
  removeLineFromCart,
  updateLineQuantity,
} from "lib/catalog/cart";
import { collections, getCollectionProductsByHandle } from "lib/data/collections";
import { menu } from "lib/data/menu";
import { pages } from "lib/data/pages";
import { products } from "lib/data/products";
import { NextRequest, NextResponse } from "next/server";
import type { Cart, Collection, Menu, Page, Product } from "./types";

export async function createCart(): Promise<Cart> {
  return {
    id: "local-cart",
    checkoutUrl: "/checkout",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  let cart = await getHydratedCart();
  for (const line of lines) {
    for (let i = 0; i < line.quantity; i++) {
      cart = await addLineToCart(line.merchandiseId);
    }
  }
  return cart!;
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  let cart = await getHydratedCart();
  for (const lineId of lineIds) {
    cart = await removeLineFromCart(lineId);
  }
  return cart!;
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  let cart = await getHydratedCart();
  for (const line of lines) {
    cart = await updateLineQuantity(line.merchandiseId, line.quantity);
  }
  return cart!;
}

export async function getCart(): Promise<Cart | undefined> {
  return getHydratedCart();
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  return collections.find((collection) => collection.handle === handle);
}

export async function getCollectionProducts({
  collection,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  return getCollectionProductsByHandle(collection);
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
