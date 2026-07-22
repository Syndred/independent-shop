const pillars = [
  {
    title: "Readings you can trust",
    body: "SpO2, pulse rate, and perfusion index on a single screen. Designed for quick checks at home or on the road.",
  },
  {
    title: "Simple to operate",
    body: "One-button use and a clear display. No complicated setup before your first reading.",
  },
  {
    title: "Built for travel",
    body: "Compact size fits in a bag or drawer. A practical companion for trips and daily routines.",
  },
  {
    title: "Support when you need it",
    body: "Questions about models, shipping, or bulk orders? Reach us on WhatsApp or email.",
  },
];

export function ValuePillars() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-site section-pad py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-xl font-medium text-foreground md:text-2xl">
              Made for everyday monitoring
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We keep the catalog focused on pulse oximeters and related health
              essentials, so you can compare models and order without clutter.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="py-6 first:pt-6 last:pb-6">
                <h3 className="font-medium text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
