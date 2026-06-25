import { cn } from "@/lib/utils";
import { demoStateClasses, kindLabel, readingTime, statusLabel } from "./shared";
import type { StoryCardProps, StoryCardSkeletonProps } from "./types";

/**
 * Concept B — Editorial.
 *
 * Feels like a literary magazine entry. Tiny all-caps eyebrow (kind · primary
 * genre), serif title, two-line synopsis, and a quiet byline footer. Higher
 * information density, still calm.
 */
export function StoryCardEditorial({
  story,
  author,
  genres,
  state,
  className,
}: StoryCardProps) {
  const demo = demoStateClasses(state);
  const eyebrow = [kindLabel(story), genres?.[0]?.name].filter(Boolean).join(" · ");

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group/card block w-full select-none text-left outline-none",
        "transition-transform duration-[var(--transition-base)] active:scale-[0.99]",
        demo.press,
        demo.ring,
        className,
      )}
      data-demo-state={state}
      aria-label={`${story.title} — ${eyebrow}`}
    >
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-2",
          "shadow-[var(--shadow-elevated)]",
          "transition-[transform,box-shadow] duration-[var(--transition-base)]",
          "group-hover/card:shadow-[var(--shadow-cover)]",
          state === "hover" && "shadow-[var(--shadow-cover)]",
        )}
      >
        <img src={story.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
        <h3 className="font-display text-[1.2rem] leading-tight text-foreground">
          {story.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {story.synopsis}
        </p>
        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground/80">
          {author && <span className="truncate">{author.displayName}</span>}
          <span aria-hidden className="opacity-40">·</span>
          <span>{readingTime(story.wordsCount)}</span>
          <span aria-hidden className="opacity-40">·</span>
          <span>{statusLabel(story.status)}</span>
        </div>
      </div>
    </a>
  );
}

export function StoryCardEditorialSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="aspect-[2/3] animate-pulse rounded-lg bg-surface-2" />
      <div className="mt-4 space-y-2.5">
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-surface-2" />
        <div className="h-2.5 w-2/3 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
