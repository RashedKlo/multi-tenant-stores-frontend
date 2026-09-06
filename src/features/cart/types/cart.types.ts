// src/features/cart/types/cart.types.ts

export interface SelectedOption {
  optionId: string;
  groupName: string;
  optionName: string;
  priceAdjustment: number;
}

export interface CartItem {
  cartItemId: string;
  cartId: string;
  storeId: string;
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  quantity: number;
  notes?: string | null;
  selectedOptions: SelectedOption[];
  itemTotalPrice: number;
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
