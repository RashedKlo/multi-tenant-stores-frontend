// features/addresses/components/AddressCard.tsx
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Address } from "../../types";

interface AddressCardProps {
  address: Address;
  onSetDefault?: (id: string) => void;
  onDelete?: (id: string) => void;
  isBusy?: boolean;
}

export function AddressCard({
  address,
  onSetDefault,
  onDelete,
  isBusy = false,
}: AddressCardProps) {
  const t = useTranslations("addresses");

  return (
    <article
      className={`relative rounded-2xl border bg-card p-4 shadow-sm transition-opacity ${
        isBusy ? "pointer-events-none opacity-60" : ""
      } ${address.isDefault ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold">{address.label}</h3>
            {address.isDefault && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                {t("defaultBadge")}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {address.addressText}
          </p>
        </div>

        <Link
          href={`/addresses/${address.id}/edit`}
          className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={t("edit")}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {!address.isDefault && onSetDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(address.id)}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            {t("setDefault")}
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(address.id)}
            className="rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            {t("delete")}
          </button>
        )}
      </div>
    </article>
  );
}