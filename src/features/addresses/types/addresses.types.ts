// features/addresses/types/addresses.types.ts
export type Address = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  addressText: string;
  isDefault: boolean;
};

export type CreateAddressInput = {
  label: string;
  latitude: number;
  longitude: number;
  addressText: string;
  isDefault?: boolean;
};

export type UpdateAddressInput = {
  label: string;
  latitude: number;
  longitude: number;
  addressText: string;
};

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };