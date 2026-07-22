import Footer from "components/layout/footer";
import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import { baseUrl } from "lib/utils";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Factory,
  Globe2,
  Mail,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const pagePath = "/pulse-oximeter-wholesale";
const canonicalUrl = `${baseUrl}${pagePath}/`;

export const metadata: Metadata = {
  title: "Pulse Oximeter Wholesale - Bulk Orders from Manufacturer",
  description:
    "Pulse oximeter wholesale supplier. Pediatric pulse oximeter and rechargeable models, 50-unit MOQ, global shipping. WhatsApp for bulk pricing.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Pulse Oximeter Wholesale - Direct Supplier",
    description:
      "Bulk pulse oximeter sourcing for clinics, distributors, pharmacies, and retailers worldwide.",
    url: canonicalUrl,
    type: "website",
  },
};

const qualifierText = `\n\nMy country: \nEstimated order quantity: `;

const products = [
  {
    name: "Rechargeable Pulse Oximeter SY108",
    model: "SY108",
    image: "/one/main/%E4%B8%BB%E5%9B%BE1.jpg",
    alt: "rechargeable pulse oximeter wholesale model SY108",
    specs: [
      "Built-in lithium battery",
      "Rechargeable format",
      "SpO2 and pulse rate",
      "50-unit lot: $188",
      "Standard MOQ: 50 units",
      "Compliance documents on request",
    ],
    detailHref: "/product/premium-pulse-oximeter",
  },
  {
    name: "Pediatric Pulse Oximeter ZS101",
    model: "ZS101",
    image: "/two/main/%E4%B8%BB%E5%9B%BE1.jpg",
    alt: "pediatric pulse oximeter wholesale child model",
    specs: [
      "Child-friendly finger chamber",
      "Compact display layout",
      "SpO2 and pulse rate",
      "50-unit lot: $150",
      "Standard MOQ: 50 units",
      "OEM packaging available",
    ],
    detailHref: "/product/kids-pulse-oximeter",
  },
  {
    name: "Mini Handheld Nebulizer ZS102",
    model: "ZS102",
    image: "/three/main/%E4%B8%BB%E5%9B%BE1.jpg",
    alt: "mini handheld nebulizer wholesale model ZS102",
    specs: [
      "Mini handheld nebulizer line",
      "Rechargeable health device",
      "50-unit lot: $158",
      "Standard MOQ: 50 units",
      "Final specs confirmed by quote",
    ],
    detailHref: "/product/mini-speaker",
  },
  {
    name: "Advanced Pulse Oximeter ZS103",
    model: "ZS103",
    image: "/four/main/%E4%B8%BB%E5%9B%BE1.jpg",
    alt: "advanced pulse oximeter wholesale model ZS103",
    specs: [
      "Advanced pulse oximeter line",
      "Clinic and distributor sourcing",
      "50-unit lot: $150",
      "Standard MOQ: 50 units",
      "Final specs confirmed by quote",
    ],
    detailHref: "/product/advanced-pulse-oximeter",
  },
];

const trustItems = [
  {
    icon: Factory,
    title: "Direct Manufacturer",
    text: "Factory-direct sourcing support with fewer middle layers and flexible order planning.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Support",
    text: "Destination-specific documents, test reports, and certificates are provided with qualified quotes.",
  },
  {
    icon: PackageCheck,
    title: "Low MOQ",
    text: "Start from 50 units on listed wholesale lots, with sample discussions available before bulk purchase.",
  },
  {
    icon: Globe2,
    title: "Global Shipping",
    text: "Export support for the US, EU, Middle East, Africa, Southeast Asia, and other major markets.",
  },
];

type ComparisonRow = [string, string, string, string, string];

