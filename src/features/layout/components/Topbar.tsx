"use client";

import Link from "next/link";

interface TopbarProps {
  /** Page title shown on mobile */
  title?: string;
  /** Optional right-side actions (search, notifications…) */
  actions?: React.ReactNode;
  
}

/**
 * Mobile top bar.
 * Hidden on md+ because the desktop Navbar already provides navigation.
 */
export function Topbar({ title = "Shellafood", actions }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <Link href="/home" className="flex items-center gap-2">
          {/* Simple logo mark – replace with real logo later */}
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            S
          </span>
          <span className="text-base font-semibold tracking-tight">{title}</span>
        </Link>

        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : (
          <div className="flex items-center gap-1">
            {/* Placeholder search / notification buttons */}
            <button
              type="button"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
