import type { ChapterRecord } from "@/mock/chapterManager";
import { CHAPTER_STATUS_META } from "./shared";
import { cn } from "@/lib/utils";

interface Props {
  chapters: ChapterRecord[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}

const DOT_TONE: Record<string, string> = {
  neutral: "bg-foreground/35",
  soft: "bg-foreground/45",
  ready: "bg-[color-mix(in_oklab,var(--brand)_70%,white_10%)]",
  scheduled: "bg-foreground/55",
  live: "bg-brand",
  warn: "bg-amber-300/80",
  muted: "bg-foreground/20",
};

/**
 * A quiet, horizontal timeline. Each chapter is a small node whose
 * colour and ring carry its status — never a Kanban-style board.
 */
export function ChapterTimeline({ chapters, activeId, onSelect }: Props) {
  if (chapters.length === 0) return null;

  return (
    <section aria-label="Story timeline" className="space-y-3">
      <header className="flex items-baseline justify-between">
        <h3 className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Story timeline
        </h3>
        <span className="text-[0.7rem] text-muted-foreground/80">
          {chapters.length} chapter{chapters.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
        <ol className="relative flex min-w-max items-center gap-0 py-4">
          <div
            aria-hidden
            className="absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-foreground/10"
          />
          {chapters.map((ch) => {
            const meta = CHAPTER_STATUS_META[ch.status];
            const dot = DOT_TONE[meta.tone];
            const active = ch.id === activeId;
            return (
              <li key={ch.id} className="relative flex w-24 flex-col items-center">
                <button
                  type="button"
                  onClick={() => onSelect?.(ch.id)}
                  aria-label={`Chapter ${ch.number} — ${ch.title} (${meta.label})`}
                  className={cn(
                    "relative grid size-9 place-items-center rounded-full bg-surface-1 transition-all duration-[var(--transition-base)]",
                    active && "ring-2 ring-brand/60",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full", dot)} />
                </button>
                <div className="mt-2 flex flex-col items-center gap-0.5 text-center">
                  <span className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Ch. {ch.number}
                  </span>
                  <span className="line-clamp-1 max-w-[5.5rem] text-[0.72rem] text-foreground/75">
                    {ch.title}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
