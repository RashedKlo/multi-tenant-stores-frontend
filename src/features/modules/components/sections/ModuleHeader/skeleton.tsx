export default function ModuleHeaderSkeleton() {
  return (
    <header className="flex animate-pulse items-center gap-4" aria-hidden>
      <div className="h-14 w-14 shrink-0 rounded-2xl bg-muted" />
      <div className="space-y-2">
        <div className="h-5 w-40 rounded-md bg-muted" />
        <div className="h-3 w-24 rounded-md bg-muted" />
      </div>
    </header>
  );
}
