// features/favorites/components/FavoritesShell.tsx
import type { ReactNode } from "react";

interface FavoritesShellProps {
  children: ReactNode;
}

export function FavoritesShell({ children }: FavoritesShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col gap-5 px-4 py-4 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}