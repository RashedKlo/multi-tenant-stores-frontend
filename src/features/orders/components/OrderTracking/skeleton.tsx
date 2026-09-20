// src/features/orders/components/sections/OrderTracking/skeleton.tsx
export function OrderTrackingSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="h-40 w-full animate-pulse rounded-2xl bg-muted" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}