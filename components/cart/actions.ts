"use server";

import {
  addLineToCart,
  ensureCartCookie,
  removeLineFromCart,
  updateLineQuantity,
} from "lib/catalog/cart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function revalidateCart() {
  revalidatePath("/", "layout");
}

export async function addItem(
  _prevState: unknown,
  payload:
    | string
    | undefined
    | { selectedVariantId: string | undefined; quantity?: number },
) {
  const selectedVariantId =
    typeof payload === "object" && payload !== null
      ? payload.selectedVariantId
      : payload;
  const quantity =
    typeof payload === "object" && payload !== null
      ? Math.max(1, payload.quantity ?? 1)
      : 1;

  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    for (let i = 0; i < quantity; i++) {
      await addLineToCart(selectedVariantId);
    }
    revalidateCart();
    return "Added to cart";
  } catch {
    return "Error adding item to cart";
  }
}

export async function removeItem(_prevState: unknown, merchandiseId: string) {
  try {
    await removeLineFromCart(merchandiseId);
    revalidateCart();
    return "Removed item";
  } catch {
    return "Error removing item";
  }
}

export async function updateItemQuantity(
  _prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  try {
    await updateLineQuantity(payload.merchandiseId, payload.quantity);
    revalidateCart();
    return "Updated quantity";
  } catch {
    return "Error updating quantity";
  }
}

export async function redirectToCheckout() {
  redirect("/checkout");
}

export async function buyNow(formData: FormData) {
  const selectedVariantId = String(formData.get("selectedVariantId") ?? "");
  const quantity = Math.max(1, Number(formData.get("quantity")) || 1);

  if (!selectedVariantId) {
    redirect("/search");
  }

  try {
    for (let i = 0; i < quantity; i++) {
      await addLineToCart(selectedVariantId);
    }
    revalidateCart();
  } catch {
    redirect("/search");
  }

  redirect("/checkout");
}

export async function createCartAndSetCookie() {
  await ensureCartCookie();
}

export async function clearCartAfterOrder() {
  const { clearCart } = await import("lib/catalog/cart");
  await clearCart();
  revalidateCart();
}
