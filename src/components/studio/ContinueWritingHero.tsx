import { PenLine, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContinueWritingHeroProps {
  storyTitle: string;
  storyCoverUrl: string;
  chapterIndex: number;
  chapterTitle: string;
  /** ISO string for last edit. */
  lastEditedAt: string;
  /** Optional draft word count for soft context. */
  draftWordCount?: number;
  /** Days in a row the author has written. Placeholder — mock-only. */
  writingStreakDays?: number;
  onContinue?: () => void;
  className?: string;
}

/**
 * Studio v1.0 — Continue Writing Hero.
 *
 * The author's "open notebook". Calm, editorial, single CTA.
 * Cover is the protagonist; metadata stays quiet.
 */
export function ContinueWritingHero({
  storyTitle,
  storyCoverUrl,
  chapterIndex,
  chapterTitle,
  lastEditedAt,
  draftWordCount,
  writingStreakDays,
  onContinue,
  className,
}: ContinueWritingHeroProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl bg-surface-1/60 backdrop-blur-xl",
        "shadow-[0_30px_80px_-40px_oklch(0_0_0_/_0.55)]",
        className,
      )}
    >
      {/* Soft atmospheric cover backdrop */}
      <div aria-hidden className="absolute inset-0">
        <img
          src={storyCoverUrl}
          alt=""
          className="h-full w-full object-cover opacity-40 blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-0 via-surface-0/85 to-surface-0/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 90% 10%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative grid gap-8 p-6 sm:p-9 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 md:p-12">
        {/* Cover */}
        <div className="mx-auto w-40 shrink-0 sm:w-48 md:w-56">
          <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-surface-2 shadow-[0_25px_60px_-25px_oklch(0_0_0_/_0.7)]">
            <img
              src={storyCoverUrl}
              alt={`Cover of ${storyTitle}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div className="min-w-0">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
              Continue writing
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2.5rem]">
              {storyTitle}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="text-foreground/90">
                Chapter {chapterIndex} · {chapterTitle}
              </span>
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              <span>Last edited {formatLastEdited(lastEditedAt)}</span>
              {typeof draftWordCount === "number" && (
                <>
                  <span aria-hidden className="opacity-40">
                    ·
                  </span>
                  <span>
                    {draftWordCount.toLocaleString("en-US")} words in draft
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onContinue}
              className={cn(
                "inline-flex h-12 items-center gap-2.5 rounded-full px-7 text-sm font-medium text-primary-foreground",
                "transition-all duration-[var(--transition-base)] hover:brightness-110",
                "shadow-[0_15px_40px_-15px_color-mix(in_oklab,var(--brand)_60%,transparent)]",
              )}
              style={{ backgroundImage: "var(--gradient-brand-soft)" }}
            >
              <PenLine className="h-4 w-4" aria-hidden />
              Continue writing
            </button>
            <button
              type="button"
              className="inline-flex h-12 items-center rounded-full px-5 text-sm font-medium text-foreground/85 transition-colors hover:bg-foreground/5"
            >
              Open story
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatLastEdited(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";
  const diffMs = Date.now() - then;
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
