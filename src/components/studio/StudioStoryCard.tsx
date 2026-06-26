import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusLabel } from "@/components/story-card/shared";
import type { Story } from "@/types";

export interface StudioStoryCardProps {
  story: Story;
  /** Author's local view of publish state — overrides story.status === "draft". */
  isDraft?: boolean;
  onOpen?: () => void;
  className?: string;
}

/**
 * Studio v1.0 — Author's editorial story card.
 *
 * Same cover-first language as the reader card, but with author-side
 * metadata: chapter count and draft / published state. No reader stats.
 */
export function StudioStoryCard({
  story,
  isDraft,
  onOpen,
  className,
}: StudioStoryCardProps) {
  const draft = isDraft ?? story.status === "draft";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group/card block w-full select-none text-left outline-none",
        "transition-transform duration-[var(--transition-base)] active:scale-[0.99]",
        className,
      )}
      aria-label={`Edit ${story.title}`}
    >
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-[15px] bg-surface-2 shadow-card",
          "transition-shadow duration-[var(--transition-base)] group-hover/card:shadow-card-hover",
        )}
      >
        <img
          src={story.coverUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[var(--transition-base)] group-hover/card:scale-[1.03]"
        />

        {/* Publish state chip */}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur-md",
            draft
              ? "bg-white/10 text-white/90"
              : "bg-emerald-400/20 text-emerald-100",
          )}
        >
          {draft ? "Draft" : "Published"}
        </span>

        {/* Legibility scrim + status row */}
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
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3 w-3" aria-hidden />
            {story.chaptersCount} ch
          </span>
        </div>
      </div>

      <div className="mt-4 pl-1">
        <h3 className="truncate font-display text-[1.05rem] leading-snug text-foreground">
          {story.title}
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {draft ? "Not yet published" : `${story.chaptersCount} chapters`}
        </p>
      </div>
    </button>
  );
}
