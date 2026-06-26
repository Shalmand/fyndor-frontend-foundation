import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import type {
  Franchise,
  FranchiseCardProps,
  FranchiseCardSkeletonProps,
  FranchiseMedia,
} from "./types";

/**
 * NDS-007 — Franchise Card v1.0
 *
 * A Franchise is an existing entertainment property — a doorway into
 * fanfiction written inside that world. Landscape editorial card:
 * panoramic banner above a calm content block. The entire card is the
 * link target — no inner buttons.
 *
 * Architectural note: Original story worlds do not appear here. They
 * live inside each Story via the Lore System and are never listed
 * globally.
 */

const MEDIA_LABEL: Record<FranchiseMedia, string> = {
  "anime-manga": "Anime & Manga",
  books: "Books",
  games: "Games",
  movies: "Movies",
  tv: "TV Series",
  comics: "Comics",
  cartoons: "Cartoons",
  music: "Music",
  celebrities: "Celebrities",
};

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function MetaLine({ franchise }: { franchise: Franchise }) {
  const items: string[] = [MEDIA_LABEL[franchise.media]];
  if (franchise.storyCount !== undefined) {
    items.push(`${formatCount(franchise.storyCount)} fanfiction stories`);
  }
  if (franchise.activeAuthors !== undefined) {
    items.push(`${formatCount(franchise.activeAuthors)} active authors`);
  }
  return (
    <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/85">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && (
            <span aria-hidden className="mx-2 text-muted-foreground/40">
              ·
            </span>
          )}
          {item}
        </span>
      ))}
    </p>
  );
}

export function FranchiseCard({
  franchise,
  href = "#",
  state,
  className,
  badgeOverride,
}: FranchiseCardProps) {
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
      aria-label={`Explore fanfiction in ${franchise.name}`}
      className={cn(
        "group/franchise relative block w-full select-none overflow-hidden rounded-[20px] text-left outline-none",
        "bg-surface-1/60 shadow-card",
        "transition-[transform,box-shadow] duration-[var(--transition-base)]",
        "hover:shadow-card-hover active:scale-[0.997]",
        forceHover && "shadow-card-hover",
        forcePress && "scale-[0.997]",
        forceFocus &&
          "ring-2 ring-[color:color-mix(in_oklab,var(--brand)_70%,transparent)] ring-offset-2 ring-offset-background",
        className,
      )}
    >
      {/* Panoramic banner */}
      <div className="relative w-full overflow-hidden">
        <div className="aspect-[21/9] w-full sm:aspect-[2/1]">
          <img
            src={franchise.bannerUrl}
            alt=""
            loading="lazy"
            className={cn(
              "h-full w-full object-cover",
              "transition-transform duration-[var(--transition-slow,300ms)]",
              "group-hover/franchise:scale-[1.035]",
              forceHover && "scale-[1.035]",
            )}
          />
        </div>

        {/* Atmosphere overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-transparent"
        />

        {/* Popularity badge */}
        {(franchise.popular || badgeOverride) && (
          <div className="absolute right-4 top-4">
            {badgeOverride ?? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                <Flame aria-hidden className="size-3" />
                Popular
              </span>
            )}
          </div>
        )}
      </div>

      {/* Editorial content */}
      <div className="relative px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <h3 className="font-display text-[1.55rem] leading-[1.1] tracking-tight text-foreground sm:text-[1.75rem]">
          {franchise.name}
        </h3>
        <p className="mt-2.5 line-clamp-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {franchise.description}
        </p>
        <MetaLine franchise={franchise} />
      </div>
    </a>
  );
}

export function FranchiseCardSkeleton({
  className,
}: FranchiseCardSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[20px] bg-surface-1/50",
        className,
      )}
      aria-hidden
    >
      <div className="aspect-[21/9] w-full animate-pulse bg-surface-2 sm:aspect-[2/1]" />
      <div className="space-y-3 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className="h-6 w-2/3 animate-pulse rounded bg-surface-2" />
        <div className="h-3.5 w-full animate-pulse rounded bg-surface-2/80" />
        <div className="h-3.5 w-3/5 animate-pulse rounded bg-surface-2/80" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2/70" />
      </div>
    </div>
  );
}

export interface FranchiseCardEmptyProps {
  title?: string;
  description?: string;
  className?: string;
}

export function FranchiseCardEmpty({
  title = "No franchises yet",
  description = "Existing entertainment franchises will appear here as readers and fanfiction authors open new doors.",
  className,
}: FranchiseCardEmptyProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[20px] bg-surface-1/50 px-6 py-16 text-center",
        className,
      )}
    >
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
