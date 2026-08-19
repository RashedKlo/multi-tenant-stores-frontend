// features/stores/components/sections/StoreSections/empty.tsx
export default function StoreSectionsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl">📋</div>
      <p className="text-sm font-medium">No sections available</p>
      <p className="mt-1 text-xs text-muted-foreground">
        This store hasn&apos;t added any sections yet.
      </p>
    </div>
  );
}