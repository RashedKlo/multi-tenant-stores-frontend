// src/app/(main)/cart/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { getCart, CartShell, CartItems, CartSummary } from "@/features/cart";

interface CartPageProps {
  searchParams: Promise<{ storeId?: string }>;
  // or params if your route is /[storeId]/cart — adjust to your routing
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cart");
  return { title: t("title") };
}

export default async function CartPage({ searchParams }: CartPageProps) {
  const { storeId = "" } = await searchParams;
  const t = await getTranslations("cart");
  const cart = await getCart(storeId);
  // const cart =MOCK_CART

  return (
    <CartShell>
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <header className="flex items-baseline justify-between gap-3">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            {t("title")}
          </h1>
          {!cart && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {t("itemCount", { count: 0 })}
            </span>
          )}
        </header>

        <Suspense
          fallback={
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
              <CartItems.Skeleton />
            </div>
          }
        >
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
            <CartItems storeId={storeId} initialItems={cart.items} />
            <aside className="lg:sticky lg:top-20">
              <CartSummary
                subtotal={cart.subtotal}
                storeId={storeId}
                isEmpty={cart.totalItemCount==0}
              />
            </aside>
          </div>
        </Suspense>
      </div>
    </CartShell>
  );
}