const comparisonRows: ComparisonRow[] = [
  [
    "Product format",
    "SY108 Rechargeable",
    "ZS101 Pediatric",
    "ZS102 Nebulizer",
    "ZS103 Advanced",
  ],
  [
    "Buyer use case",
    "Retail, clinic",
    "Pediatric clinic",
    "Respiratory care",
    "Clinical procurement",
  ],
  [
    "Display",
    "OLED options",
    "OLED options",
    "Digital display",
    "OLED options",
  ],
  [
    "Power",
    "Rechargeable options",
    "Battery options",
    "Rechargeable options",
    "Battery options",
  ],
  ["MOQ", "50 units", "50 units", "50 units", "50 units"],
  ["Wholesale lot", "$188 / 50", "$150 / 50", "$158 / 50", "$150 / 50"],
  ["OEM available", "Yes", "Yes", "By request", "Yes"],
  [
    "Compliance",
    "Quote confirmed",
    "Quote confirmed",
    "Quote confirmed",
    "Quote confirmed",
  ],
];

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "Current listed wholesale products start from 50 units per lot. OEM orders and larger distributor orders are quoted separately.",
  },
  {
    question: "Do you supply pediatric pulse oximeter models?",
    answer:
      "Yes. The ZS101 pediatric pulse oximeter line is available for child-friendly catalog sourcing, clinics, pharmacies, distributors, and retailers.",
  },
  {
    question: "Can you provide compliance documents?",
    answer:
      "Yes. Available certificates, test reports, declarations, and destination-specific documents are supplied during quotation based on the exact model and shipping market.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard international shipping usually takes 7-15 business days. Express courier options such as DHL or FedEx usually take 3-7 business days depending on destination.",
  },
  {
    question: "Can I get a sample before placing a bulk order?",
    answer:
      "Yes. Sample orders are available for qualified buyers. Sample costs can be credited against the first confirmed bulk order when agreed in advance.",
  },
  {
    question: "Do you offer warranty?",
    answer:
      "Warranty terms are confirmed by model and order size. Standard wholesale orders can include replacement support for verified defective units.",
  },
  {
    question: "How do I pay?",
    answer:
      "Bulk orders usually support T/T bank transfer. Sample orders may support PayPal or other agreed payment methods. Payment terms are confirmed in the proforma invoice.",
  },
];

