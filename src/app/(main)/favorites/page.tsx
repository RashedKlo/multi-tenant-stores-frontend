// app/(main)/favorites/page.tsx
import { Suspense } from "react";
import { FavoritesShell } from "@/features/favorites/components/FavoritesShell";
import { FavoriteProducts } from "@/features/favorites/components/sections/FavoriteProducts";
import { FavoriteStores } from "@/features/favorites/components/sections/FavoriteStores";
import { FavoritesTabsServer } from "@/features/favorites/components/FavoritesTabs";

interface FavoritesPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function FavoritesPage({ searchParams }: FavoritesPageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === "stores" ? "stores" : "products";

  return (
    <FavoritesShell>
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold">My Favorites</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Products and stores you love
          </p>
        </div>

        <FavoritesTabsServer active={activeTab} />

        <Suspense
          fallback={
            activeTab === "products" ? (
              <FavoriteProducts.skeleton />
            ) : (
              <FavoriteStores.skeleton />
            )
          }
        >
          {activeTab === "products" ? (
            <FavoriteProducts />
          ) : (
            <FavoriteStores />
          )}
        </Suspense>
      </div>
    </FavoritesShell>
  );
}