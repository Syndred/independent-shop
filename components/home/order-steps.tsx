import Link from "next/link";

const steps = [
  {
    title: "Choose a product",
    body: "Compare models, photos, and specifications on the product page.",
  },
  {
    title: "Place your order",
    body: "Use checkout on the site or send your order details on WhatsApp.",
  },
  {
    title: "We confirm shipping",
    body: "We reply with order confirmation and shipping details after payment.",
  },
];

export function OrderSteps() {
  return (
    <section className="container-site section-pad py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-xl font-medium text-foreground md:text-2xl">
          How ordering works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Two ways to buy: standard checkout or a direct WhatsApp message with
          your items.
        </p>
      </div>
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Step {index + 1}
            </p>
            <h3 className="mt-2 font-medium text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/search" className="btn-primary">
          Start shopping
        </Link>
        <Link href="/search/health-care" className="btn-secondary">
          Health & Care
        </Link>
      </div>
    </section>
  );
}
