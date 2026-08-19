// features/stores/components/sections/StoreSections/StoreSectionsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { PagedStoreSections } from "@/features/stores/types";

interface StoreSectionsClientProps {
  initialData: PagedStoreSections;
  storeId: string;
}

export function StoreSectionsClient({
  initialData,
  storeId,
}: StoreSectionsClientProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">Menu / Sections</h2>
        <span className="text-xs text-muted-foreground">
          {initialData.totalCount} sections
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {initialData.items.map((section) => (
          <Link
            key={section.id}
            href={`/stores/${storeId}/sections/${section.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all active:scale-[0.98] hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full bg-muted">
              {section.imageUrl ? (
                <Image
                  src={section.imageUrl}
                  alt={section.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                  {section.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
                {section.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}