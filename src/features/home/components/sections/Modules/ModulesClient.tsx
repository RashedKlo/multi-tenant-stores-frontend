"use client";

import Image from "next/image";
import Link from "next/link";
import type { Module } from "@/features/home/types/home.types";

interface ModulesClientProps {
  modules: Module[];
}

/**
 * Pure presentational grid of modules.
 * Receives already-fetched + localized data.
 */
export function ModulesClient({ modules }: ModulesClientProps) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold">Categories</h2>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/modules/${mod.id}`}
            className="flex flex-col items-center gap-2 rounded-xl p-2 transition-colors active:bg-muted"
          >
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-muted">
              {mod.iconUrl ? (
                <Image
                  src={mod.iconUrl}
                  alt={mod.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  sizes="56px"
                />
              ) : (
                <span className="text-lg font-bold text-muted-foreground">
                  {mod.name.charAt(0)}
                </span>
              )}
            </div>

            <span className="line-clamp-2 text-center text-xs leading-tight">
              {mod.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}