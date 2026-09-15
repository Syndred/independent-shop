import Link from "next/link";
import { whatsappTrackingUrl } from "lib/site-config";
import type { Product } from "lib/shopify/types";
export function ProductPurchasePanel({ product }: { product: Product }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-primary">
        Wholesale sourcing
      </p>
      <h1 className="text-3xl leading-tight md:text-4xl">{product.title}</h1>
      <p className="mt-5 text-sm leading-7 text-ink-muted">
        {product.description}
      </p>
      <p className="mt-6 font-semibold text-primary">
        Wholesale pricing by quote
      </p>
      <div className="mt-6 grid gap-3">
        <Link
          href={`/contact?product=${product.handle}`}
          className="btn-accent rounded-lg"
        >
          Request a Quote
        </Link>
        <a
          href={whatsappTrackingUrl({
            product: product.handle,
            source: "product_detail",
            intent: "sample",
          })}
          className="btn-secondary rounded-lg"
        >
          Request a Sample
        </a>
        <a
          href={whatsappTrackingUrl({
            product: product.handle,
            source: "product_detail",
            intent: "moq",
          })}
          className="btn-secondary rounded-lg"
        >
          Ask MOQ
        </a>
      </div>
      <p className="mt-5 text-xs leading-6 text-ink-muted">
        Price, MOQ, stock, samples, OEM/ODM, lead time and destination documents
        are confirmed individually before an order.
      </p>
    </div>
  );
}
