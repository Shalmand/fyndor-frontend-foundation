import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, ArrowRight, FileText, Copy } from "lucide-react";
import type { ChapterRecord, ChapterStatus } from "@/mock/chapterManager";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  /** Used to suggest the next chapter number. */
  nextNumber: number;
  onClose: () => void;
  onCreate?: (chapter: ChapterRecord) => void;
}

type StartFrom = "blank" | "duplicate";

const INITIAL_STATUSES: Array<{ id: ChapterStatus; label: string }> = [
  { id: "draft", label: "Draft" },
  { id: "in-progress", label: "In progress" },
  { id: "ready", label: "Ready to publish" },
];

export function CreateChapterFlow({ open, nextNumber, onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(String(nextNumber));
  const [startFrom, setStartFrom] = useState<StartFrom>("blank");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [authorNote, setAuthorNote] = useState("");
  const [status, setStatus] = useState<ChapterStatus>("draft");
  const [scheduledFor, setScheduledFor] = useState("");
  const [privateNote, setPrivateNote] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setNumber(String(nextNumber));
    setStartFrom("blank");
    setAdvancedOpen(false);
    setAuthorNote("");
    setStatus("draft");
    setScheduledFor("");
    setPrivateNote("");
    const t = window.setTimeout(() => titleRef.current?.focus(), 60);
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
  }, [open, nextNumber, onClose]);

  if (!open) return null;

  const canSave = title.trim().length >= 1;

  const handleSave = () => {
    if (!canSave) return;
    const num = Number(number) || nextNumber;
    const chapter: ChapterRecord = {
      id: `ch-new-${Date.now()}`,
      number: num,
      title: title.trim(),
      excerpt: startFrom === "duplicate" ? "Duplicated from the previous chapter." : "A new beginning. Start writing.",
      status: scheduledFor ? "scheduled" : status,
      words: 0,
      readingMinutes: 0,
      storyWorldLinks: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scheduledFor: scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
      authorNote: authorNote.trim() || undefined,
      privateNote: privateNote.trim() || undefined,
      linkedEntities: [],
      readiness: [
        { id: "title", label: "Title added", done: true },
        { id: "content", label: "Content added", done: false },
        { id: "lore", label: "Story World links reviewed", done: false },
        { id: "author-note", label: "Author note (optional)", done: Boolean(authorNote.trim()) },
        { id: "content-warning", label: "Content warning reviewed", done: false },
        { id: "preview", label: "Preview checked", done: false },
      ],
    };
    onCreate?.(chapter);
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
        aria-label="New chapter"
        className="absolute left-1/2 top-1/2 flex max-h-[92vh] w-[min(560px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-surface-1 shadow-[var(--shadow-elevated)]"
      >
        <header className="flex items-start justify-between gap-3 px-7 pb-2 pt-7">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-brand">
              Story Studio
            </p>
            <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight">
              New chapter
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start with a title. Everything else can wait.
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
          {/* Title */}
          <div>
            <Label>Chapter title</Label>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Hollow Crown"
              className={fieldClass}
            />
          </div>

          {/* Number */}
          <div className="mt-5">
            <Label>Chapter number</Label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, ""))}
              placeholder={`e.g. ${nextNumber}`}
              inputMode="numeric"
              className={fieldClass}
            />
          </div>

          {/* Start from */}
          <div className="mt-5">
            <Label>Start from</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <StartCard
                active={startFrom === "blank"}
                onClick={() => setStartFrom("blank")}
                icon={<FileText className="h-4 w-4" />}
                title="Blank chapter"
                desc="A clean page."
              />
              <StartCard
                active={startFrom === "duplicate"}
                onClick={() => setStartFrom("duplicate")}
                icon={<Copy className="h-4 w-4" />}
                title="Duplicate structure"
                desc="Inherit headings & notes."
              />
            </div>
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
                <Label>Author note</Label>
                <textarea
                  value={authorNote}
                  onChange={(e) => setAuthorNote(e.target.value)}
                  rows={2}
                  placeholder="A short note to readers, shown after the chapter."
                  className={cn(fieldClass, "resize-none py-2.5")}
                />
              </div>
              <div>
                <Label>Initial status</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INITIAL_STATUSES.map((s) => {
                    const active = s.id === status;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStatus(s.id)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-full px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.16em] transition-colors",
                          active
                            ? "bg-foreground/[0.08] text-foreground"
                            : "bg-foreground/[0.03] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
                        )}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label>Scheduled date (optional)</Label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className={cn(fieldClass, "cursor-pointer")}
                />
              </div>
              <div>
                <Label>Private note</Label>
                <textarea
                  value={privateNote}
                  onChange={(e) => setPrivateNote(e.target.value)}
                  rows={2}
                  placeholder="A reminder for yourself. Continuity, foreshadowing, anything."
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
              "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-primary-foreground transition-[filter] duration-[var(--transition-base)]",
              canSave ? "hover:brightness-110" : "cursor-not-allowed opacity-40",
            )}
            style={{ backgroundImage: "var(--gradient-brand-soft)" }}
          >
            Start writing
            <ArrowRight className="h-4 w-4" />
          </button>
        </footer>
      </div>
    </div>
  );
}

function StartCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-1.5 rounded-xl px-4 py-3.5 text-left transition-all",
        active
          ? "bg-foreground/[0.06] text-foreground shadow-[var(--shadow-glow)]"
          : "bg-foreground/[0.03] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-2 text-sm font-medium text-foreground/90">
        {icon}
        {title}
      </span>
      <span className="text-[0.72rem] text-muted-foreground">{desc}</span>
    </button>
  );
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
