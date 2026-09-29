import Image from "next/image";
import Link from "next/link";
import type { NewStore } from "@/features/home/types/home.types";

export function StoreCard({ store }: { store: NewStore }) {
  return (
    <Link
      href={`/stores/${store.id}`}
      className="flex w-40 shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-muted">
        {store.logoUrl ? (
          <Image src={store.logoUrl} alt={store.name} fill className="object-cover" unoptimized />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
            {store.name.charAt(0)}
          </span>
        )}
      </div>

      <p className="line-clamp-1 text-sm font-semibold">{store.name}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          New
        </span>
      </div>
    </Link>
  );
}
