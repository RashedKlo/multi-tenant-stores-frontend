// features/favorites/components/FavoritesTabsServer.tsx
"use client"
import Link from "next/link";

interface FavoritesTabsServerProps {
  active: "products" | "stores";
}

export function FavoritesTabsServer({ active }: FavoritesTabsServerProps) {
  return (
    <div className="flex rounded-full border border-border bg-muted/40 p-1">
      <Link
        href="/favorites?tab=products"
        className={`flex-1 rounded-full py-2 text-center text-sm font-medium transition-all ${
          active === "products"
            ? "bg-background shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Products
      </Link>

      <Link
        href="/favorites?tab=stores"
        
        className={`flex-1 rounded-full py-2 text-center text-sm font-medium transition-all ${
          active === "stores"
            ? "bg-background shadow-sm "
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Stores
      </Link>
    </div>
  );
}