import Link from "next/link";
import { baseUrl } from "lib/utils";
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.path}`,
          })),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap gap-2 text-sm text-ink-muted"
      >
        {all.map((item, i) => (
          <span key={item.path}>
            {i > 0 && (
              <span className="mr-2" aria-hidden="true">
                /
              </span>
            )}
            {i === all.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link
                className="underline-offset-4 hover:underline"
                href={item.path}
              >
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
