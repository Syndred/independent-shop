import type { Product } from "lib/shopify/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductVisual } from "components/b2b/product-visual";
export function LumiereProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <Link
        href={`/product/${product.handle}`}
        aria-label={`View ${product.title}`}
      >
        <ProductVisual product={product} />
      </Link>
      <div className="p-6">
        <h3 className="text-xl">
          <Link href={`/product/${product.handle}`}>{product.title}</Link>
        </h3>
        <p className="mt-3 text-sm text-ink-muted">
          Wholesale pricing by quote
        </p>
        <Link
          href={`/contact?product=${product.handle}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
        >
          Request a Quote <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
