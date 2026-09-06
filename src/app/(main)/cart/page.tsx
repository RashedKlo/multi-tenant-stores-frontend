// src/app/(main)/cart/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCart } from "@/features/cart/api/get-cart";
import { MOCK_CART_ITEMS } from "@/features/cart/constants/mock-cart";
import { CartClient } from "@/features/cart/components/CartClient";
import { CartShell } from "@/features/cart/components/CartShell";


export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cart");
  return { title: t("title") };
}

export default async function CartPage() {
  const t = await getTranslations("cart");
  // const items = await getCart();
  const items=MOCK_CART_ITEMS;
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartShell title={t("title")} itemCount={itemCount}>
      <CartClient items={items} />
    </CartShell>
  );
}
