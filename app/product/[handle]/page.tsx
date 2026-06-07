import Footer from "components/layout/footer";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const relatedProducts = await getProductRecommendations(product.id);
  const price = product.priceRange.maxVariantPrice.amount;
  const sku = product.variants[0]?.sku ?? "N/A";

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Featured product</p>
              <h1 className="mt-4 text-4xl font-semibold text-neutral-950">{product.title}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-neutral-700">{product.description}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-neutral-700">
                <span className="rounded-full bg-white px-4 py-2">SKU: {sku}</span>
                <span className="rounded-full bg-white px-4 py-2">Family friendly</span>
                <span className="rounded-full bg-white px-4 py-2">Portable</span>
              </div>
              <p className="mt-10 text-4xl font-semibold text-neutral-950">${price}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {product.images.slice(0, 2).map((image) => (
                <div key={image.url} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">What you get</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                <li>• Quick daily oxygen checks without a complicated setup</li>
                <li>• Good fit for adults, kids, and family use cases</li>
                <li>• Portable enough for home, travel, and emergency kits</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-neutral-950">Product details</h2>
              <div className="prose prose-neutral mt-4 max-w-none text-sm">
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
              <p className="font-semibold text-neutral-950">How to order</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>Pick the product and confirm the SKU above.</li>
                <li>Tap WhatsApp or email support to confirm availability.</li>
                <li>We send the order link / checkout details right after confirmation.</li>
              </ol>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://wa.me/0000000000"
                className="rounded-full bg-green-500 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-green-400"
              >
                Order on WhatsApp
              </a>
              <a
                href="mailto:support@independent-shop.com"
                className="rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-900 hover:border-neutral-400"
              >
                Email support
              </a>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700">
              <p className="font-semibold text-neutral-950">Shipping and returns</p>
              <p className="mt-2">
                Fast response support, clear product info, and simple next-step contact before you order.
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-neutral-950">Related products</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  key={related.handle}
                  href={`/product/${related.handle}`}
                  className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm hover:border-neutral-300"
                >
                  <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Recommended</p>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-950">{related.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{related.description}</p>
                  <p className="mt-4 text-lg font-semibold text-neutral-950">${related.priceRange.maxVariantPrice.amount}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
