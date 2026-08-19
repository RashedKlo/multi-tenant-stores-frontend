// features/stores/components/sections/StoreSections/skeleton.tsx
export default function StoreSectionsSkeleton() {
  return (
    <div>
      <div className="mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border">
            <div className="aspect-[4/3] animate-pulse bg-muted" />
            <div className="p-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}