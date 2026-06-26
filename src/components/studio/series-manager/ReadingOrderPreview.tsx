import type { SeriesRecord, SeriesStoryRef } from "@/mock/seriesManager";
import { READER_LABEL_META, STORY_ROLE_LABEL } from "./shared";
import { cn } from "@/lib/utils";
import { BookOpen, Bookmark, ArrowRight } from "lucide-react";

interface Props {
  series: SeriesRecord;
}

function recommendedOrder(stories: SeriesStoryRef[]): SeriesStoryRef[] {
  return [...stories].sort((a, b) => {
    const av = a.recommendedOrder ?? a.publicationOrder + 100;
    const bv = b.recommendedOrder ?? b.publicationOrder + 100;
    return av - bv;
  });
}

export function ReadingOrderPreview({ series }: Props) {
  const ordered = recommendedOrder(series.stories);
  const start = ordered.find((s) => s.readerLabels?.includes("start-here")) ?? ordered[0];
  const hasSpoilers = ordered.some((s) =>
    s.readerLabels?.includes("contains-spoilers"),
  );

  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[color-mix(in_oklab,var(--brand)_10%,transparent)] to-foreground/[0.02] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brand">
            Reader preview
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight">
            {series.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {series.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.06] px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:bg-foreground/[0.1]"
          >
            <Bookmark className="h-3 w-3" /> Save series
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand/85 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-brand-foreground transition-opacity hover:opacity-90"
          >
            <BookOpen className="h-3 w-3" /> Follow series
          </button>
        </div>
      </div>

      {start ? (
        <div className="mt-6 rounded-xl bg-background/40 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            Recommended starting point
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <div className="font-display text-lg tracking-tight">
              {start.title}
            </div>
            <button className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em] text-brand hover:opacity-80">
              Start reading <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : null}

      <ol className="mt-6 space-y-2">
        {ordered.map((s, i) => (
          <li
            key={s.id}
            className="flex items-center gap-4 rounded-xl bg-background/30 px-4 py-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/[0.06] font-display text-sm text-foreground/90">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-display text-base tracking-tight">
                  {s.title}
                </span>
                {s.readerLabels?.map((l) => (
                  <span
                    key={l}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18em]",
                      l === "start-here"
                        ? "bg-[color-mix(in_oklab,var(--brand)_22%,transparent)] text-foreground"
                        : l === "contains-spoilers"
                          ? "bg-amber-500/12 text-amber-200/85"
                          : "bg-foreground/[0.06] text-muted-foreground",
                    )}
                  >
                    {READER_LABEL_META[l].label}
                  </span>
                ))}
              </div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {STORY_ROLE_LABEL[s.role]}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {hasSpoilers ? (
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          Spoiler-safe view available to readers.
        </p>
      ) : null}
    </section>
  );
}
