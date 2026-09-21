// features/stores/components/product-detail/AddToCartBar.tsx
"use client";

import { useTranslations } from "next-intl";
import { formatPrice } from "@/shared/lib/format";

interface AddToCartBarProps {
  price: number;
  inStock: boolean;
  canAdd: boolean;
  isAdding: boolean;
  quantity: number;
  maxQuantity?: number;
  onQuantityChange: (value: number) => void;
  onAdd: () => void;
}

export function AddToCartBar({
  price,
  inStock,
  canAdd,
  isAdding,
  quantity,
  maxQuantity,
  onQuantityChange,
  onAdd,
}: AddToCartBarProps) {
  const t = useTranslations("productDetail");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* Quantity stepper */}
        <div
          role="group"
          aria-label={t("quantityLabel")}
          className="flex shrink-0 items-center rounded-full border border-border"
        >
          <StepperButton
            label={t("decrease")}
            disabled={quantity <= 1 || !inStock}
            onClick={() => onQuantityChange(quantity - 1)}
          >
            −
          </StepperButton>

          <output className="min-w-8 select-none text-center text-sm font-semibold tabular-nums" dir="ltr">
            {quantity}
          </output>

          <StepperButton
            label={t("increase")}
            disabled={!inStock || (maxQuantity !== undefined && quantity >= maxQuantity)}
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </StepperButton>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onAdd}
          disabled={!inStock || !canAdd || isAdding}
          aria-live="polite"
          className={[
            "flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98]",
            inStock
              ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              : "cursor-not-allowed bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {isAdding ? (
            <SpinnerIcon />
          ) : (
            <>
              <span>{inStock ? t("addToCart") : t("outOfStock")}</span>
              {inStock && (
                <span className="opacity-90" dir="ltr">
                  {formatPrice(price)}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StepperButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-lg font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
