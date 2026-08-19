// features/addresses/components/DeleteAddressModal.tsx
"use client";

interface DeleteAddressModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteAddressModal({
  open,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteAddressModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
        <h2 className="text-lg font-semibold">Delete address?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This action cannot be undone. The address will be permanently removed.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}