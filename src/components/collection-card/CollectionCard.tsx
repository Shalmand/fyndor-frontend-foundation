import { cn } from "@/lib/utils";
import { Sparkles, User, Trophy, BookOpen, Flame } from "lucide-react";
import type { ComponentType } from "react";
import type {
  CollectionCardProps,
  CollectionCardSkeletonProps,
  CuratorKind,
} from "./types";

/**
 * NDS-005 — Collection Card v1.0
 *
 * The official editorial recommendation card for Fyndor.
 *
 * NOT a Story Card. A Collection is a curated reading experience — a mood,
 * a theme, a staff pick — never a franchise dump. Cinematic banner art on
 * top, calm editorial content below. The entire card is clickable.
 *
 * Reusable across Home (editorial themes only), Explore, Library and
 * Curator profiles. Franchise-specific collections belong inside their
 * Universe pages.
 */

const CURATOR_META: Record<
  CuratorKind,
  { icon: ComponentType<{ className?: string }>; defaultLabel: string }
> = {
  staff:     { icon: Sparkles, defaultLabel: "Staff Picks" },
  editor:    { icon: User,     defaultLabel: "Curated by" },
  community: { icon: Trophy,   defaultLabel: "Community Favorite" },
  editorial: { icon: BookOpen, defaultLabel: "Fyndor Editorial" },
  trending:  { icon: Flame,    defaultLabel: "Trending This Week" },
};

function CuratorLabel({
  kind,
  curator,
}: {
  kind: CuratorKind;
  curator?: string;
}) {
  const meta = CURATOR_META[kind];
  const Icon = meta.icon;
  const text =
    kind === "editor" && curator
      ? `Curated by ${curator}`
      : curator ?? meta.defaultLabel;

  return (
    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/85">
      <Icon aria-hidden className="size-3.5 opacity-90" />
      <span className="truncate">{text}</span>
    </span>
  );
}

export function CollectionCard({
  collection,
  href = "#",
  state,
  className,
  curatorOverride,
}: CollectionCardProps) {
  const forceHover = state === "hover";
  const forceFocus = state === "focus";
  const forcePress = state === "pressed";

  return (
    <a
      href={href}
      onClick={(e) => {
        if (href === "#") e.preventDefault();
      }}
      data-demo-state={state}
      aria-label={`${collection.title} — ${collection.storyCount} stories`}
      className={cn(
        "group/collection block w-full select-none text-left outline-none",
        "transition-transform duration-[var(--transition-base)] active:scale-[0.995]",
        forcePress && "scale-[0.995]",
        forceFocus &&
          "ring-2 ring-[color:color-mix(in_oklab,var(--brand)_70%,transparent)] ring-offset-2 ring-offset-background rounded-[18px]",
        className,
      )}
    >
      {/* Banner — the protagonist */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px] bg-surface-2",
          "shadow-card transition-shadow duration-[var(--transition-base)]",
          "group-hover/collection:shadow-card-hover",
          forceHover && "shadow-card-hover",
        )}
      >
        <div className="aspect-[3/2] w-full">
          <img
            src={collection.bannerUrl}
            alt=""
            loading="lazy"
            className={cn(
              "h-full w-full object-cover",
              "transition-transform duration-[var(--transition-base)]",
              "group-hover/collection:scale-[1.04]",
              forceHover && "scale-[1.04]",
            )}
          />
        </div>

        {/* Bottom gradient for legibility of curator + count */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />

        {/* Top-right story count chip */}
        <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-white backdrop-blur-md">
          {collection.storyCount} stories
        </span>

        {/* Bottom curator label */}
        {(collection.curatorKind || curatorOverride) && (
          <div className="absolute inset-x-4 bottom-3.5">
            {curatorOverride ?? (
              <CuratorLabel
                kind={collection.curatorKind!}
                curator={collection.curator}
              />
            )}
          </div>
        )}
      </div>

      {/* Editorial content */}
      <div className="mt-5 pl-1 pr-2">
        <h3 className="font-display text-[1.35rem] leading-[1.2] tracking-tight text-foreground">
          {collection.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {collection.description}
        </p>

        {collection.themes && collection.themes.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {collection.themes.slice(0, 3).map((theme) => (
              <span
                key={theme}
                className="rounded-full bg-surface-2/70 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export function CollectionCardSkeleton({
  className,
}: CollectionCardSkeletonProps) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="aspect-[3/2] w-full animate-pulse rounded-[18px] bg-surface-2" />
      <div className="mt-5 space-y-3 pl-1 pr-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3.5 w-full animate-pulse rounded bg-surface-2/80" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-surface-2/80" />
      </div>
    </div>
  );
}

export interface CollectionCardEmptyProps {
  title?: string;
  description?: string;
  className?: string;
}

export function CollectionCardEmpty({
  title = "No collections yet",
  description = "Curated reading experiences will appear here as editors and the community shape new shelves.",
  className,
}: CollectionCardEmptyProps) {
  return (
    <div
      className={cn(
        "w-full rounded-[18px] bg-surface-1/50 px-6 py-14 text-center",
        className,
      )}
    >
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
