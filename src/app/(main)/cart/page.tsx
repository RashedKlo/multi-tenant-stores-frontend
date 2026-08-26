// app/(main)/[storeId]/cart/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { getCart } from "@/features/cart";
import { CartShell } from "@/features/cart/components/CartShell";
import { CartItems } from "@/features/cart/components/sections/CartItems";
import { CartSummary } from "@/features/cart/components/sections/CartSummary";

interface CartPageProps {
  params: Promise<{ storeId: string }>;
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const [t, { storeId }] = await Promise.all([getTranslations("cart"), params]);
  void storeId;
  return { title: t("title") };
}

export default async function CartPage({ params }: CartPageProps) {
  const [{ storeId }, t] = await Promise.all([params, getTranslations("cart")]);
  const cart = await getCart(storeId);

  return (
    <CartShell>
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <header className="flex items-baseline justify-between gap-3">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t("title")}</h1>
          {!cart.isEmpty && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {t("itemCount", { count: cart.totalItemCount })}
            </span>
          )}
        </header>

        <Suspense fallback={<CartSkeleton />}>
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
            <CartItems storeId={storeId} initialItems={cart.items} />
            <aside className="lg:sticky lg:top-20">
              <CartSummary subtotal={cart.subtotal} storeId={storeId} />
            </aside>
          </div>
        </Suspense>
      </div>
    </CartShell>
  );
}

function CartSkeleton() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
      <CartItems.Skeleton />
      <CartSummary.Skeleton />
    </div>
  );
}
