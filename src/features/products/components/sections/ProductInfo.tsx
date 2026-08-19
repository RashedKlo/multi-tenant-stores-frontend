// features/stores/components/product-detail/ProductInfo.tsx
"use client";

import type { ProductDetail } from "@/features/products/types";

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount =
    product.comparePrice !== undefined &&
    product.comparePrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.comparePrice! - product.price) / product.comparePrice!) * 100
      )
    : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-xl font-bold leading-tight">{product.name}</h1>

        {/* Favorite */}
        {product.isFavorite !== undefined && (
          <button
            className="rounded-full p-2 transition-colors hover:bg-muted active:scale-95"
            aria-label={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`h-5 w-5 ${
                product.isFavorite
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

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">
          {product.price.toFixed(2)} SAR
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm text-muted-foreground line-through">
              {product.comparePrice!.toFixed(2)}
            </span>
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-600">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="text-sm">
        {product.inStock ? (
          <span className="text-green-600">
            In stock
            {product.stockQuantity !== undefined &&
              product.stockQuantity <= 5 && (
                <span className="text-muted-foreground">
                  {" "}
                  · Only {product.stockQuantity} left
                </span>
              )}
          </span>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </div>

      {product.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}
    </div>
  );
}