// features/favorites/components/sections/FavoriteStores/FavoriteStoreCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { FavoriteStore } from "@/features/favorites/types";

interface FavoriteStoreCardProps {
  store: FavoriteStore;
  onRemove: (storeId: string) => void;
}

export function FavoriteStoreCard({ store, onRemove }: FavoriteStoreCardProps) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:shadow-md">
      <Link
        href={`/stores/${store.storeId}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={store.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
              {store.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{store.name}</h3>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-medium text-foreground">
              {store.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => onRemove(store.storeId)}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500 active:scale-95"
        aria-label="Remove from favorites"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
}