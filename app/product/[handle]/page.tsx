import Footer from "components/layout/footer";
import { ProductDescriptionTabs } from "components/product/product-description-tabs";
import { ProductPurchasePanel } from "components/product/product-purchase-panel";
import { ProductVisual } from "components/b2b/product-visual";
import { Breadcrumbs, JsonLd } from "components/b2b/breadcrumbs";
import { LumiereProductCard } from "components/product/lumiere-product-card";
import { products } from "lib/data/products";
import { collections } from "lib/data/collections";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);
  if (!product) notFound();
  return {
    title: product.seo.title,
    description: product.description,
    alternates: { canonical: `${baseUrl}/product/${product.handle}` },
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${baseUrl}/product/${product.handle}`,
      type: "website",
    },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);
  if (!product) notFound();
  const category = collections.find((c) => c.handle === product.category)!;
  const related = products.filter(
    (p) => p.category === product.category && p.handle !== product.handle,
  );
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          ...(product.model ? { model: product.model } : {}),
          category: category.title,
          url: `${baseUrl}/product/${product.handle}`,
        }}
      />
      <div className="container-site section-pad py-10 md:py-14">
        <Breadcrumbs
          items={[
            { name: "Products", path: "/search" },
            { name: category.title, path: category.path },
            { name: product.title, path: `/product/${product.handle}` },
          ]}
        />
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <aside className="rounded-xl border border-border bg-card p-6 md:p-8 lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <ProductPurchasePanel product={product} />
          </aside>
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <div className="overflow-hidden rounded-xl border border-border">
              <ProductVisual product={product} />
            </div>
            <p className="mt-3 text-xs leading-5 text-ink-muted">
              Current product photo and exact configuration to be confirmed. Ask
              for model-specific images with your inquiry.
            </p>
          </div>
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <ProductDescriptionTabs product={product} />
          </div>
        </div>
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 text-2xl">Compare in this category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <LumiereProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
