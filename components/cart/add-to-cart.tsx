"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem, buyNow } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { whatsappOrderUrl } from "lib/site-config";
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
        className="flex h-11 flex-1 items-center justify-center gap-2 bg-muted text-sm font-medium text-muted-foreground"
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
        className="flex h-11 flex-1 items-center justify-center gap-2 bg-muted text-sm font-medium text-muted-foreground"
      >
        <ShoppingCartIcon className="h-4 w-4" />
        Select an option
      </button>
    );
  }

  return (
    <button
      type="submit"
      className="flex h-11 flex-1 items-center justify-center gap-2 bg-foreground text-sm font-medium text-background transition hover:bg-primary"
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
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
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
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;
  const sku = selectedVariant?.sku || product.variants[0]?.sku || "";
  const unitPrice = Number(
    selectedVariant?.price.amount ?? product.priceRange.maxVariantPrice.amount,
  );
  const totalPrice = (unitPrice * quantity).toFixed(2);
  const canPurchase = availableForSale && selectedVariantId;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground">Lots</span>
        <div className="flex h-10 items-stretch overflow-hidden border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex w-10 items-center justify-center text-foreground transition hover:bg-muted"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <input
            readOnly
            value={quantity}
            aria-label="Quantity"
            className="w-12 border-x border-border text-center text-foreground"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
            className="flex w-10 items-center justify-center text-foreground transition hover:bg-muted"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <span className="text-muted-foreground">
          Total{" "}
          <strong className="font-medium text-foreground">${totalPrice}</strong>
        </span>
        <span className="text-muted-foreground">1 lot = 50 units</span>
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
          <p aria-live="polite" className="sr-only" role="status">
            {message}
          </p>
        </form>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <form action={buyNow}>
          <input
            type="hidden"
            name="selectedVariantId"
            value={selectedVariantId ?? ""}
          />
          <input type="hidden" name="quantity" value={quantity} />
          <button
            type="submit"
            disabled={!canPurchase}
            className={clsx(
              "flex h-11 w-full items-center justify-center text-sm font-medium uppercase tracking-widest text-primary-foreground transition",
              canPurchase
                ? "bg-primary hover:bg-foreground"
                : "cursor-not-allowed bg-muted text-muted-foreground",
            )}
          >
            Buy Now
          </button>
        </form>
        <a
          href={whatsappOrderUrl(
            `Hi, I'd like to order ${product.title}${sku ? ` (${sku})` : ""}. Quantity: ${quantity} lot(s), 50 units per lot.`,
          )}
          className="flex h-11 items-center justify-center border border-border text-sm font-medium uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
