// features/addresses/types/addresses.types.ts
export type Address = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  addressText: string;
  isDefault: boolean;
};
