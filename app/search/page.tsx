import Footer from "components/layout/footer";
import { Breadcrumbs } from "components/b2b/breadcrumbs";
import { LumiereProductCard } from "components/product/lumiere-product-card";
import { CollectionPills } from "components/search/collection-pills";
import { collections } from "lib/data/collections";
import { products } from "lib/data/products";
import { baseUrl } from "lib/utils";
export const metadata = {
  title: "Wholesale Home Health Product Catalog",
  description:
    "Browse six home health sourcing lines: upper-arm and wrist blood pressure monitors, LK87/LK89 pulse oximeters and SY108/ZS101 mesh nebulizers.",
  alternates: { canonical: `${baseUrl}/search` },
};
export default function SearchPage() {
  return (
    <>
      <div className="container-site section-pad py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Product catalog", path: "/search" }]} />
        <h1 className="text-4xl md:text-5xl">The wholesale product catalog</h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink-muted">
          Six product lines for your shortlist. Ask about low MOQ options,
          sample costs and current specifications; availability is confirmed
          with each quote.
        </p>
        <div className="mt-8">
          <CollectionPills collections={collections} activePath="/search" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <LumiereProductCard key={p.handle} product={p} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
