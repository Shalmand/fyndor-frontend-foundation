import { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import {
  mockWorldBuilderEntities,
  worldBuilderMeta as defaultMeta,
  type WorldBuilderEntity,
  type WorldBuilderMeta,
  
} from "@/mock/worldBuilder";
import { ENTITY_KINDS, ENTITY_META, type EntityKindFilter } from "./shared";
import { EntityCard } from "./EntityCard";
import { EntityDetailDrawer } from "./EntityDetailDrawer";
import { CreateEntityFlow } from "./CreateEntityFlow";
import { WorldBuilderEmpty } from "./WorldBuilderEmpty";
import { EntitySkeletonGrid } from "./EntitySkeletonGrid";
import { cn } from "@/lib/utils";

export interface WorldBuilderProps {
  /** When omitted, falls back to the bundled "Ash & Atlas" mock world. */
  meta?: WorldBuilderMeta;
  /** Entities to display. Pass [] to demo the empty state. */
  entities?: WorldBuilderEntity[];
  /** Visual loading state. */
  loading?: boolean;
}

type FilterId = "all" | "public" | "spoiler" | "author-notes" | "recent";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "public", label: "Public" },
  { id: "spoiler", label: "Spoiler protected" },
  { id: "author-notes", label: "Author notes" },
  { id: "recent", label: "Recently updated" },
];

const RECENT_WINDOW_MS = 1000 * 60 * 60 * 24 * 7;

export function WorldBuilder({
  meta = defaultMeta,
  entities: initial = mockWorldBuilderEntities,
  loading = false,
}: WorldBuilderProps) {
  const [entities, setEntities] = useState<WorldBuilderEntity[]>(initial);
  const [kind, setKind] = useState<EntityKindFilter>("all");
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [openEntity, setOpenEntity] = useState<WorldBuilderEntity | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const counts = useMemo(() => {
    const c: Record<EntityKindFilter, number> = {
      all: entities.length,
      character: 0,
      location: 0,
      organization: 0,
      item: 0,
      creature: 0,
      glossary: 0,
    };
    for (const e of entities) c[e.kind] += 1;
    return c;
  }, [entities]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entities.filter((e) => {
      if (kind !== "all" && e.kind !== kind) return false;
      if (filter === "public" && e.visibility !== "public") return false;
      if (filter === "spoiler" && e.visibility !== "spoiler-protected") return false;
      if (filter === "author-notes" && !e.authorNotes) return false;
      if (filter === "recent" && Date.now() - new Date(e.updatedAt).getTime() > RECENT_WINDOW_MS) return false;
      if (!q) return true;
      const hay = [
        e.name,
        e.role,
        e.description,
        ...e.aliases,
        ENTITY_META[e.kind].label,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entities, kind, filter, search]);

  const isEmptyWorld = entities.length === 0 && !loading;

  const openEntityById = (id: string) => {
    const next = entities.find((e) => e.id === id);
    if (next) setOpenEntity(next);
  };

  const handleCreate = (entity: WorldBuilderEntity) => {
    setEntities((prev) => [entity, ...prev]);
    setOpenEntity(entity);
  };

  return (
    <div className="space-y-12">
      {/* 1 — World overview */}
      <Overview meta={meta} counts={counts} total={entities.length} />

      {isEmptyWorld ? (
        <WorldBuilderEmpty onCreate={() => setCreateOpen(true)} />
      ) : (
        <>
          {/* 2 — Entity navigation */}
          <EntityNav kind={kind} onChange={setKind} counts={counts} />

          {/* Search + filters + create */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchField value={search} onChange={setSearch} />
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
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
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
                style={{ backgroundImage: "var(--gradient-brand-soft)" }}
              >
                <Plus className="h-4 w-4" />
                New entity
              </button>
            </div>
          </div>

          {/* 3 — Entity library */}
          {loading ? (
            <EntitySkeletonGrid count={6} />
          ) : visible.length === 0 ? (
            <NoResults query={search} onClear={() => { setSearch(""); setFilter("all"); setKind("all"); }} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((e) => (
                <EntityCard key={e.id} entity={e} onOpen={setOpenEntity} />
              ))}
            </div>
          )}
        </>
      )}

      {/* 4 — Detail drawer */}
      <EntityDetailDrawer
        entity={openEntity}
        onClose={() => setOpenEntity(null)}
        onSelectRelated={openEntityById}
      />

      {/* 5 — Create flow */}
      <CreateEntityFlow
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Overview({
  meta,
  counts,
  total,
}: {
  meta: WorldBuilderMeta;
  counts: Record<EntityKindFilter, number>;
  total: number;
}) {
  const rows: Array<{ label: string; value: number }> = [
    { label: "Characters", value: counts.character },
    { label: "Locations", value: counts.location },
    { label: "Organizations", value: counts.organization },
    { label: "Items", value: counts.item },
    { label: "Creatures", value: counts.creature },
    { label: "Glossary", value: counts.glossary },
  ];
  return (
    <section className="rounded-3xl bg-surface-1/55 p-7 md:p-10">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-brand">
        {meta.storyTitle}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight md:text-[2.5rem]">
        {meta.worldName}
      </h2>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
        {meta.worldDescription}
      </p>

      <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-5">
        <div>
          <div className="font-display text-4xl tracking-tight text-foreground">
            {total}
          </div>
          <div className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Total entities
          </div>
        </div>
        <div className="hidden h-12 w-px bg-foreground/10 md:block" aria-hidden />
        <dl className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3 md:grid-cols-6">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                {r.label}
              </dt>
              <dd className="mt-0.5 text-lg text-foreground/90">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function EntityNav({
  kind,
  onChange,
  counts,
}: {
  kind: EntityKindFilter;
  onChange: (k: EntityKindFilter) => void;
  counts: Record<EntityKindFilter, number>;
}) {
  return (
    <nav
      aria-label="Entity types"
      className="-mx-4 overflow-x-auto px-4 scrollbar-none"
    >
      <div className="flex min-w-max items-center gap-2">
        {ENTITY_KINDS.map((k) => {
          const meta = ENTITY_META[k];
          const Icon = meta.icon;
          const active = kind === k;
          const count = counts[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => onChange(k)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all duration-[var(--transition-base)]",
                active
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{meta.label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 text-[0.68rem] tabular-nums",
                  active
                    ? "bg-background/40 text-foreground/85"
                    : "text-muted-foreground/70",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

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
        placeholder="Search by name, alias, description…"
        aria-label="Search the world"
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

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="rounded-2xl bg-surface-1/40 px-6 py-16 text-center">
      <p className="font-display text-xl tracking-tight text-foreground/90">
        {query ? `Nothing in this world matches “${query}”.` : "Nothing here yet under these filters."}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Try a different filter, or create a new entity to expand your world.
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

// Hide scrollbars on horizontal nav without adding a new global utility.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface VisibilityRuleDeclared extends Record<string, VisibilityRule> {}
}
