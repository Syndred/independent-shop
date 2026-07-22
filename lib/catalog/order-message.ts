import type { Cart } from "lib/shopify/types";
import { siteConfig } from "lib/site-config";

export type CheckoutFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  notes?: string;
};

export function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export function buildOrderMessage(
  cart: Cart,
  form: CheckoutFormData,
  orderId: string,
): string {
  const itemLines = cart.lines
    .map((item) => {
      const sku = item.merchandise.sku ? ` (${item.merchandise.sku})` : "";
      return `${item.quantity}x ${item.merchandise.product.title}${sku} - $${item.cost.totalAmount.amount}`;
    })
    .join("\n");

  const notes = form.notes?.trim() ? `\n\nNotes:\n${form.notes.trim()}` : "";

  return [
    `New order from ${siteConfig.name}`,
    `Order ID: ${orderId}`,
    "",
    `Customer: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    "",
    "Shipping address:",
    form.address,
    `${form.city}, ${form.state} ${form.postalCode}`,
    form.country,
    "",
    "Items:",
    itemLines,
    "",
    `Subtotal: $${cart.cost.subtotalAmount.amount}`,
    "Shipping: To be confirmed",
    `Total: $${cart.cost.totalAmount.amount}`,
    notes,
  ].join("\n");
}
