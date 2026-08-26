// features/cart/components/sections/CartSummary/CartSummary.tsx
"use client";

import { useTranslations } from "next-intl";
import { formatCartPrice } from "@/features/cart/lib/cart-helpers";

interface CartSummaryProps {
  subtotal: number;
  /** Delivery fee comes from store settings — wire it when available */
  deliveryFee?: number;
}

export function CartSummary({ subtotal, deliveryFee = 0 }: CartSummaryProps) {
  const t = useTranslations("cart.summary");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
    >
      <h2 className="mb-4 text-base font-semibold">{t("title")}</h2>

      <dl className="space-y-2.5 text-sm">
        <Row label={t("subtotal")} value={formatCartPrice(subtotal)} />

        {deliveryFee > 0 && (
          <Row label={t("deliveryFee")} value={formatCartPrice(deliveryFee)} muted />
        )}

        <div className="border-t border-border pt-3">
          <Row
            label={t("total")}
            value={formatCartPrice(subtotal + deliveryFee)}
            strong
          />
        </div>
      </dl>

      <button
        type="button"
        className={[
          "mt-5 flex h-11 w-full items-center justify-center rounded-full bg-primary",
          "text-sm font-semibold text-primary-foreground shadow-sm transition-all",
          "hover:bg-primary/90 active:scale-[0.98]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        ].join(" ")}
      >
        {t("checkout")}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {t("taxNote")}
      </p>
    </section>
  );
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className={muted ? "text-muted-foreground" : undefined}>{label}</dt>
      <dd
        dir="ltr"
        className={
          strong
            ? "text-base font-bold tabular-nums"
            : "tabular-nums"
        }
      >
        {value}
      </dd>
    </div>
  );
}
