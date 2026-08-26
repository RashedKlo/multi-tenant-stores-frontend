const WIDTHS = ["w-20", "w-28", "w-16", "w-24", "w-20"];

export default function CategoriesSkeleton() {
  return (
    <div aria-hidden className="mb-2 space-y-3">
      <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
      <div className="flex gap-2 overflow-hidden">
        {WIDTHS.map((w, i) => (
          <div key={i} className={`h-9 {w} animate-pulse rounded-full bg-muted`} style={{ animationDelay: `{i * 120}ms` }} />
        ))}
      </div>
    </div>
  );
}
