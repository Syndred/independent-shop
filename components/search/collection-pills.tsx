import type { Collection } from "lib/shopify/types";
import Link from "next/link";
export function CollectionPills({
  collections,
  activePath,
}: {
  collections: Collection[];
  activePath?: string;
}) {
  return (
    <nav aria-label="Product categories" className="flex flex-wrap gap-2">
      {collections.map((c) => (
        <Link
          key={c.path}
          href={c.path}
          aria-current={activePath === c.path ? "page" : undefined}
          className={`inline-flex min-h-11 items-center rounded-lg border px-4 py-2 text-sm ${activePath === c.path ? "border-primary bg-primary text-white" : "border-border bg-card text-ink-muted hover:text-primary"}`}
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}
