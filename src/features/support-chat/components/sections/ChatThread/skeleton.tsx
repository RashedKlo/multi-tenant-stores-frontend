export function ChatThreadSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col" aria-busy="true" aria-hidden>
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-hidden px-4 py-4">
        <div className="flex justify-start">
          <div className="h-12 w-3/5 animate-pulse rounded-2xl bg-muted" />
        </div>
        <div className="flex justify-end">
          <div className="h-16 w-2/3 animate-pulse rounded-2xl bg-muted" />
        </div>
        <div className="flex justify-start">
          <div className="h-10 w-2/5 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>

      <div className="border-t border-border px-4 py-3">
        <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}