// features/stores/components/product-detail/skeleton.tsx
export default function ProductDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted" />
      <div className="space-y-3">
        <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}