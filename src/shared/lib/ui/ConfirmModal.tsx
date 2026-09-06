"use client";

import type { ReactNode } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  loadingLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  children?: ReactNode;
}

export function ConfirmModal({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  loadingLabel = confirmLabel,
  onClose,
  onConfirm,
  isLoading = false,
  children,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl">
        <h2 id="confirm-modal-title" className="text-base font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {children}

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-full bg-destructive py-2.5 text-sm font-medium text-destructive-foreground transition-transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
