// features/stores/components/sections/StoreHeader/skeleton.tsx
export default function StoreHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-[21/9] w-full animate-pulse rounded-2xl bg-muted" />
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}