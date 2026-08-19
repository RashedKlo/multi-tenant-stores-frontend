// features/stores/components/sections/StoreHeader/StoreHeaderClient.tsx
"use client";

import Image from "next/image";
import type { StoreDetail } from "@/features/stores/types";

interface StoreHeaderClientProps {
  store: StoreDetail;
}

export function StoreHeaderClient({ store }: StoreHeaderClientProps) {
  return (
    <header className="space-y-4">
      {/* Banner / Cover */}
      {store.bannerUrl && (
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={store.bannerUrl}
            alt={store.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Info row */}
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={store.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground">
              {store.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold leading-tight">{store.name}</h1>

            {/* Favorite button placeholder */}
            {store.isFavorite !== undefined && (
              <button
                className="rounded-full p-2 transition-colors hover:bg-muted active:scale-95"
                aria-label={store.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg
                  className={`h-5 w-5 ${
                    store.isFavorite
                      ? "fill-red-500 text-red-500"
                      : "fill-none text-muted-foreground"
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            )}
          </div>

          {/* Rating + phone */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-medium text-foreground">
                {store.rating.toFixed(1)}
              </span>
            </div>

            {store.phone && (
              <a
                href={`tel:${store.phone}`}
                className="hover:text-foreground transition-colors"
              >
                {store.phone}
              </a>
            )}
          </div>

          {store.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {store.description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}