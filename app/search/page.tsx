import Footer from "components/layout/footer";
import Link from "next/link";
import { getCollections, getProducts } from "lib/shopify";

export default async function SearchPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts({})]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-neutral-950">Shop all products</h1>
        <p className="mt-2 max-w-2xl text-neutral-600">Browse the core health products first, then seasonal add-ons.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {collections.map((collection) => (
            <Link
              key={collection.handle || "all"}
              href={collection.path}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-400"
            >
              {collection.title}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm hover:border-neutral-300"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Product</p>
              <h2 className="mt-2 text-xl font-semibold text-neutral-950">{product.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
              <p className="mt-4 text-lg font-semibold text-neutral-950">${product.priceRange.maxVariantPrice.amount}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
