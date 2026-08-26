// features/modules/components/sections/ModuleHeader/ModuleHeaderClient.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ModuleDetail } from "@/features/modules/types";

interface ModuleHeaderClientProps {
  module: ModuleDetail;
}

export function ModuleHeaderClient({ module }: ModuleHeaderClientProps) {
  const t = useTranslations("moduleHeader");

  return (
    <header className="flex items-center gap-3 sm:gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-muted ring-1 ring-border/60 sm:h-16 sm:w-16">
        {module.iconUrl ? (
          <Image
            src={module.iconUrl}
            alt={module.name}
            fill
            priority
            quality={85}
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground"
          >
            {module.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          {module.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("categoriesCount", { count: module.categories.length })}
        </p>
      </div>
    </header>
  );
}
