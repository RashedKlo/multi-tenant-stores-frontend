// features/modules/components/sections/Categories/skeleton.tsx
export default function CategoriesSkeleton() {
  return (
    <div>
      <div className="mb-3 h-5 w-28 animate-pulse rounded bg-muted" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
    </div>
  );
}