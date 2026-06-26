import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import type { LoreEntityKind } from "@/components/story-world/types";
import type { VisibilityRule, WorldBuilderEntity } from "@/mock/worldBuilder";
import { ENTITY_META } from "./shared";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate?: (entity: WorldBuilderEntity) => void;
  /** Optional initial kind selection. */
  initialKind?: LoreEntityKind;
}

const KINDS: LoreEntityKind[] = [
  "character",
  "location",
  "organization",
  "item",
  "creature",
  "glossary",
];

/**
 * Progressive Creation flow.
 *
 * Step 1: kind + name + short description (the minimum viable entity).
 * Step 2: optional alias / first appearance / visibility / private notes —
 *         collapsed by default so the modal never feels like a form.
 */
export function CreateEntityFlow({ open, onClose, onCreate, initialKind }: Props) {
  const [kind, setKind] = useState<LoreEntityKind>(initialKind ?? "character");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [alias, setAlias] = useState("");
  const [firstChapter, setFirstChapter] = useState("");
  const [visibility, setVisibility] = useState<VisibilityRule>("public");
  const [notes, setNotes] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setKind(initialKind ?? "character");
    setName("");
    setDescription("");
    setAdvancedOpen(false);
    setAlias("");
    setFirstChapter("");
    setVisibility("public");
    setNotes("");
    const t = window.setTimeout(() => nameRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, initialKind, onClose]);

  if (!open) return null;

  const canSave = name.trim().length >= 2;

  const handleSave = () => {
    if (!canSave) return;
    const aliases = alias
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
    const chapter = Number(firstChapter) || 1;
    const entity: WorldBuilderEntity = {
      id: `wb-${kind}-${Date.now()}`,
      kind,
      name: name.trim(),
      role: defaultRole(kind),
      description: description.trim() || "—",
      aliases,
      firstAppearanceChapter: chapter,
      firstAppearanceTitle: `Chapter ${chapter}`,
      linkedChapters: 0,
      mentionCount: 0,
      visibility,
      visibleFromChapter:
        visibility === "hidden-until-chapter" ? chapter : undefined,
      matchPriority: 60,
      updatedAt: new Date().toISOString(),
      authorNotes: notes.trim() || undefined,
      related: [],
    };
    onCreate?.(entity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create new entity"
        className="absolute left-1/2 top-1/2 flex max-h-[92vh] w-[min(560px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-surface-1 shadow-[var(--shadow-elevated)]"
      >
        <header className="flex items-start justify-between gap-3 px-7 pb-2 pt-7">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-brand">
              World Builder
            </p>
            <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight">
              New entity
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with a type and a name. Everything else can wait.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-7 pb-2">
          {/* Step 1 — kind */}
          <Label>Type</Label>
          <div className="grid grid-cols-3 gap-2">
            {KINDS.map((k) => {
              const meta = ENTITY_META[k];
              const Icon = meta.icon;
              const active = k === kind;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-xs transition-all",
                    active
                      ? "bg-foreground/[0.06] text-foreground shadow-[var(--shadow-glow)]"
                      : "bg-foreground/[0.03] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {meta.label.replace(/s$/, "")}
                </button>
              );
            })}
          </div>

          {/* Name */}
          <div className="mt-6">
            <Label>Name</Label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Abel"
              className={fieldClass}
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <Label>Short description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="One or two sentences. You can expand this later."
              className={cn(fieldClass, "resize-none py-2.5")}
            />
          </div>

          {/* Advanced */}
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            aria-expanded={advancedOpen}
            className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                advancedOpen && "rotate-180",
              )}
            />
            Advanced details
          </button>

          {advancedOpen ? (
            <div className="mt-5 space-y-5 rounded-2xl bg-surface-2/40 p-5">
              <div>
                <Label>Aliases</Label>
                <input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="Comma-separated. e.g. The Apprentice, Abel of Silverquill"
                  className={fieldClass}
                />
              </div>
              <div>
                <Label>First appearance chapter</Label>
                <input
                  value={firstChapter}
                  onChange={(e) => setFirstChapter(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="e.g. 1"
                  inputMode="numeric"
                  className={fieldClass}
                />
              </div>
              <div>
                <Label>Visibility rule</Label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as VisibilityRule)}
                  className={cn(fieldClass, "cursor-pointer")}
                >
                  <option value="public">Public from the beginning</option>
                  <option value="hidden-until-chapter">Hidden until chapter…</option>
                  <option value="spoiler-protected">Spoiler protected</option>
                  <option value="author-only">Author-only</option>
                </select>
              </div>
              <div>
                <Label>Private notes</Label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Backstory, motivation, future plot relevance. Just for you."
                  className={cn(fieldClass, "resize-none py-2.5")}
                />
              </div>
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-end gap-3 px-7 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-primary-foreground transition-[filter] duration-[var(--transition-base)]",
              canSave ? "hover:brightness-110" : "cursor-not-allowed opacity-40",
            )}
            style={{ backgroundImage: "var(--gradient-brand-soft)" }}
          >
            Create entity
          </button>
        </footer>
      </div>
    </div>
  );
}

function defaultRole(kind: LoreEntityKind): string {
  switch (kind) {
    case "character": return "Character";
    case "location": return "Location";
    case "organization": return "Organization";
    case "item": return "Item";
    case "creature": return "Creature";
    case "glossary": return "Glossary Term";
  }
}

const fieldClass =
  "mt-2 w-full rounded-xl bg-surface-2/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </label>
  );
}
