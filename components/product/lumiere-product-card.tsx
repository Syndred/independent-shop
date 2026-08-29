import type { Product } from "lib/shopify/types";
import { whatsappTrackingUrl } from "lib/site-config";
import Link from "next/link";

export function LumiereProductCard({ product }: { product: Product }) {
  const category = product.tags.includes("health") ? "Health & Care" : "Shop";

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
          <a
            href={whatsappTrackingUrl({
              product: product.handle,
              source: "product_card",
              intent: "quote",
              utmCampaign: `${product.handle}_quote`,
              utmContent: "quick_quote",
            })}
            className="w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background transition hover:bg-primary"
          >
            Request a Quote
          </a>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {category}
        </p>
        <Link
          href={`/product/${product.handle}`}
          className="font-serif text-lg text-foreground transition hover:text-primary"
        >
          {product.title}
        </Link>
        <p className="text-sm text-foreground">Wholesale pricing by quote</p>
        <p className="text-xs text-muted-foreground">
          Ask about samples, MOQ, and destination terms
        </p>
      </div>
    </article>
  );
}
