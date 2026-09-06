"use client";

import { useEffect } from "react";

interface NotificationProps {
  message: string;
  variant?: "error" | "success";
  onDismiss?: () => void;
  className?: string;
}

export function Notification({
  message,
  variant = "error",
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
      ? "border-primary/30 bg-primary/10 text-foreground"
      : "border-danger/30 bg-danger/10 text-danger";

  return (
    <div
      role="alert"
      className={`fixed inset-x-0 top-4 z-[100] mx-auto flex w-[calc(100%_-_2rem)] max-w-md items-start justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm shadow-lg sm:top-6 ${styles} ${className ?? ""}`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 text-current/70 transition-colors hover:text-current"
        >
          <span aria-hidden>×</span>
        </button>
      )}
    </div>
  );
}