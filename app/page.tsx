import Footer from "components/layout/footer";
import { ProductCard } from "components/product/product-card";
import { getCollectionProducts } from "lib/shopify";
import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: "" });
  const heroProduct = products[0];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-neutral-950 md:text-5xl md:leading-tight">
            Pulse oximeters for home and travel.
          </h1>
          <p className="mt-5 text-lg text-neutral-500">
            Reliable readings. Simple to use. Shipped worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={heroProduct ? `/product/${heroProduct.handle}` : "/search"}
              className="rounded-full bg-neutral-950 px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Shop now
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-neutral-300 px-7 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
            Featured
          </h2>
          <Link
            href="/search"
            className="text-sm text-neutral-500 transition hover:text-neutral-950"
          >
            See all
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.handle}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-neutral-200"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center md:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-medium text-neutral-950">Questions?</h2>
            <p className="mt-1 text-neutral-500">We reply on WhatsApp and email.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappOrderUrl(`Hi, I have a question about ${siteConfig.name}.`)}
              className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-neutral-950"
            >
              Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
