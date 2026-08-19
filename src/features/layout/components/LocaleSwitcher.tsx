"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { GlobeIcon } from "./icons";
import { cn } from "@/shared/lib/utils";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
] as const;

interface LocaleSwitcherProps {
  /** e.g. "Switch language to" — the target label is appended for a11y. */
  ariaLabelPrefix: string;
  className?: string;
}

/**
 * Two-locale toggle: always shows the language you'd switch *to*, which
 * keeps it a single tap instead of a dropdown. Writes the same `locale`
 * cookie `src/i18n/request.ts` reads, then refreshes the server tree so
 * `dir`/`lang` on <html> and every translated string update together.
 */
export function LocaleSwitcher({ ariaLabelPrefix, className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = LOCALES.find((l) => l.code !== locale) ?? LOCALES[0];

  const switchLocale = () => {
    document.cookie = `locale=${next.code}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      onClick={switchLocale}
      disabled={isPending}
      aria-label={`${ariaLabelPrefix} ${next.label}`}
      className={cn(
        "flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50",
        className
      )}
    >
      <GlobeIcon className="h-4 w-4" />
      <span>{next.label}</span>
    </button>
  );
}
