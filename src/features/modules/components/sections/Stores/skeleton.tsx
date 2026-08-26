export function StoreCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border/60 p-3" aria-hidden>
      <div className="mx-auto h-16 w-16 rounded-full bg-muted" />
      <div className="mt-3 h-3 w-3/4 rounded-md bg-muted mx-auto" />
      <div className="mt-2 h-3 w-1/3 rounded-md bg-muted mx-auto" />
    </div>
  );
}

export default function StoresSkeleton() {
  return (
    <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i}><StoreCardSkeleton /></li>
      ))}
    </ul>
  );
}
