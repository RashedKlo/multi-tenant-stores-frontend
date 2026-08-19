// features/search/components/SearchInput.tsx
"use client";

import { useEffect, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search stores...",
}: SearchInputProps) {
  const [local, setLocal] = useState(value);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, 350);
    return () => clearTimeout(timer);
  }, [local, value, onChange]);

  return (
    <div className="relative">
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
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}