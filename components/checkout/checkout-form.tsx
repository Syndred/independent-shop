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
import { useState, type FormEvent, type ReactNode } from "react";

const inputClassName =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}

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
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <ul className="space-y-3 text-sm">
          {cart.lines.map((item) => (
            <li
              key={item.merchandise.id}
              className="flex items-start justify-between gap-4"
            >
              <span className="text-ink-muted">
                {item.quantity}× {item.merchandise.product.title}
              </span>
              <Price
                amount={item.cost.totalAmount.amount}
                currencyCode={item.cost.totalAmount.currencyCode}
                className="text-ink"
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-sm font-medium text-ink">
          <span>Total</span>
          <Price
            amount={cart.cost.totalAmount.amount}
            currencyCode={cart.cost.totalAmount.currencyCode}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <Field label="Full name">
          <input name="fullName" className={inputClassName} required />
        </Field>
        <Field label="Email">
          <input
            name="email"
            type="email"
            className={inputClassName}
            required
          />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" className={inputClassName} required />
        </Field>
        <Field label="Address">
          <input name="address" className={inputClassName} required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City">
            <input name="city" className={inputClassName} required />
          </Field>
          <Field label="Postal code">
            <input name="postalCode" className={inputClassName} required />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="State">
            <input name="state" className={inputClassName} required />
          </Field>
          <Field label="Country">
            <input name="country" className={inputClassName} required />
          </Field>
        </div>
        <Field label="Notes (optional)">
          <textarea
            name="notes"
            className={`min-h-24 resize-none ${inputClassName}`}
          />
        </Field>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-accent mt-2 w-full disabled:opacity-50"
        >
          {isSubmitting ? "Placing order…" : "Place order via WhatsApp"}
        </button>
      </form>
    </>
  );
}
