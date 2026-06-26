import { useMemo } from "react";
import type { WorldBuilderEntity } from "@/mock/worldBuilder";
import { ENTITY_META, formatRelative } from "./shared";
import { VisibilityBadge } from "./VisibilityBadge";
import { cn } from "@/lib/utils";

interface Props {
  entity: WorldBuilderEntity;
  onOpen?: (entity: WorldBuilderEntity) => void;
}

/**
 * Editorial card for a single Story World entity.
 *
 * Calm, literary — never tries to look like a profile or product card.
 * Image is an optional artwork plinth; entities without imagery fall
 * back to a quiet typographic plate built from the entity's initials.
 */
export function EntityCard({ entity, onOpen }: Props) {
  const Icon = ENTITY_META[entity.kind].icon;
  const kindLabel = ENTITY_META[entity.kind].label.replace(/s$/, "");
  const initials = useMemo(
    () =>
      entity.name
        .split(/\s+/)
        .map((p) => p[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    [entity.name],
  );

  return (
    <button
      type="button"
      onClick={() => onOpen?.(entity)}
      aria-label={`Open ${entity.name}`}
      className={cn(
        "group/entity relative flex w-full flex-col overflow-hidden rounded-2xl bg-surface-1/70 text-left",
        "transition-all duration-[var(--transition-base)]",
        "hover:bg-surface-2/70 hover:shadow-[var(--shadow-card-hover)]",
        "focus-visible:outline-none",
      )}
    >
      {/* Artwork plinth */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-2">
        {entity.imageUrl ? (
          <img
            src={entity.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[var(--transition-slow)] group-hover/entity:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "radial-gradient(120% 80% at 30% 30%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)",
            }}
          >
            <span className="font-display text-4xl tracking-tight text-foreground/40">
              {initials}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-1/95 via-surface-1/20 to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/55 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85 backdrop-blur-md">
          <Icon className="h-3 w-3" />
          {kindLabel}
        </div>
        <div className="absolute right-3 top-3">
          <VisibilityBadge
            visibility={entity.visibility}
            visibleFromChapter={entity.visibleFromChapter}
          />
        </div>
      </div>

      {/* Identity & description */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl leading-tight tracking-tight text-foreground">
            {entity.name}
          </h3>
          <p className="mt-1 text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground">
            {entity.role}
          </p>
        </div>
        <p className="line-clamp-2 text-sm text-foreground/75">
          {entity.description}
        </p>

        {/* Quiet metadata */}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.72rem] text-muted-foreground">
          <span>First in Ch. {entity.firstAppearanceChapter}</span>
          <span aria-hidden className="text-foreground/20">·</span>
          <span>
            Linked in {entity.linkedChapters} chapter
            {entity.linkedChapters === 1 ? "" : "s"}
          </span>
          <span aria-hidden className="text-foreground/20">·</span>
          <span>Updated {formatRelative(entity.updatedAt)}</span>
        </div>
      </div>
    </button>
  );
}
