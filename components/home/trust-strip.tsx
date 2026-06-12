const items = ["Fast SpO2 readings", "Ships worldwide", "One-button use", "WhatsApp support"];

export function TrustStrip() {
  return (
    <section className="border-y border-border">
      <div className="container-site section-pad py-6">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
