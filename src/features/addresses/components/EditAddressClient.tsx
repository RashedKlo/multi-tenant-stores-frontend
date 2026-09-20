// features/addresses/components/EditAddressClient.tsx
"use client";

import { AddressForm } from "./form/AddressForm";
import type { Address } from "../types/addresses.types";

interface EditAddressClientProps {
  address: Address;
  returnTo?:string;
}

export function EditAddressClient({ returnTo, address }: EditAddressClientProps) {
  return <AddressForm mode="edit" initial={address} returnTo={returnTo}/>;
}