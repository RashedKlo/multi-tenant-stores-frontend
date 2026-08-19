// features/favorites/components/sections/FavoriteProducts/FavoriteProductsClient.tsx
"use client";

import { useState } from "react";
import type { PagedFavoriteProducts } from "@/features/favorites/types";
import { FavoriteProductCard } from "./FavoriteProductCard";

interface FavoriteProductsClientProps {
  initialData: PagedFavoriteProducts;
}

export function FavoriteProductsClient({
  initialData,
}: FavoriteProductsClientProps) {
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleRemove = async (productId: string) => {
    // Optimistic update
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((p) => p.productId !== productId),
      totalCount: prev.totalCount - 1,
    }));

    const success =null;
    if (!success) {
      // Revert on failure (optional – you can refetch instead)
      setData(initialData);
    }
  };

  const handleLoadMore = async () => {
    if (!data.hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const params = new URLSearchParams({
        page: String(data.page + 1),
        pageSize: String(data.pageSize),
      });

      const res = await fetch(`/api/favorites/products?${params}`);
      const nextPage: PagedFavoriteProducts = await res.json();

      setData((prev) => ({
        ...nextPage,
        items: [...prev.items, ...nextPage.items],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-3">
      {data.items.map((product) => (
        <FavoriteProductCard
          key={product.productId}
          product={product}
          onRemove={handleRemove}
        />
      ))}

      {data.hasNextPage && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}