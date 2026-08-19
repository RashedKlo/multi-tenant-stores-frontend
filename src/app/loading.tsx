export default function HomeLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-9 w-9 animate-spin rounded-full border-2 border-muted border-t-primary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
