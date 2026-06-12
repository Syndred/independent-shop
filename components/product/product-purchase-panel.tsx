"use client";

import { AddToCart } from "components/cart/add-to-cart";
import { VariantSelector } from "components/product/variant-selector";
import type { Product } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const price = product.priceRange.maxVariantPrice.amount;

  const selectedVariant = useMemo(() => {
    const matched = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );
    return matched ?? product.variants[0];
  }, [product.variants, searchParams]);

  return (
    <div>
      <h1 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
        {product.title}
      </h1>

      <div className="mt-5 border-b border-border pb-5">
        <p className="text-3xl font-medium text-foreground">${price}</p>
        <p className="mt-1 text-sm text-muted-foreground">Price before tax</p>
      </div>

      <dl className="mt-5 space-y-2 border-b border-border pb-5 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">SKU</dt>
          <dd className="font-medium text-foreground">{selectedVariant?.sku ?? "N/A"}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Availability</dt>
          <dd className={product.availableForSale ? "text-primary" : "text-muted-foreground"}>
            {product.availableForSale ? "In stock" : "Out of stock"}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Model</dt>
          <dd className="text-foreground">{product.handle}</dd>
        </div>
      </dl>

      <div className="mt-6 border-b border-border pb-6">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </div>

      <div className="mt-6">
        <AddToCart product={product} />
      </div>
    </div>
  );
}
