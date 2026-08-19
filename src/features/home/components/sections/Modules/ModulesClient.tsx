import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Module } from "@/features/home/types/home.types";

interface ModulesClientProps {
  modules: Module[];
}

// Cycled by index so a module without an icon still gets a distinct,
// deterministic identity instead of every fallback looking identical.
const FALLBACK_GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-fuchsia-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-rose-500 to-pink-400",
];

/**
 * Pure presentational grid of modules.
 * Receives already-fetched + localized data.
 */
export function ModulesClient({ modules }: ModulesClientProps) {
  const t = useTranslations("modules");

  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-foreground">{t("title")}</h2>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {modules.map((mod, index) => (
          <Link
            key={mod.id}
            href={`/modules/${mod.id}`}
            className="group flex flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-muted active:bg-muted"
          >
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-muted ring-1 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/30">
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
                <span
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-lg font-bold text-white ${
                    FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
                  }`}
                  role="img"
                  aria-label={mod.name}
                >
                  {mod.name.charAt(0)}
                </span>
              )}
            </div>

            <span className="line-clamp-2 text-center text-xs leading-tight text-foreground">
              {mod.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}