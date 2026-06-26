import type { SeriesRecord } from "@/mock/seriesManager";
import {
  SERIES_TYPE_META,
  SERIES_STATUS_META,
  STATUS_TONE_CLASS,
  VISIBILITY_LABEL,
  formatRelative,
} from "./shared";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Props {
  series: SeriesRecord;
  onOpen: (id: string) => void;
}

export function SeriesCard({ series, onOpen }: Props) {
  const type = SERIES_TYPE_META[series.type];
  const status = SERIES_STATUS_META[series.status];
  const TypeIcon = type.icon;

  return (
    <button
      type="button"
      onClick={() => onOpen(series.id)}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl",
        "bg-foreground/[0.025] text-left",
        "transition-all duration-200 ease-out",
        "hover:bg-foreground/[0.045] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/40",
      )}
    >
      {/* Cover plinth */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            "from-[color-mix(in_oklab,var(--brand)_28%,transparent)]",
            "via-[color-mix(in_oklab,var(--brand)_8%,transparent)]",
            "to-foreground/[0.04]",
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/55 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur">
            <TypeIcon className="h-3 w-3" />
            {type.short}
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em]",
              STATUS_TONE_CLASS[status.tone],
            )}
          >
            {status.label}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <h3 className="font-display text-xl leading-tight tracking-tight text-foreground drop-shadow-sm">
            {series.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {series.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{series.stories.length} stories</span>
            <span aria-hidden="true">·</span>
            <span>{VISIBILITY_LABEL[series.visibility]}</span>
            {series.genre ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{series.genre}</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Updated {formatRelative(series.updatedAt)}</span>
          <span className="inline-flex items-center gap-1 text-foreground/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}
