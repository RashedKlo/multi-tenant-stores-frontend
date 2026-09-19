export function CheckoutSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-hidden>
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="flex gap-3">
              <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-muted" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3.5 w-3/5 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-3.5 w-16 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <div className="h-3.5 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
      </section>

      <section className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl border border-border bg-muted/60"
            />
          ))}
        </div>
        <div className="h-12 w-full animate-pulse rounded-full bg-muted" />
      </section>
    </div>
  );
}