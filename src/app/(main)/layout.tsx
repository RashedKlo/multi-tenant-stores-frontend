import { Topbar } from "@/features/layout/components/Topbar";
import { Navbar } from "@/features/layout/components/Navbar";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {

  return (
    <div  className="min-h-screen bg-background text-foreground">
      <Topbar title="Shellafood" />
      <Navbar  />

      <div className="mx-auto flex max-w-7xl">
        <main className="flex-1">{children}</main>
      </div>

    </div>
  );
}