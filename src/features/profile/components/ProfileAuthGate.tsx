// src/features/profile/components/ProfileAuthGate.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AUTH_REDIRECT } from "@/features/auth/constants/auth";

export function ProfileAuthGate() {
  const t = useTranslations("profile");

  const loginHref = `${AUTH_REDIRECT.login}?redirect=${encodeURIComponent("/profile")}`;
  const registerHref = `${AUTH_REDIRECT.register}?redirect=${encodeURIComponent("/profile")}`;

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19.5c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      </div>

      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {t("authRequiredTitle")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("authRequiredSubtitle")}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Link
          href={loginHref}
          className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.98]"
        >
          {t("signIn")}
        </Link>
        <Link
          href={registerHref}
          className="flex w-full items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted active:scale-[0.98]"
        >
          {t("createAccount")}
        </Link>
      </div>
    </section>
  );
}