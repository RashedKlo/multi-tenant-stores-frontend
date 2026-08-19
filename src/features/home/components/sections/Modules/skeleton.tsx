export default function ModulesSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 p-2">
          <div className="h-14 w-14 animate-pulse rounded-2xl bg-muted" />
          <div className="h-3 w-10 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}