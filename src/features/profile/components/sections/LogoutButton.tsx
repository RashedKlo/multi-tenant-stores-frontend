// src/features/profile/components/LogoutButton.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { logoutAction } from "@/features/auth/actions";
import { AUTH_REDIRECT } from "@/features/auth/constants/auth";

interface LogoutButtonProps {
  variant?: "full" | "icon";
  className?: string;
}

export function LogoutButton({
  variant = "full",
  className = "",
}: LogoutButtonProps) {
  const t = useTranslations("profile");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.replace(AUTH_REDIRECT.login);
      router.refresh();
    });
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onLogout}
        disabled={pending}
        aria-label={t("logout")}
        title={t("logout")}
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50",
          className,
        ].join(" ")}
      >
        <LogoutIcon className="h-4.5 w-4.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={pending}
      className={[
        "flex w-full items-center justify-center gap-2 rounded-full border border-danger/30 bg-danger/5 px-5 py-2.5 text-sm font-medium text-danger transition hover:bg-danger/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        className,
      ].join(" ")}
    >
      <LogoutIcon className="h-4 w-4" />
      {pending ? t("loggingOut") : t("logout")}
    </button>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}