import type { Product } from "lib/shopify/types";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange.maxVariantPrice.amount;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
    >
      <div className="aspect-square border border-border bg-card p-6 transition group-hover:border-foreground/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-base font-medium text-foreground">{product.title}</h2>
        <p className="shrink-0 text-sm text-foreground">${price}</p>
      </div>
    </Link>
  );
}
