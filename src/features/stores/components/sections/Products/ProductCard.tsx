// features/stores/components/sections/Products/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ProductSummary } from "@/features/stores/types";
import { formatPrice } from "@/shared/lib/format";

interface ProductCardProps {
  product: ProductSummary;
  storeId: string;
}

export function ProductCard({ product, storeId }: ProductCardProps) {
  const t = useTranslations("productCard");

  const comparePrice = product.comparePrice;
  const hasDiscount = comparePrice !== undefined && comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice! - product.price) / comparePrice!) * 100)
    : 0;



  return (
    <Link
      href={`/stores/${storeId}/products/${product.id}`}
      aria-label={product.name}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative aspect-square w-full bg-muted">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt=""
            fill
            quality={80}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 to-muted text-2xl font-bold text-muted-foreground"
 >
            {product.name.charAt(0)}
          </span>
        )}

        {/* Discount badge — end-side so it never covers RTL text flow */}
        {hasDiscount && (
          <span className="absolute inset-s-2 top-2 rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-danger-foreground">
            -{discountPercent}%
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div
            role="status"
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
          >
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <p className="mt-auto flex items-baseline gap-1.5">
          <span className="text-sm font-bold" dir="ltr">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <s className="text-xs text-muted-foreground" dir="ltr">
              {formatPrice(comparePrice!)}
            </s>
          )}
        </p>
      </div>
    </Link>
  );
}
