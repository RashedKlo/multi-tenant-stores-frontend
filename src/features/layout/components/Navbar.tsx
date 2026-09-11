"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "../constants/nav-items";
import { NavIcon } from "./NavIcon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/shared/lib/utils";
import { LogoutButton } from "@/features/profile";
import { SearchIcon } from "./icons";

/**
 * Responsive primary navigation.
 *
 * - Mobile (< md): fixed bottom tab bar, icon + label, active tab gets a
 *   soft pill background.
 * - Desktop (≥ md): full sticky header — logo, centered links with a
 *   sliding underline, and utility actions on the trailing edge.
 */
interface NavbarProps {
  isAuthenticated?: boolean;
}
export function Navbar({ isAuthenticated = false }: NavbarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tLayout = useTranslations("layout");

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* ========== Mobile: fixed bottom tab bar ========== */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 md:hidden"
        aria-label={tLayout("mainNav")}
      >
        <ul className="flex h-[var(--bottom-nav-height)] items-stretch justify-around px-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex h-full flex-col items-center justify-center gap-1"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                      active ? "scale-100 bg-primary/10" : "scale-90"
                    )}
                  >
                    <NavIcon
                      name={item.icon}
                      className={cn(
                        "h-5 w-5 transition-colors",
                        active
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "w-full truncate px-0.5 text-center text-[11px] leading-none transition-colors",
                      active ? "font-semibold text-primary" : "text-muted-foreground"
                    )}
                  >
                    {t(item.labelKey)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Safe-area padding for iOS home indicator */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      {/* ========== Desktop: sticky top header ========== */}
      <header
        className="sticky top-0 z-40 hidden border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 md:block"
        aria-label={tLayout("mainNav")}
      >
        <div className="mx-auto flex h-[var(--desktop-nav-height)] max-w-[var(--container-max)] items-center gap-8 px-6">
          <Logo />

          <ul className="flex flex-1 items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.id} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <NavIcon name={item.icon} className="h-4 w-4" />
                    <span className={active ? "font-medium" : undefined}>
                      {t(item.labelKey)}
                    </span>
                  </Link>

                  {/* Signature indicator: grows from center instead of a static border */}
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-x-4 -bottom-px h-0.5 origin-center scale-x-0 rounded-full bg-primary transition-transform duration-300",
                      active && "scale-x-100"
                    )}
                  />
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <Link href="/search" className="hidden md:flex">
              <SearchIcon />
            </Link>
            <LocaleSwitcher ariaLabelPrefix={tLayout("actions.switchLanguage")} />
            <ThemeToggle
              labels={{
                toLight: tLayout("actions.toLight"),
                toDark: tLayout("actions.toDark"),
              }}
            />
            {isAuthenticated && <LogoutButton variant="icon" />}
          </div>
        </div>
      </header>
    </>
  );
}