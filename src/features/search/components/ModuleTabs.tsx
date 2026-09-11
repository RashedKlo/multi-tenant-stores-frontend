// features/search/components/ModuleTabs.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Module } from "@/features/search/types";

interface ModuleTabsProps {
  modules: Module[];
  selectedId: string;
  search?: string;
}

export function ModuleTabs({ modules, selectedId, search = "" }: ModuleTabsProps) {
  const pathname = usePathname();
  const current = useSearchParams();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {modules.map((mod) => {
        const isActive = mod.id === selectedId;
        const params = new URLSearchParams(current.toString());
        params.set("moduleId", mod.id);

        if (search.trim()) {
          params.set("search", search);
        } else {
          params.delete("search");
        }

        return (
          <Link
            key={mod.id}
            href={`${pathname}?${params.toString()}`}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95 ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            }`}
          >
            {mod.iconUrl ? (
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src={mod.iconUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
            ) : (
              <span className="text-xs font-bold">
                {mod.name.charAt(0)}
              </span>
            )}
            <span className="whitespace-nowrap">{mod.name}</span>
          </Link>
        );
      })}
    </div>
  );
}