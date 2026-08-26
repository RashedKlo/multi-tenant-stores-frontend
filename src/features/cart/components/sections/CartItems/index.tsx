// features/cart/components/sections/CartItems/index.tsx
"use client";

import { useTranslations } from "next-intl";
import type { CartItem } from "../../types";
import { CartItemsClient } from "./CartItemsClient";
import { CartEmpty } from "./empty";
import { CartItemsSkeleton } from "./skeleton";

export function CartItems(props: { storeId: string; initialItems: CartItem[] }) {
  const t = useTranslations("cart");

  if (props.initialItems.length === 0) return <CartEmpty />;
  return <CartItemsClient {...props} />;
}

export { CartItemsSkeleton as Skeleton };
