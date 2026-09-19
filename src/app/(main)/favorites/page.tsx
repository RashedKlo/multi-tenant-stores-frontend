// app/(main)/favorites/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { FavoritesShell } from "@/features/favorites/components/FavoritesShell";
import { FavoriteProducts } from "@/features/favorites/components/sections/FavoriteProducts";
import { FavoriteStores } from "@/features/favorites/components/sections/FavoriteStores";
import { FavoritesTabs } from "@/features/favorites/components/FavoritesTabs";
import { AuthGate } from "@/shared/lib/ui";

type FavoritesTab = "products" | "stores";

interface FavoritesPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({
  searchParams,
}: FavoritesPageProps): Promise<Metadata> {
  const [{ tab }, t] = await Promise.all([
    searchParams,
    getTranslations("favorites"),
  ]);
  const activeTab: FavoritesTab = tab === "stores" ? "stores" : "products";

  return {
    title: activeTab === "stores" ? t("stores") : t("products"),
  };
}

export default async function FavoritesPage({ searchParams }: FavoritesPageProps) {
  const [{ tab }, t] = await Promise.all([searchParams, getTranslations("favorites")]);

  // Whitelist — anything else falls back to products
  const activeTab: FavoritesTab = tab === "stores" ? "stores" : "products";

  return (
    <AuthGate redirectTo={"/favorites"}>
    <FavoritesShell title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-5">
        {/* Segmented tabs */}
        <FavoritesTabs active={activeTab} />

        {/* Active panel — independent Suspense boundary */}
        <Suspense fallback={<FavoritesFallback active={activeTab} />}>
          {activeTab === "products" ? (
            <FavoriteProducts />
          ) : (
            <FavoriteStores />
          )}
        </Suspense>
      </div>
    </FavoritesShell>
    </AuthGate>
  );
}

/** Local helper keeps the JSX tidy; reuses each section's attached skeleton. */
function FavoritesFallback({ active }: { active: FavoritesTab }) {
  return (
    <div aria-hidden>{active === "products" ? <FavoriteProducts.skeleton /> : <FavoriteStores.skeleton />}</div>
  );
}
