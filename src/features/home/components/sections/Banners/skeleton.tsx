export default function BannerSkeleton() {
  return (
    <section aria-label="Loading banners" className="w-full">
      <div className="banners-carousel relative w-full">
        <div className="flex gap-3 overflow-hidden sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="group relative block w-[92vw] shrink-0 overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 shadow-sm sm:w-[60vw] lg:w-[45vw]"
            >
              <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-auto md:aspect-video lg:aspect-21/9">
                <div className="h-full w-full animate-pulse bg-muted" />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-black/5 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="h-4 w-3/5 animate-pulse rounded bg-white/30 sm:h-5" />
                <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/20 sm:h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}