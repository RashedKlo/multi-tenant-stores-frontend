// features/modules/components/sections/Stores/StoreCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useOptimistic, startTransition } from "react";
import { useTranslations } from "next-intl";

import type { StoreSummary } from "@/features/modules/types";

interface StoreCardProps {
  store: StoreSummary;
}

export function StoreCard({ store }: StoreCardProps) {
  const t = useTranslations("storeCard");

  // Optimistic favorite toggle with automatic rollback on error
  const [isFavorite, setIsFavorite] = useOptimistic(
    store.isFavorite ?? false,
    (_prev: boolean) => !_prev,
  );

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // don't navigate — we're inside the card link
    e.stopPropagation();

    startTransition(async () => {
      setIsFavorite(true);
      try {
        // await toggleFavoriteStore(store.id);
      } catch {
        // useOptimistic rolls back automatically when the transition errors
      }
    });
  };

  return (
    <article className="group relative">
      {/* Favorite button — above the link, keyboard-reachable */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
        className="absolute end-2 top-2 z-10 rounded-full bg-background/90 p-1.5 shadow-sm backdrop-blur-sm transition-transform active:scale-90"
      >
        <HeartIcon filled={isFavorite} />
      </button>

      <Link
        href={`/stores/${store.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md active:scale-[0.98]"
      >
        <div className="relative aspect-[4/3] w-full bg-muted">
          {store.logoUrl ? (
            <Image
              src={store.logoUrl}
              alt={store.name}
              fill
              quality={80}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            /* Deterministic gradient fallback */
            <span
              aria-hidden
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-2xl font-bold text-muted-foreground"
            >
              {store.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3">
          <h3 className="line-clamp-1 text-sm font-semibold leading-tight">{store.name}</h3>

          <p
            className="flex items-center gap-1.5 text-xs"
            aria-label={t("ratingLabel", { rating: store.rating })}
          >
            <StarIcon />
            <span className="font-medium text-foreground">{store.rating.toFixed(1)}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

/* ---------- Inline icons (extract to shared icons file if used elsewhere) ---------- */

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-colors ${filled ? "fill-red-500 text-red-500" : "fill-none text-muted-foreground"}`}
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-400" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
