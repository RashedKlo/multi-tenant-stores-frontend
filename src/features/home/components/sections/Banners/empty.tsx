"use client";

import { useTranslations } from "next-intl";

export default function BannerEmpty() {
  const t = useTranslations("banners");

  return (
    <div className="w-full rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
      {t("noBanners")}
    </div>
  );
}