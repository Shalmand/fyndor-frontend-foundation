import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useAutoHideOnScroll } from "./useAutoHideOnScroll";

interface ReadingHeaderProps {
  storyTitle: string;
  chapterTitle: string;
  /** 0..1 reading progress, used for the subtle progress bar. */
  progress: number;
  /** Where the back button should return to (story detail). */
  backTo?: string;
}

/**
 * ReadingHeader — minimal, auto-hide chrome.
 *
 * Displays only: back, story title, chapter title, reading progress.
 * Hides on downward scroll, reappears on any upward gesture.
 */
export function ReadingHeader({
  storyTitle,
  chapterTitle,
  progress,
  backTo = "/",
}: ReadingHeaderProps) {
  const hidden = useAutoHideOnScroll();
  const pct = Math.round(progress * 100);

  return (
    <header
      data-hidden={hidden}
      className="fixed inset-x-0 top-0 z-40 transform-gpu transition-transform duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[hidden=true]:-translate-y-full"
    >
      <div className="bg-reader-bg/80 backdrop-blur-xl">
        <div className="container-narrow flex h-14 items-center gap-4">
          <Link
            to={backTo}
            aria-label="Back"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-white/5 hover:text-reader-fg"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="truncate font-display text-sm font-medium text-reader-fg">
              {storyTitle}
            </p>
            <p className="truncate text-[11px] uppercase tracking-[0.14em] text-reader-muted">
              {chapterTitle}
            </p>
          </div>

          <div
            aria-label={`Reading progress ${pct}%`}
            className="hidden shrink-0 text-[11px] tabular-nums text-reader-muted sm:block"
          >
            {pct}%
          </div>
        </div>

        {/* Reading progress — sits under the header, never above the prose. */}
        <ReadingProgressBar progress={progress} />
      </div>
    </header>
  );
}

/** Subtle 2px progress bar — brand accent on a near-invisible track. */
export function ReadingProgressBar({ progress }: { progress: number }) {
  const width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
  return (
    <div className="relative h-[2px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.04]" />
      <div
        className="absolute inset-y-0 left-0 bg-[var(--gradient-brand)] transition-[width] duration-150 ease-out"
        style={{ width }}
      />
    </div>
  );
}
