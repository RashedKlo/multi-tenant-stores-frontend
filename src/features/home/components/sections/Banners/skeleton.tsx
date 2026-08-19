export default function BannerSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[16/8] w-[92vw] shrink-0 animate-pulse rounded-2xl bg-muted sm:w-[60vw] lg:w-[45vw]"
        />
      ))}
    </div>
  );
}