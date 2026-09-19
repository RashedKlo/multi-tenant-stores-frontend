// src/features/profile/components/sections/Profile/skeleton.tsx
export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6 md:py-10" aria-hidden>
      <div className="h-24 animate-pulse rounded-2xl bg-muted" />
      <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      <div className="h-16 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}