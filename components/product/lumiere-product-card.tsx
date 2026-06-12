"use client";

import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import type { Product } from "lib/shopify/types";
import Link from "next/link";
import { useActionState } from "react";

export function LumiereProductCard({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const [message, formAction] = useActionState(addItem, null);
  const price = product.priceRange.maxVariantPrice.amount;
  const defaultVariant = product.variants[0];
  const category = product.tags.includes("health") ? "Health & Care" : "Shop";

  const addItemAction = defaultVariant
    ? formAction.bind(null, { selectedVariantId: defaultVariant.id, quantity: 1 })
    : null;

  const handleQuickAdd = () => {
    if (!defaultVariant || !addItemAction) return;
    addCartItem(defaultVariant, product);
    addItemAction();
  };

  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden">
        {product.tags.includes("featured") ? (
          <span className="absolute left-4 top-4 z-10 bg-background px-3 py-1 text-[10px] uppercase tracking-widest text-foreground">
            New
          </span>
        ) : null}
        <Link href={`/product/${product.handle}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute bottom-0 left-0 w-full translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background transition hover:bg-primary"
          >
            Add to Cart
          </button>
        </div>
        <p
          className="sr-only"
          role="status"
        >
          {message}
        </p>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{category}</p>
        <Link
          href={`/product/${product.handle}`}
          className="font-serif text-lg text-foreground transition hover:text-primary"
        >
          {product.title}
        </Link>
        <p className="text-sm text-foreground">${price}</p>
      </div>
    </article>
  );
}
