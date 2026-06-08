import { findVariantById } from "lib/data/products";
import type { Cart, CartItem } from "lib/shopify/types";
import {
  clearStoredCart,
  getStoredCartLines,
  setStoredCartLines,
  type StoredCartLine,
} from "./cart-storage";

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toFixed(2);
}

function buildCartItem(
  line: StoredCartLine,
  existingLineId?: string,
): CartItem | null {
  const match = findVariantById(line.variantId);
  if (!match) return null;

  const { product, variant } = match;
  const totalAmount = calculateItemCost(line.quantity, variant.price.amount);

  return {
    id: existingLineId ?? line.variantId,
    quantity: line.quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      sku: variant.sku,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function buildCartFromLines(lines: StoredCartLine[]): Cart {
  const cartLines = lines
    .map((line) => buildCartItem(line))
    .filter(Boolean) as CartItem[];

  const totalQuantity = cartLines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartLines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0,
  );
  const currencyCode =
    cartLines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    id: "local-cart",
    checkoutUrl: "/checkout",
    totalQuantity,
    lines: cartLines,
    cost: {
      subtotalAmount: { amount: totalAmount.toFixed(2), currencyCode },
      totalAmount: { amount: totalAmount.toFixed(2), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

export async function getHydratedCart(): Promise<Cart | undefined> {
  const lines = await getStoredCartLines();
  if (lines.length === 0) return undefined;
  return buildCartFromLines(lines);
}

export async function ensureCartCookie(): Promise<void> {
  const lines = await getStoredCartLines();
  if (lines.length === 0) {
    await setStoredCartLines([]);
  }
}

export async function addLineToCart(variantId: string): Promise<Cart> {
  const match = findVariantById(variantId);
  if (!match?.variant.availableForSale) {
    throw new Error("Variant unavailable");
  }

  const lines = await getStoredCartLines();
  const existing = lines.find((line) => line.variantId === variantId);

  const nextLines = existing
    ? lines.map((line) =>
      line.variantId === variantId
        ? { ...line, quantity: line.quantity + 1 }
        : line,
    )
    : [...lines, { variantId, quantity: 1 }];

  await setStoredCartLines(nextLines);
  return buildCartFromLines(nextLines);
}

export async function removeLineFromCart(variantId: string): Promise<Cart> {
  const lines = await getStoredCartLines();
  const nextLines = lines.filter((line) => line.variantId !== variantId);
  await setStoredCartLines(nextLines);
  return buildCartFromLines(nextLines);
}

export async function updateLineQuantity(
  variantId: string,
  quantity: number,
): Promise<Cart> {
  const lines = await getStoredCartLines();

  const nextLines =
    quantity <= 0
      ? lines.filter((line) => line.variantId !== variantId)
      : lines.map((line) =>
        line.variantId === variantId ? { ...line, quantity } : line,
      );

  await setStoredCartLines(nextLines);
  return buildCartFromLines(nextLines);
}

export async function clearCart(): Promise<void> {
  await clearStoredCart();
}
