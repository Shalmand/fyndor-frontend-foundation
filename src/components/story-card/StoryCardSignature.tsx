import { cn } from "@/lib/utils";
import { demoStateClasses, kindLabel, statusLabel } from "./shared";
import type { StoryCardProps, StoryCardSkeletonProps } from "./types";

/**
 * Story Card v1.0 — Fyndor Signature.
 *
 * The official card for the Narrative Design System.
 * Cover-first, frameless, almost invisible shadows.
 * Hover gently zooms the cover and reveals the genre line.
 * Calm, cinematic, timeless.
 */
export function StoryCardSignature({
  story,
  author,
  universe,
  genres,
  state,
  className,
}: StoryCardProps) {
  const demo = demoStateClasses(state);
  const forceHover = state === "hover";
  const genre = genres?.[0];

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
      aria-label={`${story.title} by ${author?.displayName ?? "unknown author"}`}
    >
      <div className="relative">
        {/* Brand rail — left edge, almost invisible, brightens on hover */}
        <span
          aria-hidden
          className={cn(
            "absolute -left-px top-3 bottom-3 w-px",
            "bg-gradient-to-b from-transparent via-brand/40 to-transparent",
            "opacity-50 transition-opacity duration-[var(--transition-base)]",
            "group-hover/card:opacity-100",
            forceHover && "opacity-100",
          )}
        />

        <div
          className={cn(
            "relative aspect-[2/3] overflow-hidden rounded-[15px] bg-surface-2",
            "shadow-card",
            "transition-shadow duration-[var(--transition-base)]",
            "group-hover/card:shadow-card-hover",
          )}
        >
          <img
            src={story.coverUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[var(--transition-base)] group-hover/card:scale-[1.03]"
          />

          {/* Kind chip */}
          <span
            className={cn(
              "absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur-md",
              story.kind === "original"
                ? "bg-white/10 text-white"
                : "bg-brand/30 text-white",
            )}
          >
            {kindLabel(story)}
          </span>

          {/* Bottom hairline gradient for legibility of overlaid status */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent"
          />
          <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[0.68rem] text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  story.status === "ongoing" && "bg-emerald-300",
                  story.status === "completed" && "bg-sky-300",
                  story.status === "hiatus" && "bg-amber-300",
                  story.status === "draft" && "bg-white/60",
                )}
              />
              {statusLabel(story.status)}
            </span>
            <span
              className="opacity-0 transition-opacity duration-[var(--transition-base)] group-hover/card:opacity-100"
            >
              {genre?.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pl-1">
        <h3 className="font-display text-[1.15rem] leading-snug text-foreground">
          {story.title}
        </h3>
        <p className="mt-2.5 truncate text-xs text-muted-foreground">
          {author?.displayName}
          {universe && (
            <>
              <span aria-hidden className="mx-1.5 opacity-40">·</span>
              <span>{universe.name}</span>
            </>
          )}
        </p>
      </div>
    </a>
  );
}

export function StoryCardSignatureSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="aspect-[2/3] animate-pulse rounded-[15px] bg-surface-2" />
      <div className="mt-5 space-y-3 pl-1">
        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
