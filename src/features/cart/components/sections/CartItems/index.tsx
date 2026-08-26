// src/features/cart/components/sections/CartItems/index.tsx
"use client";

import type { CartItem } from "@/features/cart/types";
import { CartItemsClient } from "./CartItemsClient";
import { CartEmpty } from "./empty";
import { CartItemsSkeleton } from "./skeleton";

export function CartItems(props: {
  storeId: string;
  initialItems: CartItem[];
}) {
  if (props.initialItems.length === 0) return <CartEmpty />;
  return <CartItemsClient {...props} />;
}

CartItems.Skeleton = CartItemsSkeleton;