// features/auth/components/FormField.tsx
"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-50";

export function FormField({
  label,
  error,
  hint,
  trailing,
  id,
  className,
  ...props
}: FormFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          className={[inputClass, trailing ? "pe-11" : "", className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          {...props}
        />
        {trailing && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${fieldId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  pending,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      className={[
        "flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all",
        "hover:opacity-90 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
            aria-hidden
          />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export function AlertBanner({
  message,
  variant = "error",
}: {
  message: string;
  variant?: "error" | "success";
}) {
  const styles =
    variant === "success"
      ? "border-primary/30 bg-primary/10 text-foreground"
      : "border-danger/30 bg-danger/10 text-danger";

  return (
    <div
      role="alert"
      className={`rounded-xl border px-3.5 py-2.5 text-sm ${styles}`}
    >
      {message}
    </div>
  );
}
