import { cn } from "@/lib/utils";

export type StoryFilterId =
  | "all"
  | "drafts"
  | "published"
  | "originals"
  | "fanfiction";

export type StorySortId = "recently-edited" | "recently-published" | "alphabetical";

export interface StoryFiltersProps {
  filter: StoryFilterId;
  onFilterChange: (id: StoryFilterId) => void;
  sort: StorySortId;
  onSortChange: (id: StorySortId) => void;
  /** Optional counts per filter, shown as quiet trailing numerals. */
  counts?: Partial<Record<StoryFilterId, number>>;
  className?: string;
}

const FILTERS: { id: StoryFilterId; label: string }[] = [
  { id: "all", label: "All stories" },
  { id: "drafts", label: "Drafts" },
  { id: "published", label: "Published" },
  { id: "originals", label: "Originals" },
  { id: "fanfiction", label: "Fanfiction" },
];

const SORTS: { id: StorySortId; label: string }[] = [
  { id: "recently-edited", label: "Recently edited" },
  { id: "recently-published", label: "Recently published" },
  { id: "alphabetical", label: "Alphabetical" },
];

/**
 * Studio v1.0 — Story filters & sort.
 *
 * Pill-style filters on the left, native sort on the right.
 * Quiet, borderless — separation lives in surface tone and spacing.
 */
export function StoryFilters({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  counts,
  className,
}: StoryFiltersProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-6 gap-y-3",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Filter stories"
        className="flex flex-wrap items-center gap-1.5"
      >
        {FILTERS.map((f) => {
          const active = f.id === filter;
          const count = counts?.[f.id];
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onFilterChange(f.id)}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-xs font-medium",
                "transition-colors duration-[var(--transition-base)]",
                active
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground/90",
              )}
            >
              <span>{f.label}</span>
              {typeof count === "number" && (
                <span
                  className={cn(
                    "tabular-nums text-[0.7rem]",
                    active ? "text-foreground/70" : "text-muted-foreground/60",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <span className="uppercase tracking-[0.18em]">Sort</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as StorySortId)}
          className={cn(
            "h-8 rounded-full bg-foreground/[0.04] px-3 pr-8 text-xs text-foreground",
            "appearance-none outline-none transition-colors",
            "hover:bg-foreground/[0.07] focus-visible:ring-2 focus-visible:ring-brand/60",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.65rem center",
          }}
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id} className="bg-surface-2">
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
