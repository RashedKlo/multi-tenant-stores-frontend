"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { DiscountedProduct, PagedDiscountedProducts } from "@/features/stores/types";
import { formatPrice } from "@/shared/lib/format";

interface DiscountedProductsClientProps {
  data: PagedDiscountedProducts;
  storeId: string;
}

function formatDiscount(type: string, value: number, locale: string): string {
  const normalizedType = type.toLowerCase();
  return normalizedType.includes("percent") || normalizedType.includes("percentage")
    ? `${value}%`
    : formatPrice(value, { locale });
}

function DiscountedProductCard({
  product,
  storeId,
}: {
  product: DiscountedProduct;
  storeId: string;
}) {
  const t = useTranslations("discountedProducts");
  const locale = useLocale();

  return (
    <Link
      href={`/stores/${storeId}/products/${product.id}`}
      aria-label={product.name}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full bg-muted">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt=""
            fill
            quality={80}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 to-muted text-2xl font-bold text-muted-foreground"
          >
            {product.name.charAt(0)}
          </span>
        )}
        <span className="absolute inset-s-2 top-2 rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-danger-foreground">
          {formatDiscount(product.discount.type, product.discount.value, locale)}
        </span>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-auto flex items-baseline gap-1.5">
          <span className="text-sm font-bold" dir="ltr">
            {formatPrice(product.finalPrice, { locale })}
          </span>
          <s className="text-xs text-muted-foreground" dir="ltr">
            {formatPrice(product.price, { locale })}
          </s>
        </p>
      </div>
    </Link>
  );
}

export function DiscountedProductsClient({
  data,
  storeId,
}: DiscountedProductsClientProps) {
  const t = useTranslations("discountedProducts");

  return (
    <section aria-labelledby="discounted-products-heading">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="discounted-products-heading" className="text-base font-semibold tracking-tight sm:text-lg">
          {t("title")}
        </h2>
        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
          {t("count", { count: data.totalCount })}
        </span>
      </div>
      <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.items.map((product) => (
          <li key={product.id}>
            <DiscountedProductCard product={product} storeId={storeId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
