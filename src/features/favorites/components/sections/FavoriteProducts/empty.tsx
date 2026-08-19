// features/favorites/components/sections/FavoriteProducts/empty.tsx
export default function FavoriteProductsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <div className="mb-3 text-4xl">💔</div>
      <p className="text-sm font-medium">No favorite products yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tap the heart on any product to save it here
      </p>
    </div>
  );
}