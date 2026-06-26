import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";
import type {
  UniverseCardProps,
  UniverseCardSkeletonProps,
} from "./types";

/**
 * NDS-007 — Universe Card v1.0
 *
 * A Universe is a world, not a story. This card invites readers into a
 * setting — atmosphere first, traits second, numbers never. Landscape
 * editorial layout: panoramic cinematic banner above a calm content
 * block. The entire card is the link target — no inner buttons.
 */
export function UniverseCard({
  universe,
  href = "#",
  state,
  className,
  badgeOverride,
}: UniverseCardProps) {
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
      aria-label={`Explore the universe of ${universe.name}`}
      className={cn(
        "group/universe relative block w-full select-none overflow-hidden rounded-[20px] text-left outline-none",
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
            src={universe.bannerUrl}
            alt=""
            loading="lazy"
            className={cn(
              "h-full w-full object-cover",
              "transition-transform duration-[var(--transition-slow,300ms)]",
              "group-hover/universe:scale-[1.035]",
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

        {/* Open Universe badge */}
        {(universe.openUniverse || badgeOverride) && (
          <div className="absolute right-4 top-4">
            {badgeOverride ?? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                <Compass aria-hidden className="size-3" />
                Open Universe
              </span>
            )}
          </div>
        )}
      </div>

      {/* Editorial content */}
      <div className="relative px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        <h3 className="font-display text-[1.55rem] leading-[1.1] tracking-tight text-foreground sm:text-[1.75rem]">
          {universe.name}
        </h3>
        <p className="mt-2.5 line-clamp-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {universe.description}
        </p>

        {universe.traits.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
            {universe.traits.slice(0, 5).map((trait) => (
              <li
                key={trait.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-2/70 px-2.5 py-1 text-[0.72rem] font-medium text-foreground/85"
              >
                <span aria-hidden className="text-[0.85rem] leading-none">
                  {trait.icon}
                </span>
                <span>{trait.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}

export function UniverseCardSkeleton({
  className,
}: UniverseCardSkeletonProps) {
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
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-surface-2/80" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-surface-2/80" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-surface-2/80" />
        </div>
      </div>
    </div>
  );
}

export interface UniverseCardEmptyProps {
  title?: string;
  description?: string;
  className?: string;
}

export function UniverseCardEmpty({
  title = "No universes yet",
  description = "Worlds appear here as storytellers open their settings to readers. The first horizon is always quiet.",
  className,
}: UniverseCardEmptyProps) {
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
