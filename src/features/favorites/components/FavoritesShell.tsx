// features/favorites/components/FavoritesShell.tsx
import type { ReactNode } from "react";

interface FavoritesShellProps {
  title:string;
  subtitle:string;
  children: ReactNode;
}

export function FavoritesShell({ title,subtitle,children }: FavoritesShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col gap-5 px-4 py-4 pb-24 md:pb-8">
            <header>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </header>
        {children}
      </main>
    </div>
  );
}