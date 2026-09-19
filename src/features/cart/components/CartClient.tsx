"use client";

import type {  CartItem } from "@/features/cart/types/cart.types";
import { CartSummary } from "./CartSummary";
import { CartItemsClient } from "./CartItemsClient";

interface CartClientProps {
  items: CartItem[];
}

export function CartClient({ items }: CartClientProps) {
  const itemCount =items.length??0;
  const subtotal = items.reduce((total, item) => total + item.itemTotalPrice, 0);
  const storeId = items[0]?.storeId ?? "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <CartItemsClient initialItems={items} />
      <aside className="lg:sticky lg:top-20">
        <CartSummary
          subtotal={subtotal}
          storeId={storeId}
          itemCount={itemCount}
        />
      </aside>
    </div>
  );
}
