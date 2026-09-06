// src/features/cart/components/sections/CartItems/CartItemCard.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { CartItem } from "@/features/cart/types/cart.types";
import { MinusIcon, PlusIcon, TrashIcon } from "../../constants/icons";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  pending?: boolean;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  pending = false,
}: CartItemCardProps) {
  const t = useTranslations("cart");
  const locale = useLocale();

  return (
    <article
      className={[
        "flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all sm:gap-4 sm:p-4",
        pending ? "pointer-events-none opacity-60" : "hover:shadow-md",
      ].join(" ")}
    >
      <Link
        href={`/stores/${item.storeId}/products/${item.productId}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24"
        tabIndex={-1}
        aria-hiddenju
      >
        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
          {item.productImage}
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/stores/${item.storeId}/products/${item.productId}`}
            className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary"
          >
            {item.productName}
          </Link>
          <button
            type="button"
            onClick={onRemove}
            disabled={pending}
            aria-label={t("removeItem", { name: item.productName })}
            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger active:scale-90 disabled:opacity-50"
          >
            <TrashIcon />
          </button>
        </div>

        {item.selectedOptions.length > 0 && (
          <ul role="list" className="space-y-0.5 text-xs text-muted-foreground">
            {item.selectedOptions.map((option) => (
              <li key={option.optionId} className="truncate">
                <span className="font-medium">{option.groupName}:</span>{" "}
                {option.optionName}
                {option.priceAdjustment !== 0 && (
                  <span dir="ltr" className="ms-1 opacity-75">
                    ({option.priceAdjustment > 0 ? "+" : ""}
                    {formatPrice(option.priceAdjustment, locale)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {item.notes && (
          <p className="text-xs italic text-muted-foreground">“{item.notes}”</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-1">
          <div
            role="group"
            aria-label={t("quantityLabel")}
            className="flex items-center rounded-full border border-border"
          >
            <StepperButton
              label={t("decrease")}
              disabled={pending || item.quantity <= 1}
              onClick={() => onQuantityChange(item.quantity - 1)}
            >
              <MinusIcon />
            </StepperButton>

            <output
              className="min-w-7 select-none text-center text-sm font-semibold tabular-nums"
              dir="ltr"
            >
              {item.quantity}
            </output>

            <StepperButton
              label={t("increase")}
              disabled={pending}
              onClick={() => onQuantityChange(item.quantity + 1)}
            >
              <PlusIcon />
            </StepperButton>
          </div>

          <p className="text-sm font-bold tabular-nums" dir="ltr">
            {formatPrice(item.itemTotalPrice, locale)}
          </p>
        </div>
      </div>
    </article>
  );
}

function formatPrice(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "SYP",
    maximumFractionDigits: 0,
  }).format(amount);
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
