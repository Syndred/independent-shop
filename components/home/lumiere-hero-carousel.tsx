"use client";

import { heroSlides } from "lib/data/hero-slides";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

export function LumiereHeroCarousel({ shopHref }: { shopHref: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[hsl(32,24%,88%)]">
        {heroSlides.map((slide, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-3xl px-4 text-center">
        <span className="mb-6 block text-sm uppercase tracking-[0.3em] text-white/90">
          The New Standard of Wellness
        </span>
        <h1 className="mb-8 font-serif text-5xl leading-tight text-white md:text-7xl">
          Reveal Your
          <br />
          Natural Radiance
        </h1>
        <Link
          href={shopHref}
          className="btn-lumiere"
        >
          Shop Collection
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

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
