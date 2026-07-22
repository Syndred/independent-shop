import Footer from "components/layout/footer";
import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import { baseUrl } from "lib/utils";
import { Mail, MessageCircle, PackageCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const contactUrl = `${baseUrl}/contact/`;

export const metadata: Metadata = {
  title: "Request Wholesale Quote",
  description:
    "Contact Health Home Wholesale for pulse oximeter bulk pricing, catalog details, MOQ, shipping, OEM packaging, and wholesale sourcing support.",
  alternates: {
    canonical: contactUrl,
  },
};

const quoteMessage = `Hi, I'd like to request a wholesale quote.

Product name:
My country:
Estimated order quantity:
OEM/private label needed:`;

export default function ContactPage() {
  return (
    <>
      <main className="section-pad bg-background pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-site">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted"
          >
            <Link href="/" className="transition hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Request Quote</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,1fr)] lg:items-start">
            <div>
              <p className="mb-4 text-sm uppercase tracking-widest text-primary">
                Wholesale inquiry
              </p>
              <h1 className="max-w-3xl text-4xl leading-tight text-foreground md:text-6xl">
                Request a Wholesale Quote
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ink-muted md:text-lg">
                Send your product, destination country, estimated quantity, and
                OEM requirements. We will reply with suitable catalog options,
                MOQ, shipping route, and quotation details during business
                hours.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappOrderUrl(quoteMessage)}
                  className="inline-flex items-center justify-center gap-2 bg-[#1f8f4d] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp Quote
                </a>
                <a
                  href={`mailto:${siteConfig.supportEmail}?subject=Wholesale%20Quote%20Request`}
                  className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
                >
                  <Mail className="size-4" />
                  Email Sales
                </a>
              </div>
            </div>

            <section className="border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl text-foreground">Quote Checklist</h2>
              <div className="mt-6 grid gap-4">
                {[
                  "Product line or model you need",
                  "Destination country and shipping preference",
                  "Estimated order quantity",
                  "Compliance documents required",
                  "OEM logo, color, manual, or packaging needs",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border border-border bg-background p-4 text-sm text-foreground"
                  >
                    <PackageCheck className="size-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-ink-muted">
                For pulse oximeter wholesale orders, you can also start from the
                dedicated sourcing page and inquire about a specific product
                line.
              </p>
              <Link
                href="/pulse-oximeter-wholesale"
                className="mt-5 inline-flex text-sm font-semibold uppercase tracking-widest text-foreground transition hover:text-primary"
              >
                View Pulse Oximeter Wholesale
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
