// features/addresses/components/AddressesShell.tsx
import type { ReactNode } from "react";

export function AddressesShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col px-4 py-4 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}