// features/favorites/components/FavoritesTabs.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type FavoritesTab = "products" | "stores";

const TABS: Array<{ id: FavoritesTab; queryValue: string }> = [
  { id: "products", queryValue: "products" },
  { id: "stores", queryValue: "stores" },
];

interface FavoritesTabsProps {
  active: FavoritesTab;
}

/** Server component — pure links, no interactivity needed. */
export async function FavoritesTabs({ active }: FavoritesTabsProps) {
  const t = await getTranslations("favorites");

  return (
    <nav
      role="tablist"
      aria-label={t("tabsLabel")}
      className="flex rounded-full border border-border bg-muted/40 p-1"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <Link
            key={tab.id}
            href={{ pathname: "/favorites", query: { tab: tab.queryValue } }}
            scroll={false}
            replace
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            className={[
              "flex-1 rounded-full py-2 text-center text-sm font-medium transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.97]",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {t(tab.id)}
          </Link>
        );
      })}
    </nav>
  );
}
