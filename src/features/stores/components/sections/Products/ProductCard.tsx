// features/stores/components/sections/Products/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/features/stores/types";

interface ProductCardProps {
  product: ProductSummary;
  storeId: string;
}

export function ProductCard({ product, storeId }: ProductCardProps) {
  const hasDiscount =
    product.comparePrice !== undefined &&
    product.comparePrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.comparePrice! - product.price) / product.comparePrice!) * 100
      )
    : 0;

  return (
    <Link
      href={`/stores/${storeId}/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all active:scale-[0.98] hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-square w-full bg-muted">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
            {product.name.charAt(0)}
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-1.5">
          <span className="text-sm font-bold">
            {product.price.toFixed(2)} SAR
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {product.comparePrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}