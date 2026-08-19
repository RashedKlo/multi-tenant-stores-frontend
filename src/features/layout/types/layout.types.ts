export type NavItemId =
  | "home"
  | "cart"
  | "favorites"
  | "orders"
  | "profile";

export type NavLabelKey = "home" | "cart" | "favorites" | "orders" | "profile";

export interface NavItem {
  id: NavItemId;
  labelKey: NavLabelKey;
  href: string;
  /** Lucide icon name – used by the icon component */
  icon: "home" | "cart" | "heart" | "orders" | "user";
}