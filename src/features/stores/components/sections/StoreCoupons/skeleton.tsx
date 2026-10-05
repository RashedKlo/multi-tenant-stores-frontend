export default function StoreCouponsSkeleton() {
  return (
    <div>
      <div className="mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-border bg-muted/50"
          />
        ))}
      </div>
    </div>
  );
}
