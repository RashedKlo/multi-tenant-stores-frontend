"use client";

import { useCallback, useState  } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PagedStores } from "@/features/search/types";
import { StoreCard } from "./StoreCard";
import { SearchInput } from "./SearchInput";
import { StoresResultsEmpty } from "./empty";

interface StoresResultsProps {
  moduleId: string;
  initialQuery: string;
  initialData: PagedStores;
}

export function StoresResultsClient({
  moduleId,
  initialQuery,
  initialData,
}: StoresResultsProps) {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draftQuery, setDraftQuery] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

      const response = await fetch(
        `/api/modules/${moduleId}/stores?${params.toString()}`,
      );
      const nextPage: PagedStores = await response.json();

      setData((prev) => ({
        ...nextPage,
        items: [...prev.items, ...nextPage.items],
      }));
    } catch (error) {
      console.error("Load more failed", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [data, isLoadingMore, moduleId, query]);

  return (
    <div className="space-y-4">
      <SearchInput
        value={draftQuery}
        onChange={setDraftQuery}
        onSearch={handleSearch}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("storesFound", { count: data.totalCount })}
        </p>
      </div>

      <div
        className={`space-y-2 transition-opacity `}
      >
        {data.items.length === 0 ? (
          <StoresResultsEmpty />
        ) : (
          data.items.map((store) => <StoreCard key={store.id} store={store} />)
        )}
      </div>

      {data.hasNextPage && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isLoadingMore ? t("loading") : t("loadMore")}
          </button>
        </div>
      )}
    </div>
  );
}