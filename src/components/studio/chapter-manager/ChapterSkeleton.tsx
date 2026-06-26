export function ChapterSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy aria-label="Loading chapters">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-5 rounded-2xl bg-surface-1/45 px-6 py-6"
        >
          <div className="h-3 w-12 animate-pulse rounded-full bg-foreground/[0.06]" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-foreground/[0.06]" />
            <div className="h-3 w-full animate-pulse rounded-full bg-foreground/[0.04]" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-foreground/[0.04]" />
          </div>
          <div className="h-7 w-20 animate-pulse rounded-full bg-foreground/[0.06]" />
        </div>
      ))}
    </div>
  );
}
