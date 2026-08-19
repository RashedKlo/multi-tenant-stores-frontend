// features/stores/components/sections/Products/ProductFilters.tsx
"use client";

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
  const hasActiveFilters =
    inStockOnly || minPrice !== undefined || maxPrice !== undefined;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* In stock toggle */}
      <button
        onClick={() => onInStockChange(!inStockOnly)}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${
          inStockOnly
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted"
        }`}
      >
        In stock only
      </button>

      {/* Quick price chips */}
      <button
        onClick={() => onPriceChange(0, 20)}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${
          minPrice === 0 && maxPrice === 20
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted"
        }`}
      >
        Under 20
      </button>

      <button
        onClick={() => onPriceChange(20, 50)}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${
          minPrice === 20 && maxPrice === 50
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted"
        }`}
      >
        20 – 50
      </button>

      <button
        onClick={() => onPriceChange(50, undefined)}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-95 ${
          minPrice === 50 && maxPrice === undefined
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background hover:bg-muted"
        }`}
      >
        50+
      </button>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}