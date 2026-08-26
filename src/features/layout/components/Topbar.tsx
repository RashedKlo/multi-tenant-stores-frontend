"use client";

import { useState } from "react";
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
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 md:hidden">
      <div className="relative flex h-[var(--topbar-height)] items-center justify-between gap-3 px-4">
        {/* Hidden (not just covered) while search is open, so it drops out
            of the tab order and the overlay's background isn't fighting
            anything underneath it. */}
        {!searchOpen && <Logo label={title} />}

        {actions ?? (
          <div className="flex flex-1 items-center justify-end gap-1">
            <SearchToggle
              variant="overlay"
              placeholder={t("actions.searchPlaceholder")}
              ariaLabel={t("actions.search")}
              onOpenChange={setSearchOpen}
            />
            {!searchOpen && (
              <ThemeToggle
                labels={{
                  toLight: t("actions.toLight"),
                  toDark: t("actions.toDark"),
                }}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}