// features/addresses/components/empty.tsx
import Link from "next/link";

export default function AddressesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl">📍</div>
      <p className="text-sm font-medium">No addresses yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Add your first delivery address
      </p>
      <Link
        href="/addresses/add"
        className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
      >
        Add address
      </Link>
    </div>
  );
}