import { getTranslations } from "next-intl/server";
import { LogoutButton } from "./LogoutButton";

export async function Session() {
  const t = await getTranslations("profile");

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
        {t("sessionSection")}
      </h2>
      <LogoutButton />
    </section>
  );
}