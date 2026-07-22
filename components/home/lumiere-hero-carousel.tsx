"use client";

import { heroSlides } from "lib/data/hero-slides";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;

export function LumiereHeroCarousel({ shopHref }: { shopHref: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex] ?? heroSlides[0]!;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#111820]"
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`absolute inset-0 object-cover object-center transition duration-[1200ms] ease-out ${
              index === activeIndex
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,32,0.9)_0%,rgba(17,24,32,0.72)_34%,rgba(17,24,32,0.24)_72%,rgba(17,24,32,0.46)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container-site section-pad relative z-10 flex h-full items-end pb-24 pt-32 md:items-center md:pb-0">
        <div className="max-w-2xl text-left">
          <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.22em] text-white/75 md:text-sm">
            {activeSlide.kicker}
          </span>
          <h1 className="font-serif text-4xl leading-tight text-white drop-shadow-sm md:text-6xl lg:text-7xl">
            {activeSlide.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/78 md:text-lg">
            {activeSlide.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={shopHref}
              className="inline-flex items-center justify-center bg-background px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              Browse Catalog
            </Link>
            <Link
              href="/pulse-oximeter-wholesale"
              className="inline-flex items-center justify-center border border-white/55 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
            >
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="section-pad absolute inset-x-0 bottom-8 z-10">
        <div className="container-site flex items-center gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-10 bg-white"
                  : "w-6 bg-white/35 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
