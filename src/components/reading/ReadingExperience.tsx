import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChapterContent } from "./ChapterContent";
import { ChapterTransition } from "./ChapterTransition";
import { ReadingHeader } from "./ReadingHeader";
import { LoreReferenceProvider } from "./LoreReferenceContext";
import {
  ReadingPreferencesProvider,
  useReadingPreferences,
} from "./ReadingPreferencesContext";
import { useReadingProgress } from "./useReadingProgress";
import type { Chapter, ReadingPreferences } from "./types";

interface ReadingExperienceProps {
  storyTitle: string;
  /** Initial chapter to display. */
  initialChapter: Chapter;
  /** Resolver for subsequent chapters by id — keeps the reading flow continuous. */
  getChapter?: (id: string) => Chapter | undefined;
  /** Back-button destination (typically the story detail route). */
  backTo?: string;
  /** Optional handler that opens a future Story World Drawer. */
  onOpenLore?: (loreId: string) => void;
  /** Slot rendered above the very first chapter (e.g. cover, dedication). */
  prologue?: ReactNode;
}

/**
 * ReadingExperience — orchestrates the v1.0 reading flow.
 *
 * Continuous Reading:
 *   Chapters mount in a single column; pressing "Continue Reading"
 *   appends the next chapter inline rather than navigating away.
 *   The structure is also the seam for future auto-continuous scroll
 *   (an IntersectionObserver on the trailing chapter can call the
 *   same `append` action). We intentionally do not auto-load yet.
 */
export function ReadingExperience(props: ReadingExperienceProps) {
  return (
    <ReadingPreferencesProvider>
      <LoreReferenceProvider onOpen={props.onOpenLore}>
        <ReadingExperienceInner {...props} />
      </LoreReferenceProvider>
    </ReadingPreferencesProvider>
  );
}

function ReadingExperienceInner({
  storyTitle,
  initialChapter,
  getChapter,
  backTo,
  prologue,
}: ReadingExperienceProps) {
  const [chapters, setChapters] = useState<Chapter[]>([initialChapter]);
  const articleRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(articleRef);
  const { preferences } = useReadingPreferences();

  // Reset when the initial chapter changes (e.g. navigating to a new story).
  useEffect(() => {
    setChapters([initialChapter]);
  }, [initialChapter.id]);

  const appendChapter = useCallback(
    (id: string) => {
      const next = getChapter?.(id);
      if (!next) return;
      setChapters((prev) =>
        prev.some((c) => c.id === next.id) ? prev : [...prev, next],
      );
      // Smooth-scroll the new chapter into view on the next paint.
      requestAnimationFrame(() => {
        document
          .getElementById(`chapter-${next.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [getChapter],
  );

  const [currentChapterId, setCurrentChapterId] = useState(initialChapter.id);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const active = chapters.find((c) => {
        const el = document.getElementById(`chapter-${c.id}`);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 160 && r.bottom > 160;
      });
      if (active) setCurrentChapterId(active.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);
  const currentChapter =
    chapters.find((c) => c.id === currentChapterId) ?? chapters[0];

  return (
    <div className="min-h-screen bg-reader-bg text-reader-fg">
      <ReadingHeader
        storyTitle={storyTitle}
        chapterTitle={`Chapter ${currentChapter.index} · ${currentChapter.title}`}
        progress={progress}
        backTo={backTo}
      />

      {/* Top spacer matches header height so prose starts cleanly. */}
      <div className="h-14" aria-hidden="true" />

      <article ref={articleRef} className="pb-24">
        {prologue && (
          <div className="container-reader pt-10 pb-6">{prologue}</div>
        )}

        {chapters.map((chapter, i) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            nextChapter={
              chapter.nextChapterId
                ? getChapter?.(chapter.nextChapterId) ?? null
                : null
            }
            onContinue={
              chapter.nextChapterId
                ? () => appendChapter(chapter.nextChapterId!)
                : undefined
            }
            isFirst={i === 0}
            preferences={preferences}
          />
        ))}
      </article>

      <ReadingFooter />
    </div>
  );
}

/* ─── chapter section ─────────────────────────────────────────────────── */

interface ChapterSectionProps {
  chapter: Chapter;
  nextChapter: Chapter | null;
  onContinue?: () => void;
  isFirst: boolean;
  preferences: ReadingPreferences;
}

function ChapterSection({
  chapter,
  nextChapter,
  onContinue,
  isFirst,
  preferences,
}: ChapterSectionProps) {
  return (
    <section
      id={`chapter-${chapter.id}`}
      data-chapter-id={chapter.id}
      className={[
        "scroll-mt-20",
        readingWidthClass(preferences.readingWidth),
        "px-5 sm:px-6",
        "mx-auto",
        isFirst ? "pt-6" : "pt-32",
      ].join(" ")}
    >
      <header className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-reader-muted">
          Chapter {chapter.index}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] text-reader-fg">
          {chapter.title}
        </h1>
        <p className="mt-3 text-xs text-reader-muted">
          {chapter.readingMinutes} min read · {chapter.words.toLocaleString("en-US")} words
        </p>

      </header>

      <div
        className={[
          fontFamilyClass(preferences.fontFamily),
          fontSizeClass(preferences.fontSize),
          lineSpacingClass(preferences.lineSpacing),
          "text-reader-fg/95",
        ].join(" ")}
      >
        <ChapterContent blocks={chapter.blocks} />
      </div>

      <ChapterTransition
        chapter={chapter}
        nextChapter={nextChapter}
        onContinue={onContinue}
      />
    </section>
  );
}

/* ─── footer ─────────────────────────────────────────────────────────── */

function ReadingFooter() {
  return (
    <footer className="container-reader pb-16 pt-4 text-center text-[11px] uppercase tracking-[0.28em] text-reader-muted">
      Fyndor
    </footer>
  );
}

/* ─── preference → class helpers ─────────────────────────────────────── */
/* These read the (currently-default) preferences so future settings
 * UI can mutate them without touching the renderer. */

function fontFamilyClass(f: ReadingPreferences["fontFamily"]) {
  switch (f) {
    case "sans":
      return "font-sans";
    case "dyslexic":
      return "font-sans";
    case "serif":
    default:
      return "font-reading";
  }
}

function fontSizeClass(s: ReadingPreferences["fontSize"]) {
  switch (s) {
    case "sm":
      return "text-[17px]";
    case "lg":
      return "text-[20px]";
    case "xl":
      return "text-[22px]";
    case "md":
    default:
      return "text-[18px] sm:text-[19px]";
  }
}

function lineSpacingClass(s: ReadingPreferences["lineSpacing"]) {
  switch (s) {
    case "compact":
      return "leading-[1.6]";
    case "spacious":
      return "leading-[2]";
    case "comfortable":
    default:
      return "leading-[1.8]";
  }
}

function readingWidthClass(w: ReadingPreferences["readingWidth"]) {
  switch (w) {
    case "narrow":
      return "max-w-[34rem]";
    case "wide":
      return "max-w-[52rem]";
    case "default":
    default:
      return "max-w-[42rem]";
  }
}
