import Footer from "components/layout/footer";
import { FadeIn } from "components/motion/fade-in";
import { AnimatedProductGrid } from "components/motion/stagger-grid";
import { CollectionPills } from "components/search/collection-pills";
import { getCollections, getProducts } from "lib/shopify";

export default async function SearchPage() {
  const [collections, products] = await Promise.all([getCollections(), getProducts({})]);

  return (
    <>
      <div className="container-site section-pad pb-8 md:pb-10">
        <FadeIn>
          <h1 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">All products</h1>
          <p className="mt-3 max-w-xl text-ink-muted">
            Pulse oximeters and health essentials, ready to ship.
          </p>
        </FadeIn>

        <div className="mt-8">
          <CollectionPills
            collections={collections}
            activePath="/search"
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
