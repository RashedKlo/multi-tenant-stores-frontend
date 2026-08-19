"use client";

import { useMemo, useState } from "react";
import type { ProductDetail } from "@/features/products/types";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductOptions } from "./ProductOptions";
import { AddToCartBar } from "./AddToCartBar";

interface ProductDetailClientProps {
  product: ProductDetail;
  storeId: string;
}

export function ProductDetailClient({
  product,
  storeId,
}: ProductDetailClientProps) {
  // Pre-select default options
  const initialSelected = useMemo(() => {
    const map: Record<string, string[]> = {};
    product.optionGroups.forEach((group) => {
      const defaults = group.options
        .filter((o) => o.isDefault)
        .map((o) => o.id);
      if (defaults.length) map[group.id] = defaults;
    });
    return map;
  }, [product.optionGroups]);

  const [selected, setSelected] = useState(initialSelected);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Calculate final price
  const finalPrice = useMemo(() => {
    let total = product.price;
    product.optionGroups.forEach((group) => {
      const selectedIds = selected[group.id] ?? [];
      selectedIds.forEach((id) => {
        const option = group.options.find((o) => o.id === id);
        if (option) total += option.priceAdjustment;
      });
    });
    return total;
  }, [product, selected]);

  // Validation
  const canAdd = useMemo(() => {
    return product.optionGroups.every((group) => {
      const count = (selected[group.id] ?? []).length;
      return count >= group.minSelection && count <= group.maxSelection;
    });
  }, [product.optionGroups, selected]);

  const handleAddToCart = async () => {
    if (!canAdd || !product.inStock) return;

    setIsAdding(true);
    try {
      // TODO: call your cart API
      // await addToCart({ storeId, productId: product.id, quantity, optionIds: ... })
      console.log("Add to cart", {
        storeId,
        productId: product.id,
        quantity,
        selected,
        finalPrice,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="space-y-6 pb-28">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
        <ProductOptions
          groups={product.optionGroups}
          selected={selected}
          onChange={(groupId, optionIds) =>
            setSelected((prev) => ({ ...prev, [groupId]: optionIds }))
          }
        />
      </div>

      <AddToCartBar
        price={finalPrice}
        inStock={product.inStock}
        canAdd={canAdd}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAdd={handleAddToCart}
        isAdding={isAdding}
      />
    </>
  );
}