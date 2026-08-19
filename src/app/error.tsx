"use client";

import { useEffect } from "react";

interface HomeErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HomeError({ error, reset }: HomeErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.3 2.25h17.76a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
        </svg>
      </span>

      <div className="max-w-md space-y-1.5">
        <p className="text-xl font-semibold text-foreground">Something went wrong</p>
        <p className="text-sm text-muted-foreground">
          The home page couldn&apos;t load. Try again, and if it keeps happening, check back
          in a bit.
        </p>
      </div>

      <button
        onClick={reset}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
