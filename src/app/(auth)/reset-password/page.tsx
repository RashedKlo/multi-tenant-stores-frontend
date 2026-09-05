// app/(auth)/reset-password/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { AuthShell, ResetPasswordForm } from "@/features/auth";

export async function generateMetadata() {
  const t = await getTranslations("auth");
  return { title: t("updatePassword") };
}

export default async function ResetPasswordPage() {
  const t = await getTranslations("auth");

  return (
    <AuthShell
      title={t("resetPasswordTitle")}
      subtitle={t("resetPasswordSubtitle")}
    >
      <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-muted" />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
