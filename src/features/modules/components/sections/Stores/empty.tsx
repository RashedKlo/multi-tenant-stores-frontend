// features/modules/components/sections/Stores/empty.tsx
export default function StoresEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl">🏪</div>
      <p className="text-sm font-medium text-foreground">No stores found</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Try changing the category or search term
      </p>
    </div>
  );
}