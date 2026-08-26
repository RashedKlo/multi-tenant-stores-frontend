"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Module } from "@/features/home/types/home.types";

interface ModulesClientProps {
  modules: Module[];
}

/** Deterministic fallback gradients when a module has no iconUrl. */
const FALLBACK_GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-fuchsia-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-rose-500 to-pink-400",
] as const;

export function ModulesClient({ modules }: ModulesClientProps) {
  const t = useTranslations("modules");

  // Stable gradient assignment per module id (survives re-renders/reorders)
  const gradientMap = useMemo(() => {
    const map = new Map<string, string>();
    modules.forEach((m, i) => map.set(m.id, FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length]));
    return map;
  }, [modules]);

  return (
    <section aria-labelledby="home-modules-heading">
      <h2 id="home-modules-heading" className="mb-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {t("title")}
      </h2>

      <ul
        role="list"
        className="
          scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2
          sm:mx-0 sm:grid sm:snap-none sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0
          md:grid-cols-6 lg:grid-cols-8
        "
      >
        {modules.map((mod) => (
          <li key={mod.id} className="shrink-0 snap-start">
            <Link
              href={`/modules/${mod.id}`}
              className="group flex w-[4.5rem] flex-col items-center gap-2 rounded-2xl p-1.5 transition-colors hover:bg-muted focus-visible:bg-muted active:scale-95 sm:w-auto"
            >
              <span
                className="
                  relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl
                  bg-gradient-to-br shadow-sm ring-1 ring-border/60 transition-all duration-300
                  group-hover:shadow-md group-hover:ring-primary/40 sm:h-20 sm:w-20
                "
              >
                {mod.iconUrl ? (
                  <Image src={mod.iconUrl} alt="" width={80} height={80} sizes="(max-width:640px) 64px, 80px" className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientMap.get(mod.id)} text-xl font-bold text-white`}>
                    {mod.name.charAt(0)}
                  </span>
                )}
              </span>

              <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-foreground/90 transition-colors group-hover:text-primary">
                {mod.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
