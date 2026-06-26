import { useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Eye,
  CalendarClock,
  Sparkles,
  Copy,
  ArrowUpDown,
  Archive,
  GripVertical,
  Link2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { ChapterRecord } from "@/mock/chapterManager";
import {
  CHAPTER_STATUS_META,
  STATUS_TONE_CLASS,
  formatRelative,
  formatWords,
} from "./shared";
import { cn } from "@/lib/utils";

interface Props {
  chapter: ChapterRecord;
  onOpen?: (id: string) => void;
  onContinue?: (id: string) => void;
}

/**
 * Editorial chapter row. Behaves like a list-item card on desktop and a
 * stacked compact card on mobile. Hover reveals the drag affordance only
 * on devices that can hover — pointer drag is a visual concept here.
 */
export function ChapterRow({ chapter, onOpen, onContinue }: Props) {
  const status = CHAPTER_STATUS_META[chapter.status];
  const StatusIcon = status.icon;
  const isPublished = chapter.status === "published";

  return (
    <article
      tabIndex={0}
      onClick={() => onOpen?.(chapter.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(chapter.id);
        }
      }}
      aria-label={`Chapter ${chapter.number} — ${chapter.title}`}
      className={cn(
        "group/row relative flex cursor-pointer flex-col gap-4 rounded-2xl bg-surface-1/55 px-5 py-5 transition-all duration-[var(--transition-base)]",
        "hover:bg-surface-1/85 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand/50",
        "md:flex-row md:items-center md:px-6 md:py-5",
      )}
    >
      {/* Drag handle (concept) */}
      <div
        aria-hidden
        className="absolute left-1 top-1/2 hidden -translate-y-1/2 text-muted-foreground/50 opacity-0 transition-opacity duration-[var(--transition-base)] group-hover/row:opacity-100 md:block"
        title="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Chapter number */}
      <div className="flex shrink-0 items-baseline gap-3 md:w-20 md:flex-col md:items-start md:gap-0">
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
          Ch. {chapter.number}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.66rem] uppercase tracking-[0.16em] md:hidden",
            STATUS_TONE_CLASS[status.tone],
          )}
        >
          {status.short}
        </span>
      </div>

      {/* Title + excerpt + meta */}
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg leading-snug tracking-tight text-foreground">
          {chapter.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.88rem] leading-relaxed text-muted-foreground">
          {chapter.excerpt}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.74rem] text-muted-foreground">
          <span>{formatWords(chapter.words)} words</span>
          <span aria-hidden>·</span>
          <span>{chapter.readingMinutes} min read</span>
          {chapter.storyWorldLinks > 0 ? (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Link2 className="h-3 w-3" />
                {chapter.storyWorldLinks} world link{chapter.storyWorldLinks === 1 ? "" : "s"}
              </span>
            </>
          ) : null}
          {chapter.commentsCount > 0 ? (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {chapter.commentsCount}
              </span>
            </>
          ) : null}
          <span aria-hidden>·</span>
          <span>
            {isPublished && chapter.publishedAt
              ? `Published ${formatRelative(chapter.publishedAt)}`
              : chapter.status === "scheduled" && chapter.scheduledFor
                ? `Goes live ${formatRelative(chapter.scheduledFor)}`
                : `Edited ${formatRelative(chapter.updatedAt)}`}
          </span>
        </div>
      </div>

      {/* Status + actions (desktop) */}
      <div
        className="flex shrink-0 items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={cn(
            "hidden items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] md:inline-flex",
            STATUS_TONE_CLASS[status.tone],
          )}
        >
          <StatusIcon className="h-3 w-3" aria-hidden />
          {status.short}
        </span>

        <button
          type="button"
          onClick={() => onContinue?.(chapter.id)}
          className="inline-flex h-9 items-center rounded-full bg-foreground/[0.06] px-4 text-[0.78rem] font-medium text-foreground/90 transition-colors hover:bg-foreground/[0.1]"
        >
          {isPublished
            ? "Open"
            : chapter.status === "scheduled"
              ? "Review"
              : "Continue"}
        </button>

        <ChapterMenu chapterId={chapter.id} />
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  destructive?: boolean;
}

const MENU: MenuItem[] = [
  { id: "edit", label: "Edit details", icon: Pencil },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "schedule", label: "Schedule", icon: CalendarClock },
  { id: "publish", label: "Publish", icon: Sparkles },
  { id: "duplicate", label: "Duplicate", icon: Copy },
  { id: "move", label: "Move", icon: ArrowUpDown },
  { id: "archive", label: "Archive", icon: Archive, destructive: true },
];

function ChapterMenu({ chapterId: _id }: { chapterId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Chapter actions"
        className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl bg-surface-2/95 p-1.5 shadow-[var(--shadow-elevated)] backdrop-blur-xl"
        >
          {MENU.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[0.82rem] transition-colors",
                  m.destructive
                    ? "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
                    : "text-foreground/85 hover:bg-foreground/[0.06] hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {m.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
