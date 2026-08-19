// features/modules/components/sections/Stores/StoresClient.tsx
"use client";

import { useState } from "react";
import type { PagedStores } from "@/features/modules/types";
import { StoreCard } from "./StoreCard";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface StoresClientProps {
  initialData: PagedStores;
  moduleId: string;
  categoryId?: string;
  search?: string;
}

/**
 * Stores grid with "Load more" support.
 * Ready for infinite scroll upgrade later.
 */
export function StoresClient({
  initialData,
  moduleId,
  categoryId,
  search,
}: StoresClientProps) {
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleLoadMore = async () => {
    if (!data.hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    
      const params = new URLSearchParams({
        page: String(data.page + 1),
        pageSize: String(data.pageSize),
      });
      if (categoryId) params.set("categoryId", categoryId);
      if (search) params.set("search", search);

    setIsLoadingMore(true);
      replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Stores</h2>
        <span className="text-xs text-muted-foreground">
          {data.totalCount} results
        </span>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.items.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {/* Load more */}
      {data.hasNextPage && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
}