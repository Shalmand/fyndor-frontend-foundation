import { BookOpen, Bookmark, Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  kindLabel,
  readingTime,
  statusLabel,
} from "@/components/story-card/shared";
import type { Author, Genre, Story } from "@/types";

/**
 * Story Hero v1.0 — NDS-003.
 *
 * The flagship discovery surface for Fyndor. Used on Home, Story Detail,
 * Featured Collections and editorial campaigns. The cover is the protagonist;
 * the banner is atmosphere; the type is quiet around them.
 *
 * Height target: ~60–65vh so the next section breathes into view.
 */

export interface StoryHeroProps {
  story: Story;
  author?: Author;
  genres?: Genre[];
  onStartReading?: () => void;
  onSaveToLibrary?: () => void;
  className?: string;
}

export function StoryHero({
  story,
  author,
  genres,
  onStartReading,
  onSaveToLibrary,
  className,
}: StoryHeroProps) {
  const bannerUrl = story.heroUrl ?? story.coverUrl;
  const visibleGenres = (genres ?? []).slice(0, 3);

  return (
    <section
      aria-label={`Featured story: ${story.title}`}
      className={cn(
        "relative isolate w-full overflow-hidden",
        "min-h-[62vh] md:min-h-[64vh]",
        className,
      )}
    >
      {/* Atmospheric banner — heavily diffused, never competes with the cover. */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <img
          src={bannerUrl}
          alt=""
          className="h-full w-full object-cover opacity-55 blur-2xl scale-110"
        />
      </div>

      {/* Color wash + readability gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent) 0%, color-mix(in oklab, var(--background) 70%, transparent) 55%, var(--background) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 30%, color-mix(in oklab, var(--brand) 18%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative flex min-h-[62vh] flex-col justify-end pb-14 pt-24 md:min-h-[64vh] md:pb-20 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-end md:gap-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          {/* Cover — the protagonist */}
          <div className="mx-auto w-full max-w-[14rem] md:mx-0 md:max-w-none">
            <div
              className={cn(
                "relative aspect-[2/3] overflow-hidden rounded-[18px] bg-surface-2",
              )}
              style={{ boxShadow: "var(--shadow-cover)" }}
            >
              <img
                src={story.coverUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Information panel */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{kindLabel(story)}</Badge>
              <Badge tone="neutral">
                <span
                  aria-hidden
                  className={cn(
                    "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                    story.status === "ongoing" && "bg-emerald-300",
                    story.status === "completed" && "bg-sky-300",
                    story.status === "hiatus" && "bg-amber-300",
                    story.status === "draft" && "bg-white/60",
                  )}
                />
                {statusLabel(story.status)}
              </Badge>
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[1.04] tracking-tight text-foreground md:text-5xl lg:text-[3.5rem]">
              {story.title}
            </h1>

            {author && (
              <p className="mt-3 text-sm text-muted-foreground">
                by{" "}
                <span className="text-foreground/85">{author.displayName}</span>
              </p>
            )}

            {/* Genres */}
            {visibleGenres.length > 0 && (
              <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.78rem] text-muted-foreground">
                {visibleGenres.map((g, i) => (
                  <li key={g.id} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="opacity-40">
                        ·
                      </span>
                    )}
                    <span>{g.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Synopsis — capped at ~3 lines */}
            <p className="mt-5 max-w-[42rem] text-[0.95rem] leading-relaxed text-muted-foreground line-clamp-3">
              {story.synopsis}
            </p>

            {/* Meta line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 opacity-70" />
                {story.chaptersCount} chapters
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 opacity-70" />
                {readingTime(story.wordsCount)} read
              </span>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartReading}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-primary-foreground",
                  "transition-[filter,transform] duration-[var(--transition-base)]",
                  "hover:brightness-110 active:scale-[0.98]",
                )}
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                <BookOpen className="h-4 w-4" />
                Start Reading
              </button>
              <button
                type="button"
                onClick={onSaveToLibrary}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium",
                  "bg-foreground/[0.06] text-foreground/90 backdrop-blur-md",
                  "transition-colors duration-[var(--transition-base)]",
                  "hover:bg-foreground/[0.1] hover:text-foreground",
                )}
              >
                <Bookmark className="h-4 w-4" />
                Save to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sub-components ---------------- */

function Badge({
  tone,
  children,
}: {
  tone: "brand" | "neutral";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-medium tracking-wide backdrop-blur-md",
        tone === "brand" ? "bg-brand/25 text-white" : "bg-white/10 text-white",
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- States ---------------- */

export function StoryHeroSkeleton({ className }: { className?: string }) {
  return (
    <section
      aria-hidden
      className={cn(
        "relative isolate w-full overflow-hidden bg-surface-1/40",
        "min-h-[62vh] md:min-h-[64vh]",
        className,
      )}
    >
      <div className="container-wide relative flex min-h-[62vh] flex-col justify-end pb-14 pt-24 md:min-h-[64vh] md:pb-20 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:items-end md:gap-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[14rem] md:mx-0 md:max-w-none">
            <div className="aspect-[2/3] animate-pulse rounded-[18px] bg-surface-2" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="h-5 w-20 animate-pulse rounded-full bg-surface-2" />
              <div className="h-5 w-24 animate-pulse rounded-full bg-surface-2" />
            </div>
            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-4 w-40 animate-pulse rounded bg-surface-2" />
            <div className="mt-2 space-y-2">
              <div className="h-3 w-full max-w-[42rem] animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-5/6 max-w-[42rem] animate-pulse rounded bg-surface-2" />
              <div className="h-3 w-2/3 max-w-[42rem] animate-pulse rounded bg-surface-2" />
            </div>
            <div className="mt-3 flex gap-3">
              <div className="h-11 w-40 animate-pulse rounded-full bg-surface-2" />
              <div className="h-11 w-44 animate-pulse rounded-full bg-surface-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StoryHeroEmpty({
  message = "No featured story yet.",
  hint = "When the editors spotlight a story, it will land here.",
  className,
}: {
  message?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden",
        "min-h-[62vh] md:min-h-[64vh]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, color-mix(in oklab, var(--brand) 10%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="container-wide flex min-h-[62vh] flex-col items-center justify-center text-center md:min-h-[64vh]">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-foreground/[0.05]">
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-6 font-display text-2xl text-foreground md:text-3xl">
          {message}
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">{hint}</p>
      </div>
    </section>
  );
}
