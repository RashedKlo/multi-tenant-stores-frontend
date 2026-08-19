import type { NavItem } from "../types/layout.types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", labelKey: "home", href: "/home", icon: "home" },
  { id: "cart", labelKey: "cart", href: "/cart", icon: "cart" },
  { id: "favorites", labelKey: "favorites", href: "/favorites", icon: "heart" },
  { id: "orders", labelKey: "orders", href: "/orders", icon: "orders" },
  { id: "profile", labelKey: "profile", href: "/profile", icon: "user" },
];
