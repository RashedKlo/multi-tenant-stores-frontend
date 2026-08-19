// features/modules/components/sections/Stores/StoreCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoreSummary } from "@/features/modules/types";

interface StoreCardProps {
  store: StoreSummary;
}

/**
 * Clean, high-density store card.
 * Optimized for both mobile grid and desktop.
 */
export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link
      href={`/stores/${store.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all active:scale-[0.98] hover:shadow-md"
    >
      {/* Logo / Image */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        {store.logoUrl ? (
          <Image
            src={store.logoUrl}
            alt={store.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
            {store.name.charAt(0)}
          </div>
        )}

        {/* Favorite indicator (if present) */}
        {store.isFavorite && (
          <div className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-sm">
            <svg
              className="h-4 w-4 fill-red-500 text-red-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight">
          {store.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="font-medium text-foreground">
            {store.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}