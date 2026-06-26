import { useMemo, useState } from "react";
import type { SeriesRecord, SeriesStoryRef } from "@/mock/seriesManager";
import {
  ORDER_MODE_META,
  STORY_ROLE_LABEL,
  type OrderMode,
} from "./shared";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface Props {
  series: SeriesRecord;
}

function orderedStories(
  stories: SeriesStoryRef[],
  mode: OrderMode,
): SeriesStoryRef[] {
  const key: keyof SeriesStoryRef =
    mode === "publication"
      ? "publicationOrder"
      : mode === "chronological"
        ? "chronologicalOrder"
        : "recommendedOrder";
  return [...stories].sort((a, b) => {
    const av = (a[key] as number | undefined) ?? a.publicationOrder + 100;
    const bv = (b[key] as number | undefined) ?? b.publicationOrder + 100;
    return av - bv;
  });
}

export function StoryOrderBuilder({ series }: Props) {
  const [mode, setMode] = useState<OrderMode>("publication");
  const ordered = useMemo(() => orderedStories(series.stories, mode), [series, mode]);

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-xl tracking-tight">Story order</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {ORDER_MODE_META[mode].description}
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Order mode"
          className="flex flex-wrap items-center gap-1 rounded-full bg-foreground/[0.04] p-1"
        >
          {(Object.keys(ORDER_MODE_META) as OrderMode[]).map((m) => {
            const active = m === mode;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "bg-background/80 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {ORDER_MODE_META[m].label}
              </button>
            );
          })}
        </div>
      </header>

      <ol className="space-y-2">
        {ordered.map((s, i) => (
          <li
            key={s.id}
            className={cn(
              "group flex items-center gap-4 rounded-xl px-4 py-3",
              "bg-foreground/[0.025] transition-colors hover:bg-foreground/[0.045]",
            )}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/[0.06] font-display text-sm text-foreground/90">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate font-display text-base tracking-tight">
                {s.title}
              </div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {STORY_ROLE_LABEL[s.role]} · {s.chapters} ch
              </div>
            </div>
            <GripVertical
              className="h-4 w-4 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
