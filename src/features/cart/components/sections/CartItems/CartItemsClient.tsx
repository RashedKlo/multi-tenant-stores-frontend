// features/cart/components/sections/CartItems/CartItemsClient.tsx
"use client";

import { useOptimistic, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import type { CartItem, LocalizedCartItem } from "@/features/cart/types";
import { updateCartItemAction, removeCartItemAction } from "@/features/cart/actions";
import { localizeCartItems } from "@/features/cart/lib/cart-helpers";

import { CartItemCard } from "./CartItemCard";

interface CartItemsProps {
  storeId: string;
  initialItems: CartItem[];
}

type Action =
  | { type: "update"; id: string; quantity: number }
  | { type: "remove"; id: string };

export function CartItems({ storeId, initialItems }: CartItemsProps) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();

  const [items] = useState(() => localizeCartItems(initialItems, locale));
  const [, dispatchOptimistic] = useOptimistic(
    items,
    (state: LocalizedCartItem[], action: Action): LocalizedCartItem[] =>
      action.type === "update"
        ? state.map((i) =>
            i.cartItemId === action.id
              ? { ...i, quantity: action.quantity, itemTotalPrice: recalcTotal(i, action.quantity) }
              : i,
          )
        : state.filter((i) => i.cartItemId !== action.id),
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "update", id, quantity });
      const result = await updateCartItemAction({ cartItemId: id, storeId, quantity });
      if (!result.success) router.refresh(); // rollback via server truth
    });
  };

  const handleRemove = (id: string) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "remove", id });
      const result = await removeCartItemAction({ cartItemId: id, storeId });
      if (!result.success) router.refresh();
    });
  };

  return (
    <ul role="list" className="space-y-3" aria-label={t("itemsLabel")}>
      {items.map((item) => (
        <li key={item.cartItemId}>
          <CartItemCard
            item={item}
            onQuantityChange={(q) => handleQuantityChange(item.cartItemId, q)}
            onRemove={() => handleRemove(item.cartItemId)}
          />
        </li>
      ))}
    </ul>
  );
}

function recalcTotal(item: LocalizedCartItem, newQuantity: number): number {
  const optionsTotal = item.selectedOptions.reduce((sum, o) => sum + o.priceAdjustment, 0);
  return (item.basePrice + optionsTotal) * newQuantity;
}
