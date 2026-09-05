// app/(auth)/forgot-password/page.tsx
import { getTranslations } from "next-intl/server";
import { AuthShell, ForgotPasswordForm } from "@/features/auth";

export async function generateMetadata() {
  const t = await getTranslations("auth");
  return { title: t("forgotPasswordTitle") };
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations("auth");

  return (
    <AuthShell
      title={t("forgotPasswordTitle")}
      subtitle={t("forgotPasswordSubtitle")}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
