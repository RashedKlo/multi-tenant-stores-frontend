// src/features/cart/components/sections/CartItems/CartItemsClient.tsx
"use client";

import { useOptimistic, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import type { CartItem } from "@/features/cart/types/cart.types";
import {
  updateCartItemAction,
} from "@/features/cart/actions/update-cart-item";
import { removeCartItemAction } from "@/features/cart/actions/remove-cart-item";
import { CartItemCard } from "./CartItemCard";
import { CartEmpty } from "./empty";

interface CartItemsClientProps {
  initialItems: CartItem[];
}

type OptimisticAction =
  | { type: "update"; id: string; quantity: number }
  | { type: "remove"; id: string };

export function CartItemsClient({
  initialItems,
}: CartItemsClientProps) {
  const t = useTranslations("cart");
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    initialItems,
    (state: CartItem[], action: OptimisticAction): CartItem[] => {
      if (action.type === "update") {
        return state.map((i) =>
          i.cartItemId === action.id
            ? {
                ...i,
                quantity: action.quantity,
                itemTotalPrice:
                  (i.basePrice +
                    i.selectedOptions.reduce(
                      (total, option) => total + option.priceAdjustment,
                      0,
                    )) * action.quantity,
              }
            : i,
        );
      }
      return state.filter((i) => i.cartItemId !== action.id);
    },
  );

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    if (quantity < 1 || pendingId) return;

    startTransition(async () => {
      setPendingId(item.cartItemId);
      dispatchOptimistic({ type: "update", id: item.cartItemId, quantity });

      const result = await updateCartItemAction({
        cartItemId: item.cartItemId,
        storeId: item.storeId,
        quantity,
      });

      setPendingId(null);
      if (!result.success) {
        router.refresh();
        return;
      }
      router.refresh();
    });
  };

  const handleRemove = (item: CartItem) => {
    if (pendingId) return;

    startTransition(async () => {
      setPendingId(item.cartItemId);
      dispatchOptimistic({ type: "remove", id: item.cartItemId });

      const result = await removeCartItemAction({
        cartItemId: item.cartItemId,
        storeId: item.storeId,
      });

      setPendingId(null);
      if (!result.success) {
        router.refresh();
        return;
      }
      router.refresh();
    });
  };

  if (optimisticItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="space-y-6" aria-label={t("itemsLabel")}>
      <ul role="list" className="space-y-3">
        {optimisticItems.map((item) => (
          <li key={item.cartItemId}>
            <CartItemCard
              item={item}
              pending={pendingId === item.cartItemId}
              onQuantityChange={(q) => handleQuantityChange(item, q)}
              onRemove={() => handleRemove(item)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
