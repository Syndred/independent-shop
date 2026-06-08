import Footer from "components/layout/footer";
import { ProductCard } from "components/product/product-card";
import { getCollection, getCollectionProducts } from "lib/shopify";
import type { Metadata } from "next";
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
      collection.seo?.description || collection.description || `${collection.title} products`,
  };
}

export default async function CategoryPage(props: { params: Promise<{ collection: string }> }) {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({ collection: params.collection });

  if (!collection) return notFound();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-950">{collection.title}</h1>
        {collection.description ? (
          <p className="mt-3 max-w-xl text-neutral-500">{collection.description}</p>
        ) : null}

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
