import { useTranslations } from "next-intl";

export function StoresResultsEmpty() {
  const t = useTranslations("search");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl">🔍</div>
      <p className="text-sm font-medium">{t("noStores")}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("tryDifferentSearch")}
      </p>
    </div>
  );
}