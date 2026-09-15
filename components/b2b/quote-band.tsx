import Link from "next/link";
export function QuoteBand() {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container-site section-pad flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest">
            Start with your requirements
          </p>
          <h2 className="text-3xl md:text-4xl">
            A smaller first order. A clearer next step.
          </h2>
          <p className="mt-4 max-w-xl text-white/85">
            Tell us your product, quantity and destination. Ask about low MOQ
            options, samples and the documents you need.
          </p>
        </div>
        <Link className="btn-lumiere shrink-0 rounded-lg" href="/contact">
          Request a Quote →
        </Link>
      </div>
    </section>
  );
}
