export default function ModulesEmpty() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 p-2"
        >
          <div className="h-14 w-14 rounded-2xl bg-muted/70" />
          <div className="h-3 w-12 rounded bg-muted/70" />
        </div>
      ))}
    </div>
  );
}