"use client";

import { useEffect } from "react";

interface NotificationProps {
  message: string;
  variant?: "error" | "success" | "info";
  onDismiss?: () => void;
  className?: string;
}

export function Notification({
  message,
  variant = "info",
  onDismiss,
  className,
}: NotificationProps) {
  useEffect(() => {
    if (!onDismiss) return;

    const timeoutId = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timeoutId);
  }, [message, onDismiss]);

  const styles =
    variant === "success"
      ? "border-emerald-500/30 bg-emerald-50/95 text-emerald-900 shadow-emerald-500/10 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-50"
      : variant === "error"
        ? "border-red-500/30 bg-red-50/95 text-red-900 shadow-red-500/10 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-50"
        : "border-sky-500/30 bg-sky-50/95 text-sky-900 shadow-sky-500/10 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-50";

  const toneLabel =
    variant === "success" ? "Success" : variant === "error" ? "Error" : "Notice";

  const icon =
    variant === "success" ? "✓" : variant === "error" ? "!" : "i";

  return (
    <div className="pointer-events-none fixed inset-x-3 top-3 z-120 flex justify-center sm:inset-x-auto sm:right-4 sm:left-auto">
      <div
        role={variant === "error" ? "alert" : "status"}
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={`pointer-events-auto w-full max-w-md rounded-2xl border px-3 py-2.5 shadow-lg backdrop-blur-sm ${styles} ${className ?? ""}`}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/20 bg-current/5 text-xs font-bold">
            {icon}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">
              {toneLabel}
            </p>
            <p className="mt-0.5 text-sm leading-5">{message}</p>
          </div>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-full p-1 text-current/70 transition-colors hover:bg-black/5 hover:text-current dark:hover:bg-white/10"
            >
              <span aria-hidden className="block text-lg leading-none">×</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}