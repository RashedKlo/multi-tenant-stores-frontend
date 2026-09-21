import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function ChatEmpty() {
  const t = await getTranslations("supportChat");

  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
        <p className="text-base font-semibold text-foreground">
          {t("emptyTitle")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("emptyDescription")}
        </p>
        <Link
          href="/chat"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("emptyCta")}
        </Link>
      </div>
    </div>
  );
}
