// features/auth/components/GuestButton.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  createGuestSessionAction,
} from "../actions";
import { AUTH_REDIRECT } from "../constants/auth";
import { AlertBanner } from "../../../shared/lib/ui/FormField";

interface GuestButtonProps {
  disabled?: boolean;
}

export function GuestButton({ disabled = false }: GuestButtonProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [hasGuest, setHasGuest] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    searchParams.get("redirect") || AUTH_REDIRECT.afterLogin;

  const onClick = () => {
    if (disabled || pending ) return;
    setError(null);

    startTransition(async () => {
      // createGuestSessionAction reuses existing token when present
      const result = await createGuestSessionAction();

      if (!result.success) {
        setError(t(result.error as Parameters<typeof t>[0]));
        return;
      }

      setHasGuest(true);
      router.replace(redirectTo);
      router.refresh();
    });
  };

  const isDisabled = disabled || pending;

  return (
    <div className="space-y-2">
      {error && <AlertBanner message={error} />}

      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        aria-busy={pending}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="size-4 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground"
              aria-hidden
            />
            {t("continuingAsGuest")}
          </span>
        ) : hasGuest ? (
          <>
            <GuestCheckIcon />
            {t("alreadyContinueAsGuest")}
          </>
        ) : (
          <>
            <GuestIcon />
            {t("continueAsGuest")}
          </>
        )}
      </button>
    </div>
  );
}

function GuestIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GuestCheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M16 11l2 2 4-4" />
    </svg>
  );
}