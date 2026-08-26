"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./icons";
import { cn } from "@/shared/lib/utils";

interface SearchToggleProps {
  placeholder: string;
  ariaLabel: string;
  className?: string;
  /**
   * "inline" grows the pill in place — fine on the roomy desktop header.
   * "overlay" takes over the full mobile bar so the input never has to
   * compete for space with the logo/theme toggle sitting next to it.
   * Defaults to "inline" so existing (desktop) call sites are unaffected.
   */
  variant?: "inline" | "overlay";
  /** Notified when the overlay opens/closes, so a parent bar can hide its other controls. */
  onOpenChange?: (open: boolean) => void;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SearchToggle({
  placeholder,
  ariaLabel,
  className,
  variant = "inline",
  onOpenChange,
}: SearchToggleProps) {
  const [open, setOpenState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (variant !== "overlay" || !open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, variant]);

  if (variant === "overlay") {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={ariaLabel}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            className
          )}
        >
          <SearchIcon className="h-5 w-5" />
        </button>

        {open && (
          <div className="absolute inset-0 z-10 flex items-center gap-2 bg-background px-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={ariaLabel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              className="h-9 min-w-0 flex-1 rounded-full border border-border bg-muted/70 px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex h-9 shrink-0 items-center overflow-hidden rounded-full border border-transparent transition-all duration-300 ease-out",
        open ? "w-44 bg-muted/70 pe-1 sm:w-64" : "w-9",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={ariaLabel}
        aria-expanded={open}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        onBlur={() => setOpen(false)}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground transition-opacity duration-200",
          open ? "opacity-100" : "w-0 opacity-0"
        )}
      />
    </div>
  );
}