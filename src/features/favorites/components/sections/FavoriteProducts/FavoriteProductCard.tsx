// features/favorites/components/sections/FavoriteProducts/FavoriteProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { FavoriteProduct } from "@/features/favorites/types";

interface FavoriteProductCardProps {
  product: FavoriteProduct;
  onRemove: (productId: string) => void;
}

export function FavoriteProductCard({
  product,
  onRemove,
}: FavoriteProductCardProps) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all hover:shadow-md">
      <Link
        href={`/products/${product.productId}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
          {product.thumbnailUrl ? (
            <Image
              src={product.thumbnailUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
              {product.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{product.name}</h3>
          <div className="mt-0.5 flex items-center gap-2 text-xs">
            <span className="font-medium">{product.price.toFixed(2)} SAR</span>
            {!product.inStock && (
              <span className="text-red-500">Out of stock</span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={() => onRemove(product.productId)}
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