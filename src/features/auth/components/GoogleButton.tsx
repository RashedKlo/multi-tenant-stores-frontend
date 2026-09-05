"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { googleLoginAction } from "../actions";
import { AUTH_REDIRECT } from "../constants/auth";
import {
  hasGoogleClientId,
  initGoogleGis,
  promptGoogleOneTap,
} from "../lib/google-gis";
import { AlertBanner } from "../../../shared/lib/ui/FormField";

interface GoogleButtonProps {
  disabled?: boolean;
  context?: "signin" | "signup";
}

export function GoogleButton({
  disabled = false,
  context = "signin",
}: GoogleButtonProps) {
  const t = useTranslations("auth");
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredential = useCallback(
    async (idToken: string) => {
      if (isSigningIn) {
        return;
      }

      setError(null);
      setIsSigningIn(true);

      try {
        const result = await googleLoginAction({ idToken });

        if (!result.success) {
          setError(t(result.error as Parameters<typeof t>[0]));
          return;
        }

        router.replace(AUTH_REDIRECT.afterLogin);
      } catch (error) {
        console.error("[GoogleButton] Login failed", error);
        setError(t("errors.googleLoginFailed"));
      } finally {
        setIsSigningIn(false);
      }
    },
    [isSigningIn, router, t],
  );

  useEffect(() => {
    if (!hasGoogleClientId()) {
      return;
    }

    let cancelled = false;

    void initGoogleGis(handleCredential, { context }).then((ready) => {
      if (!cancelled) {
        setIsReady(ready);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [context, handleCredential]);

  const handleClick = useCallback(() => {
    if (disabled || isSigningIn || !isReady) {
      return;
    }

    setError(null);

    promptGoogleOneTap((info) => {
      if (!info.shown && info.reason) {
        console.warn("[Google prompt]", info.reason);
      }
    });
  }, [disabled, isReady, isSigningIn]);

  const isDisabled = disabled || isSigningIn || !isReady;

  return (
    <div className="space-y-2">
      {error && <AlertBanner message={error} />}

      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        aria-busy={isSigningIn}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        <GoogleIcon />

        {isSigningIn
          ? t("signingIn")
          : t("continueWithGoogle")}
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 .957 4.042l3.007 2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}