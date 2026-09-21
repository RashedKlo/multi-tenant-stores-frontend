import type { ProductDetail } from "../types";

export function buildInitialSelection(
  groups: ProductDetail["optionGroups"],
): Record<string, string[]> {
  const selection: Record<string, string[]> = {};

  for (const group of groups) {
    const defaults = group.options
      .filter((option) => option.isDefault)
      .map((option) => option.id);
    if (defaults.length > 0) selection[group.id] = defaults;
  }

  return selection;
}