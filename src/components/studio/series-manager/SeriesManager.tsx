import { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import {
  mockSeries,
  mockStandaloneStories,
  type SeriesRecord,
  type StandaloneStory,
} from "@/mock/seriesManager";
import { SeriesCard } from "./SeriesCard";
import { SeriesOverview } from "./SeriesOverview";
import { SeriesDetailDrawer } from "./SeriesDetailDrawer";
import { CreateSeriesFlow } from "./CreateSeriesFlow";
import { StandaloneStories } from "./StandaloneStories";
import { SeriesManagerEmpty } from "./SeriesManagerEmpty";
import { SeriesSkeletonGrid } from "./SeriesSkeletonGrid";
import { cn } from "@/lib/utils";

export interface SeriesManagerProps {
  series?: SeriesRecord[];
  standalone?: StandaloneStory[];
  loading?: boolean;
}

type FilterId =
  | "all"
  | "ongoing"
  | "completed"
  | "drafts"
  | "shared-universes"
  | "anthologies"
  | "fanfiction-arcs";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All series" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "drafts", label: "Drafts" },
  { id: "shared-universes", label: "Shared universes" },
  { id: "anthologies", label: "Anthologies" },
  { id: "fanfiction-arcs", label: "Fanfiction arcs" },
];

type SortId = "recent" | "most-stories" | "alphabetical" | "status";

const SORTS: Array<{ id: SortId; label: string }> = [
  { id: "recent", label: "Recently updated" },
  { id: "most-stories", label: "Most stories" },
  { id: "alphabetical", label: "Alphabetical" },
  { id: "status", label: "Completion status" },
];

function matchesFilter(s: SeriesRecord, f: FilterId): boolean {
  switch (f) {
    case "all":
      return true;
    case "ongoing":
      return s.status === "ongoing";
    case "completed":
      return s.status === "completed";
    case "drafts":
      return s.status === "draft" || s.visibility === "draft";
    case "shared-universes":
      return s.type === "shared-universe";
    case "anthologies":
      return s.type === "anthology";
    case "fanfiction-arcs":
      return s.type === "fanfiction-arc";
  }
}

const STATUS_RANK: Record<SeriesRecord["status"], number> = {
  ongoing: 0,
  planned: 1,
  paused: 2,
  draft: 3,
  completed: 4,
};

export function SeriesManager({
  series: initial = mockSeries,
  standalone = mockStandaloneStories,
  loading = false,
}: SeriesManagerProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("recent");
  const [openId, setOpenId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = initial.filter((s) => {
      if (!matchesFilter(s, filter)) return false;
      if (!q) return true;
      const hay = [
        s.title,
        s.description,
        s.type,
        s.status,
        s.genre ?? "",
        ...s.stories.map((st) => st.title),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "most-stories":
          return b.stories.length - a.stories.length;
        case "status":
          return STATUS_RANK[a.status] - STATUS_RANK[b.status];
        case "recent":
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });
    return sorted;
  }, [initial, search, filter, sort]);

  const openSeries = useMemo(
    () => initial.find((s) => s.id === openId) ?? null,
    [initial, openId],
  );

  const isEmpty = !loading && initial.length === 0;

  return (
    <div className="space-y-12">
      {!isEmpty && !loading ? (
        <SeriesOverview series={initial} standalone={standalone} />
      ) : null}

      {/* Controls */}
      {!isEmpty ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search series, stories, types…"
                className="h-9 w-full rounded-full bg-foreground/[0.04] pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-foreground/[0.06]"
              />
              {search ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className="rounded-full bg-foreground/[0.05] px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/85 outline-none hover:bg-foreground/[0.07]"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand/85 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-brand-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="h-3 w-3" /> New series
              </button>
            </div>
          </div>

          <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1">
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "bg-foreground/[0.08] text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Library */}
      {loading ? (
        <SeriesSkeletonGrid />
      ) : isEmpty ? (
        <SeriesManagerEmpty onCreate={() => setCreateOpen(true)} />
      ) : visible.length === 0 ? (
        <div className="rounded-2xl bg-foreground/[0.02] px-6 py-16 text-center">
          <p className="font-display text-xl tracking-tight">No matching series.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or clear the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <SeriesCard key={s.id} series={s} onOpen={setOpenId} />
          ))}
        </div>
      )}

      {!isEmpty && !loading ? <StandaloneStories stories={standalone} /> : null}

      <SeriesDetailDrawer series={openSeries} onClose={() => setOpenId(null)} />
      <CreateSeriesFlow
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        availableStories={standalone}
      />
    </div>
  );
}
