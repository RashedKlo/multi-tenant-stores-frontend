export default function DiscountedStoresSkeleton() {
  return (
    <section aria-label="Loading discounted stores" className="space-y-3">
      <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="scrollbar-hide flex gap-3 overflow-hidden px-4 pb-1 sm:px-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex w-40 shrink-0 flex-col gap-2 rounded-2xl bg-card p-3 shadow-sm"
          >
            <div className="h-20 w-full animate-pulse rounded-xl bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
