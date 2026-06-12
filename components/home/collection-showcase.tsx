import type { Collection } from "lib/shopify/types";
import Link from "next/link";

export function CollectionShowcase({ collections }: { collections: Collection[] }) {
  const featured = collections.filter((c) => c.handle);

  if (!featured.length) return null;

  return (
    <section className="container-site section-pad py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-xl font-medium text-foreground md:text-2xl">Shop by category</h2>
        <p className="mt-3 text-muted-foreground">
          Browse health monitors for home use or check seasonal offers.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((collection) => (
          <Link
            key={collection.handle}
            href={collection.path}
            className="group block border border-border bg-card p-6 transition hover:border-foreground/25 md:p-8"
          >
            <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
              {collection.title}
            </h3>
            {collection.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {collection.description}
              </p>
            ) : null}
            <p className="mt-4 text-sm font-medium text-primary">Browse category</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
