"use server";

import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  return `Added SKU ${selectedVariantId}`;
}

export async function removeItem(prevState: any, merchandiseId: string) {
  return `Removed ${merchandiseId}`;
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  return `Updated ${payload.merchandiseId} to ${payload.quantity}`;
}

export async function redirectToCheckout() {
  redirect("/contact");
}

export async function createCartAndSetCookie() {
  return;
}
