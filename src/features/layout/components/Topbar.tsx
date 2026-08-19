"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { SearchToggle } from "./SearchToggle";
import { ThemeToggle } from "./ThemeToggle";

interface TopbarProps {
  /** Overrides the brand label shown on mobile. */
  title?: string;
  /** Swap in page-specific actions (e.g. a cart total) instead of the defaults. */
  actions?: React.ReactNode;
}

/**
 * Mobile top bar. Hidden on md+ — the desktop header in Navbar already
 * carries branding, links and actions there.
 */
export function Topbar({ title, actions }: TopbarProps) {
  const t = useTranslations("layout");

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 md:hidden">
      <div className="flex h-[var(--topbar-height)] items-center justify-between gap-3 px-4">
        <Logo label={title} />

        {actions ?? (
          <div className="flex items-center gap-1">
            <SearchToggle
              placeholder={t("actions.searchPlaceholder")}
              ariaLabel={t("actions.search")}
            />
            <ThemeToggle
              labels={{
                toLight: t("actions.toLight"),
                toDark: t("actions.toDark"),
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
