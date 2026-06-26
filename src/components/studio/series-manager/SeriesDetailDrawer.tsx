import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { SeriesRecord } from "@/mock/seriesManager";
import {
  SERIES_STATUS_META,
  SERIES_TYPE_META,
  STATUS_TONE_CLASS,
  STORY_ROLE_LABEL,
  STORY_STATUS_LABEL,
  VISIBILITY_LABEL,
  DISCOVERY_LABEL_META,
  formatRelative,
  formatWords,
} from "./shared";
import { StoryOrderBuilder } from "./StoryOrderBuilder";
import { ReadingOrderPreview } from "./ReadingOrderPreview";
import { cn } from "@/lib/utils";

interface Props {
  series: SeriesRecord | null;
  onClose: () => void;
}

export function SeriesDetailDrawer({ series, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!series) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [series, onClose]);

  const open = series !== null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-200",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={series?.title}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-[var(--surface-1)] shadow-2xl",
          "md:w-[min(720px,92vw)]",
          "transition-transform duration-250 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {series ? (
          <>
            <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[var(--surface-1)]/85 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                <span>{SERIES_TYPE_META[series.type].label}</span>
                <span aria-hidden="true">·</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5",
                    STATUS_TONE_CLASS[SERIES_STATUS_META[series.status].tone],
                  )}
                >
                  {SERIES_STATUS_META[series.status].label}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close series"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="space-y-10 px-6 pb-16 pt-2">
              {/* Identity */}
              <section className="space-y-3">
                <h2 className="font-display text-3xl leading-tight tracking-tight">
                  {series.title}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {series.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{series.stories.length} stories</span>
                  <span aria-hidden="true">·</span>
                  <span>{VISIBILITY_LABEL[series.visibility]}</span>
                  {series.genre ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{series.genre}</span>
                    </>
                  ) : null}
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatRelative(series.updatedAt)}</span>
                </div>

                {series.discoveryLabels?.length ? (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {series.discoveryLabels.map((l) => (
                      <span
                        key={l}
                        className="rounded-full bg-[color-mix(in_oklab,var(--brand)_16%,transparent)] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-foreground/90"
                      >
                        {DISCOVERY_LABEL_META[l]}
                      </span>
                    ))}
                  </div>
                ) : null}
              </section>

              {/* Positioning */}
              {series.positioning ? (
                <section className="space-y-3">
                  <h3 className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Narrative positioning
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {series.positioning.mainArc ? (
                      <PositioningRow label="Main arc" value={series.positioning.mainArc} />
                    ) : null}
                    {series.positioning.tone ? (
                      <PositioningRow label="Tone" value={series.positioning.tone} />
                    ) : null}
                    {series.positioning.audience ? (
                      <PositioningRow
                        label="Audience"
                        value={series.positioning.audience}
                      />
                    ) : null}
                    {series.positioning.complexity ? (
                      <PositioningRow
                        label="Reading complexity"
                        value={
                          series.positioning.complexity[0].toUpperCase() +
                          series.positioning.complexity.slice(1)
                        }
                      />
                    ) : null}
                    {series.positioning.spoilerSensitivity ? (
                      <PositioningRow
                        label="Spoiler sensitivity"
                        value={
                          series.positioning.spoilerSensitivity[0].toUpperCase() +
                          series.positioning.spoilerSensitivity.slice(1)
                        }
                      />
                    ) : null}
                  </dl>
                </section>
              ) : null}

              {/* Connected stories */}
              <section className="space-y-3">
                <h3 className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Connected stories
                </h3>
                <ul className="divide-y divide-foreground/[0.04] rounded-xl bg-foreground/[0.02]">
                  {series.stories.map((s) => (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-center gap-4 px-4 py-3"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/[0.06] font-display text-sm text-foreground/90">
                        {s.publicationOrder}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-display text-base tracking-tight">
                          {s.title}
                        </div>
                        <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                          {STORY_ROLE_LABEL[s.role]} · {STORY_STATUS_LABEL[s.status]}
                        </div>
                      </div>
                      <div className="text-right text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                        <div>{s.chapters} ch · {formatWords(s.words)} w</div>
                        <div className="mt-0.5">{formatRelative(s.updatedAt)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <StoryOrderBuilder series={series} />
              <ReadingOrderPreview series={series} />
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}

function PositioningRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground/90">{value}</dd>
    </div>
  );
}
