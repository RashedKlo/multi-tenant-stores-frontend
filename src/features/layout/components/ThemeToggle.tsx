"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";
import { cn } from "@/shared/lib/utils";

const THEME_COOKIE = "theme";

function persistTheme(theme: "light" | "dark") {
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}

interface ThemeToggleProps {
  labels: { toLight: string; toDark: string };
  className?: string;
}

/**
 * Reads/writes the same `theme` cookie the root layout reads on the
 * server, so a refresh (or a fresh visit) stays in sync with the choice
 * made here. Uses the View Transitions API when available for a soft
 * crossfade instead of an abrupt color swap.
 */
export function ThemeToggle({ labels, className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
 

  const toggle = () => {
    const next = !isDark;
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      setIsDark(next);
      persistTheme(next ? "dark" : "light");
    };

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? labels.toLight : labels.toDark}
      aria-pressed={isDark}
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
        <>
          <SunIcon
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              !isDark
                ? "-rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            )}
          />
          </>:
          <MoonIcon
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              !isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            )}
          />
    </button>
  );
}