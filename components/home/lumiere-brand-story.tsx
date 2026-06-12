import Link from "next/link";

function publicSrc(path: string): string {
  return (
    "/" +
    path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

const STORY_IMAGE = publicSrc("four/main/主图1.jpg");

export function LumiereBrandStory() {
  return (
    <section
      id="brand-story"
      className="bg-secondary py-24 md:py-28"
    >
      <div className="container-site section-pad">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex items-center justify-center border border-border/60 bg-background p-8 md:p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STORY_IMAGE}
              alt="Pulse oximeter product"
              className="mx-auto max-h-[min(420px,70vh)] w-full object-contain"
            />
          </div>
          <div className="max-w-lg">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Our Philosophy
            </span>
            <h2 className="mb-6 mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Conscious Care,
              <br />
              Uncompromised Quality.
            </h2>
            <p className="mb-8 leading-relaxed text-foreground/80">
              We believe monitoring your health should be simple, accurate, and accessible. Our
              pulse oximeters combine thoughtful design with dependable performance for daily
              routines, family care, and travel.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 link-underline"
            >
              Discover Our Story
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
