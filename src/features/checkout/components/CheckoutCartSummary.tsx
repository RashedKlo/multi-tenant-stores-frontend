// features/checkout/components/CheckoutCartSummary.tsx
import Image from "next/image";
import type { CheckoutCartLine } from "../types";

interface CheckoutCartSummaryProps {
  items: CheckoutCartLine[];
  currencyLabel?: string;
  title: string;
  totalLabel: string;
  itemsLabel: string;
}

function formatMoney(value: number, currencyLabel = "USD") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyLabel,
      minimumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currencyLabel}`;
  }
}

/**
 * Read-only order summary for checkout.
 * Expects items already filtered by storeId.
 */
export function CheckoutCartSummary({
  items,
  currencyLabel = "USD",
  title,
  totalLabel,
  itemsLabel,
}: CheckoutCartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">
          {itemCount} {itemsLabel}
        </span>
      </div>

      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.cartItemId} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
              {item.productImage ? (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                  —
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {item.productName}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                × {item.quantity}
                {item.notes ? ` · ${item.notes}` : ""}
              </p>
            </div>

            <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
              {formatMoney(item.itemTotalPrice, currencyLabel)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-medium text-muted-foreground">{totalLabel}</span>
        <span className="text-base font-bold tabular-nums text-foreground">
          {formatMoney(total, currencyLabel)}
        </span>
      </div>
    </section>
  );
}
