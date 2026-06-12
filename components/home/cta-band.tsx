import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-site section-pad py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-xl font-medium text-foreground md:text-2xl">
              Ready to order a pulse oximeter?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Your health essentials. Your preferred channel. Checkout on the site or message us on
              WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="btn-primary"
            >
              Shop now
            </Link>
            <a
              href={whatsappOrderUrl(`Hi, I'd like to order from ${siteConfig.name}.`)}
              className="btn-accent"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
