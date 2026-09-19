// src/features/cart/components/sections/CartItems/CartItemsClient.tsx
"use client";

import { useOptimistic, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import type { CartItem } from "@/features/cart/types/cart.types";
import { updateCartItemAction } from "@/features/cart/actions/update-cart-item";
import { removeCartItemAction } from "@/features/cart/actions/remove-cart-item";
import { ConfirmModal, Notification } from "@/shared/lib/ui";
import { CartEmpty } from "./empty";
import { CartItemCard } from "./CartItemCard";


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
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [notice, setNotice] = useState<
    { message: string; variant: "success" | "error" } | null
  >(null);

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
        storeId: item.storeId??"",  
        quantity,
      });

      setPendingId(null);
      if (!result.success) {
        setNotice({
          message: result.error || t("updateError"),
          variant: "error",
        });
        router.refresh();
        return;
      }

      setNotice({ message: t("updateSuccess"), variant: "success" });
      router.refresh();
    });
  };

  const handleRemoveConfirm = async () => {
    if (!itemToRemove || pendingId) return;

    const item = itemToRemove;
    setItemToRemove(null);

    startTransition(async () => {
      setPendingId(item.cartItemId);
      dispatchOptimistic({ type: "remove", id: item.cartItemId });

      const result = await removeCartItemAction({
        cartItemId: item.cartItemId,
        storeId: item.storeId??"",
      });

      setPendingId(null);
      if (!result.success) {
        setNotice({
          message: result.error || t("removeError"),
          variant: "error",
        });
        router.refresh();
        return;
      }

      setNotice({ message: t("removeSuccess"), variant: "success" });
      router.refresh();
    });
  };

  if (optimisticItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="space-y-6" aria-label={t("itemsLabel")}>
      {notice && (
        <Notification
          message={notice.message}
          variant={notice.variant}
          onDismiss={() => setNotice(null)}
        />
      )}

      <ul role="list" className="space-y-3">
        {optimisticItems.map((item) => (
          <li key={item.cartItemId}>
            <CartItemCard
              item={item}
              pending={pendingId === item.cartItemId}
              onQuantityChange={(q) => handleQuantityChange(item, q)}
              onRemove={() => setItemToRemove(item)}
            />
          </li>
        ))}
      </ul>

      <ConfirmModal
        open={Boolean(itemToRemove)}
        title={t("confirmRemove.title")}
        description={t("confirmRemove.description", {
          name: itemToRemove?.productName ?? "",
        })}
        cancelLabel={t("confirmRemove.cancel")}
        confirmLabel={t("confirmRemove.confirm")}
        onClose={() => setItemToRemove(null)}
        onConfirm={handleRemoveConfirm}
        isLoading={pendingId === itemToRemove?.cartItemId}
      />
    </div>
  );
}
