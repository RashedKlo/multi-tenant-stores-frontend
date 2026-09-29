"use client";

import { useTranslations } from "next-intl";

export default function NearbyStoresEmpty() {
  const t = useTranslations("home.nearbyStores");

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl  bg-muted/30 px-4 py-8 text-center">
      <svg
        className="h-6 w-6 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
      <p className="text-sm font-medium text-foreground">{t("emptyTitle")}</p>
      <p className="text-sm text-muted-foreground">{t("emptyDescription")}</p>
    </div>
  );
}
