// features/addresses/components/EditAddressClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddressesShell } from "./AddressesShell";
import { AddressForm } from "./AddressForm";
import { updateAddressAction } from "../actions/update-address";
import type { Address } from "../types";
import type { AddressFormValues } from "../schemas/address.schema";

interface EditAddressClientProps {
  address: Address;
}

export function EditAddressClient({ address }: EditAddressClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: AddressFormValues) => {
    setIsSubmitting(true);
    const result = await updateAddressAction({
      id: address.id,
      ...values,
    });

    if (result.success) {
      router.push("/addresses");
      router.refresh();
    } else {
      alert(result.error ?? "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <AddressesShell>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Edit address</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update location or details
        </p>
      </div>

      <AddressForm
        defaultValues={{
          label: address.label,
          addressText: address.addressText,
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        isSubmitting={isSubmitting}
      />
    </AddressesShell>
  );
}