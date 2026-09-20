// src/features/orders/components/sections/Orders/skeleton.tsx
export function OrdersSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
      ))}
    </ul>
  );
}