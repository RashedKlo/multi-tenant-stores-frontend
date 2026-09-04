"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { PagedProducts } from "@/features/stores/types";
// import { getProductsBySection } from "@/features/stores/api";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductCardSkeleton } from "./skeleton";

interface ProductsClientProps {
  initialData: PagedProducts;
  sectionId: string;
  storeId: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export function ProductsClient({
  initialData,
  sectionId,
  storeId,
  inStockOnly = false,
  minPrice,
  maxPrice,
}: ProductsClientProps) {
  const t = useTranslations("products");
  const router = useRouter();
  const pathname = usePathname();

  // Fresh on every filter change because of Suspense key → remount
  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const updateFilters = (updates: {
    inStockOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams();

    const nextInStock =
      "inStockOnly" in updates ? updates.inStockOnly : inStockOnly;
    const nextMin = "minPrice" in updates ? updates.minPrice : minPrice;
    const nextMax = "maxPrice" in updates ? updates.maxPrice : maxPrice;

    if (nextInStock) params.set("inStockOnly", "true");
    if (nextMin !== undefined) params.set("minPrice", String(nextMin));
    if (nextMax !== undefined) params.set("maxPrice", String(nextMax));
    // page intentionally omitted → always page 1 on filter change

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

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
      router.refresh();
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section aria-labelledby="products-heading" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="products-heading"
          className="text-base font-semibold tracking-tight sm:text-lg"
        >
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
        onPriceChange={(min, max) =>
          updateFilters({ minPrice: min, maxPrice: max })
        }
        onReset={() =>
          updateFilters({
            inStockOnly: false,
            minPrice: undefined,
            maxPrice: undefined,
          })
        }
      />

      <ul
        role="list"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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

