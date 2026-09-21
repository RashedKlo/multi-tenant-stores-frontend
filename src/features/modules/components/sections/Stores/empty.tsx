import { useTranslations } from "next-intl";

export default function StoresEmpty() {
  const t = useTranslations("stores");
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30 py-12 text-center">
      <svg className="h-8 w-8 text-muted-foreground/60" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
        <path d="M3 9l1.5-5h15L21 9M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9M3 9h18M9 14h6" />
      </svg>
      <p className="text-sm font-medium">{t("noStores")}</p>
      <p className="text-xs text-muted-foreground">{t("noStoresHint")}</p>
    </div>
  );
}
