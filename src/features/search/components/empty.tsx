// features/search/components/empty.tsx
export default function SearchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-20 text-center">
      <div className="mb-3 text-4xl">📂</div>
      <p className="text-sm font-medium">No modules available</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Please try again later.
      </p>
    </div>
  );
}