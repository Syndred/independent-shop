import type { Product } from "lib/shopify/types";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const price = product.priceRange.maxVariantPrice.amount;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
    >
      <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-base font-medium text-neutral-950">{product.title}</h2>
        <p className="shrink-0 text-sm text-neutral-950">${price}</p>
      </div>
    </Link>
  );
}
