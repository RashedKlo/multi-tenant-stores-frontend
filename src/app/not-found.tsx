import Link from "next/link";

export default function HomeNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
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
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
          <path d="M9 11h4" />
        </svg>
      </span>

      <div className="max-w-md space-y-1.5">
        <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The home page you&apos;re looking for doesn&apos;t exist, or may have moved.
        </p>
      </div>

      <Link
        href="/home"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
      >
        Back to home
      </Link>
    </div>
  );
}
