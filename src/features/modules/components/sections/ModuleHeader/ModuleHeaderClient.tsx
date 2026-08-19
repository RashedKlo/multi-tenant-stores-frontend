// features/modules/components/sections/ModuleHeader/ModuleHeaderClient.tsx
"use client";

import Image from "next/image";
import type { ModuleDetail } from "@/features/modules/types";

interface ModuleHeaderClientProps {
  module: ModuleDetail;
}

export function ModuleHeaderClient({ module }: ModuleHeaderClientProps) {
  return (
    <header className="flex items-center gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-muted">
        {module.iconUrl ? (
          <Image
            src={module.iconUrl}
            alt={module.name}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            sizes="56px"
            priority
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground">
            {module.name.charAt(0)}
          </span>
        )}
      </div>

      <div>
        <h1 className="text-xl font-bold leading-tight">{module.name}</h1>
        <p className="text-sm text-muted-foreground">
          {module.categories.length} categories
        </p>
      </div>
    </header>
  );
}