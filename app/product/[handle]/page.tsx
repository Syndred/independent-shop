import Footer from "components/layout/footer";
import { ProductBreadcrumb } from "components/product/product-breadcrumb";
import { ProductCard } from "components/product/product-card";
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

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const relatedProducts = await getProductRecommendations(product.id);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <ProductBreadcrumb title={product.title} />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Suspense fallback={null}>
            <ProductGallery media={product.media} />
          </Suspense>

          <Suspense fallback={null}>
            <ProductPurchasePanel product={product} />
          </Suspense>
        </div>

        <ProductDescriptionTabs product={product} />

        {relatedProducts.length ? (
          <section className="mt-16 border-t border-neutral-200 pt-12">
            <h2 className="text-lg font-normal text-neutral-900">Related Products</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.handle}
                  product={related}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
