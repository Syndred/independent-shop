import Footer from "components/layout/footer";
import { FadeIn } from "components/motion/fade-in";
import { AnimatedProductGrid } from "components/motion/stagger-grid";
import { CollectionPills } from "components/search/collection-pills";
import { getCollection, getCollectionProducts, getCollections } from "lib/shopify";
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
  const collections = await getCollections();

  if (!collection) return notFound();

  return (
    <>
      <div className="container-site section-pad pb-8 md:pb-10">
        <FadeIn>
          <h1 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {collection.title}
          </h1>
          {collection.description ? (
            <p className="mt-3 max-w-xl text-ink-muted">{collection.description}</p>
          ) : null}
        </FadeIn>

        <div className="mt-8">
          <CollectionPills
            collections={collections}
            activePath={collection.path}
          />
        </div>

        <div className="mt-10">
          <AnimatedProductGrid products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}
