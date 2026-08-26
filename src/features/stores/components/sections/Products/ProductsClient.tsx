// features/stores/components/sections/Products/ProductsClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import type { PagedProducts } from "@/features/stores/types";
// import { getProductsBySection } from "@/features/stores/api"; // accepts filters + pagination
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductCardSkeleton } from "./skeleton";

interface ProductsClientProps {
  initialData: PagedProducts;
  sectionId: string;
  storeId: string;
}

export function ProductsClient({
  initialData,
  sectionId,
  storeId,
}: ProductsClientProps) {
  const t = useTranslations("products");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition(); // for URL updates only

  const [data, setData] = useState<PagedProducts>(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filters live in the URL — single source of truth
  const inStockOnly = searchParams.get("inStockOnly") === "true";
  const minPrice = numParam(searchParams.get("minPrice"));
  const maxPrice = numParam(searchParams.get("maxPrice"));

  /** Filter changes → URL → server re-renders page 1 (fresh initialData). */
  const updateFilters = (updates: {
    inStockOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // any filter change resets pagination

    if ("inStockOnly" in updates) {
      updates.inStockOnly
        ? params.set("inStockOnly", "true")
        : params.delete("inStockOnly");
    }
    if ("minPrice" in updates) {
      updates.minPrice !== undefined
        ? params.set("minPrice", String(updates.minPrice))
        : params.delete("minPrice");
    }
    if ("maxPrice" in updates) {
      updates.maxPrice !== undefined
        ? params.set("maxPrice", String(updates.maxPrice))
        : params.delete("maxPrice");
    }

    startTransition(() => {
      router.push(`?${params}`, { scroll: false });
    });
  };

  /**
   * Load more → CLIENT fetch + append.
   * No navigation: keeps scroll position and avoids re-fetching page 1.
   */
  const handleLoadMore = async () => {
    if (!data.hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      // const next = await getProductsBySection({
      //   sectionId,
      //   page: data.page + 1,
      //   pageSize: data.pageSize,
      //   inStockOnly,
      //   minPrice,
      //   maxPrice,
      // });

      // setData((prev) => ({
      //   ...next,
      //   items: [...prev.items, ...dedupeById(prev.items, next.items)],
      // }));
    } catch {
      router.refresh(); // graceful fallback: let the server retry
    } finally {
      setIsLoadingMore(false);
    }
  };

  const resetToFirstPage = () => setData(initialData); // cheap guard if needed

  return (
    <section aria-labelledby="products-heading" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="products-heading" className="text-base font-semibold tracking-tight sm:text-lg">
          {t("title")}
        </h2>
        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
          {t("count", { count: data.totalCount })}
        </span>
      </div>

      <ProductFilters
        inStockOnly={inStockOnly}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onInStockChange={(v) => updateFilters({ inStockOnly: v })}
        onPriceChange={(min, max) => updateFilters({ minPrice: min, maxPrice: max })}
        onReset={() => updateFilters({ inStockOnly: false, minPrice: undefined, maxPrice: undefined })}
      />

      <ul
        role="list"
        className={`grid grid-cols-2 gap-3 transition-opacity duration-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${
          isLoadingMore ? "" : ""
        }`}
      >
        {data.items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} storeId={storeId} />
          </li>
        ))}

        {isLoadingMore &&
          Array.from({ length: Math.min(data.pageSize, 5) }, (_, i) => (
            <li key={`sk-${i}`}>
              <ProductCardSkeleton />
            </li>
          ))}
      </ul>

      {data.hasNextPage && (
        <footer className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="rounded-full border border-border bg-card px-8 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoadingMore ? t("loading") : t("loadMore")}
          </button>
        </footer>
      )}
    </section>
  );
}

/* ---------- helpers ---------- */

function numParam(value: string | null): number | undefined {
  if (value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function dedupeById<T extends { id: string }>(current: T[], incoming: T[]): T[] {
  const seen = new Set(current.map((i) => i.id));
  return incoming.filter((i) => !seen.has(i.id));
}