function inquiryUrl(productName: string) {
  return whatsappOrderUrl(
    `Hi, I'm interested in ${productName} wholesale pricing.${qualifierText}`,
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function PulseOximeterWholesalePage() {
  const heroWhatsApp = whatsappOrderUrl(
    `Hi, I'm interested in pulse oximeter wholesale pricing.${qualifierText}`,
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": products.map((product) => ({
      "@type": "Product",
      name: product.name,
      description: `${product.name} available for wholesale and bulk procurement. Final model code, compliance documents, and specifications are confirmed during quotation.`,
      category: product.name.includes("Nebulizer")
        ? "Medical Device > Nebulizer"
        : "Medical Device > Pulse Oximeter",
      image: `${baseUrl}${product.image}`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: siteConfig.currency,
        offerCount: "1",
        availability: "https://schema.org/InStock",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pulse Oximeter Wholesale",
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="bg-background">
        <section className="section-pad border-b border-border pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container-site">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-ink-muted"
            >
              <Link href="/" className="transition hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Pulse Oximeter Wholesale</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
                  B2B medical device sourcing
                </p>
                <h1 className="max-w-3xl text-4xl leading-tight text-foreground md:text-6xl">
                  Pulse Oximeter Wholesale - Direct from Supplier
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-ink-muted md:text-lg">
                  Your trusted source for pulse oximeters in bulk. We supply
                  fingertip, pediatric, handheld, wrist-worn, and veterinary
                  pulse oximeter lines to clinics, distributors, pharmacies, and
                  retailers worldwide. Low minimum order quantities, OEM/private
                  label discussion, fast international shipping. Contact us on
                  WhatsApp for wholesale pricing.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={heroWhatsApp}
                    className="inline-flex items-center justify-center gap-2 bg-[#1f8f4d] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp - Get Wholesale Price
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-foreground px-6 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
                  >
                    <ClipboardList className="size-4" />
                    Request Quote
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-border bg-secondary">
                <Image
                  src="/one/main/%E4%B8%BB%E5%9B%BE1.jpg"
                  alt="pulse oximeter wholesale inventory for bulk orders"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad py-16 md:py-20">
          <div className="container-site">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm uppercase tracking-widest text-ink-muted">
                  Product catalog
                </p>
                <h2 className="text-3xl text-foreground md:text-4xl">
                  Our Pulse Oximeter Products
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-ink-muted">
                Product cards use available catalog imagery. Final model codes,
                regulatory documents, packaging, and destination requirements
                are confirmed before quotation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {products.map((product) => (
                <article
                  key={product.name}
                  className="flex h-full flex-col border border-border bg-card"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl leading-snug text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      Model: {product.model}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm leading-6 text-foreground/80">
                      {product.specs.map((spec) => (
                        <li key={spec} className="flex gap-2">
                          <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      <Link
                        href={product.detailHref}
                        className="inline-flex items-center justify-center gap-1 border border-border px-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Details
                        <ArrowRight className="size-3" />
                      </Link>
                      <a
                        href={inquiryUrl(product.name)}
                        className="inline-flex items-center justify-center gap-1 bg-[#1f8f4d] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
                      >
                        Inquire
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad border-y border-border bg-secondary/55 py-16 md:py-20">
          <div className="container-site">
            <h2 className="text-3xl text-foreground md:text-4xl">
              Why Source Pulse Oximeters From Us
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border border-border bg-background p-6"
                  >
                    <Icon className="size-7 text-primary" />
                    <h3 className="mt-5 font-serif text-xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-pad py-16 md:py-20">
          <div className="container-site">
            <h2 className="text-3xl text-foreground md:text-4xl">
              Technical Specifications
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-muted">
              Use this comparison as a procurement checklist. Exact SpO2 range,
              accuracy, certification status, packaging, and warranty are
              confirmed from your selected supplier catalog before purchase.
            </p>
            <div className="mt-8 overflow-x-auto border border-border">
              <table className="min-w-[900px] w-full border-collapse bg-card text-left text-sm">
                <thead className="bg-secondary text-foreground">
                  <tr>
                    {["Spec", "SY108", "ZS101 Pediatric", "ZS102", "ZS103"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="border-b border-border px-4 py-4 font-semibold"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row[0]}
                      className="border-b border-border last:border-0"
                    >
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={`px-4 py-4 ${index === 0 ? "font-semibold text-foreground" : "text-ink-muted"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-pad border-y border-border bg-secondary/45 py-16 md:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm uppercase tracking-widest text-ink-muted">
                Private label
              </p>
              <h2 className="text-3xl text-foreground md:text-4xl">
                OEM & Private Label Services
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-muted">
                We offer OEM and private label support for pulse oximeter bulk
                orders. Common options include custom logo printing, device
                color combinations, packaging design, user manual localization,
                and drop shipping for qualified partners. Send your requirements
                on WhatsApp for a tailored quote and catalog recommendation.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Custom logo printing",
                "Custom color combinations",
                "Private packaging design",
                "Manuals in your language",
                "Drop shipping discussion",
                "Bulk carton planning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-border bg-background p-4 text-sm font-medium text-foreground"
                >
                  <BadgeCheck className="size-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad py-16 md:py-20">
          <div className="container-site">
            <h2 className="text-3xl text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-border bg-card p-5"
                >
                  <summary className="cursor-pointer list-none font-serif text-xl text-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad border-y border-border bg-foreground py-16 text-background md:py-20">
          <div className="container-site text-center">
            <h2 className="mx-auto max-w-3xl text-3xl text-background md:text-5xl">
              Ready to Order Pulse Oximeters in Bulk?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-background/75 md:text-base">
              Send us a message on WhatsApp for the latest wholesale price list
              and product catalog. Most quotes are delivered within 2 hours
              during business hours.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappOrderUrl(
                  `Hi, I'd like to see your pulse oximeter wholesale price list.${qualifierText}`,
                )}
                className="inline-flex items-center justify-center gap-2 bg-[#1f8f4d] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-[#176f3b]"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-background/40 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-background transition hover:border-background"
              >
                <Mail className="size-4" />
                Fill Out Contact Form
              </Link>
            </div>
          </div>
        </section>

        <section className="section-pad py-12">
          <div className="container-site">
            <p className="text-center text-sm uppercase tracking-widest text-ink-muted">
              Trusted by healthcare buyers worldwide
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Compliance documents",
                "CE/FDA files on request",
                "ISO supplier options",
                "Ships to 50+ countries",
                "Warranty support",
              ].map((badge) => (
                <div
                  key={badge}
                  className="border border-border bg-card px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-foreground"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-[#1f8f4d] p-3 shadow-2xl md:hidden">
          <a
            href={heroWhatsApp}
            className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-white"
          >
            <MessageCircle className="size-4" />
            WhatsApp Wholesale Price
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
