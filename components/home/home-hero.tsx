import type { Product } from "lib/shopify/types";
import Link from "next/link";

export function HomeHero({ heroProduct }: { heroProduct?: Product }) {
  return (
    <section className="container-site section-pad pb-12 pt-12 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
            Pulse oximeters for home and travel
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
            Reliable SpO2 and pulse readings for home, family care, and travel. Order through
            checkout on this site or send your list on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={heroProduct ? `/product/${heroProduct.handle}` : "/search"}
              className="btn-primary"
            >
              Shop now
            </Link>
            <Link
              href="/search"
              className="btn-secondary"
            >
              View all
            </Link>
          </div>
        </div>

        {heroProduct?.featuredImage ? (
          <Link
            href={`/product/${heroProduct.handle}`}
            className="block border border-border bg-card"
          >
            <div className="flex aspect-square items-center justify-center p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroProduct.featuredImage.url}
                alt={heroProduct.featuredImage.altText || heroProduct.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
              {heroProduct.title}
            </p>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
