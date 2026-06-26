import type { StandaloneStory } from "@/mock/seriesManager";
import { STORY_STATUS_LABEL, formatRelative } from "./shared";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  stories: StandaloneStory[];
}

export function StandaloneStories({ stories }: Props) {
  if (stories.length === 0) return null;

  return (
    <section className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl tracking-tight">
            Standalone stories
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stories that don't belong to a series — and don't need to.
          </p>
        </div>
      </header>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <li
            key={s.id}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-4 py-3",
              "bg-foreground/[0.025] transition-colors hover:bg-foreground/[0.045]",
            )}
          >
            <div className="min-w-0">
              <div className="truncate font-display text-base tracking-tight">
                {s.title}
              </div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {s.kind === "original" ? "Original" : "Fanfiction"} ·{" "}
                {STORY_STATUS_LABEL[s.status]} · {formatRelative(s.updatedAt)}
              </div>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-foreground/[0.05] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:bg-foreground/[0.1]"
            >
              <Plus className="h-3 w-3" /> Add to series
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
