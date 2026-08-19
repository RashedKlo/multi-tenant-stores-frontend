// features/stores/components/sections/StoreHeader/empty.tsx
export default function StoreHeaderEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 p-8 text-center">
      <p className="text-sm font-medium">Store not found</p>
      <p className="mt-1 text-xs text-muted-foreground">
        This store may have been removed or is temporarily unavailable.
      </p>
    </div>
  );
}