// features/addresses/components/AddressListClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ConfirmModal } from "@/shared/lib/ui";
import type { Address } from "../../types";
import { AddressCard } from "./AddressCard";
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from "../../actions";

interface AddressListClientProps {
  addresses: Address[];
}

export function AddressListClient({ addresses: initial }: AddressListClientProps) {
  const t = useTranslations("addresses");
  const router = useRouter();
  const [addresses, setAddresses] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSetDefault(id: string) {
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const result = await setDefaultAddressAction(id);
      setBusyId(null);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id })),
      );
      router.refresh();
    });
  }

  function handleDeleteConfirm() {
    if (!deleteId) return;
    const id = deleteId;
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const result = await deleteAddressAction(id);
      setBusyId(null);
      setDeleteId(null);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    });
  }

  if (addresses.length === 0) {
    return null; // parent renders empty state
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <ul className="flex flex-col gap-3" aria-label={t("listLabel")}>
        {addresses.map((address) => (
          <li key={address.id}>
            <AddressCard
              address={address}
              onSetDefault={handleSetDefault}
              onDelete={(id) => setDeleteId(id)}
              isBusy={isPending && busyId === address.id}
            />
          </li>
        ))}
      </ul>

      <ConfirmModal
        open={deleteId !== null}
        title={t("deleteModal.title")}
        description={t("deleteModal.description")}
        cancelLabel={t("deleteModal.cancel")}
        confirmLabel={t("deleteModal.confirm")}
        loadingLabel={t("deleteModal.deleting")}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isPending && busyId === deleteId}
      />
    </div>
  );
}