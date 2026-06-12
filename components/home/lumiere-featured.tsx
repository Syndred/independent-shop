import { LumiereProductCard } from "components/product/lumiere-product-card";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

export function LumiereFeatured({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4);

  return (
    <section
      id="featured-products"
      className="container-site section-pad pb-24 pt-20 md:pb-28 md:pt-24"
    >
      <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div>
          <h2 className="mb-4 font-serif text-3xl md:text-4xl">Curated Essentials</h2>
          <p className="max-w-md text-muted-foreground">
            Discover our most loved products, chosen for reliable readings and everyday care at
            home.
          </p>
        </div>
        <Link
          href="/search"
          className="link-underline whitespace-nowrap"
        >
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <LumiereProductCard
            key={product.handle}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
