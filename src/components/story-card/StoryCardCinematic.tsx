import { cn } from "@/lib/utils";
import { demoStateClasses, kindLabel, statusLabel } from "./shared";
import type { StoryCardProps, StoryCardSkeletonProps } from "./types";

/**
 * Concept C — Cinematic.
 *
 * Pure cover by default. On hover (or focus) a soft gradient lifts the
 * lower third and reveals the title, status and one or two tags. Made
 * for dense streaming-style rails where the artwork is the headline.
 */
export function StoryCardCinematic({
  story,
  author,
  genres,
  state,
  className,
}: StoryCardProps) {
  const demo = demoStateClasses(state);
  const forceReveal = state === "hover";

  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group/card relative block w-full select-none overflow-hidden rounded-xl text-left outline-none",
        "aspect-[2/3] bg-surface-2",
        "shadow-[var(--shadow-elevated)]",
        "transition-[transform,box-shadow] duration-[var(--transition-base)]",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-cover)]",
        "active:translate-y-0 active:scale-[0.99]",
        forceReveal && "-translate-y-1 shadow-[var(--shadow-cover)]",
        demo.press,
        demo.ring,
        className,
      )}
      data-demo-state={state}
      aria-label={`${story.title} by ${author?.displayName ?? "unknown author"}`}
    >
      <img src={story.coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />

      {/* Status dot — the only persistent meta when not hovered. */}
      <span
        aria-hidden
        className={cn(
          "absolute right-3 top-3 h-2 w-2 rounded-full ring-2 ring-black/40",
          story.status === "ongoing" && "bg-emerald-400",
          story.status === "completed" && "bg-sky-400",
          story.status === "hiatus" && "bg-amber-400",
          story.status === "draft" && "bg-muted-foreground",
        )}
      />

      {/* Reveal layer */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 p-4",
          "bg-gradient-to-t from-black/85 via-black/55 to-transparent",
          "opacity-0 transition-opacity duration-[var(--transition-base)]",
          "group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
          forceReveal && "opacity-100",
        )}
      >
        <h3 className="font-display text-base leading-tight text-white">
          {story.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] text-white/75">
          <span className="rounded-full bg-white/12 px-2 py-0.5 backdrop-blur-sm">
            {kindLabel(story)}
          </span>
          <span className="rounded-full bg-white/12 px-2 py-0.5 backdrop-blur-sm">
            {statusLabel(story.status)}
          </span>
          {genres?.[0] && (
            <span className="truncate text-white/65">{genres[0].name}</span>
          )}
        </div>
      </div>
    </a>
  );
}

export function StoryCardCinematicSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div
      className={cn("aspect-[2/3] w-full animate-pulse rounded-xl bg-surface-2", className)}
      aria-hidden
    />
  );
}
