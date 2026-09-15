import { nebulizerPhotos } from "lib/data/product-images";
import { ProductGallery } from "components/product/product-gallery";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export function NebulizerPhotoRange() {
  return (
    <section
      id="supplier-photos"
      className="mt-14 border-t border-border pt-10"
    >
      <h2 className="text-3xl">Explore the nebulizer range</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted">
        Browse supplier catalog photos and color options. Include the design you
        prefer in your inquiry so we can confirm the model and configuration.
      </p>
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {nebulizerPhotos.map((group) => (
          <article
            key={group.title}
            className="min-w-0 rounded-xl border border-border bg-white p-4"
          >
            <Suspense
              fallback={
                <Image
                  src={group.media.main[0]!.url}
                  alt={group.media.main[0]!.altText}
                  width={800}
                  height={800}
                  className="aspect-[4/3] w-full object-contain"
                />
              }
            >
              <ProductGallery media={group.media} />
            </Suspense>
            <h3 className="mt-5 text-xl">{group.title}</h3>
            <Link
              href={group.href}
              className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4"
            >
              Discuss this design
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
