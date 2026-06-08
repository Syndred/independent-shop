"use client";

import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useMemo, useState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <button
        disabled
        type="submit"
        className="flex h-11 flex-1 items-center justify-center gap-2 bg-neutral-300 text-sm font-medium text-neutral-500"
      >
        <ShoppingCartIcon className="h-4 w-4" />
        Out of stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        disabled
        type="submit"
        className="flex h-11 flex-1 items-center justify-center gap-2 bg-neutral-300 text-sm font-medium text-neutral-500"
      >
        <ShoppingCartIcon className="h-4 w-4" />
        Select an option
      </button>
    );
  }

  return (
    <button
      type="submit"
      className="flex h-11 flex-1 items-center justify-center gap-2 bg-neutral-900 text-sm font-medium text-white transition hover:bg-neutral-800"
    >
      <ShoppingCartIcon className="h-4 w-4" />
      Add to Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const searchParams = useSearchParams();
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => {
    const matched = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );
    return matched || variants[0];
  }, [searchParams, variants]);

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = selectedVariant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, {
    selectedVariantId,
    quantity,
  });
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;
  const sku = selectedVariant?.sku || product.variants[0]?.sku || "";
  const unitPrice = Number(
    selectedVariant?.price.amount ?? product.priceRange.maxVariantPrice.amount,
  );
  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-neutral-500">Qty</span>
        <div className="flex h-10 items-stretch border border-neutral-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex w-10 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <input
            readOnly
            value={quantity}
            aria-label="Quantity"
            className="w-12 border-x border-neutral-300 text-center text-neutral-900"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
            className="flex w-10 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <span className="text-neutral-500">
          Total <strong className="font-medium text-neutral-900">${totalPrice}</strong>
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <form
          className="flex flex-1"
          action={async () => {
            if (finalVariant) {
              for (let i = 0; i < quantity; i++) {
                addCartItem(finalVariant, product);
              }
              addItemAction();
            }
          }}
        >
          <SubmitButton
            availableForSale={availableForSale}
            selectedVariantId={selectedVariantId}
          />
          <p
            aria-live="polite"
            className="sr-only"
            role="status"
          >
            {message}
          </p>
        </form>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Link
          href="/checkout"
          className={clsx(
            "flex h-11 items-center justify-center text-sm font-medium text-white transition",
            selectedVariantId
              ? "bg-orange-500 hover:bg-orange-600"
              : "pointer-events-none bg-orange-300",
          )}
        >
          Buy Now
        </Link>
        <a
          href={whatsappOrderUrl(
            `Hi, I'd like to order ${product.title}${sku ? ` (${sku})` : ""} x${quantity}.`,
          )}
          className="flex h-11 items-center justify-center border border-neutral-300 text-sm font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
