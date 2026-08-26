// src/features/cart/components/sections/CartSummary/CartSummary.tsx
"use client";

import { useTranslations } from "next-intl";
import { formatCartPrice } from "@/features/cart/lib/cart-helpers";
import { clearCartAction } from "@/features/cart/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface CartSummaryProps {
  subtotal: number;
  storeId: string;
  deliveryFee?: number;
  isEmpty?: boolean;
}

export function CartSummary({
  subtotal,
  storeId,
  deliveryFee = 0,
  isEmpty = false,
}: CartSummaryProps) {
  const t = useTranslations("cart.summary");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClear = () => {
    startTransition(async () => {
      await clearCartAction({ storeId });
      router.refresh();
    });
  };

  if (isEmpty) return null;

  return (
    <section
      aria-label={t("ariaLabel")}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
    >
      <h2 className="mb-4 text-base font-semibold">{t("title")}</h2>

      <dl className="space-y-2.5 text-sm">
        <Row label={t("subtotal")} value={formatCartPrice(subtotal)} />

        {deliveryFee > 0 && (
          <Row
            label={t("deliveryFee")}
            value={formatCartPrice(deliveryFee)}
            muted
          />
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
        className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {t("checkout")}
      </button>

      <button
        type="button"
        onClick={handleClear}
        disabled={isPending}
        className="mt-2 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline disabled:opacity-50"
      >
        {t("clearCart")}
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
        className={strong ? "text-base font-bold tabular-nums" : "tabular-nums"}
      >
        {value}
      </dd>
    </div>
  );
}