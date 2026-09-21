export function ConversationsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-muted" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
              <div className="h-3 w-12 animate-pulse rounded bg-muted" />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="h-3.5 w-3/5 animate-pulse rounded bg-muted" />
              <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}