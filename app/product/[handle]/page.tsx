import Footer from "components/layout/footer";
import { RevealInView } from "components/motion/fade-in";
import { AnimatedProductGrid } from "components/motion/stagger-grid";
import { ProductDescriptionTabs } from "components/product/product-description-tabs";
import { ProductGallery } from "components/product/product-gallery";
import { ProductPurchasePanel } from "components/product/product-purchase-panel";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <>
      <div className="container-site section-pad pb-8 md:pb-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start lg:gap-10 xl:gap-14">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <Suspense fallback={null}>
              <ProductGallery media={product.media} />
            </Suspense>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-32 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="border border-border bg-card p-6 md:p-8">
              <Suspense fallback={null}>
                <ProductPurchasePanel product={product} />
              </Suspense>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <ProductDescriptionTabs product={product} />
          </div>
        </div>

        {relatedProducts.length ? (
          <RevealInView className="mt-16 border-t border-border pt-12">
            <h2 className="font-serif text-xl text-foreground md:text-2xl">
              You may also like
            </h2>
            <div className="mt-8">
              <AnimatedProductGrid products={relatedProducts} columns={4} />
            </div>
          </RevealInView>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
