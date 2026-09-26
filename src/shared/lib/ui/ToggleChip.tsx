import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ToggleChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function ToggleChip({
  active = false,
  className,
  children,
  ...props
}: ToggleChipProps) {
  return (
    <button
      type="button"
      className={[
        "rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200 active:scale-95",
        active
          ? "border-transparent bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
