import { Breadcrumbs } from "./breadcrumbs";
import Prose from "components/prose";
import type { Page } from "lib/shopify/types";
export function ContentPage({ page }: { page: Page }) {
  return (
    <>
      <Breadcrumbs items={[{ name: page.title, path: `/${page.handle}` }]} />
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
        Health Home Wholesale · Buyer resources
      </p>
      <h1 className="text-3xl leading-tight md:text-5xl">{page.title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink-muted">
        {page.bodySummary}
      </p>
      <Prose
        className="mt-10 max-w-none prose-headings:text-primary prose-a:text-primary prose-table:text-sm"
        html={page.body}
      />
      <p className="mt-10 text-xs text-ink-muted">
        Reviewed 15 September 2026. Model details and order terms are confirmed
        by quotation.
      </p>
    </>
  );
}
