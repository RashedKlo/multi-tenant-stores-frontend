// features/stores/components/sections/Products/skeleton.tsx
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border/60 bg-card p-0" aria-hidden>
      <div className="aspect-square w-full rounded-t-2xl bg-muted" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-4/5 rounded bg-muted" />
        <div className="h-3 w-2/5 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function ProductsSkeleton() {
  return (
    <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i}><ProductCardSkeleton /></li>
      ))}
    </ul>
  );
}
