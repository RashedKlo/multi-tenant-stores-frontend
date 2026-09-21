"use client";

import { useTranslations } from "next-intl";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder,
}: SearchInputProps) {
  const t = useTranslations("search");

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <svg
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch();
          }}
          placeholder={placeholder ?? t("searchStoresPlaceholder")}
          className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <button
        type="button"
        onClick={onSearch}
        className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t("searchButton")}
      </button>
    </div>
  );
}