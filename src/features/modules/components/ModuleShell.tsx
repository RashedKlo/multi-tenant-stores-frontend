// features/modules/components/ModuleShell.tsx
import type { ReactNode } from "react";

interface ModuleShellProps {
  children: ReactNode;
}

/**
 * Page frame for /modules/[id]
 */
export function ModuleShell({ children }: ModuleShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col gap-6 px-4 py-4 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}