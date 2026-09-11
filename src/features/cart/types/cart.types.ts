// src/features/cart/types/cart.types.ts

export interface SelectedOption {
  optionId: string;
  groupName: string;
  optionName: string;
  priceAdjustment: number;
}

export interface RawSelectedOption {
  optionId?: string;
  option_id?: string;
  groupName?: string;
  group_name?: string;
  optionName?: string;
  option_name?: string;
  priceAdjustment?: number | string | null;
  price_adjustment?: number | string | null;
}

export interface RawCartItem {
  cartItemId?: string;
  cart_item_id?: string;
  cartId?: string;
  cart_id?: string;
  storeId?: string;
  store_id?: string;
  productId?: string;
  product_id?: string;
  productName?: string;
  product_name?: string;
  productImage?: string | null;
  product_image?: string | null;
  basePrice?: number | string | null;
  base_price?: number | string | null;
  quantity?: number | string | null;
  notes?: string | null;
  selectedOptions?: SelectedOption[] | RawSelectedOption[] | null;
  selected_options?: SelectedOption[] | RawSelectedOption[] | null;
  itemTotalPrice?: number | string | null;
  item_total_price?: number | string | null;
}

export interface CartItem {
  cartItemId: string;
  cartId: string;
  storeId?: string;
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  quantity: number;
  notes?: string | null;
  selectedOptions: SelectedOption[];
  itemTotalPrice: number;
}

export function normalizeCartItem(raw: RawCartItem): CartItem {
  const selectedOptions = (raw.selectedOptions ?? raw.selected_options ?? []).map(
    (option) => {
      const normalizedOption = option as RawSelectedOption;
      return {
        optionId:
          normalizedOption.optionId ?? normalizedOption.option_id ?? "",
        groupName:
          normalizedOption.groupName ?? normalizedOption.group_name ?? "Option",
        optionName:
          normalizedOption.optionName ?? normalizedOption.option_name ?? "Selected",
        priceAdjustment: Number(
          normalizedOption.priceAdjustment ?? normalizedOption.price_adjustment ?? 0,
        ),
      } satisfies SelectedOption;
    },
  );

  return {
    cartItemId: raw.cartItemId ?? raw.cart_item_id ?? "",
    cartId: raw.cartId ?? raw.cart_id ?? "",
    storeId: raw.storeId ?? raw.store_id,
    productId: raw.productId ?? raw.product_id ?? "",
    productName: raw.productName ?? raw.product_name ?? "",
    productImage: raw.productImage ?? raw.product_image ?? "",
    basePrice: Number(raw.basePrice ?? raw.base_price ?? 0),
    quantity: Number(raw.quantity ?? 0),
    notes: raw.notes ?? null,
    selectedOptions,
    itemTotalPrice: Number(raw.itemTotalPrice ?? raw.item_total_price ?? 0),
  };
}


export interface AddCartItemInput {
  storeId: string;
  productId: string;
  quantity: number;
  optionIds?: string[];
  notes?: string;
}

export interface UpdateCartItemInput {
  cartItemId: string;
  storeId: string;
  quantity: number;
}

export interface RemoveCartItemInput {
  cartItemId: string;
  storeId: string;
}

export interface ClearCartInput {
  storeId: string;
}

export type CartActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };
