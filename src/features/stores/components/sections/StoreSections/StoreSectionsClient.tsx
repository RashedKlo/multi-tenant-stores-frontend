// features/stores/components/sections/StoreSections/StoreSectionsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { PagedStoreSections } from "@/features/stores/types";

interface StoreSectionsClientProps {
  initialData: PagedStoreSections;
  storeId: string;
}

export function StoreSectionsClient({ initialData, storeId }: StoreSectionsClientProps) {
  const t = useTranslations("storeSections");

  return (
    <section aria-labelledby="sections-heading">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="sections-heading" className="text-base font-semibold tracking-tight sm:text-lg">
          {t("title")}
        </h2>
        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
          {t("count", { count: initialData.totalCount })}
        </span>
      </div>

      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
        {initialData.items.map((section) => (
          <li key={section.id}>
            <Link
              href={`/stores/${storeId}/sections/${section.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] focus-visible:-translate-y-0.5"
            >
              <div className="relative aspect-4/3 w-full bg-muted">
                {section.imageUrl ? (
                  <Image
                    src={section.imageUrl}
                    alt=""
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 to-muted text-2xl font-bold text-muted-foreground"
                  >
                    {section.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 items-center p-3">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                  {section.name}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
