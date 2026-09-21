import { getTranslations } from "next-intl/server";

export default async function SearchEmpty() {
  const t = await getTranslations("search");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-20 text-center">
      <p className="text-sm font-medium">{t("noModules")}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("tryAgainLater")}
      </p>
    </div>
  );
}