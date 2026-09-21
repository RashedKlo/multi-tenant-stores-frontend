"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import type { PagedStores } from "@/features/modules/types";
import { StoreCard } from "./StoreCard";
import { StoreCardSkeleton } from "./skeleton";

interface StoresClientProps {
  initialData: PagedStores;
  moduleId: string;
  categoryId?: string;
  search?: string;
}

export function StoresClient({ initialData }: StoresClientProps) {
  const t = useTranslations("stores");
  const [data] = useState<PagedStores>(initialData);
  const [isPending, startTransition] = useTransition();

  const hasNext = data.items.length < data.totalCount;

  const handleLoadMore = () => {
    if (!hasNext || isPending) return;

    startTransition(async () => {
      // const next = await getStoresByModule({
      //   moduleId,
      //   page: data.page + 1,
      //   pageSize: data.pageSize,
      //   categoryId,
      //   search,
      // });

      // setData((prev) => ({
      //   ...next,
      //   items: [...prev.items, ...next.items], // dedupe server-side if needed
      // }));
    });
  };

  return (
    <section aria-labelledby="stores-heading">
      <header className="mb-4 flex items-baseline justify-between">
        <h2 id="stores-heading" className="text-base font-semibold tracking-tight sm:text-lg">
          {t("title")}
        </h2>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {t("resultsCount", { count: data.totalCount })}
        </p>
      </header>

      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.items.map((store) => (
          <li key={store.id}>
            <StoreCard store={store} />
          </li>
        ))}

        {/* Skeleton placeholders while loading more */}
        {isPending &&
          Array.from({ length: Math.min(data.pageSize, 5) }, (_, i) => (
            <li key={`sk-${i}`}>
              <StoreCardSkeleton />
            </li>
          ))}
      </ul>

      {hasNext && (
        <footer className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="rounded-full border border-border bg-background px-8 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            {isPending ? t("loading") : t("loadMore")}
          </button>
        </footer>
      )}
    </section>
  );
}
