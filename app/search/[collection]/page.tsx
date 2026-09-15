import Footer from "components/layout/footer";
import { Breadcrumbs } from "components/b2b/breadcrumbs";
import { LumiereProductCard } from "components/product/lumiere-product-card";
import { CollectionPills } from "components/search/collection-pills";
import { NebulizerPhotoRange } from "components/b2b/nebulizer-photo-range";
import {
  collections,
  getCollectionProductsByHandle,
} from "lib/data/collections";
import { baseUrl } from "lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return collections
    .filter((c) => c.handle)
    .map((c) => ({ collection: c.handle }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: handle } = await params;
  const c = collections.find((c) => c.handle === handle);
  if (!c) notFound();
  return {
    title: c.seo.title,
    description: c.description,
    alternates: { canonical: `${baseUrl}${c.path}` },
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: handle } = await params;
  const c = collections.find((c) => c.handle === handle);
  if (!c) notFound();
  const guides: Record<string, string> = {
    "pulse-oximeters": "/pulse-oximeter-wholesale",
    "mesh-nebulizers": "/mesh-nebulizer-supplier",
    "blood-pressure-monitors": "/blood-pressure-monitor-wholesale",
  };
  return (
    <>
      <div className="container-site section-pad py-12 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Products", path: "/search" },
            { name: c.title, path: c.path },
          ]}
        />
        <h1 className="text-4xl md:text-5xl">{c.title}</h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink-muted">
          {c.description}
        </p>
        <Link
          href={guides[c.handle]!}
          className="mt-5 inline-block font-semibold text-primary underline underline-offset-4"
        >
          Read the wholesale buying guide
        </Link>
        <div className="mt-8">
          <CollectionPills collections={collections} activePath={c.path} />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getCollectionProductsByHandle(c.handle).map((p) => (
            <LumiereProductCard key={p.handle} product={p} />
          ))}
        </div>
        {c.handle === "mesh-nebulizers" ? <NebulizerPhotoRange /> : null}
      </div>
      <Footer />
    </>
  );
}
