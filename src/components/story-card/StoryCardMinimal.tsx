import { cn } from "@/lib/utils";
import { demoStateClasses } from "./shared";
import type { StoryCardProps, StoryCardSkeletonProps } from "./types";

/**
 * Concept A — Minimal.
 *
 * The cover does almost all the talking. A serif title and a single
 * line of quiet metadata sit underneath. Designed for very dense walls
 * of stories where covers must read as artwork first.
 */
export function StoryCardMinimal({
  story,
  author,
  state,
  className,
}: StoryCardProps) {
  const demo = demoStateClasses(state);

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group/card block w-full select-none text-left outline-none",
        "transition-transform duration-[var(--transition-base)] active:scale-[0.985]",
        demo.press,
        demo.ring,
        className,
      )}
      data-demo-state={state}
      aria-label={`${story.title} by ${author?.displayName ?? "unknown author"}`}
    >
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-xl bg-surface-2",
          "shadow-[var(--shadow-elevated)]",
          "transition-[transform,box-shadow] duration-[var(--transition-base)]",
          "group-hover/card:-translate-y-1 group-hover/card:shadow-[var(--shadow-cover)]",
          state === "hover" && "-translate-y-1 shadow-[var(--shadow-cover)]",
        )}
      >
        <img
          src={story.coverUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="truncate font-display text-[1.0625rem] leading-snug text-foreground">
          {story.title}
        </h3>
        {author && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {author.displayName}
          </p>
        )}
      </div>
    </a>
  );
}

export function StoryCardMinimalSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="aspect-[2/3] animate-pulse rounded-xl bg-surface-2" />
      <div className="mt-3 space-y-2 px-0.5">
        <div className="h-3.5 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
