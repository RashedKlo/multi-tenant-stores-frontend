// features/auth/components/LoginForm.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { loginAction } from "../actions";
import { AUTH_REDIRECT } from "../constants/auth";
import { FormField, SubmitButton, AlertBanner } from "../../../shared/lib/ui/FormField";
import { GoogleButton } from "./GoogleButton";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    searchParams.get("redirect") || AUTH_REDIRECT.afterLogin;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await loginAction({ email, password });
      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }
      router.replace(redirectTo);
      router.refresh();
    });
  };

  return (
    <div className="space-y-5">
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

        <FormField
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            {t("forgotPasswordLink")}
          </Link>
        </div>

        <SubmitButton pending={pending}>
          {pending ? t("signingIn") : t("signIn")}
        </SubmitButton>
      </form>

      <Divider label={t("or")} />

      <GoogleButton disabled={pending} />

      <p className="text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
