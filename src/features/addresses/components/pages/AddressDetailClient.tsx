// features/addresses/components/detail/AddressDetailClient.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { ConfirmModal, Notification } from "@/shared/lib/ui";
import { Address } from "../../types/addresses.types";
import { deleteAddressAction, setDefaultAddressAction } from "../../actions";

interface AddressDetailClientProps {
  address: Address;
}

export function AddressDetailClient({ address }: AddressDetailClientProps) {
  const t = useTranslations("addresses");
  const tError = useTranslations();
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setDeleteId(address.id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setError(null);

    startTransition(async () => {
      const result = await deleteAddressAction(deleteId);

      if (result.success) {
        router.push("/addresses");
        router.refresh();
      } else {

        setError(tError(result.error));
        setDeleteId(null);
      }
    });
  };

  const handleSetDefault = () => {
    setError(null);
    startTransition(async () => {
      const result = await setDefaultAddressAction(address.id);
      if (result.success) {
        router.refresh();
      } else {
        setError(tError(result.error));
      }
    });
  };

  return (
    <>
      {error && (
        <Notification message={error} variant="error" onDismiss={() => setError(null)} />
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{address.label}</h1>
          {address.isDefault && (
            <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Default Address
            </span>
          )}
        </div>
        <Link
          href="/addresses"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Back to addresses"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="mt-1 text-base font-medium">{address.addressText}</p>
        </div>

        {address.latitude && address.longitude && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Latitude</p>
              <p className="mt-1 text-base font-medium">{address.latitude}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longitude</p>
              <p className="mt-1 text-base font-medium">{address.longitude}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href={`/addresses/${address.id}/edit`}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Address
        </Link>

        {!address.isDefault && (
          <button
            onClick={handleSetDefault}
            disabled={isPending}
            className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-3 font-medium transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Set as Default
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-lg border border-red-200 px-4 py-3 font-medium text-red-500 transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Address
        </button>
      </div>

      <ConfirmModal
        open={!!deleteId}
        title={t("deleteModal.title")}
        description={t("deleteModal.description")}
        cancelLabel={t("deleteModal.cancel")}
        confirmLabel={t("deleteModal.confirm")}
        loadingLabel={t("deleteModal.deleting")}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isLoading={isPending}
      />
    </>
  );
}