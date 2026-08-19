"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "../constants/nav-items";
import { NavIcon } from "./NavIcon";
import { cn } from "@/shared/lib/utils";

/**
 * Responsive primary navigation.
 *
 * - Mobile (< md): fixed bottom bar
 * - Desktop (≥ md): horizontal bar under the top header
 */
export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <>
      {/* ========== Mobile: fixed bottom ========== */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        aria-label="Main navigation"
      >
        <ul className="flex h-16 items-stretch justify-around px-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-full flex-col items-center justify-center gap-0.5 text-[11px] transition-colors",
                    active
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <NavIcon
                    name={item.icon}
                    active={active}
                    className="h-5 w-5"
                  />

                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Safe-area padding for iOS home indicator */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      {/* ========== Desktop / tablet: top horizontal ========== */}
      <nav
        className="hidden border-b border-border bg-background md:block"
        aria-label="Main navigation"
      >
        <ul className="flex justify-center items-center h-12  gap-1 px-4">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.id} className="mx-4">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <NavIcon
                    name={item.icon}
                    active={active}
                    className="h-4 w-4"
                  />

                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}