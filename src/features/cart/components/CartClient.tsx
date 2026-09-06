"use client";

import type {  CartItem } from "@/features/cart/types/cart.types";
import { CartItems } from "./CartItems";
import { CartSummary } from "./CartItems/CartSummary";

interface CartClientProps {
  items: CartItem[];
}

export function CartClient({ items }: CartClientProps) {
  const itemCount =items.length??0;
  const subtotal = items.reduce((total, item) => total + item.itemTotalPrice, 0);
  const storeId = items[0]?.storeId ?? "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <CartItems initialItems={items} />
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
