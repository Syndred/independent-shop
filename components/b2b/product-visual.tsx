import { Activity, Gauge, Wind } from "lucide-react";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
export function ProductVisual({ product }: { product: Product }) {
  if (product.images.length) {
    return (
      <div className="relative aspect-[4/3] bg-white">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4"
        />
      </div>
    );
  }
  const Icon =
    product.category === "mesh-nebulizers"
      ? Wind
      : product.category === "pulse-oximeters"
        ? Activity
        : Gauge;
  return (
    <div className="flex aspect-[4/3] flex-col justify-between bg-secondary/60 p-6 text-primary md:p-8">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest">
          {product.format}
        </span>
        <Icon aria-hidden="true" size={30} strokeWidth={1.25} />
      </div>
      <div>
        <p className="font-serif text-4xl md:text-5xl">
          {product.model ||
            (product.handle.startsWith("upper") ? "Upper-arm" : "Wrist")}
        </p>
        <p className="mt-3 text-xs text-ink-muted">Product photo on request</p>
      </div>
    </div>
  );
}
