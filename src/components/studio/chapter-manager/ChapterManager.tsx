import { useMemo, useState } from "react";
import { Search, Plus, X, ArrowUpDown } from "lucide-react";
import {
  chapterManagerStory as defaultStory,
  mockChapters,
  type ChapterRecord,
  type ChapterStatus,
  type ChapterStoryMeta,
} from "@/mock/chapterManager";
import { StoryHeader } from "./StoryHeader";
import { ContinueWritingShortcut } from "./ContinueWritingShortcut";
import { ChapterTimeline } from "./ChapterTimeline";
import { ChapterRow } from "./ChapterRow";
import { ChapterDetailDrawer } from "./ChapterDetailDrawer";
import { CreateChapterFlow } from "./CreateChapterFlow";
import { ChapterManagerEmpty } from "./ChapterManagerEmpty";
import { ChapterSkeleton } from "./ChapterSkeleton";
import { cn } from "@/lib/utils";

export interface ChapterManagerProps {
  story?: ChapterStoryMeta;
  chapters?: ChapterRecord[];
  loading?: boolean;
}

type FilterId =
  | "all"
  | "draft"
  | "published"
  | "scheduled"
  | "needs-revision"
  | "archived";

type SortId = "order" | "edited" | "published" | "words";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All chapters" },
  { id: "draft", label: "Drafts" },
  { id: "published", label: "Published" },
  { id: "scheduled", label: "Scheduled" },
  { id: "needs-revision", label: "Needs revision" },
  { id: "archived", label: "Archived" },
];

const SORTS: Array<{ id: SortId; label: string }> = [
  { id: "order", label: "Story order" },
  { id: "edited", label: "Recently edited" },
  { id: "published", label: "Recently published" },
  { id: "words", label: "Word count" },
];

const DRAFT_STATUSES: ChapterStatus[] = ["draft", "in-progress", "ready", "needs-revision"];

export function ChapterManager({
  story = defaultStory,
  chapters: initial = mockChapters,
  loading = false,
}: ChapterManagerProps) {
  const [chapters, setChapters] = useState<ChapterRecord[]>(initial);
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("order");
  const [search, setSearch] = useState("");
  const [openChapter, setOpenChapter] = useState<ChapterRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const counts = useMemo(() => {
    const c = { total: chapters.length, published: 0, drafts: 0 };
    for (const ch of chapters) {
      if (ch.status === "published") c.published += 1;
      if (DRAFT_STATUSES.includes(ch.status)) c.drafts += 1;
    }
    return c;
  }, [chapters]);

  const continueTarget = useMemo(() => {
    const drafts = chapters
      .filter((c) => DRAFT_STATUSES.includes(c.status))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    return drafts[0] ?? null;
  }, [chapters]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = chapters.filter((ch) => {
      if (filter === "draft" && !DRAFT_STATUSES.includes(ch.status)) return false;
      if (filter === "published" && ch.status !== "published") return false;
      if (filter === "scheduled" && ch.status !== "scheduled") return false;
      if (filter === "needs-revision" && ch.status !== "needs-revision") return false;
      if (filter === "archived" && ch.status !== "archived") return false;
      // "all" hides archived by default for a calmer table of contents
      if (filter === "all" && ch.status === "archived") return false;
      if (!q) return true;
      const hay = [ch.title, ch.excerpt, ch.status, ch.privateNote ?? ""]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    const sorted = [...filtered];
    switch (sort) {
      case "order":
        sorted.sort((a, b) => a.number - b.number);
        break;
      case "edited":
        sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
      case "published":
        sorted.sort((a, b) => {
          const ap = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const bp = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return bp - ap;
        });
        break;
      case "words":
        sorted.sort((a, b) => b.words - a.words);
        break;
    }
    return sorted;
  }, [chapters, filter, sort, search]);

  const isEmpty = chapters.length === 0 && !loading;
  const nextNumber =
    chapters.reduce((max, c) => Math.max(max, c.number), 0) + 1;

  const openChapterById = (id: string) => {
    const next = chapters.find((c) => c.id === id);
    if (next) setOpenChapter(next);
  };

  const handleCreate = (chapter: ChapterRecord) => {
    setChapters((prev) => [...prev, chapter]);
    setOpenChapter(chapter);
  };

  const handleContinue = (id: string) => {
    // Conceptual handoff to the Writing Session (not implemented in this sprint).
    // eslint-disable-next-line no-console
    console.info("[ChapterManager] continue writing →", id);
  };

  return (
    <div className="space-y-10 md:space-y-12">
      {/* 1 — Story header */}
      <StoryHeader
        story={story}
        total={counts.total}
        published={counts.published}
        drafts={counts.drafts}
      />

      {isEmpty ? (
        <ChapterManagerEmpty onCreate={() => setCreateOpen(true)} />
      ) : (
        <>
          {/* 2 — Continue writing shortcut */}
          <ContinueWritingShortcut
            chapter={continueTarget}
            onContinue={handleContinue}
          />

          {/* 3 — Chapter timeline */}
          {!loading ? (
            <ChapterTimeline
              chapters={[...chapters]
                .filter((c) => c.status !== "archived")
                .sort((a, b) => a.number - b.number)}
              activeId={openChapter?.id ?? null}
              onSelect={openChapterById}
            />
          ) : null}

          {/* Toolbar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchField value={search} onChange={setSearch} />
            <div className="flex flex-wrap items-center gap-2">
              <SortSelect value={sort} onChange={setSort} />
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
                style={{ backgroundImage: "var(--gradient-brand-soft)" }}
              >
                <Plus className="h-4 w-4" />
                New chapter
              </button>
            </div>
          </div>

          {/* Filters */}
          <nav
            aria-label="Filter chapters"
            className="-mx-4 overflow-x-auto px-4 scrollbar-none"
          >
            <div className="flex min-w-max items-center gap-2">
              {FILTERS.map((f) => {
                const active = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.18em] transition-colors",
                      active
                        ? "bg-foreground/[0.08] text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* 4 — Chapter list */}
          {loading ? (
            <ChapterSkeleton count={6} />
          ) : visible.length === 0 ? (
            <NoResults
              query={search}
              onClear={() => {
                setSearch("");
                setFilter("all");
                setSort("order");
              }}
            />
          ) : (
            <div className="space-y-3">
              {visible.map((ch) => (
                <ChapterRow
                  key={ch.id}
                  chapter={ch}
                  onOpen={openChapterById}
                  onContinue={handleContinue}
                />
              ))}
            </div>
          )}

          <p className="pt-2 text-center text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
            Drag a chapter to reorder
          </p>
        </>
      )}

      {/* 5 — Detail drawer */}
      <ChapterDetailDrawer
        chapter={openChapter}
        onClose={() => setOpenChapter(null)}
        onContinue={handleContinue}
      />

      {/* 6 — Create flow */}
      <CreateChapterFlow
        open={createOpen}
        nextNumber={nextNumber}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, excerpt, status…"
        aria-label="Search chapters"
        className="h-10 w-full rounded-full bg-surface-1/70 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortId;
  onChange: (v: SortId) => void;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort chapters</span>
      <ArrowUpDown
        className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortId)}
        className="h-9 appearance-none rounded-full bg-surface-1/70 pl-8 pr-4 text-[0.78rem] text-foreground/85 focus-visible:outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="rounded-2xl bg-surface-1/40 px-6 py-16 text-center">
      <p className="font-display text-xl tracking-tight text-foreground/90">
        {query
          ? `No chapter matches “${query}”.`
          : "No chapters under these filters."}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Try a different filter, or create a new chapter to continue the story.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
      >
        Clear all filters
      </button>
    </div>
  );
}
