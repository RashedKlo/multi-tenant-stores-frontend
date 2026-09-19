// app/(auth)/register/page.tsx
import { getTranslations } from "next-intl/server";
import { AuthShell, RegisterForm, GoogleOneTap } from "@/features/auth";

export default async function RegisterPage() {
  const t = await getTranslations("auth");

  return (
    <AuthShell title={t("signUpTitle")} subtitle={t("signUpSubtitle")}>
      <RegisterForm />
    </AuthShell>
  );
}