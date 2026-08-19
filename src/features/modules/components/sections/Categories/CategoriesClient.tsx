// features/modules/components/sections/Categories/CategoriesClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/features/modules/types";

interface CategoriesClientProps {
  categories: Category[];
  moduleId: string;
}

/**
 * Horizontal scrollable category chips + optional images.
 * Excellent for mobile discovery.
 */
export function CategoriesClient({ categories, moduleId }: CategoriesClientProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Categories</h2>
        <span className="text-xs text-muted-foreground">
          {categories.length} available
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {/* "All" chip */}
        <Link
          href={`/modules/${moduleId}`}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors active:scale-95"
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/modules/${moduleId}?categoryId=${category.id}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted active:scale-95"
          >
            {category.imageUrl && (
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            )}
            <span className="whitespace-nowrap">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}