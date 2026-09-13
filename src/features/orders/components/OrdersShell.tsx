// features/orders/components/OrdersShell.tsx
import type { ReactNode } from "react";

interface OrdersShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function OrdersShell({ children, title, subtitle }: OrdersShellProps) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">
      {(title || subtitle) && (
        <header className="mb-6 space-y-1 sm:mb-8">
          {title && (
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </main>
  );
}
