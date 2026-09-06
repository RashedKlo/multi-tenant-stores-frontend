// features/stores/components/sections/StoreHeader/StoreHeaderClient.tsx
"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { useTranslations } from "next-intl";

import type { StoreDetail } from "@/features/stores/types";
import { toggleFavoriteStore } from "@/features/favorites/actions";
import { Notification } from "@/shared/lib/ui/Notification";

interface StoreHeaderClientProps {
  store: StoreDetail;
}

export function StoreHeaderClient({ store }: StoreHeaderClientProps) {
  const t = useTranslations("storeHeader");
  const tAuth = useTranslations("auth");
  const [error, setError] = useState<string | null>(null);

  const [isFavorite, setIsFavorite] = useState(store.isFavorite ?? false);

  const handleToggleFavorite = () => {
    setError(null);
    const previousFavorite = isFavorite;
    setIsFavorite(!previousFavorite);

    startTransition(async () => {
      const result = await toggleFavoriteStore(store.id, previousFavorite);
      if (!result.success) {
        setIsFavorite(previousFavorite);
        setError(tAuth(result.error as Parameters<typeof tAuth>[0]));
        return;
      }
    });
  };

  return (
    <header className="space-y-4">
      {/* Cover */}
      {store.bannerUrl && (
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60">
          <Image
            src={store.bannerUrl}
            alt=""
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Info row */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Logo */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-muted shadow-sm sm:h-20 sm:w-20">
          {store.logoUrl ? (
            <Image src={store.logoUrl} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <span
              aria-hidden
              className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground"
            >
              {store.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h1 className="truncate text-xl font-bold leading-tight tracking-tight sm:text-2xl">
              {store.name}
            </h1>

            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
              className="shrink-0 rounded-full p-2 transition-transform hover:bg-muted active:scale-90"
            >
              <HeartIcon filled={isFavorite} />
            </button>
          </div>

          {/* Rating + phone */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <p
              className="flex items-center-1"
              aria-label={t("ratingLabel", { rating: store.rating })}
            >
              <StarIcon />
              <span className ="font-medium text-foreground">{store.rating.toFixed(1)}</span>
            </p>

            {store.phone && (
              <a
                href={`tel:${store.phone}`}
                dir="ltr" /* phone numbers stay LTR in Arabic too */
                className="flex items-center gap-1 transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                <PhoneIcon />
                {store.phone}
              </a>
            )}
          </div>

          {store.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {store.description}
            </p>
          )}
        </div>
      </div>

      {error && <Notification message={error} onDismiss={() => setError(null)} />}
    </header>
  );
}

/* ---------- Icons ---------- */

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className={`h-5 w-5 transition-colors ${filled ? "fill-red-500 text-red-500" : "fill-none text-muted-foreground"}`}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-amber-400" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
