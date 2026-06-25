import { cn } from "@/lib/utils";
import { demoStateClasses, kindLabel, statusLabel } from "./shared";
import type { StoryCardProps, StoryCardSkeletonProps } from "./types";

/**
 * Concept D — Bookstore.
 *
 * A horizontal layout that reads like a shelf listing in a quiet
 * independent bookshop. Cover on the left, serif title, author in
 * italic, a couple of genre pills, and a small status / kind line.
 */
export function StoryCardBookstore({
  story,
  author,
  genres,
  state,
  className,
}: StoryCardProps) {
  const demo = demoStateClasses(state);

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group/card grid w-full grid-cols-[7rem_minmax(0,1fr)] items-start gap-5 rounded-xl p-3 text-left outline-none sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 sm:p-4",
        "transition-colors duration-[var(--transition-base)]",
        "hover:bg-foreground/[0.025]",
        state === "hover" && "bg-foreground/[0.025]",
        "active:bg-foreground/[0.045]",
        demo.press,
        demo.ring,
        className,
      )}
      data-demo-state={state}
      aria-label={`${story.title} by ${author?.displayName ?? "unknown author"}`}
    >
      <div
        className={cn(
          "relative aspect-[2/3] shrink-0 overflow-hidden rounded-md bg-surface-2",
          "shadow-[var(--shadow-elevated)]",
        )}
      >
        <img src={story.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 pt-1">
        <h3 className="font-display text-[1.35rem] leading-tight text-foreground">
          {story.title}
        </h3>
        {author && (
          <p className="mt-1 text-sm italic text-muted-foreground">
            by {author.displayName}
          </p>
        )}
        {genres && genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {genres.slice(0, 3).map((g) => (
              <span
                key={g.id}
                className="rounded-full bg-surface-2/80 px-2.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
          {story.synopsis}
        </p>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          {kindLabel(story)} <span className="opacity-40 mx-1">·</span> {statusLabel(story.status)}
        </p>
      </div>
    </a>
  );
}

export function StoryCardBookstoreSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[7rem_minmax(0,1fr)] gap-5 rounded-xl p-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 sm:p-4",
        className,
      )}
      aria-hidden
    >
      <div className="aspect-[2/3] animate-pulse rounded-md bg-surface-2" />
      <div className="space-y-3 pt-1">
        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="flex gap-1.5">
          <div className="h-4 w-14 animate-pulse rounded-full bg-surface-2" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-surface-2" />
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
