"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./icons";
import { cn } from "@/shared/lib/utils";

interface SearchToggleProps {
  placeholder: string;
  ariaLabel: string;
  className?: string;
}

/**
 * Icon-only until tapped, then expands into an inline input instead of
 * navigating to a separate search screen. Wire `onSubmit`/state up to the
 * real search feature later — this is presentation only.
 */
export function SearchToggle({ placeholder, ariaLabel, className }: SearchToggleProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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
        onClick={() => setOpen((v) => !v)}
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
