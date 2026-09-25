// src/app/(main)/layout.tsx
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { Topbar } from "@/features/layout/components/Topbar";
import { Navbar } from "@/features/layout/components/Navbar";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const token = await getAccessToken();
  const guestToken = await getAccessToken();
  if(!token && !guestToken) {
    redirect("/login");
  } 
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar title="MarketPlace" />
      <Navbar isAuthenticated={ Boolean(token)} />
      <div className="mx-auto flex max-w-7xl px-4 pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom))] sm:px-6 md:pb-0 lg:px-8">
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}