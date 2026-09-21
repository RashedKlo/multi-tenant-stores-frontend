// features/auth/components/VerifyEmailForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  verifyEmailAction,
  resendVerificationAction,
} from "../actions";
import { AUTH_REDIRECT, VERIFICATION_CODE_LENGTH } from "../constants/auth";
import { FormField, SubmitButton, AlertBanner } from "../../../shared/lib/ui/FormField";

export function VerifyEmailForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const [pending, startTransition] = useTransition();
  const [resendPending, startResend] = useTransition();

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    startTransition(async () => {
      const result = await verifyEmailAction({ email, code });
      if (!result.success) {
        setError(t(result.error));
        return;
      }
      router.replace(AUTH_REDIRECT.afterVerify);
      router.refresh();
    });
  };

  const onResend = () => {
    setError(null);
    setInfo(null);
    startResend(async () => {
      const result = await resendVerificationAction({ email });
      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }
      setInfo(t("codeResent"));
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && <AlertBanner message={error} />}
      {info && <AlertBanner message={info} variant="success" />}

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
        hint={t("codeHint", { count: VERIFICATION_CODE_LENGTH })}
        value={code}
        onChange={(e) =>
          setCode(e.target.value.replace(/\D/g, "").slice(0, VERIFICATION_CODE_LENGTH))
        }
        maxLength={VERIFICATION_CODE_LENGTH}
        required
        disabled={pending}
      />

      <SubmitButton pending={pending}>
        {pending ? t("verifying") : t("verify")}
      </SubmitButton>

      <button
        type="button"
        onClick={onResend}
        disabled={resendPending || pending || !email}
        className="w-full text-center text-sm font-medium text-primary hover:underline disabled:opacity-50"
      >
        {resendPending ? t("resending") : t("resendCode")}
      </button>
    </form>
  );
}
