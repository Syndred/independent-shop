import Footer from "components/layout/footer";
import { ProductCard } from "components/product/product-card";
import { getCollections, getProducts } from "lib/shopify";
import Link from "next/link";

export default async function SearchPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts({})]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-950">All products</h1>

        <div className="mt-8 flex flex-wrap gap-2">
          {collections.map((collection) => (
            <Link
              key={collection.handle || "all"}
              href={collection.path}
              className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 transition hover:border-neutral-950 hover:text-neutral-950"
            >
              {collection.title}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.handle}
              product={product}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
