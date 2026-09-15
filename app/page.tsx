import Footer from "components/layout/footer";
import { QuoteBand } from "components/b2b/quote-band";
import { NebulizerPhotoRange } from "components/b2b/nebulizer-photo-range";
import { products } from "lib/data/products";
import { collections } from "lib/data/collections";
import { baseUrl } from "lib/utils";
import { ArrowUpRight, Package, ClipboardCheck, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { nebulizerPhotos } from "lib/data/product-images";
export const metadata = {
  title: "Home Health Devices Wholesale | Low MOQ Sourcing",
  description:
    "Source blood pressure monitors, LK87/LK89 pulse oximeters and SY108/ZS101 mesh nebulizers through a Shenzhen supply chain. Ask about low MOQ, samples and bulk quotes.",
  alternates: { canonical: baseUrl },
};
export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/35">
        <div className="container-site section-pad grid gap-12 py-14 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-20 lg:py-20">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For importers, distributors & growing brands
            </p>
            <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Home health sourcing.
              <br />
              <span className="text-primary">Start with a conversation.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-ink-muted">
              Build your product range with blood pressure monitors, pulse
              oximeters and mesh nebulizers from our Shenzhen supply chain.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted">
              Small first order? Ask about low MOQ options, sample costs and
              bulk pricing for your destination.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-accent rounded-lg">
                Request a Quote{" "}
                <ArrowUpRight className="ml-2" size={18} aria-hidden="true" />
              </Link>
              <Link href="/search" className="btn-secondary rounded-lg">
                Explore products
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Link
              href="/search/mesh-nebulizers"
              aria-label="Explore mesh nebulizer photos"
              className="grid grid-cols-2 border-b border-border bg-white"
            >
              {nebulizerPhotos.slice(0, 2).map((group) => (
                <Image
                  key={group.title}
                  src={group.media.main[0]!.url}
                  alt={group.media.main[0]!.altText}
                  width={800}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="aspect-[4/3] w-full object-contain p-3"
                />
              ))}
            </Link>
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                The sourcing desk
              </p>
              <span className="text-xs text-ink-muted">01 — 03</span>
            </div>
            {collections.slice(1).map((category, i) => (
              <Link
                key={category.handle}
                href={category.path}
                className="group flex items-center gap-5 border-b border-border px-6 py-7 last:border-0 hover:bg-secondary/40"
              >
                <span className="text-xs text-ink-muted">0{i + 1}</span>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl">{category.title}</h2>
                  <p className="mt-2 text-xs text-ink-muted">
                    {["Upper-arm · Wrist", "LK87 · LK89", "SY108 · ZS101"][i]}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-primary"
                  aria-hidden="true"
                />
              </Link>
            ))}
            <p className="border-t border-border px-6 py-4 text-xs leading-5 text-ink-muted">
              Six focused product lines. Exact configurations and current photos
              confirmed during inquiry.
            </p>
          </div>
        </div>
      </section>
      <div className="container-site section-pad pb-14">
        <NebulizerPhotoRange />
      </div>
      <section className="container-site section-pad grid gap-8 py-10 md:grid-cols-3">
        {[
          {
            Icon: Package,
            title: "Samples before scale",
            text: "Discuss sample availability and cost before committing to a bulk order.",
          },
          {
            Icon: ClipboardCheck,
            title: "Terms in writing",
            text: "MOQ, OEM/ODM feasibility, lead time and documents confirmed with your quote.",
          },
          {
            Icon: Building2,
            title: "A named supply chain",
            text: "Sourcing through 深圳市银珀科技有限公司 in Shenzhen, Guangdong.",
          },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <Icon
              className="mt-1 shrink-0 text-primary"
              size={24}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <h2 className="text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{text}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container-site section-pad py-14">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-primary">
              The product catalog
            </p>
            <h2 className="text-3xl md:text-4xl">
              Six sourcing lines, clearly separated.
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {collections.slice(1).map((category, index) => (
            <article
              key={category.handle}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                <span className="text-xs text-ink-muted">0{index + 1}</span>
                <Link
                  href={category.path}
                  className="text-xs font-semibold uppercase tracking-widest text-primary"
                >
                  View category
                </Link>
              </div>
              <h3 className="mt-6 text-2xl">{category.title}</h3>
              <ul className="mt-5 divide-y divide-border">
                {products
                  .filter((product) => product.category === category.handle)
                  .map((product) => (
                    <li key={product.handle}>
                      <Link
                        href={`/product/${product.handle}`}
                        className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm font-semibold hover:text-primary"
                      >
                        {product.title}
                        <ArrowUpRight
                          size={16}
                          className="shrink-0"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
              <p className="mt-5 text-xs leading-5 text-ink-muted">
                {category.handle === "mesh-nebulizers"
                  ? "Original supplier photos are shown above."
                  : "Current product photos will be added after supplier matching."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="brand-story"
        className="container-site section-pad grid gap-8 py-16 md:grid-cols-2"
      >
        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-primary">
            Rooted in Shenzhen
          </p>
          <h2 className="text-3xl md:text-4xl">
            Know where your sourcing starts.
          </h2>
        </div>
        <div>
          <p className="leading-7 text-ink-muted">
            Our supply chain comes from 深圳市银珀科技有限公司, a Shenzhen
            company established in July 2021 with a home health product catalog
            on 1688. We help business buyers turn a product shortlist into a
            specific sourcing inquiry.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block font-semibold text-primary underline underline-offset-4"
          >
            Meet the supply chain
          </Link>
        </div>
      </section>
      <QuoteBand />
      <Footer />
    </>
  );
}
