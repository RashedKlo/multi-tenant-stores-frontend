// features/stores/components/sections/Products/empty.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProductsEmpty() {
  const t = useTranslations("products");
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    // Clear all product filters, keep the same path
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl" aria-hidden>
        🛒
      </div>
      <p className="text-sm font-medium">{t("noProducts")}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("noProductsHint")}
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="mt-5 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
      >
        {t("resetFilters")}
      </button>
    </div>
  );
}