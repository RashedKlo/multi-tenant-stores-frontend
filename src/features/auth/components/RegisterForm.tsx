// features/auth/components/RegisterForm.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { registerAction } from "../actions";
import { AUTH_REDIRECT } from "../constants/auth";
import { FormField, SubmitButton, AlertBanner } from "../../../shared/lib/ui/FormField";
import { GoogleButton } from "./GoogleButton";
import { GuestButton } from "./GuestButton";

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await registerAction({
        firstName,
        lastName,
        email,
        password,
      });

      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }

      // Pass email to verify page via query (or sessionStorage)
      const params = new URLSearchParams({ email: result.data.email });
      router.replace(`${AUTH_REDIRECT.afterRegister}?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && <AlertBanner message={error} />}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            name="firstName"
            autoComplete="given-name"
            label={t("firstName")}
            placeholder={t("firstNamePlaceholder")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={pending}
          />
          <FormField
            name="lastName"
            autoComplete="family-name"
            label={t("lastName")}
            placeholder={t("lastNamePlaceholder")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={pending}
          />
        </div>

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
          autoComplete="new-password"
          label={t("password")}
          placeholder={t("passwordPlaceholder")}
          hint={t("passwordHint")}
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

        <SubmitButton pending={pending}>
          {pending ? t("creatingAccount") : t("createAccount")}
        </SubmitButton>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("or")}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton disabled={pending} />
      <GuestButton disabled={pending} />

      <p className="text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
