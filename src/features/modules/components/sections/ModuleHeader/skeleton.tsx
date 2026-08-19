// features/modules/components/sections/ModuleHeader/skeleton.tsx
export default function ModuleHeaderSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 animate-pulse rounded-2xl bg-muted" />
      <div className="space-y-2">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}