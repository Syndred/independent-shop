import Footer from "components/layout/footer";
import { getCollection, getCollectionProducts } from "lib/shopify";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
}) {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({ collection: params.collection });

  if (!collection) return notFound();

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-700">Collection</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-950">{collection.title}</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">{collection.description}</p>
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
      </section>
      <Footer />
    </>
  );
}
