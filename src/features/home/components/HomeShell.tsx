import type { ReactNode } from "react";

interface HomeShellProps {
  children: ReactNode;
}


export function HomeShell({ children }: HomeShellProps) {
  return (
    <div className="flex min-h-screen flex-col w-screen ">
      <main className="flex flex-1 flex-col gap-6 px-4 py-4 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}