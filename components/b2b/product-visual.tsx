import { Activity, Gauge, Wind } from "lucide-react";
import type { Product } from "lib/shopify/types";
export function ProductVisual({ product }: { product: Product }) {
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
