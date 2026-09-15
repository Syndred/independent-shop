import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-site section-pad py-24">
      <p className="text-sm text-primary">404 · Page not found</p>
      <h1 className="mt-4 text-4xl">Let's find the right product.</h1>
      <p className="mt-5 text-ink-muted">
        This page is unavailable. Browse the current catalog or send us your
        sourcing requirements.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/search" className="btn-accent rounded-lg">
          Product catalog
        </Link>
        <Link href="/contact" className="btn-secondary rounded-lg">
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
