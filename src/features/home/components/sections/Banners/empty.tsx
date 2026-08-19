"use client";

import { useTranslations } from "next-intl";

export default function BannerEmpty() {
  const t = useTranslations("banners");

  return (
    <div className="flex aspect-[16/8] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 15 4.5-4.5a2 2 0 0 1 2.8 0L15 15" />
        <circle cx="16.5" cy="9" r="1.25" fill="currentColor" stroke="none" />
      </svg>
      {t("noBanners")}
    </div>
  );
}