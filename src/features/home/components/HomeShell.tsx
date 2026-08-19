import type { ReactNode } from "react";

interface HomeShellProps {
  children: ReactNode;
}

export function HomeShell({ children }: HomeShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container-app flex flex-1 flex-col gap-6 py-4 pb-[calc(var(--bottom-nav-height)+1.5rem)] md:pb-8">
        {children}
      </main>
    </div>
  );
}