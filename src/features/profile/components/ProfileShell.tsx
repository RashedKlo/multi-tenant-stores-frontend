// src/features/profile/components/ProfileShell.tsx
import type { ReactNode } from "react";

interface ProfileShellProps {
  children: ReactNode;
}

export function ProfileShell({ children }: ProfileShellProps) {
  return (
    <main className="mx-auto max-w-2xl space-y-6 py-6 md:py-10">
      {children}
    </main>
  );
}