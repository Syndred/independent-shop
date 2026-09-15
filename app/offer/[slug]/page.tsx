import Footer from "components/layout/footer";
import { isIndexedOffer, resolveOffer } from "lib/offer";
import { siteConfig, whatsappTrackingUrl } from "lib/site-config";
import { baseUrl } from "lib/utils";
import {
  ArrowRight,
  ClipboardList,
  MessageCircle,
  PackageCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

type OfferPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Resolve validity and canonical redirects before any response body is streamed.

export const dynamic = "force-dynamic";

function firstParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
): string | undefined {
  const value = params?.[key];
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = resolveOffer(slug);
  if (!offer) return { title: "Wholesale Product Offer" };

  const canonicalUrl = `${baseUrl}/offer/${offer.slug}`;
  return {
    title: `${offer.product.title} Wholesale for ${offer.country.label}`,
    description: `Wholesale sourcing information for ${offer.product.title} for ${offer.buyerType.label} in ${offer.country.label}. Request MOQ, sample, and current quotation details.`,
    alternates: { canonical: canonicalUrl },
    robots: isIndexedOffer(offer.slug)
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title: `${offer.product.title} Wholesale for ${offer.country.label}`,
      description: `Discuss product fit, MOQ, samples, and destination requirements for ${offer.product.title}.`,
      url: canonicalUrl,
      type: "website",
    },
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function OfferPage({
  params,
  searchParams,
}: OfferPageProps) {
  const { slug } = await params;
  const offer = resolveOffer(slug);
  if (!offer) notFound();
  if (!offer.isCanonical) permanentRedirect(`/offer/${offer.slug}`);
  const query = searchParams ? await searchParams : undefined;
  const lead = firstParam(query, "lead") || firstParam(query, "lead_id");
  const utmSource = firstParam(query, "utm_source");
  const utmMedium = firstParam(query, "utm_medium");
  const utmContent = firstParam(query, "utm_content");
  const canonicalUrl = `${baseUrl}/offer/${offer.slug}`;
  const trackingBase = {
    product: offer.product.handle,
    lead,
    country: offer.country.slug,
    buyerType: offer.buyerType.slug,
    source: "offer_page",
    utmSource,
    utmMedium,
    utmCampaign: `${offer.product.handle}_${offer.country.slug}`,
    utmContent,
  } as const;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${baseUrl}/search`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: offer.product.title,
        item: `${baseUrl}/product/${offer.product.handle}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${offer.country.label} offer`,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <div className="bg-background">
        <section className="section-pad border-b border-border pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="container-site">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-ink-muted"
            >
              <Link href="/" className="transition hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/product/${offer.product.handle}`}
                className="transition hover:text-foreground"
              >
                {offer.product.title}
              </Link>
              <span>/</span>
              <span className="text-foreground">{offer.country.label}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                  {offer.buyerType.label} · {offer.country.label}
                </p>
                <h1 className="max-w-3xl text-4xl leading-tight text-foreground md:text-6xl">
                  {offer.product.title} Wholesale for {offer.country.label}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-ink-muted md:text-lg">
                  A focused sourcing route for{" "}
                  {offer.buyerType.label.toLowerCase()} reviewing{" "}
                  {offer.product.title.toLowerCase()} for the{" "}
                  {offer.country.label.toLowerCase()} market. Share your
                  quantity, destination, and configuration so the right options
                  can be confirmed.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappTrackingUrl({
                      ...trackingBase,
                      intent: "quote",
                      utmContent: "get_wholesale_price",
                    })}
                    className="inline-flex items-center justify-center gap-2 bg-[#1f8f4d] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
                  >
                    <MessageCircle className="size-4" />
                    Get Wholesale Price
                  </a>
                  <Link
                    href={`/product/${offer.product.handle}`}
                    className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
                  >
                    View Product
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden border border-border bg-secondary">
                <Image
                  src={offer.product.featuredImage.url}
                  alt={
                    offer.product.featuredImage.altText || offer.product.title
                  }
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad py-16 md:py-20">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm uppercase tracking-widest text-ink-muted">
                Buyer fit
              </p>
              <h2 className="text-3xl text-foreground md:text-4xl">
                A practical wholesale conversation
              </h2>
              <p className="mt-5 text-base leading-8 text-ink-muted">
                {offer.buyerType.fitCopy}
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="border border-border bg-card p-6">
                <ClipboardList className="size-6 text-primary" />
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  MOQ and quotation
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  Tell us your estimated order quantity. Current MOQ, wholesale
                  pricing, and available configurations are confirmed by quote.
                </p>
              </div>
              <div className="border border-border bg-card p-6">
                <PackageCheck className="size-6 text-primary" />
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  Sample discussion
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  Request a sample conversation before a bulk order.
                  Availability, sample cost, and freight depend on the selected
                  model and destination.
                </p>
              </div>
              <div className="border border-border bg-card p-6">
                <MessageCircle className="size-6 text-primary" />
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  Destination support
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">
                  {offer.country.shippingCopy}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad border-y border-border bg-secondary/50 py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm uppercase tracking-widest text-ink-muted">
                Product information
              </p>
              <h2 className="text-3xl text-foreground md:text-4xl">
                Confirm the details that matter
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-muted">
                Product information is provided for sourcing discussion. Final
                specifications, compliance documents, packaging, availability,
                and lead time are confirmed before an order is accepted.
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Product", offer.product.title],
                [
                  "Model options",
                  offer.product.variants
                    .map((variant) => variant.sku)
                    .join(", ") || "Confirmed by quote",
                ],
                ["Buyer type", offer.buyerType.label],
                ["Market", offer.country.label],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border border-border bg-background p-5"
                >
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="mt-2 text-base font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section-pad py-16 md:py-20">
          <div className="container-site text-center">
            <h2 className="mx-auto max-w-3xl text-3xl text-foreground md:text-5xl">
              Ready to discuss {offer.product.title}?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink-muted">
              Use WhatsApp to ask for current wholesale pricing, a sample, or
              MOQ details for your country and buyer profile.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappTrackingUrl({
                  ...trackingBase,
                  intent: "sample",
                  utmContent: "request_sample",
                })}
                className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
              >
                <PackageCheck className="size-4" />
                Request a Sample
              </a>
              <a
                href={whatsappTrackingUrl({
                  ...trackingBase,
                  intent: "moq",
                  utmContent: "ask_moq",
                })}
                className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
              >
                <ClipboardList className="size-4" />
                Ask MOQ
              </a>
              <a
                href={whatsappTrackingUrl({
                  ...trackingBase,
                  intent: "quote",
                  utmContent: "whatsapp",
                })}
                className="inline-flex items-center justify-center gap-2 bg-[#1f8f4d] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
            <p className="mt-5 text-xs text-ink-muted">
              {siteConfig.name} · Sourcing support from Shenzhen supply partners
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
