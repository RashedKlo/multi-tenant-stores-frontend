import { useTranslations } from "next-intl";

export default function CategoriesEmpty() {
  const t = useTranslations("categories");
  return (
    <div className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
        <path d="M4 7h7M4 12h10M4 17h7M15 15l3 3 4-6" />
      </svg>
      {t("noCategories")}
    </div>
  );
}
