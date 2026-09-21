// features/stores/components/product-detail/ProductDetailClient.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import type { ProductDetail } from "@/features/products/types";
import { addCartItemAction } from "@/features/cart/actions/add-cart-item";

import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductOptions } from "./ProductOptions";
import { AddToCartBar } from "./AddToCartBar";
import { Notification } from "@/shared/lib/ui";
import { buildInitialSelection } from "../../../lib/selection";

interface ProductDetailClientProps {
  product: ProductDetail;
  storeId: string;
}

export function ProductDetailClient({ product, storeId }: ProductDetailClientProps) {
  const t = useTranslations("productDetail");
  const router = useRouter();

  // Pre-select default options — computed once, not memo-wrapped
  const [selected, setSelected] = useState<Record<string, string[]>>(() =>
    buildInitialSelection(product.optionGroups),
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  /** First incomplete required group — used for the inline hint. */
  const missingGroup = useMemo(
    () =>
      product.optionGroups.find((group) => {
        const count = (selected[group.id] ?? []).length;
        return count < group.minSelection;
      })?.name,
    [product.optionGroups, selected],
  );

  const finalPrice = useMemo(() => {
    let total = product.price;
    for (const group of product.optionGroups) {
      for (const id of selected[group.id] ?? []) {
        const option = group.options.find((o) => o.id === id);
        if (option) total += option.priceAdjustment;
      }
    }
    return total * quantity; // ← multiply by quantity at the end, once
  }, [product.optionGroups, product.price, selected, quantity]);
  const canAdd =
    product.inStock &&
    product.optionGroups.every((group) => {
      const count = (selected[group.id] ?? []).length;
      return count >= group.minSelection && count <= group.maxSelection;
    });

  /** Clamp quantity to stock so users can't add more than available. */
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.min(Math.max(1, value), product.stockQuantity ?? 99));
  };

  const handleAddToCart = async () => {
    if (!canAdd || isAdding) return;

    setIsAdding(true);
    setError(null);

    try {
      const result = await addCartItemAction({
        storeId,
        productId: product.id,
        quantity,
        optionIds: Object.values(selected).flat(),
      });
      if (!result.success) {
        setError(t("addToCartError"));
        setSuccess(null);
        return;
      }

      setSuccess(t("addedToCart"));
      setError(null);
      router.refresh();
    } catch (error) {
      setError(t("addToCartError"));
      setSuccess(null);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="space-y-6 pb-28 sm:pb-32">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />

        <ProductOptions
          groups={product.optionGroups}
          selected={selected}
          onChange={(groupId, optionIds) =>
            setSelected((prev) => ({ ...prev, [groupId]: optionIds }))
          }
        />

        {/* Inline validation hint — tells the user WHAT is missing */}
        {!product.inStock ? (
          <p role="alert" className="text-sm font-medium text-danger">
            {t("outOfStockHint")}
          </p>
        ) : (
          missingGroup && (
            <p role="status" className="flex items-center gap-2 text-sm text-danger">
              <span aria-hidden>*</span>
              {t("selectRequiredFor", { group: missingGroup })}
            </p>
          )
        )}

        {/* Network failure hint — separate from validation */}
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        {success && (
          <Notification
            message={success}
            variant="success"
            onDismiss={() => setSuccess(null)}
          />
        )}
      </div>

      <AddToCartBar
        price={finalPrice}
        inStock={product.inStock}
        canAdd={canAdd && !isAdding}
        quantity={quantity}
        maxQuantity={product.stockQuantity}
        onQuantityChange={handleQuantityChange}
        onAdd={handleAddToCart}
        isAdding={isAdding}
      />
    </>
  );
}

