// features/favorites/components/sections/FavoriteStores/FavoriteStoresClient.tsx
"use client";

import { useState } from "react";
import type { PagedFavoriteStores } from "@/features/favorites/types";
import { FavoriteStoreCard } from "./FavoriteStoreCard";

interface FavoriteStoresClientProps {
  initialData: PagedFavoriteStores;
}

export function FavoriteStoresClient({
  initialData,
}: FavoriteStoresClientProps) {
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleRemove = async (storeId: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((s) => s.storeId !== storeId),
      totalCount: prev.totalCount - 1,
    }));

    const success = null;
    if (!success) {
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

      const res = await fetch(`/api/favorites/stores?${params}`);
      const nextPage: PagedFavoriteStores = await res.json();

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
      {data.items.map((store) => (
        <FavoriteStoreCard
          key={store.storeId}
          store={store}
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