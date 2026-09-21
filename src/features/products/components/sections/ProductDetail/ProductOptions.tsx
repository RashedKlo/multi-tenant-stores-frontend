// features/stores/components/product-detail/ProductOptions.tsx — FULL VERSION
"use client";

import { useTranslations } from "next-intl";
import type { ProductOptionGroup } from "@/features/products/types";
import { formatPrice } from "@/shared/lib/format"; // shared helper, see below


interface ProductOptionsProps {
  groups: ProductOptionGroup[];
  selected: Record<string, string[]>;
  onChange: (groupId: string, optionIds: string[]) => void;
}

export function ProductOptions({ groups, selected, onChange }: ProductOptionsProps) {
  const t = useTranslations("productOptions");

  function handleSelect(
    group: ProductOptionGroup,
    optionId: string,
    isSelected: boolean,
  ) {
    const current = selected[group.id] ?? [];
    const isSingle = group.selectionType === "Single";

    if (isSingle) {
      // Tapping the selected radio keeps it (min=1 usually forces a choice)
      onChange(group.id, [optionId]);
      return;
    }
    if (isSelected) {
      onChange(group.id, current.filter((id) => id !== optionId));
    } else if (current.length < group.maxSelection) {
      onChange(group.id, [...current, optionId]);
    }
  }

  if (groups.length === 0) return null;

  return (
    <section aria-label={t("title")} className="space-y-6">
      {groups.map((group) => {
        const current = selected[group.id] ?? [];
        const isSingle = group.selectionType === "Single";

        return (
          <fieldset key={group.id} className="border-0 p-0 m-0">
            <legend className="sr-only">{group.name}</legend>

            {/* Group header */}
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold">
                {group.name}
                {group.minSelection > 0 && (
                  <abbr title={t("required")} className="ms-1 text-danger no-underline">
                    *
                  </abbr>
                )}
              </h3>
              <p className="shrink-0 text-xs text-muted-foreground">
                {group.minSelection > 0 ? t("required") : t("optional")}
                {!isSingle && ` · ${t("max", { count: group.maxSelection })}`}
              </p>
            </div>

            {/* Chips */}
            <div
              role={isSingle ? "radiogroup" : "group"}
              aria-label={group.name}
              className="flex flex-wrap gap-2"
            >
              {group.options.map((option) => {
                const isSelected = current.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    role={isSingle ? "radio" : "checkbox"}
                    aria-checked={isSelected}
                    onClick={() => handleSelect(group, option.id, isSelected)}
                    className={[
                      "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95",
                      isSelected
                        ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted",
                    ].join(" ")}
                  >
                    <span>{option.name}</span>
                    {option.priceAdjustment !== 0 && (
                      <span className="opacity-75" dir="ltr">
                        {formatPrice(Math.abs(option.priceAdjustment), { sign: true })}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </section>
  );
}
