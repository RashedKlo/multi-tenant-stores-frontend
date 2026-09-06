// features/favorites/components/sections/FavoriteStores/empty.tsx
export default function FavoriteStoresEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
      <p className="text-sm font-medium">No favorite stores yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Tap the heart on any store to save it here
      </p>
    </div>
  );
}