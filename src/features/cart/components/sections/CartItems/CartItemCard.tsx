// features/cart/components/sections/CartItems/CartItemCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import type { LocalizedCartItem } from "@/features/cart/types";
import { formatCartPrice } from "@/features/cart/lib/cart-helpers";
import { MinusIcon, PlusIcon, TrashIcon } from "./icons";
// features/cart/components/sections/CartItems/icons.tsx
const base = "h-4 w-4";

export const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" className={base} aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" className={base} aria-hidden>
    <path d="M5 12h14" />
  </svg>
);

export const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={`${base} h-[18px] w-[18px]`} aria-hidden>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </svg>
);

interface CartItemCardProps {
  item: LocalizedCartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const t = useTranslations("cart");
  const locale = useLocaleSafe(); // see note below — or pass locale as prop

  return (
    <article className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4">
      {/* Thumbnail */}
      <Link
        href={`/stores/item.productId/products/{item.productId}/products/item.productId/products/{item.productId}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24"
        tabIndex={-1}
        aria-hidden
      >
        {/* If your CartItemDto gains imageUrl later, render it here; fallback letter keeps layout stable */}
        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
          {item.name.charAt(0)}
        </span>
      </Link>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.productId}`}
            className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
          <button
            type="button"
            onClick={onRemove}
            aria-label={t("removeItem", { name: item.name })}
            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger active:scale-90"
          >
            <TrashIcon />
          </button>
        </div>

        {/* Selected options */}
        {item.selectedOptions.length > 0 && (
          <ul role="list" className="space-y-0.5 text-xs text-muted-foreground">
            {item.selectedOptions.map((option) => (
              <li key={option.optionId} className="truncate">
                <span className="font-medium">{option.groupName}:</span>{" "}
                {option.optionName}
                {option.priceAdjustment !== 0 && (
                  <span dir="ltr" className="ms-1 opacity-75">
                    ({option.priceAdjustment > 0 ? "+" : ""}
                    {formatCartPrice(option.priceAdjustment)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {item.notes && (
          <p className="text-xs italic text-muted-foreground">“{item.notes}”</p>
        )}

        {/* Footer: stepper + line total */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div
            role="group"
            aria-label={t("quantityLabel")}
            className="flex items-center rounded-full border border-border"
          >
            <StepperButton
              label={t("decrease")}
              disabled={item.quantity <= 1}
              onClick={() => onQuantityChange(item.quantity - 1)}
            >
              <MinusIcon />
            </StepperButton>

            <output className="min-w-7 select-none text-center text-sm font-semibold tabular-nums" dir="ltr">
              {item.quantity}
            </output>

            <StepperButton label={t("increase")} onClick={() => onQuantityChange(item.quantity + 1)}>
              <PlusIcon />
            </StepperButton>
          </div>

          <p className="text-sm font-bold tabular-nums" dir="ltr">
            {formatCartPrice(item.itemTotalPrice)}
          </p>
        </div>
      </div>
    </article>
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
      className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
