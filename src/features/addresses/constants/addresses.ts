// features/addresses/constants/addresses.ts
import type { Address } from "../types";

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr-101",
    label: "Home",
    latitude: 24.7136,
    longitude: 46.6753,
    addressText: "Villa 12, King Fahd District, Riyadh 12271, Saudi Arabia",
    isDefault: true,
  },
  {
    id: "addr-102",
    label: "Work / Office",
    latitude: 24.6877,
    longitude: 46.7001,
    addressText: "Floor 14, Al Olaya Tower, King Fahd Rd, Al Olaya, Riyadh 12211, Saudi Arabia",
    isDefault: false,
  },
  {
    id: "addr-103",
    label: "Parents' House",
    latitude: 24.8188,
    longitude: 46.6342,
    addressText: "Building 45, Al Yasmin District, Northern Ring Rd, Riyadh 13322, Saudi Arabia",
    isDefault: false,
  },
];

export const MOCK_DEFAULT_ADDRESS: Address = MOCK_ADDRESSES[0];