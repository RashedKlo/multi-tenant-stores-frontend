"use client";

import { useTranslations } from "next-intl";

export default function NewStoresEmpty() {
  const t = useTranslations("home.newStores");

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted/30 px-4 py-8 text-center">
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
        <path d="M12 2v20M2 12h20" />
      </svg>
      <p className="text-sm font-medium text-foreground">{t("emptyTitle")}</p>
      <p className="text-sm text-muted-foreground">{t("emptyDescription")}</p>
    </div>
  );
}
