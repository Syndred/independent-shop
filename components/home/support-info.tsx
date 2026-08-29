import { siteConfig, whatsappOrderUrl } from "lib/site-config";

const items = [
  {
    title: "Shipping",
    body: "Share the destination and order quantity so available shipping routes and trade terms can be quoted.",
  },
  {
    title: "Quotation",
    body: "Current pricing, MOQ, availability, and payment terms are confirmed in a written quotation.",
  },
  {
    title: "Product help",
    body: "Not sure which oximeter fits your needs? Ask about specs, accessories, or bulk pricing.",
  },
  {
    title: "Before you order",
    body: "We confirm specifications, samples, lead time, compliance documents, and destination requirements before acceptance.",
  },
];

export function SupportInfo() {
  return (
    <section className="border-t border-border bg-muted">
      <div className="container-site section-pad py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-xl font-medium text-foreground md:text-2xl">
            Shipping, quotation, and help
          </h2>
          <p className="mt-3 text-muted-foreground">
            Practical details before you confirm an order with {siteConfig.name}
            .
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="border border-border bg-card p-6">
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Email:{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-foreground underline-offset-4 hover:underline"
          >
            {siteConfig.supportEmail}
          </a>
          {" · "}
          <a
            href={whatsappOrderUrl(
              `Hi, I have a question about ${siteConfig.name}.`,
            )}
            className="text-foreground underline-offset-4 hover:underline"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
