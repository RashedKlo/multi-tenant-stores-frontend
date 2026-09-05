"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { googleLoginAction } from "../actions";
import { AUTH_REDIRECT } from "../constants/auth";
import {
  cancelGoogleOneTap,
  hasGoogleClientId,
  initGoogleGis,
  promptGoogleOneTap,
} from "../lib/google-gis";

interface GoogleOneTapProps {
  /** "signin" on login page, "signup" on register page. */
  context?: "signin" | "signup";
}

/**
 * Mount on authentication pages only.
 *
 * Initializes Google Identity Services and automatically opens
 * the One Tap prompt after the initial page paint.
 */
export function GoogleOneTap({
  context = "signin",
}: GoogleOneTapProps) {
  const router = useRouter();

  const handleCredential = useCallback(
    async (idToken: string) => {
      try {
        const result = await googleLoginAction({ idToken });

        if (!result.success) {
          console.error("[GoogleOneTap] Login failed", result.error);
          return;
        }

        router.replace(AUTH_REDIRECT.afterLogin);
      } catch (error) {
        console.error("[GoogleOneTap] Login failed", error);
      }
    },
    [router],
  );

  useEffect(() => {
    if (!hasGoogleClientId()) {
      return;
    }

    let cancelled = false;

    const initialize = async () => {
      const ready = await initGoogleGis(handleCredential, {
        context,
      });

      if (cancelled || !ready) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          promptGoogleOneTap();
        }
      }, 400);

      return () => {
        window.clearTimeout(timeoutId);
      };
    };

    let cleanupTimeout: (() => void) | undefined;

    void initialize().then((cleanup) => {
      cleanupTimeout = cleanup;
    });

    return () => {
      cancelled = true;
      cleanupTimeout?.();
      cancelGoogleOneTap();
    };
  }, [context, handleCredential]);

  return null;
}