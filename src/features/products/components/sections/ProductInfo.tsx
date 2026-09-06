// features/stores/components/product-detail/ProductInfo.tsx
"use client";

import { startTransition, useState } from "react";
import { useTranslations } from "next-intl";

import type { ProductDetail } from "@/features/products/types";
import { toggleFavoriteProduct } from "@/features/favorites/actions";
import { formatPrice } from "@/shared/lib/format";
import { Notification } from "@/shared/lib/ui/Notification";

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations("productInfo");
  const tAuth = useTranslations("auth");
  const [error, setError] = useState<string | null>(null);

  const [isFavorite, setIsFavorite] = useState(product.isFavorite ?? false);

  const handleToggleFavorite = () => {
    setError(null);
    const previousFavorite = isFavorite;
    setIsFavorite(!previousFavorite);

    startTransition(async () => {
      const result = await toggleFavoriteProduct(product.id, previousFavorite);
      if (!result.success) {
        setIsFavorite(previousFavorite);
        setError(tAuth(result.error as Parameters<typeof tAuth>[0]));
        return;
      }
    });
  };

  const hasDiscount =
    product.comparePrice !== undefined && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const lowStock =
    product.inStock &&
    product.stockQuantity !== undefined &&
    product.stockQuantity <= 5;

  return (
    <div className="space-y-3">
      {/* Name + favorite */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="min-w-0 text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          {product.name}
        </h1>

        {product.isFavorite !== undefined && (
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
            className="shrink-0 rounded-full p-2 transition-transform hover:bg-muted active:scale-90"
          >
            <HeartIcon filled={isFavorite} />
          </button>
        )}
      </div>

      {error && <Notification message={error} onDismiss={() => setError(null)} />}

      {/* Price row */}
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1" dir="ltr">
        <span className="text-2xl font-bold tracking-tight">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <s className="text-sm text-muted-foreground">
              {formatPrice(product.comparePrice!)}
            </s>
            <span
              className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger"
              aria-label={t("discountLabel", { percent: discountPercent })}
            >
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock status */}
      <p
        role="status"
        className={
          product.inStock
            ? "text-sm font-medium text-success dark:text-green-500"
            : "text-sm font-medium text-danger"
        }
      >
        {product.inStock
          ? lowStock
            ? t("lowStock", { count: product.stockQuantity! })
            : t("inStock")
          : t("outOfStock")}
      </p>

      {product.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      className={`h-5 w-5 transition-colors ${
        filled ? "fill-red-500 text-red-500" : "fill-none text-muted-foreground"
      }`}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
