// src/features/cart/components/sections/CartItems/empty.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function CartEmpty() {
  const t = useTranslations("cart.empty");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 h-12 w-12 text-muted-foreground/50"
        aria-hidden
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 5H5.12" />
      </svg>

      <h2 className="text-base font-semibold">{t("title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <Link
        href="/home"
        className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
      >
        {t("browseCta")}
      </Link>
    </div>
  );
}