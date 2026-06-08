"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ProductMedia } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export function ProductGallery({ media }: { media: ProductMedia }) {
  const images = useMemo(() => [...media.main, ...media.sku], [media]);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const style = searchParams.get("style");
    if (!style) return;

    const match = style.match(/(\d+)$/);
    if (!match) return;

    const skuIndex = Number(match[1]) - 1;
    const galleryIndex = media.main.length + skuIndex;
    if (galleryIndex >= 0 && galleryIndex < images.length) {
      setActiveIndex(galleryIndex);
    }
  }, [searchParams, media.main.length, images.length]);

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  if (!images.length) return null;

  const activeImage = images[activeIndex] ?? images[0]!;

  const goTo = (index: number) => {
    if (index < 0) {
      setActiveIndex(images.length - 1);
      return;
    }
    if (index >= images.length) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="flex aspect-square items-center justify-center border border-neutral-200 bg-white p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.url}
          alt={activeImage.altText}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous image"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-900"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                ref={(node) => {
                  thumbRefs.current[index] = node;
                }}
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={clsx(
                  "h-16 w-16 shrink-0 overflow-hidden border bg-white p-1 transition",
                  index === activeIndex
                    ? "border-neutral-900"
                    : "border-neutral-200 hover:border-neutral-400",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.altText}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next image"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-900"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
