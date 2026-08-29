import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-site section-pad py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-xl font-medium text-foreground md:text-2xl">
              Ready to source pulse oximeters?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share your quantity, destination, and model requirements for a
              current wholesale quotation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/search" className="btn-primary">
              View Products
            </Link>
            <a
              href={whatsappOrderUrl(
                `Hi, I'd like a wholesale quotation from ${siteConfig.name}.`,
              )}
              className="btn-accent"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
