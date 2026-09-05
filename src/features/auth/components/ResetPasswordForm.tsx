// features/auth/components/ResetPasswordForm.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { resetPasswordAction } from "../actions";
import { AUTH_REDIRECT, VERIFICATION_CODE_LENGTH } from "../constants/auth";
import { FormField, SubmitButton, AlertBanner } from "../../../shared/lib/ui/FormField";

export function ResetPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await resetPasswordAction({ email, code, newPassword });
      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }
      setDone(true);
      setTimeout(() => router.replace(AUTH_REDIRECT.afterReset), 1500);
    });
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <AlertBanner message={t("passwordUpdated")} variant="success" />
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
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={pending}
      />

      <FormField
        name="code"
        inputMode="numeric"
        autoComplete="one-time-code"
        label={t("verificationCode")}
        placeholder={t("codePlaceholder")}
        value={code}
        onChange={(e) =>
          setCode(e.target.value.replace(/\D/g, "").slice(0, VERIFICATION_CODE_LENGTH))
        }
        maxLength={VERIFICATION_CODE_LENGTH}
        required
        disabled={pending}
      />

      <FormField
        name="newPassword"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        label={t("newPassword")}
        placeholder={t("passwordPlaceholder")}
        hint={t("passwordHint")}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        disabled={pending}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? t("hidePassword") : t("showPassword")}
          </button>
        }
      />

      <SubmitButton pending={pending}>
        {pending ? t("updatingPassword") : t("updatePassword")}
      </SubmitButton>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t("backToSignIn")}
        </Link>
      </p>
    </form>
  );
}
