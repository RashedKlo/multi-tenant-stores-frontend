// src/features/cart/components/sections/CartItems/CartItemsClient.tsx
"use client";

import { useOptimistic, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import type { CartItem, LocalizedCartItem } from "@/features/cart/types";
import {
  updateCartItemAction,
  removeCartItemAction,
} from "@/features/cart/actions";
import {
  localizeCartItems,
  recalcItemTotal,
} from "@/features/cart/lib/cart-helpers";
import { CartItemCard } from "./CartItemCard";

interface CartItemsClientProps {
  storeId: string;
  initialItems: CartItem[];
}

type Action =
  | { type: "update"; id: string; quantity: number }
  | { type: "remove"; id: string };

export function CartItemsClient({ storeId, initialItems }: CartItemsClientProps) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();

  const baseItems = localizeCartItems(initialItems, locale);

  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    baseItems,
    (state: LocalizedCartItem[], action: Action): LocalizedCartItem[] => {
      if (action.type === "update") {
        return state.map((i) =>
          i.cartItemId === action.id
            ? {
                ...i,
                quantity: action.quantity,
                itemTotalPrice: recalcItemTotal(i, action.quantity),
              }
            : i,
        );
      }
      return state.filter((i) => i.cartItemId !== action.id);
    },
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "update", id, quantity });
      const result = await updateCartItemAction({
        cartItemId: id,
        storeId,
        quantity,
      });
      if (!result.success) router.refresh();
    });
  };

  const handleRemove = (id: string) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "remove", id });
      const result = await removeCartItemAction({ cartItemId: id, storeId });
      if (!result.success) router.refresh();
    });
  };

  if (optimisticItems.length === 0) {
    return null; // parent shows empty when initial was empty; after last remove, page refresh via revalidate
  }

  return (
    <ul role="list" className="space-y-3" aria-label={t("itemsLabel")}>
      {optimisticItems.map((item) => (
        <li key={item.cartItemId}>
          <CartItemCard
            item={item}
            storeId={storeId}
            onQuantityChange={(q) => handleQuantityChange(item.cartItemId, q)}
            onRemove={() => handleRemove(item.cartItemId)}
          />
        </li>
      ))}
    </ul>
  );
}