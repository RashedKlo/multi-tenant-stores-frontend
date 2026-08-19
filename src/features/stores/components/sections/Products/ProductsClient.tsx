// features/stores/components/sections/Products/ProductsClient.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { PagedProducts } from "@/features/stores/types";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

interface ProductsClientProps {
  initialData: PagedProducts;
  sectionId: string;
  storeId: string;
  initialInStockOnly?: boolean;
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export function ProductsClient({
  initialData,
  sectionId,
  storeId,
  initialInStockOnly = false,
  initialMinPrice,
  initialMaxPrice,
}: ProductsClientProps) {
  const router = useRouter();
  const path=usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState(initialData);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const inStockOnly = searchParams.get("inStockOnly") === "true";
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;

  const updateFilters = (updates: {
    inStockOnly?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.inStockOnly !== undefined) {
      if (updates.inStockOnly) params.set("inStockOnly", "true");
      else params.delete("inStockOnly");
    }

    if ("minPrice" in updates) {
      if (updates.minPrice !== undefined)
        params.set("minPrice", String(updates.minPrice));
      else params.delete("minPrice");
    }

    if ("maxPrice" in updates) {
      if (updates.maxPrice !== undefined)
        params.set("maxPrice", String(updates.maxPrice));
      else params.delete("maxPrice");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleLoadMore = async () => {
    if (!data.hasNextPage || isLoadingMore) return;

      const params = new URLSearchParams({
        page: String(data.page + 1),
        pageSize: String(data.pageSize),
      });

      if (inStockOnly) params.set("inStockOnly", "true");
      if (minPrice !== undefined) params.set("minPrice", String(minPrice));
      if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
      router.replace(`${path}?${params.toString()}`,{scroll:false});

      
  };

  return (
    <section className="space-y-4">
      {/* Header + count */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Products</h2>
        <span className="text-xs text-muted-foreground">
          {data.totalCount} items
        </span>
      </div>

      {/* Filters */}
      <ProductFilters
        inStockOnly={inStockOnly}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onInStockChange={(value) => updateFilters({ inStockOnly: value })}
        onPriceChange={(min, max) =>
          updateFilters({ minPrice: min, maxPrice: max })
        }
        onReset={() => {
          startTransition(() => {
            router.push("?", { scroll: false });
          });
        }}
      />

      {/* Grid */}
      <div
        className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${
          isPending ? "opacity-60" : ""
        }`}
      >
        {data.items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            storeId={storeId}
          />
        ))}
      </div>

      {/* Load more */}
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
    </section>
  );
}