// app/(auth)/login/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { AuthShell, LoginForm, GoogleOneTap } from "@/features/auth";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <AuthShell title={t("signInTitle")} subtitle={t("signInSubtitle")}>
      <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}