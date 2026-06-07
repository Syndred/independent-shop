"use server";

import { TAGS } from "lib/constants";
import { redirect } from "next/navigation";

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  return "Added to cart";
}

export async function removeItem(prevState: any, merchandiseId: string) {
  return "Removed from cart";
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  return "Updated cart";
}

export async function redirectToCheckout() {
  redirect("/contact");
}

export async function createCartAndSetCookie() {
  return;
}
