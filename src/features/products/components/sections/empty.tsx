// features/stores/components/product-detail/empty.tsx
export default function ProductDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-20 text-center">
      <div className="mb-3 text-4xl">📦</div>
      <p className="text-sm font-medium">Product not found</p>
      <p className="mt-1 text-xs text-muted-foreground">
        This product may have been removed.
      </p>
    </div>
  );
}