// features/cart/components/sections/CartSummary/index.tsx
"use client";

import { CartSummary } from "./CartSummary";
export default CartSummary;
export { CartSummary };

// skeleton.tsx for summary
export function SummarySkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-2xl border border-border/60 bg-card p-4" aria-hidden>
      <div className="h-4 w-24 rounded bg-muted" />
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
      <div className="h-11 w-full rounded-full bg-muted" />
    </div>
  );
}
