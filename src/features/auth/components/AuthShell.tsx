// features/auth/components/AuthShell.tsx
import type { ReactNode } from "react";
import Link from "next/link";

interface AuthShellProps {
  children: ReactNode;
  /** Optional page title shown above the card */
  title?: string;
  /** Optional subtitle under the title */
  subtitle?: string;
}

/**
 * Full-viewport, centered auth layout — no bottom nav / topbar.
 * Uses design tokens from globals.css (background, card, border, primary).
 */
export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
     

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12 sm:px-6">
        <div className="w-full max-w-md animate-fade-in-up">
          {(title || subtitle) && (
            <div className="mb-6 text-center sm:mb-8">
              {title && (
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
