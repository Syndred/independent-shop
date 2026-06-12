export default function Loading() {
  return (
    <div className="container-site section-pad py-12">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-neutral-200/80" />
      <div className="mt-3 h-5 w-72 animate-pulse rounded bg-neutral-200/60" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 animate-pulse rounded-full bg-neutral-200/70"
          />
        ))}
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-square animate-pulse border border-border bg-muted" />
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-neutral-200/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
