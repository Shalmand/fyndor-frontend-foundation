import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import type { Chapter } from "./types";

interface ChapterTransitionProps {
  chapter: Chapter;
  nextChapter?: Pick<Chapter, "id" | "title" | "index"> | null;
  onContinue?: () => void;
}

/**
 * ChapterTransition — the rhythm between chapters.
 *
 * Sequence (locked):
 *   1. Chapter Completed marker
 *   2. Author Note (optional)
 *   3. Comments Preview
 *   4. Advertisement Placeholder (future)
 *   5. Next Chapter Preview
 *   6. Continue Reading CTA
 *
 * The CTA calls `onContinue` so the host can load the next chapter
 * inline without leaving the reading flow.
 */
export function ChapterTransition({
  chapter,
  nextChapter,
  onContinue,
}: ChapterTransitionProps) {
  return (
    <section className="mt-20 space-y-16">
      <ChapterCompleted index={chapter.index} title={chapter.title} />

      {chapter.authorNote && <AuthorNote body={chapter.authorNote.body} />}

      <CommentsPreview chapter={chapter} />

      <AdvertisementPlaceholder />

      {nextChapter ? (
        <>
          <NextChapterPreview next={nextChapter} />
          <ContinueReading onContinue={onContinue} label={`Continue to Chapter ${nextChapter.index}`} />
        </>
      ) : (
        <EndOfStory />
      )}
    </section>
  );
}

/* ─── pieces ─────────────────────────────────────────────────────────── */

function ChapterCompleted({ index, title }: { index: number; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-reader-muted">
        Chapter {index} Completed
      </p>
      <h3 className="mt-3 font-display text-2xl text-reader-fg">{title}</h3>
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

function AuthorNote({ body }: { body: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] px-6 py-7 sm:px-8">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-reader-muted">
        <Sparkles className="h-3.5 w-3.5" />
        From the author
      </div>
      <p className="mt-3 font-reading text-base leading-relaxed text-reader-fg/90">
        {body}
      </p>
    </div>
  );
}

function CommentsPreview({ chapter }: { chapter: Chapter }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-reader-muted">
          <MessageSquare className="h-3.5 w-3.5" />
          From the margins
        </div>
        <button
          type="button"
          className="text-xs text-reader-muted transition-colors hover:text-reader-fg"
        >
          View all
        </button>
      </div>
      <div className="mt-5 space-y-5">
        {chapter.comments.slice(0, 3).map((c) => (
          <article key={c.id} className="flex gap-4">
            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-white/10 to-white/5" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-reader-fg">{c.author}</p>
              <p className="mt-1 font-reading text-[15px] leading-relaxed text-reader-fg/85">
                {c.body}
              </p>
              <p className="mt-2 text-[11px] text-reader-muted">
                {c.likes.toLocaleString()} appreciations
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/** Placeholder for the future advertisement slot. Reserves vertical rhythm only. */
function AdvertisementPlaceholder() {
  return (
    <div
      data-slot="reading-ad-placeholder"
      aria-hidden="true"
      className="hidden"
    />
  );
}

function NextChapterPreview({
  next,
}: {
  next: Pick<Chapter, "id" | "title" | "index">;
}) {
  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-reader-muted">
        Up next
      </p>
      <p className="mt-3 text-xs text-reader-muted">Chapter {next.index}</p>
      <h4 className="mt-1 font-display text-3xl text-reader-fg">{next.title}</h4>
    </div>
  );
}

function ContinueReading({
  onContinue,
  label,
}: {
  onContinue?: () => void;
  label: string;
}) {
  return (
    <div className="flex justify-center pb-8">
      <button
        type="button"
        onClick={onContinue}
        className="group inline-flex items-center gap-3 rounded-full bg-[var(--gradient-brand)] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-elevated)] transition-transform duration-[220ms] hover:scale-[1.02]"
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform duration-[220ms] group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

function EndOfStory() {
  return (
    <div className="pb-12 text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-reader-muted">
        End of the story
      </p>
      <p className="mt-3 font-display text-2xl text-reader-fg">
        Thank you for reading.
      </p>
    </div>
  );
}
