// features/search/components/ModuleTabs.tsx
"use client";

import Image from "next/image";
import type { Module } from "@/features/search/types";

interface ModuleTabsProps {
  modules: Module[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ModuleTabs({ modules, selectedId, onSelect }: ModuleTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {modules.map((mod) => {
        const isActive = mod.id === selectedId;

        return (
          <button
            key={mod.id}
            onClick={() => onSelect(mod.id)}
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
          </button>
        );
      })}
    </div>
  );
}