import { useTranslations } from "next-intl";

export default function ModuleHeaderEmpty() {
  const t = useTranslations("moduleHeader");
  return (
    <div className="rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
      {t("notFound")}
    </div>
  );
}
