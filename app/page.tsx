import Link from "next/link";
import Footer from "components/layout/footer";
import { getCollectionProducts } from "lib/shopify";

const featuredHighlights = [
  "Fast oxygen saturation checks",
  "Family-friendly daily use",
  "Lightweight and easy to carry",
];

export default async function HomePage() {
  const healthProducts = await getCollectionProducts({ collection: "health-care" });
  const seasonalProducts = await getCollectionProducts({ collection: "seasonal-hot-deals" });

  const heroProduct = healthProducts[0];
  const secondProduct = healthProducts[1];

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-6 md:grid-cols-2 md:items-center md:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
            Family health essentials for everyday use
          </div>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
            Pulse oximeters built for home care, travel, and quick checks.
          </h1>
          <p className="max-w-lg text-base leading-7 text-neutral-600 md:text-lg">
            A focused store for pulse oximeters, kids pulse oximeters, and seasonal add-ons.
            Start with the products people already want, then expand once the data tells us where to lean in.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={heroProduct ? `/product/${heroProduct.handle}` : "/search/health-care"}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Shop pulse oximeters
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
            >
              Contact on WhatsApp
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {featuredHighlights.map((item) => (
              <div key={item} className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm text-neutral-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {heroProduct ? (
            <Link href={`/product/${heroProduct.handle}`} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Featured product</p>
                <h2 className="mt-4 text-3xl font-semibold text-neutral-950">{heroProduct.title}</h2>
                <p className="mt-3 max-w-md text-neutral-600">{heroProduct.description}</p>
                <p className="mt-6 text-2xl font-semibold text-neutral-950">${heroProduct.priceRange.maxVariantPrice.amount}</p>
              </div>
            </Link>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            {secondProduct ? (
              <Link href={`/product/${secondProduct.handle}`} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Kids care</p>
                <h3 className="mt-3 text-xl font-semibold text-neutral-950">{secondProduct.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">Designed for simple family routines.</p>
              </Link>
            ) : null}
            {seasonalProducts[0] ? (
              <Link href={`/product/${seasonalProducts[0].handle}`} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-wide text-orange-600">Seasonal deal</p>
                <h3 className="mt-3 text-xl font-semibold text-neutral-950">{seasonalProducts[0].title}</h3>
                <p className="mt-2 text-sm text-neutral-600">Useful for testing seasonal demand.</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-neutral-200 bg-white p-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Why this store</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-950">Built for conversion first</h2>
          </div>
          <p className="text-neutral-600 md:col-span-2">
            The whole layout is set up for quick product understanding, less friction, and a clear path to buy. It keeps the health story strong while leaving room for seasonal products when you need them.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-950 px-6 py-8 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-300">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold">Need a quick answer before ordering?</h2>
            <p className="mt-2 text-sm text-neutral-300">Use WhatsApp for fast support or email for order questions.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <a
              href="https://wa.me/0000000000"
              className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-400"
            >
              WhatsApp
            </a>
            <a
              href="mailto:support@independent-shop.com"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
