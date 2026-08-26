// features/stores/components/sections/Products/ProductFilters.tsx
"use client";

import { useTranslations } from "next-intl";

interface ProductFiltersProps {
  inStockOnly: boolean;
  minPrice?: number;
  maxPrice?: number;
  onInStockChange: (value: boolean) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onReset: () => void;
}

const PRICE_RANGES = [
  { id: "under20", min: 0, max: 20 },
  { id: "range20_50", min: 20, max: 50 },
  { id: "over50", min: 50, max: undefined },
] as const;

export function ProductFilters({
  inStockOnly,
  minPrice,
  maxPrice,
  onInStockChange,
  onPriceChange,
  onReset,
}: ProductFiltersProps) {
  const t = useTranslations("productFilters");

  const chip = (active: boolean) =>
    [
      "rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 active:scale-95",
      active
        ? "border-transparent bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card hover:border-primary/40 hover:bg-muted",
    ].join(" ");

  const hasActiveFilters =
    inStockOnly || minPrice !== undefined || maxPrice !== undefined;

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      className="scrollbar-hide -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      <button
        type="button"
        onClick={() => onInStockChange(!inStockOnly)}
        aria-pressed={inStockOnly}
        className={chip(inStockOnly)}
      >
        {t("inStockOnly")}
      </button>

      {PRICE_RANGES.map((range) => {
        const isActive = minPrice === range.min && maxPrice === range.max;
        return (
          <button
            key={range.id}
            type="button"
            onClick={() =>
              isActive ? onReset() : onPriceChange(range.min, range.max)
            }
            aria-pressed={isActive}
            className={chip(isActive)}
          >
            {t(`price.${range.id}`)}
          </button>
        );
      })}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
        >
          {t("reset")}
        </button>
      )}
    </div>
  );
}
