import type { ReactNode } from "react";

interface HomeShellProps {
  children: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
        {children}
    </div>
  );
}