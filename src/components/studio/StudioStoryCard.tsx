import { useState, createElement, type ComponentType } from "react";
import { Layers, MoreHorizontal, PenLine, BookOpen, Sparkles, BarChart3, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusLabel, kindLabel } from "@/components/story-card/shared";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Story } from "@/types";

/** Author-side publish state — independent of story status. */
export type PublishState = "draft" | "scheduled" | "published";

export interface StudioStoryCardProps {
  story: Story;
  publishState?: PublishState;
  /** ISO. Falls back to story.updatedAt. */
  lastUpdatedAt?: string;
  onOpen?: () => void;
  className?: string;
}

interface ActionItem {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onSelect?: () => void;
}

/**
 * Studio v1.0 — Author's editorial story card.
 *
 * Cover-first, author-side metadata only (no reader stats).
 * The action menu is intentionally non-destructive: edit, chapters,
 * story world, analytics, publish. Delete/archive belong elsewhere.
 */
export function StudioStoryCard({
  story,
  publishState,
  lastUpdatedAt,
  onOpen,
  className,
}: StudioStoryCardProps) {
  const state: PublishState =
    publishState ?? (story.status === "draft" ? "draft" : "published");
  const updated = lastUpdatedAt ?? story.updatedAt;

  const actions: ActionItem[] = [
    { label: "Edit story", icon: PenLine },
    { label: "Chapters", icon: BookOpen },
    { label: "Story World", icon: Sparkles },
    { label: "Analytics", icon: BarChart3 },
    { label: "Publish", icon: Send },
  ];

  return (
    <div
      className={cn(
        "group/card relative w-full select-none",
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left outline-none transition-transform duration-[var(--transition-base)] active:scale-[0.99]"
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

          {/* Top row: publish state + kind */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            <PublishChip state={state} />
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur-md",
                story.kind === "original"
                  ? "bg-white/10 text-white/90"
                  : "bg-brand/30 text-white",
              )}
            >
              {kindLabel(story)}
            </span>
          </div>

          {/* Legibility scrim + status + chapter count */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent"
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
      </button>

      <div className="mt-4 flex items-start gap-2 pl-1">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-[1.05rem] leading-snug text-foreground">
            {story.title}
          </h3>
          <p className="mt-1.5 truncate text-xs text-muted-foreground">
            Updated {formatRelative(updated)}
          </p>
        </div>

        {/* Actions menu — quiet by default, brightens on hover */}
        <CardActionsMenu actions={actions} />
      </div>
    </div>
  );
}

/* ─── publish chip ────────────────────────────────────────────────── */

function PublishChip({ state }: { state: PublishState }) {
  const styles: Record<PublishState, string> = {
    draft: "bg-white/10 text-white/90",
    scheduled: "bg-amber-300/20 text-amber-100",
    published: "bg-emerald-400/20 text-emerald-100",
  };
  const label: Record<PublishState, string> = {
    draft: "Draft",
    scheduled: "Scheduled",
    published: "Published",
  };
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur-md",
        styles[state],
      )}
    >
      {label[state]}
    </span>
  );
}

/* ─── actions menu ────────────────────────────────────────────────── */

function CardActionsMenu({ actions }: { actions: ActionItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Story actions"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground",
            "transition-all duration-[var(--transition-base)]",
            "opacity-60 hover:bg-foreground/5 hover:text-foreground hover:opacity-100",
            "group-hover/card:opacity-100",
            open && "bg-foreground/5 text-foreground opacity-100",
          )}
        >
          <MoreHorizontal className="size-4" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="min-w-[180px] rounded-xl border-foreground/[0.06] bg-surface-2/95 p-1.5 backdrop-blur-xl"
      >
        {actions.map((a, i) => (
          <div key={a.label}>
            {i === actions.length - 1 && (
              <DropdownMenuSeparator className="my-1 bg-foreground/[0.06]" />
            )}
            <DropdownMenuItem
              onSelect={a.onSelect}
              className="cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground/85 focus:bg-foreground/5 focus:text-foreground"
            >
              {createElement(a.icon, { className: "size-4 opacity-80" })}
              {a.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── helpers ─────────────────────────────────────────────────────── */

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";
  const diffMs = Date.now() - then;
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 60) return `${Math.round(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
