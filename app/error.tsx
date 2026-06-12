"use client";

import { FadeIn } from "components/motion/fade-in";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container-site section-pad py-16">
      <FadeIn className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-8 md:p-12">
        <h2 className="text-xl font-medium text-ink">Something went wrong</h2>
        <p className="mt-3 text-ink-muted">
          There was an issue with our storefront. Please try your action again.
        </p>
        <button
          type="button"
          className="btn-accent mt-6 w-full sm:w-auto"
          onClick={() => reset()}
        >
          Try again
        </button>
      </FadeIn>
    </div>
  );
}
