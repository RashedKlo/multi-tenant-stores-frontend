// src/features/cart/components/sections/CartSummary/CartSummary.tsx
"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { clearCartAction } from "@/features/cart/actions/clear-cart";
import { formatPrice } from "@/shared/lib/format";
import { ConfirmModal, Notification } from "@/shared/lib/ui";

interface CartSummaryProps {
  subtotal: number;
  storeId: string;
  deliveryFee?: number;
  isEmpty?: boolean;
  itemCount?: number;
}

export function CartSummary({
  subtotal,
  storeId,
  itemCount = 0,
}: CartSummaryProps) {
  const t = useTranslations("cart");
  const summaryT = useTranslations("cart.summary");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [notice, setNotice] = useState<
    { message: string; variant: "success" | "error" } | null
  >(null);

  const handleClear = () => {
    setIsConfirmOpen(true);
  };

  const handleClearConfirm = () => {
    startTransition(async () => {
      setIsConfirmOpen(false);

      const result = await clearCartAction({ storeId });
      if (!result.success) {
        setNotice({
          message: result.error || t("clearError"),
          variant: "error",
        });
        router.refresh();
        return;
      }

      setNotice({ message: t("clearSuccess"), variant: "success" });
      router.refresh();
    });
  };

  if (itemCount === 0) return null;

  return (
    <>
      {notice && (
        <Notification
          message={notice.message}
          variant={notice.variant}
          onDismiss={() => setNotice(null)}
        />
      )}

      <section
        aria-label={summaryT("ariaLabel")}
        className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-foreground">{summaryT("title")}</h2>
          {itemCount > 0 && (
            <span className="text-xs text-muted-foreground tabular-nums">
              {itemCount}
            </span>
          )}
        </div>

        <dl className="space-y-2.5 text-sm">
          <Row label={summaryT("subtotal")} value={formatPrice(subtotal, { locale })} />

          <div className="border-t border-border pt-3">
            <Row
              label={summaryT("total")}
              value={formatPrice(subtotal, { locale })}
              strong
            />
          </div>
        </dl>

        <Link
          href={`/checkout?storeId=${storeId}`}
          className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {summaryT("checkout")}
        </Link>

        <button
          type="button"
          onClick={handleClear}
          disabled={isPending}
          className="mt-2 w-full text-center text-xs text-muted-foreground underline-offset-2 transition hover:underline disabled:opacity-50"
        >
          {isPending ? "…" : summaryT("clearCart")}
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {summaryT("taxNote")}
        </p>
      </section>

      <ConfirmModal
        open={isConfirmOpen}
        title={t("confirmClear.title")}
        description={t("confirmClear.description")}
        cancelLabel={t("confirmClear.cancel")}
        confirmLabel={t("confirmClear.confirm")}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleClearConfirm}
        isLoading={isPending}
      />
    </>
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
          strong ? "text-base font-bold tabular-nums" : "tabular-nums"
        }
      >
        {value}
      </dd>
    </div>
  );
}
