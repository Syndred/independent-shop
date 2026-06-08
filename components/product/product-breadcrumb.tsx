import Link from "next/link";

export function ProductBreadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 text-sm text-neutral-500"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/"
            className="transition hover:text-neutral-900"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-neutral-900">{title}</li>
      </ol>
    </nav>
  );
}
