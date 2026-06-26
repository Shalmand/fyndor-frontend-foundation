import { useEffect, useRef } from "react";
import {
  X,
  Clock,
  CheckCircle2,
  Circle,
  NotebookPen,
  ArrowRight,
  CalendarClock,
} from "lucide-react";
import type { ChapterRecord } from "@/mock/chapterManager";
import {
  CHAPTER_STATUS_META,
  STATUS_TONE_CLASS,
  KIND_EMOJI,
  formatDate,
  formatRelative,
  formatWords,
} from "./shared";
import { cn } from "@/lib/utils";

interface Props {
  chapter: ChapterRecord | null;
  onClose: () => void;
  onContinue?: (id: string) => void;
}

export function ChapterDetailDrawer({ chapter, onClose, onContinue }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!chapter) return;
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
  }, [chapter, onClose]);

  const open = chapter !== null;

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity duration-[var(--transition-base)]",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={chapter ? `Chapter ${chapter.number} — ${chapter.title}` : undefined}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full flex-col bg-surface-1 shadow-[var(--shadow-elevated)]",
          "md:w-[min(620px,100vw)]",
          "transition-transform duration-[var(--transition-slow)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {chapter ? (
          <DrawerBody
            chapter={chapter}
            closeRef={closeRef}
            onClose={onClose}
            onContinue={onContinue}
          />
        ) : null}
      </aside>
    </div>
  );
}

function DrawerBody({
  chapter,
  closeRef,
  onClose,
  onContinue,
}: {
  chapter: ChapterRecord;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onContinue?: (id: string) => void;
}) {
  const status = CHAPTER_STATUS_META[chapter.status];
  const StatusIcon = status.icon;
  const isPublished = chapter.status === "published";

  return (
    <>
      {/* Header */}
      <div className="relative px-6 pt-7 md:px-8 md:pt-8">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close chapter"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-brand">
          Chapter {chapter.number}
        </p>
        <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight text-foreground">
          {chapter.title}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em]",
              STATUS_TONE_CLASS[status.tone],
            )}
          >
            <StatusIcon className="h-3 w-3" aria-hidden />
            {status.label}
          </span>
          <span className="rounded-full bg-foreground/[0.04] px-3 py-1 text-[0.7rem] text-muted-foreground">
            {formatWords(chapter.words)} words
          </span>
          <span className="rounded-full bg-foreground/[0.04] px-3 py-1 text-[0.7rem] text-muted-foreground">
            {chapter.readingMinutes} min read
          </span>
        </div>

        <p className="mt-5 font-reading text-[0.95rem] leading-relaxed text-foreground/80">
          {chapter.excerpt}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 pt-2 md:px-8">
        <Block title="Writing metadata">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <Stat label="Created" value={formatDate(chapter.createdAt)} />
            <Stat label="Last edited" value={formatRelative(chapter.updatedAt)} />
            {chapter.lastAutosaveAt ? (
              <Stat
                label="Last autosaved"
                value={formatRelative(chapter.lastAutosaveAt)}
              />
            ) : null}
            {chapter.scheduledFor ? (
              <Stat
                label="Scheduled for"
                value={formatDate(chapter.scheduledFor)}
              />
            ) : null}
            {chapter.publishedAt ? (
              <Stat
                label="Published"
                value={formatDate(chapter.publishedAt)}
              />
            ) : null}
          </dl>
        </Block>

        {chapter.linkedEntities.length > 0 ? (
          <Block title="Story World usage" hint="Linked entities from the World Builder">
            <ul className="flex flex-wrap gap-2">
              {chapter.linkedEntities.map((e) => (
                <li
                  key={e.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-2/60 px-3 py-1.5 text-[0.78rem] text-foreground/85"
                >
                  <span aria-hidden>{KIND_EMOJI[e.kind] ?? "•"}</span>
                  {e.name}
                  <span className="text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {e.kind}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        <Block title="Publishing readiness" hint="Visual only — nothing is enforced">
          <ul className="space-y-2">
            {chapter.readiness.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-xl bg-surface-2/40 px-4 py-2.5 text-sm"
              >
                {r.done ? (
                  <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground/60" aria-hidden />
                )}
                <span
                  className={cn(
                    r.done ? "text-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        {chapter.authorNote ? (
          <Block title="Author note" icon={NotebookPen} hint="Shown after the chapter">
            <p className="rounded-2xl bg-surface-2/40 p-4 font-reading text-[0.95rem] leading-relaxed text-foreground/85">
              {chapter.authorNote}
            </p>
          </Block>
        ) : null}

        {chapter.privateNote ? (
          <Block title="Private notes" icon={NotebookPen} hint="Only you can see this">
            <p className="rounded-2xl bg-surface-2/40 p-4 font-reading text-[0.95rem] leading-relaxed text-foreground/80">
              {chapter.privateNote}
            </p>
          </Block>
        ) : null}
      </div>

      {/* Sticky action bar */}
      <footer className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-surface-1 via-surface-1/95 to-surface-1/0 px-6 pb-6 pt-10 md:px-8">
        <div className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
          {isPublished ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Live
            </span>
          ) : chapter.status === "scheduled" && chapter.scheduledFor ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-3 w-3" />
              Goes live {formatRelative(chapter.scheduledFor)}
            </span>
          ) : (
            <span>Draft · autosaved</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            onContinue?.(chapter.id);
            onClose();
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
          style={{ backgroundImage: "var(--gradient-brand-soft)" }}
        >
          {isPublished ? "Open in Writing Session" : "Continue writing"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </footer>
    </>
  );
}

function Block({
  title,
  hint,
  icon: Icon,
  children,
}: {
  title: string;
  hint?: string;
  icon?: typeof NotebookPen;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
          {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
          {title}
        </h3>
        {hint ? (
          <span className="text-[0.7rem] text-muted-foreground/80">{hint}</span>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-foreground/90">{value}</dd>
    </div>
  );
}
