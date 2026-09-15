import type { Product } from "lib/shopify/types";
import Link from "next/link";
export function ProductDescriptionTabs({ product }: { product: Product }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl">Product details</h2>
      <dl className="mt-5 divide-y divide-border">
        {[
          ["Product type", product.format || product.title],
          ["Model", product.model || "Exact model: please confirm by inquiry"],
          ["Manufacturer", "Please confirm by inquiry"],
          ["MOQ & sample cost", "Please confirm by inquiry"],
          ["OEM / ODM", "Feasibility and MOQ confirmed by inquiry"],
          ["Packaging, lead time & warranty", "Please confirm by inquiry"],
          [
            "Certificates & test reports",
            "Not verified; request model-specific documents",
          ],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-2 py-4 sm:grid-cols-2">
            <dt className="text-sm text-ink-muted">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-9 text-2xl">Confirm with your quotation</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-ink-muted">
        {product.confirmationItems?.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p className="mt-6 text-sm leading-6 text-ink-muted">
        Product identity is based on the supplied 1688 catalog. Current model
        photos and specifications are awaiting confirmation.{" "}
        <Link className="text-primary underline" href="/quality-compliance">
          Review our documentation checklist.
        </Link>
      </p>
    </section>
  );
}
