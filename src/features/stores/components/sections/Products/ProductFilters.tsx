// features/stores/components/sections/Products/ProductFilters.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FormField, ToggleChip } from "@/shared/lib/ui";
import { useDebouncedCallback } from "@/shared/hooks/use-debounced-callback";

interface ProductFiltersProps {
  inStockOnly: boolean;
  minPrice?: number;
  maxPrice?: number;
  onInStockChange: (value: boolean) => void;
  onPriceChange: (min?: number, max?: number) => void;
  onReset: () => void;
}

export function ProductFilters({
  inStockOnly,
  minPrice,
  maxPrice,
  onInStockChange,
  onPriceChange,
  onReset,
}: ProductFiltersProps) {
  const t = useTranslations("productFilters");

  // Local draft so typing feels instant; only commit (→ URL/refetch) after a pause.
  const [draftMin, setDraftMin] = useState(minPrice?.toString() ?? "");
  const [draftMax, setDraftMax] = useState(maxPrice?.toString() ?? "");

  // Stay in sync if filters are cleared externally (reset button / back nav).
  useEffect(() => {
    setDraftMin(minPrice?.toString() ?? "");
    setDraftMax(maxPrice?.toString() ?? "");
  }, [minPrice, maxPrice]);

  const commitPrice = useDebouncedCallback((min: string, max: string) => {
    const parsedMin = min === "" ? undefined : Number(min);
    const parsedMax = max === "" ? undefined : Number(max);
    onPriceChange(
      parsedMin !== undefined && !Number.isNaN(parsedMin) ? parsedMin : undefined,
      parsedMax !== undefined && !Number.isNaN(parsedMax) ? parsedMax : undefined,
    );
  }, 500);

  const handleMinChange = (value: string) => {
    setDraftMin(value);
    commitPrice(value, draftMax);
  };

  const handleMaxChange = (value: string) => {
    setDraftMax(value);
    commitPrice(draftMin, value);
  };

  const hasActiveFilters =
    inStockOnly || minPrice !== undefined || maxPrice !== undefined;

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      className="scrollbar-hide -mx-4 flex flex-col items-stretch gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-row sm:flex-wrap sm:items-center sm:overflow-visible sm:px-0"
    >
      <ToggleChip
        active={inStockOnly}
        onClick={() => onInStockChange(!inStockOnly)}
        aria-pressed={inStockOnly}
        className="w-full justify-center sm:w-auto"
      >
        {t("inStockOnly")}
      </ToggleChip>

      <div className="flex shrink-0 items-center gap-2 self-stretch sm:self-auto">
        <FormField
        label=""
          type="number"
          inputMode="decimal"
          placeholder={t("price.min")}
          aria-label={t("price.minLabel")}
          value={draftMin}
          onChange={(e) => handleMinChange(e.target.value)}
          className="w-full min-w-0 flex-1 rounded-full border border-border bg-card px-2 py-1.5 text-xs tabular-nums shadow-none sm:w-16 sm:flex-none"
        />
        <span className="text-xs text-muted-foreground">–</span>
        <FormField
        label=""
          type="number"
          inputMode="decimal"
          placeholder={t("price.max")}
          aria-label={t("price.maxLabel")}
          value={draftMax}
          onChange={(e) => handleMaxChange(e.target.value)}
          className="w-full min-w-0 flex-1 rounded-full border border-border bg-card px-2 py-1.5 text-xs tabular-nums shadow-none sm:w-16 sm:flex-none"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            setDraftMin("");
            setDraftMax("");
            onReset();
          }}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
        >
          {t("reset")}
        </button>
      )}
    </div>
  );
}