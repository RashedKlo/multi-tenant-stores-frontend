// features/stores/components/product-detail/AddToCartBar.tsx
"use client";

interface AddToCartBarProps {
  price: number;
  inStock: boolean;
  canAdd: boolean;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAdd: () => void;
  isAdding?: boolean;
}

export function AddToCartBar({
  price,
  inStock,
  canAdd,
  quantity,
  onQuantityChange,
  onAdd,
  isAdding,
}: AddToCartBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        {/* Quantity */}
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center text-lg font-medium active:scale-95"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center text-lg font-medium active:scale-95"
          >
            +
          </button>
        </div>

        {/* Add button */}
        <button
          onClick={onAdd}
          disabled={!inStock || !canAdd || isAdding}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isAdding ? (
            "Adding..."
          ) : (
            <>
              <span>Add to cart</span>
              <span className="opacity-90">
                · {(price * quantity).toFixed(2)} SAR
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}