// features/addresses/components/AddressListClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Address } from "../types";
import { AddressCard } from "./AddressCard";
import { DeleteAddressModal } from "./DeleteAddressModal";
import { deleteAddressAction } from "../actions/delete-address";
import { setDefaultAddressAction } from "../actions/set-default-address";

interface AddressListClientProps {
  initialAddresses: Address[];
}

export function AddressListClient({ initialAddresses }: AddressListClientProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState(initialAddresses);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => setDeleteId(id);

  const confirmDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      // Optimistic
      setAddresses((prev) => prev.filter((a) => a.id !== deleteId));
      setDeleteId(null);

      const result = await deleteAddressAction(deleteId);
      if (!result.success) {
        // Revert
        setAddresses(initialAddresses);
      }
      router.refresh();
    });
  };

  const handleSetDefault = (id: string) => {
    startTransition(async () => {
      // Optimistic
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }))
      );

      const result = await setDefaultAddressAction(id);
      if (!result.success) {
        setAddresses(initialAddresses);
      }
      router.refresh();
    });
  };

  return (
    <>
      <div className="space-y-3">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      <DeleteAddressModal
        open={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isDeleting={isPending}
      />
    </>
  );
}