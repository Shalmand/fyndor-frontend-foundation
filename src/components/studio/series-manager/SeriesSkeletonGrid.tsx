export function SeriesSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl bg-foreground/[0.025]"
        >
          <div className="aspect-[3/2] w-full animate-pulse bg-foreground/[0.04]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-foreground/[0.06]" />
            <div className="h-3 w-full animate-pulse rounded bg-foreground/[0.04]" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-foreground/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}
