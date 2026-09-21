// features/stores/components/sections/StoreHeader/StoreHeaderClient.tsx
"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { useTranslations } from "next-intl";

import type { StoreDetail } from "@/features/stores/types";
import { toggleFavoriteStore } from "@/features/favorites/actions";
import { Notification } from "@/shared/lib/ui/Notification";
import { HeartIcon, PhoneIcon, StarIcon } from "@/features/stores/constants/icons";

interface StoreHeaderClientProps {
  store: StoreDetail;
}

export function StoreHeaderClient({ store }: StoreHeaderClientProps) {
  const t = useTranslations("storeHeader");
  const tError = useTranslations();
  const [error, setError] = useState<string | null>(null);

  const [isFavorite, setIsFavorite] = useState(store.isFavorite ?? false);

  const handleToggleFavorite = () => {
    setError(null);
    const previousFavorite = isFavorite;
    setIsFavorite(!previousFavorite);

    startTransition(async () => {
      const result = await toggleFavoriteStore({ storeId: store.id, isFavorite: previousFavorite });
      if (!result.success) {
        setIsFavorite(previousFavorite);
        setError(tError(result.error ));
        return;
      }
    });
  };

  return (
    <header className="space-y-4">
      {/* Cover */}
      {store.bannerUrl && (
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60">
          <Image
            src={store.bannerUrl}
            alt=""
            fill
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Info row */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Logo */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-linear-to-br from-primary/10 to-muted shadow-sm sm:h-20 sm:w-20">
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


