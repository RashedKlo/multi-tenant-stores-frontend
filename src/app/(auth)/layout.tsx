// app/(auth)/layout.tsx
import type { ReactNode } from "react";

/**
 * Auth route group — no Topbar / Navbar.
 * Root layout still provides theme, locale, fonts, NextIntl.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return children;
}
