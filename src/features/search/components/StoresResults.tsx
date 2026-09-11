// features/search/components/StoresResults.tsx
"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PagedStores } from "@/features/search/types";
import { StoreCard } from "./StoreCard";
import { SearchInput } from "./SearchInput";

interface StoresResultsProps {
  moduleId: string;
  initialQuery: string;
  initialData: PagedStores;
}

export function StoresResults({
  moduleId,
  initialQuery,
  initialData,
}: StoresResultsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("moduleId", moduleId);

    if (draftQuery.trim()) {
      params.set("search", draftQuery.trim());
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
    setQuery(draftQuery.trim());
  };

  const handleLoadMore = useCallback(async () => {
    if (!data.hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const params = new URLSearchParams({
        page: String(data.pageNumber + 1),
        pageSize: String(data.pageSize),
      });
      if (query) params.set("search", query);

      const res = await fetch(
        `/api/modules/${moduleId}/stores?${params.toString()}`
      );
      const nextPage: PagedStores = await res.json();

      setData((prev) => ({
        ...nextPage,
        items: [...prev.items, ...nextPage.items],
      }));
    } catch (err) {
      console.error("Load more failed", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [ ]);

  return (
    <div className="space-y-4">
      <SearchInput
        value={draftQuery}
        onChange={setDraftQuery}
        onSearch={handleSearch}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data.totalCount} stores found
        </p>
      </div>

      <div
        className={`space-y-2 transition-opacity ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        {data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
            <div className="mb-3 text-4xl">🔍</div>
            <p className="text-sm font-medium">No stores found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search or module
            </p>
          </div>
        ) : (
          data.items.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))
        )}
      </div>

      {data.hasNextPage && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}