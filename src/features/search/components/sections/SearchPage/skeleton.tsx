export default function SearchSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="h-7 w-32 animate-pulse rounded bg-muted" />
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>

      <div className="h-12 w-full animate-pulse rounded-full bg-muted" />

      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-2xl border border-border p-3"
          >
            <div className="h-14 w-14 animate-pulse rounded-xl bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}