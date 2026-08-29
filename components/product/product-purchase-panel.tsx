"use client";

import { VariantSelector } from "components/product/variant-selector";
import { whatsappTrackingUrl } from "lib/site-config";
import type { Product } from "lib/shopify/types";
import { ClipboardList, MessageCircle, PackageCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const searchParams = useSearchParams();

  const selectedVariant = useMemo(() => {
    const matched = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );
    return matched ?? product.variants[0];
  }, [product.variants, searchParams]);
  const model = selectedVariant?.sku.split("-")[0] ?? product.handle;

  return (
    <div>
      <h1 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
        {product.title}
      </h1>

      <div className="mt-5 border-b border-border pb-5">
        <p className="text-2xl font-medium text-foreground">
          Wholesale pricing by quote
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Pricing depends on quantity, destination, configuration, and current
          supplier confirmation.
        </p>
      </div>

      <dl className="mt-5 space-y-2 border-b border-border pb-5 text-sm">
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">SKU</dt>
          <dd className="font-medium text-foreground">
            {selectedVariant?.sku ?? "N/A"}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Availability</dt>
          <dd className="text-foreground">Confirmed with your quotation</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">Model</dt>
          <dd className="text-foreground">{model}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-24 shrink-0 text-muted-foreground">MOQ</dt>
          <dd className="text-foreground">Discussed for your order</dd>
        </div>
      </dl>

      <div className="mt-6 border-b border-border pb-6">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </div>

      <div className="mt-6 grid gap-3">
        <a
          href={whatsappTrackingUrl({
            product: product.handle,
            variant: selectedVariant?.sku,
            source: "product_page",
            intent: "quote",
            utmCampaign: `${product.handle}_quote`,
            utmContent: "get_wholesale_price",
          })}
          className="flex h-12 items-center justify-center gap-2 bg-[#1f8f4d] px-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
        >
          <MessageCircle className="size-4" />
          Get Wholesale Price
        </a>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappTrackingUrl({
              product: product.handle,
              variant: selectedVariant?.sku,
              source: "product_page",
              intent: "sample",
              utmCampaign: `${product.handle}_sample`,
              utmContent: "request_sample",
            })}
            className="flex h-11 items-center justify-center gap-2 border border-border px-3 text-sm font-medium uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            <PackageCheck className="size-4" />
            Request a Sample
          </a>
          <a
            href={whatsappTrackingUrl({
              product: product.handle,
              variant: selectedVariant?.sku,
              source: "product_page",
              intent: "moq",
              utmCampaign: `${product.handle}_moq`,
              utmContent: "ask_moq",
            })}
            className="flex h-11 items-center justify-center gap-2 border border-border px-3 text-sm font-medium uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            <ClipboardList className="size-4" />
            Ask MOQ
          </a>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Final price, MOQ, availability, lead time, and compliance documents
          are confirmed for your destination before an order is accepted.
        </p>
      </div>
    </div>
  );
}
