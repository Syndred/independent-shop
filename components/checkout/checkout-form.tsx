"use client";

import { clearCartAfterOrder } from "components/cart/actions";
import Price from "components/price";
import {
  buildOrderMessage,
  generateOrderId,
  type CheckoutFormData,
} from "lib/catalog/order-message";
import type { Cart } from "lib/shopify/types";
import { whatsappOrderUrl } from "lib/site-config";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClassName =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950";

export function CheckoutForm({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const checkout: CheckoutFormData = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      postalCode: String(formData.get("postalCode") || "").trim(),
      state: String(formData.get("state") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
    };

    if (
      !checkout.fullName ||
      !checkout.email ||
      !checkout.phone ||
      !checkout.address ||
      !checkout.city ||
      !checkout.postalCode ||
      !checkout.state ||
      !checkout.country
    ) {
      setError("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    const orderId = generateOrderId();
    const message = buildOrderMessage(cart, checkout, orderId);
    const whatsappUrl = whatsappOrderUrl(message);

    try {
      await clearCartAfterOrder();
      sessionStorage.setItem(
        `order:${orderId}`,
        JSON.stringify({ orderId, checkout, cart, createdAt: Date.now() }),
      );
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      router.push(`/checkout/success?order=${orderId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="mt-8 border-t border-neutral-200 pt-8">
        <ul className="space-y-3 text-sm">
          {cart.lines.map((item) => (
            <li
              key={item.merchandise.id}
              className="flex items-start justify-between gap-4"
            >
              <span className="text-neutral-600">
                {item.quantity}× {item.merchandise.product.title}
              </span>
              <Price
                amount={item.cost.totalAmount.amount}
                currencyCode={item.cost.totalAmount.currencyCode}
                className="text-neutral-950"
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm font-medium">
          <span>Total</span>
          <Price
            amount={cart.cost.totalAmount.amount}
            currencyCode={cart.cost.totalAmount.currencyCode}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-3"
      >
        <input
          name="fullName"
          className={inputClassName}
          placeholder="Full name"
          required
        />
        <input
          name="email"
          type="email"
          className={inputClassName}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          className={inputClassName}
          placeholder="Phone"
          required
        />
        <input
          name="address"
          className={inputClassName}
          placeholder="Address"
          required
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="city"
            className={inputClassName}
            placeholder="City"
            required
          />
          <input
            name="postalCode"
            className={inputClassName}
            placeholder="Postal code"
            required
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="state"
            className={inputClassName}
            placeholder="State"
            required
          />
          <input
            name="country"
            className={inputClassName}
            placeholder="Country"
            required
          />
        </div>
        <textarea
          name="notes"
          className={`min-h-24 resize-none ${inputClassName}`}
          placeholder="Notes (optional)"
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-full bg-neutral-950 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {isSubmitting ? "Placing order…" : "Place order via WhatsApp"}
        </button>
      </form>
    </>
  );
}
