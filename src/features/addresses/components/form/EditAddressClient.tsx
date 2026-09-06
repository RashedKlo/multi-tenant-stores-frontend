// features/addresses/components/EditAddressClient.tsx
"use client";

import { AddressForm } from "./AddressForm";
import type { Address } from "../../types";

interface EditAddressClientProps {
  address: Address;
}

export function EditAddressClient({ address }: EditAddressClientProps) {
  return <AddressForm mode="edit" initial={address} />;
}