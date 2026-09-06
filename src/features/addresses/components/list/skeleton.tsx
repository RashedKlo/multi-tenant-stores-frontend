// features/addresses/components/skeleton.tsx
export default function AddressesSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="h-24 animate-pulse rounded-2xl bg-muted/60"
        />
      ))}
    </ul>
  );
}