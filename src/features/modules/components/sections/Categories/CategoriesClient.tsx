// features/modules/components/sections/Categories/CategoriesClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Category } from "@/features/modules/types";

interface CategoriesClientProps {
  categories: Category[];
  activeCategoryId?: string;
}

/** Tiny class joiner (swap for clsx/cn if you already have one). */
const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

export function CategoriesClient({ categories, activeCategoryId }: CategoriesClientProps) {
  const t = useTranslations("categories");
  const pathname = usePathname();

  const isAllActive = !activeCategoryId;

  return (
    <section aria-labelledby="categories-heading">
      {/* Section header */}
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          id="categories-heading"
          className="text-base font-semibold tracking-tight sm:text-lg"
        >
          {t("title")}
        </h2>
        <span className="shrink-0 text-xs text-muted-foreground">
          {t("count", { count: categories.length })}
        </span>
      </div>

      {/* Scrollable chip row with edge fade (works in both LTR/RTL) */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 inset-e-0 z-1 w-8 bg-linear-to-l from-background to-transparent rtl:bg-linear-to-r"
        />

        <nav
          aria-label={t("ariaLabel")}
          className="scrollbar-hide -mx-4 flex snap-x snap-proximity gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {/* "All" chip */}
          <Link
            href={pathname}
            scroll={false}
            replace
            aria-current={isAllActive ? "page" : undefined}
            className={cx(
              "flex shrink-0 snap-start items-center rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95",
              isAllActive
                ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
            )}
          >
            {t("all")}
          </Link>

          {/* Category chips */}
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <Link
                key={category.id}
                href={{ pathname, query: { categoryId: category.id } }}
                scroll={false}
                replace
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95",
                  isActive
                    ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                )}
              >
                {category.imageUrl ? (
                  <span
                    className={cx(
                      "relative h-6 w-6 shrink-0 overflow-hidden rounded-full transition-opacity",
                      isActive && "opacity-90"
                    )}
                  >
                    <Image
                      src={category.imageUrl}
                      alt=""
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </span>
                ) : (
                  // Letter avatar fallback so chips never look empty
                  <span
                    aria-hidden
                    className={cx(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold",
                      isActive && "bg-primary-foreground/20 text-primary-foreground"
                    )}
                  >
                    {category.name.charAt(0)}
                  </span>
                )}
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
