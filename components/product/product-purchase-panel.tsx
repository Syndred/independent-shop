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
      <h1 className="text-2xl font-normal text-neutral-900 md:text-3xl">{product.title}</h1>

      <div className="mt-3 flex items-baseline gap-2 text-sm text-neutral-400">
        <span className="text-yellow-400">★★★★★</span>
        <span>0 reviews</span>
      </div>

      <div className="mt-5 border-b border-neutral-200 pb-5">
        <p className="text-3xl font-normal text-red-600">${price}</p>
        <p className="mt-1 text-sm text-neutral-400">Ex Tax: ${price}</p>
      </div>

      <dl className="mt-5 space-y-2 border-b border-neutral-200 pb-5 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-neutral-500">SKU</dt>
          <dd className="text-neutral-900">{selectedVariant?.sku ?? "—"}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-neutral-500">Availability</dt>
          <dd className="text-green-600">
            {product.availableForSale ? "In stock" : "Out of stock"}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-neutral-500">Model</dt>
          <dd className="text-neutral-900">{product.handle}</dd>
        </div>
      </dl>

      <div className="mt-6 border-b border-neutral-200 pb-6">
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
