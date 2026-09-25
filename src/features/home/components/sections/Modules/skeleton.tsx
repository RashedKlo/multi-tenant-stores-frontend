export default function ModulesSkeleton() {
  return (
    <section aria-label="Loading modules">
      <div className="mb-4 h-5 w-24 animate-pulse rounded bg-muted sm:h-6 sm:w-28" />

      <ul className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-6 lg:grid-cols-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="shrink-0 snap-start">
            <div className="group flex w-[4.5rem] flex-col items-center gap-2 rounded-2xl p-1.5 sm:w-auto">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 shadow-sm animate-pulse sm:h-20 sm:w-20" />
              <div className="h-3 w-10 animate-pulse rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}