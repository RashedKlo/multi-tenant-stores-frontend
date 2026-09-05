// app/(auth)/verify-email/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { AuthShell, VerifyEmailForm } from "@/features/auth";

export async function generateMetadata() {
  const t = await getTranslations("auth");
  return { title: t("verify") };
}

export default async function VerifyEmailPage() {
  const t = await getTranslations("auth");

  return (
    <AuthShell title={t("verifyTitle")} subtitle={t("verifySubtitle")}>
      <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
        <VerifyEmailForm />
      </Suspense>
    </AuthShell>
  );
}
