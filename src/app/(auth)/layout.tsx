// app/(auth)/layout.tsx
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Auth route group — no Topbar / Navbar.
 * Root layout still provides theme, locale, fonts, NextIntl.
 */
export default async function AuthLayout({ children }: { children: ReactNode }) {
  const token=await getAccessToken();
  if(token)
  redirect("/home");

  
  return children;
}
