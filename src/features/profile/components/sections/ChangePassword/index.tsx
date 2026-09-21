import { getTranslations } from "next-intl/server";
import { ChangePasswordForm } from "./ChangePasswordForm";

export async function ChangePassword() {
  const t = await getTranslations("profile");

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-1 text-sm font-semibold tracking-wide text-foreground">
        {t("securitySection")}
      </h2>
      <p className="mb-4 text-xs text-muted-foreground">{t("securityHint")}</p>
      <ChangePasswordForm />
    </section>
  );
}