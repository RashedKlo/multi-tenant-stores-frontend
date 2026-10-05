"use client";

import { useLocale, useTranslations } from "next-intl";
import type { StoreCoupon } from "@/features/stores/types";
import { formatPrice } from "@/shared/lib/format";

interface StoreCouponsClientProps {
  coupons: StoreCoupon[];
}

function formatDiscount(coupon: StoreCoupon, locale: string): string {
  if (coupon.discountType === 1) {
    return `${coupon.discountValue}%`;
  }

  return formatPrice(coupon.discountValue, { locale });
}

function formatDate(value: string | null | undefined, locale: string): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}

export function StoreCouponsClient({ coupons }: StoreCouponsClientProps) {
  const t = useTranslations("storeCoupons");
  const locale = useLocale();

  return (
    <section aria-labelledby="coupons-heading">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="coupons-heading" className="text-base font-semibold tracking-tight sm:text-lg">
          {t("title")}
        </h2>
        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
          {t("count", { count: coupons.length })}
        </span>
      </div>

      <ul role="list" className="grid gap-3 sm:grid-cols-2">
        {coupons.map((coupon) => {
          const startsAt = formatDate(coupon.startsAt, locale);
          const expiresAt = formatDate(coupon.expiresAt, locale);

          return (
            <li
              key={coupon.id}
              className="relative overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("codeLabel")}
                  </p>
                  <p className="mt-1 truncate font-mono text-lg font-bold tracking-wide">
                    {coupon.code}
                  </p>
                </div>
                <p className="shrink-0 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  {t("discount", { value: formatDiscount(coupon, locale) })}
                </p>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div>
                  <dt>{t("minimumOrder")}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {formatPrice(coupon.minOrderAmount, { locale })}
                  </dd>
                </div>
                {coupon.maxDiscountAmount != null && (
                  <div>
                    <dt>{t("maximumDiscount")}</dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {formatPrice(coupon.maxDiscountAmount, { locale })}
                    </dd>
                  </div>
                )}
              </dl>

              {(startsAt || expiresAt) && (
                <p className="mt-3 border-t border-primary/15 pt-3 text-xs text-muted-foreground">
                  {startsAt && t("startsAt", { date: startsAt })}
                  {startsAt && expiresAt && " · "}
                  {expiresAt && t("expiresAt", { date: expiresAt })}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
