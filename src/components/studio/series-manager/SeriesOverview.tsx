import type { SeriesRecord, StandaloneStory } from "@/mock/seriesManager";

interface Props {
  series: SeriesRecord[];
  standalone: StandaloneStory[];
}

export function SeriesOverview({ series, standalone }: Props) {
  const active = series.filter((s) => s.status === "ongoing").length;
  const completed = series.filter((s) => s.status === "completed").length;
  const drafts = series.filter((s) => s.status === "draft").length;
  const connected = series.reduce((sum, s) => sum + s.stories.length, 0);

  const stats: Array<{ label: string; value: number | string }> = [
    { label: "Total series", value: series.length },
    { label: "Active", value: active },
    { label: "Completed", value: completed },
    { label: "Drafts", value: drafts },
    { label: "Connected stories", value: connected },
    { label: "Standalone", value: standalone.length },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl bg-foreground/[0.02] px-6 py-5 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5">
          <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            {s.label}
          </span>
          <span className="font-display text-2xl leading-none tracking-tight text-foreground">
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}
