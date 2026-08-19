"use client";

import type { ProductOptionGroup } from "@/features/products/types";

interface ProductOptionsProps {
  groups: ProductOptionGroup[];
  selected: Record<string, string[]>; // groupId → optionIds
  onChange: (groupId: string, optionIds: string[]) => void;
}

export function ProductOptions({
  groups,
  selected,
  onChange,
}: ProductOptionsProps) {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const current = selected[group.id] ?? [];
        const isSingle = group.selectionType === "Single";

        return (
          <div key={group.id}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{group.name}</h3>
              <span className="text-xs text-muted-foreground">
                {group.minSelection > 0 ? "Required" : "Optional"}
                {group.maxSelection > 1 && ` · Max ${group.maxSelection}`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const isSelected = current.includes(option.id);

                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      if (isSingle) {
                        onChange(group.id, [option.id]);
                      } else {
                        // Multiple
                        if (isSelected) {
                          onChange(
                            group.id,
                            current.filter((id) => id !== option.id)
                          );
                        } else if (current.length < group.maxSelection) {
                          onChange(group.id, [...current, option.id]);
                        }
                      }
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {option.name}
                    {option.priceAdjustment !== 0 && (
                      <span className="ml-1 opacity-80">
                        {option.priceAdjustment > 0 ? "+" : ""}
                        {option.priceAdjustment.toFixed(2)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}