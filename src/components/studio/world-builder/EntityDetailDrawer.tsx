import { useEffect, useRef } from "react";
import { X, BookOpen, Hash, Link2, NotebookPen, Users } from "lucide-react";
import type { WorldBuilderEntity } from "@/mock/worldBuilder";
import { ENTITY_META } from "./shared";
import { VisibilityBadge } from "./VisibilityBadge";
import { cn } from "@/lib/utils";

interface Props {
  entity: WorldBuilderEntity | null;
  onClose: () => void;
  onSelectRelated?: (id: string) => void;
}

/**
 * Right-side drawer on desktop, full-height sheet on mobile.
 *
 * Built directly on <dialog>-style scaffolding rather than Radix so
 * the drawer feels like a creative reference sheet, not a system modal.
 */
export function EntityDetailDrawer({ entity, onClose, onSelectRelated }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!entity) return;
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
  }, [entity, onClose]);

  const open = entity !== null;

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Scrim */}
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

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={entity ? `${entity.name} — entity details` : undefined}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full flex-col bg-surface-1 shadow-[var(--shadow-elevated)]",
          "md:w-[min(560px,100vw)]",
          "transition-transform duration-[var(--transition-slow)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {entity ? <DrawerBody entity={entity} closeRef={closeRef} onClose={onClose} onSelectRelated={onSelectRelated} /> : null}
      </aside>
    </div>
  );
}

function DrawerBody({
  entity,
  closeRef,
  onClose,
  onSelectRelated,
}: {
  entity: WorldBuilderEntity;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSelectRelated?: (id: string) => void;
}) {
  const Icon = ENTITY_META[entity.kind].icon;
  const kindLabel = ENTITY_META[entity.kind].label.replace(/s$/, "");

  return (
    <>
      {/* Header — hero with optional artwork */}
      <div className="relative">
        <div className="relative h-44 w-full overflow-hidden bg-surface-2 md:h-56">
          {entity.imageUrl ? (
            <img
              src={entity.imageUrl}
              alt=""
              className="h-full w-full object-cover opacity-90"
            />
          ) : (
            <div
              aria-hidden
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(120% 80% at 30% 30%, color-mix(in oklab, var(--brand) 22%, transparent), transparent 60%)",
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/40 to-transparent" />
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close entity"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-background/70 text-foreground/85 backdrop-blur-md transition-colors hover:bg-background/90"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pb-2 md:px-8">
          <div className="-mt-10 flex items-end gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur-md">
              <Icon className="h-3 w-3" />
              {kindLabel}
            </div>
            <VisibilityBadge
              visibility={entity.visibility}
              visibleFromChapter={entity.visibleFromChapter}
              variant="pill"
            />
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground">
            {entity.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{entity.role}</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6 md:px-8">
        <p className="text-[0.95rem] leading-relaxed text-foreground/85">
          {entity.description}
        </p>

        {entity.aliases.length > 0 ? (
          <DrawerBlock title="Also known as">
            <div className="flex flex-wrap gap-2">
              {entity.aliases.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs text-foreground/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </DrawerBlock>
        ) : null}

        <DrawerBlock title="Narrative usage">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <Stat
              icon={BookOpen}
              label="First appearance"
              value={`Ch. ${entity.firstAppearanceChapter} — ${entity.firstAppearanceTitle}`}
            />
            <Stat
              icon={Link2}
              label="Linked chapters"
              value={`${entity.linkedChapters}`}
            />
            <Stat icon={Hash} label="Mentions" value={`${entity.mentionCount}`} />
            <Stat
              icon={Users}
              label="Match priority"
              value={`${entity.matchPriority}`}
            />
          </dl>
        </DrawerBlock>

        <DrawerBlock title="Visibility & spoilers">
          <div className="rounded-2xl bg-surface-2/60 p-4">
            <VisibilityBadge
              visibility={entity.visibility}
              visibleFromChapter={entity.visibleFromChapter}
              variant="pill"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {visibilityCopy(entity)}
            </p>
          </div>
        </DrawerBlock>

        {entity.related.length > 0 ? (
          <DrawerBlock title="Related">
            <ul className="space-y-2">
              {entity.related.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => onSelectRelated?.(r.id)}
                    className="flex w-full items-center justify-between gap-4 rounded-xl bg-surface-2/50 px-4 py-3 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {r.name}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {r.relation}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </DrawerBlock>
        ) : null}

        {entity.authorNotes ? (
          <DrawerBlock
            title="Author notes"
            hint="Private. Never shown to readers."
            icon={NotebookPen}
          >
            <p className="whitespace-pre-line rounded-2xl bg-surface-2/40 p-4 font-reading text-[0.95rem] leading-relaxed text-foreground/80">
              {entity.authorNotes}
            </p>
          </DrawerBlock>
        ) : null}
      </div>
    </>
  );
}

function visibilityCopy(e: WorldBuilderEntity): string {
  switch (e.visibility) {
    case "public":
      return "Visible to readers from the first chapter.";
    case "hidden-until-chapter":
      return `Hidden from readers until Chapter ${e.visibleFromChapter ?? "?"}. Lore links to this entity will appear silent before then.`;
    case "spoiler-protected":
      return "Visible only after the reader has reached the entity's first appearance. Future references are auto-redacted in earlier chapters.";
    case "author-only":
      return "Visible only inside the Story Studio. Never shown to readers and never returned by autocomplete in published chapters.";
  }
}

function DrawerBlock({
  title,
  hint,
  icon: Icon,
  children,
}: {
  title: string;
  hint?: string;
  icon?: typeof BookOpen;
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

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3 w-3" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-foreground/90">{value}</dd>
    </div>
  );
}
