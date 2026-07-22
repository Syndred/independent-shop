"use client";

import { siteConfig } from "lib/site-config";
import { FormEvent, useState } from "react";

export function LumiereNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="bg-primary px-4 py-24 text-center text-primary-foreground"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 font-serif text-3xl md:text-4xl">
          Join the {siteConfig.name} Club
        </h2>
        <p className="mb-8 text-primary-foreground/90">
          Subscribe for product updates, care tips, and early access to seasonal
          offers.
        </p>
        {submitted ? (
          <p className="text-sm uppercase tracking-widest">
            Thank you for subscribing.
          </p>
        ) : (
          <form
            className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 border border-primary-foreground/30 bg-transparent px-6 py-3 text-primary-foreground outline-none transition placeholder:text-primary-foreground/60 focus:border-primary-foreground"
            />
            <button
              type="submit"
              className="bg-primary-foreground px-8 py-3 text-sm uppercase tracking-widest text-primary transition hover:bg-background hover:text-foreground"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
