export function StoreIntro({
  productCount,
  collectionCount,
}: {
  productCount: number;
  collectionCount: number;
}) {
  return (
    <section className="border-y border-border bg-muted">
      <div className="container-site section-pad py-12 md:py-14">
        <p className="max-w-2xl text-lg font-medium leading-snug text-foreground md:text-xl">
          A focused store for pulse oximeters and health essentials, with
          checkout on the site or quick orders on WhatsApp.
        </p>
        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          <div className="border-t border-border pt-4">
            <dd className="text-2xl font-medium tabular-nums text-foreground">
              {productCount}
            </dd>
            <dt className="mt-1 text-sm text-muted-foreground">
              Products available now
            </dt>
          </div>
          <div className="border-t border-border pt-4">
            <dd className="text-2xl font-medium tabular-nums text-foreground">
              {collectionCount}
            </dd>
            <dt className="mt-1 text-sm text-muted-foreground">
              Shop categories
            </dt>
          </div>
          <div className="border-t border-border pt-4">
            <dd className="text-2xl font-medium text-foreground">Global</dd>
            <dt className="mt-1 text-sm text-muted-foreground">
              Shipping on every order
            </dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
