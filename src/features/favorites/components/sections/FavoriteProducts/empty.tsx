import { getTranslations } from "next-intl/server";

// features/favorites/components/sections/FavoriteProducts/empty.tsx
export default async function FavoriteProductsEmpty() {
  const t = await getTranslations("favorites");

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <p className="text-sm font-medium">{t("emptyProductsTitle")}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("emptyProductsDescription")}
      </p>
    </div>
  );
}