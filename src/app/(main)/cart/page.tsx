// src/app/(main)/cart/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { CartShell,Cart,CartItemsSkeleton } from "@/features/cart";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cart");
  return { title: t("title") };
}

export default async function CartPage() {
  const t = await getTranslations("cart");
  return (
    <CartShell title={t("title")}>
      <Suspense fallback={<CartItemsSkeleton />}>
        <Cart />
      </Suspense>
    </CartShell>
  );
}