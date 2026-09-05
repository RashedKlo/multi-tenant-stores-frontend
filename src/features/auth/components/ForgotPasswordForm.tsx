// features/auth/components/ForgotPasswordForm.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { forgotPasswordAction } from "../actions";
import { FormField, SubmitButton, AlertBanner } from "../../../shared/lib/ui/FormField";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await forgotPasswordAction({ email });
      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }
      setSent(true);
      // Optional: navigate to reset with email prefilled
      const params = new URLSearchParams({ email });
      setTimeout(() => {
        router.push(`/reset-password?${params.toString()}`);
      }, 1200);
    });
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <AlertBanner message={t("resetEmailSent")} variant="success" />
        <p className="text-sm text-muted-foreground">{t("checkInbox")}</p>
        <Link
          href="/login"
          className="inline-block text-sm font-medium text-primary hover:underline"
        >
          {t("backToSignIn")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && <AlertBanner message={error} />}

      <FormField
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        label={t("email")}
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={pending}
      />

      <SubmitButton pending={pending}>
        {pending ? t("sending") : t("sendResetLink")}
      </SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t("backToSignIn")}
        </Link>
      </p>
    </form>
  );
}
