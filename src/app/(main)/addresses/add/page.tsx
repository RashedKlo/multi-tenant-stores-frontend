// app/(main)/addresses/add/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddressesShell } from "@/features/addresses/components/AddressesShell";
import { AddressForm } from "@/features/addresses/components/AddressForm";
import { createAddressAction } from "@/features/addresses/actions/create-address";
import type { AddressFormValues } from "@/features/addresses/schemas/address.schema";

export default function AddAddressPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: AddressFormValues) => {
    setIsSubmitting(true);
    const result = await createAddressAction(values);

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
        <h1 className="text-xl font-bold">Add new address</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          First pick your location, then fill the details
        </p>
      </div>

      <AddressForm
        onSubmit={handleSubmit}
        submitLabel="Add address"
        isSubmitting={isSubmitting}
      />
    </AddressesShell>
  );
}