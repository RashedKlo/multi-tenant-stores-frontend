// src/features/orders/components/sections/OrderDetail/skeleton.tsx
export function OrderDetailSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
      <div className="h-32 animate-pulse rounded-2xl bg-muted" />
      <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      <div className="h-24 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}