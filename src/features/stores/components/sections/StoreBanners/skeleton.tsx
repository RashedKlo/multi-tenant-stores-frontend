// features/stores/components/sections/StoreBanners/skeleton.tsx
export default function StoreBannersSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <div className="aspect-16/6 w-full animate-pulse bg-muted" />
    </div>
  );
}