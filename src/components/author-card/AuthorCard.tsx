import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import type {
  AuthorCardProps,
  AuthorCardSkeletonProps,
} from "./types";

/**
 * NDS-006 — Author Card v1.0
 *
 * An editorial presentation of a storyteller. Avatar and signature lead;
 * the latest release invites exploration; creative statistics quietly back
 * the claim. Followers stay in supporting text — storytelling > metrics.
 *
 * The whole card is the link target. No buttons inside.
 */

const STATUS_LABEL: Record<string, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  hiatus: "On hiatus",
  draft: "Draft",
};

const STATUS_DOT: Record<string, string> = {
  ongoing: "bg-emerald-300",
  completed: "bg-sky-300",
  hiatus: "bg-amber-300",
  draft: "bg-white/60",
};

function formatCompact(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0).replace(/\.0$/, "")}K`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
}

export function AuthorCard({
  author,
  href = "#",
  state,
  className,
  verifiedSlot,
}: AuthorCardProps) {
  const forceHover = state === "hover";
  const forceFocus = state === "focus";
  const forcePress = state === "pressed";
  const release = author.latestRelease;

  return (
    <a
      href={href}
      onClick={(e) => {
        if (href === "#") e.preventDefault();
      }}
      data-demo-state={state}
      aria-label={`${author.displayName} — author profile`}
      className={cn(
        "group/author block w-full select-none text-left outline-none",
        "rounded-[20px]",
        "bg-surface-1/50 hover:bg-surface-1/80",
        "shadow-card hover:shadow-card-hover",
        "transition-all duration-[var(--transition-base)]",
        "active:scale-[0.995]",
        forceHover && "bg-surface-1/80 shadow-card-hover",
        forcePress && "scale-[0.995]",
        forceFocus &&
          "ring-2 ring-[color:color-mix(in_oklab,var(--brand)_70%,transparent)] ring-offset-2 ring-offset-background",
        className,
      )}
    >
      <div className="p-6">
        {/* Header — avatar, name, signature */}
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "relative shrink-0",
              "transition-transform duration-[var(--transition-base)]",
              "group-hover/author:scale-[1.04]",
              forceHover && "scale-[1.04]",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-0 -m-1 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_22%,transparent),transparent)] opacity-0 transition-opacity duration-[var(--transition-base)] group-hover/author:opacity-100"
            />
            <img
              src={author.avatarUrl}
              alt=""
              loading="lazy"
              className="relative size-16 rounded-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-[1.2rem] leading-tight text-foreground">
                {author.displayName}
              </h3>
              {author.verified &&
                (verifiedSlot ?? (
                  <BadgeCheck
                    aria-label="Verified author"
                    className="size-4 shrink-0 text-brand-glow"
                  />
                ))}
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              @{author.handle}
            </p>

            {/* Primary genres */}
            {author.primaryGenres.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {author.primaryGenres.slice(0, 3).map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-surface-2/70 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Signature */}
        <p className="mt-5 line-clamp-2 text-sm leading-relaxed text-foreground/85">
          "{author.signature}"
        </p>

        {/* Latest Release */}
        <div className="mt-6">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
            Latest release
          </p>
          <div className="mt-3 flex items-center gap-4">
            <div className="relative aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-[10px] bg-surface-2 shadow-card">
              <img
                src={release.coverUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[var(--transition-base)] group-hover/author:scale-[1.04]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[0.98rem] leading-snug text-foreground">
                {release.title}
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                <span
                  aria-hidden
                  className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[release.status])}
                />
                {STATUS_LABEL[release.status]}
              </p>
            </div>
          </div>
        </div>

        {/* Creative statistics */}
        <div className="mt-6 flex items-baseline gap-6">
          <Stat value={author.storiesCount} label="Stories" />
          <Stat value={author.collectionsCount} label="Collections" />
          {typeof author.universesCount === "number" && (
            <Stat value={author.universesCount} label={author.universesCount === 1 ? "Universe" : "Universes"} />
          )}
        </div>

        {typeof author.followers === "number" && (
          <p className="mt-4 text-[0.7rem] text-muted-foreground/70">
            {formatCompact(author.followers)} followers
          </p>
        )}
      </div>
    </a>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0">
      <div className="font-display text-[1.15rem] leading-none text-foreground">
        {formatCompact(value)}
      </div>
      <div className="mt-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">
        {label}
      </div>
    </div>
  );
}

export function AuthorCardSkeleton({ className }: AuthorCardSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full rounded-[20px] bg-surface-1/50 p-6",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-start gap-4">
        <div className="size-16 shrink-0 animate-pulse rounded-full bg-surface-2" />
        <div className="min-w-0 flex-1 space-y-2 pt-1">
          <div className="h-5 w-1/2 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2/80" />
          <div className="mt-3 flex gap-1.5">
            <div className="h-4 w-14 animate-pulse rounded-full bg-surface-2/80" />
            <div className="h-4 w-16 animate-pulse rounded-full bg-surface-2/80" />
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-surface-2/80" />
        <div className="h-3.5 w-3/4 animate-pulse rounded bg-surface-2/80" />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="aspect-[2/3] w-14 animate-pulse rounded-[10px] bg-surface-2" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2/80" />
        </div>
      </div>
      <div className="mt-6 flex gap-6">
        <div className="h-8 w-12 animate-pulse rounded bg-surface-2/80" />
        <div className="h-8 w-12 animate-pulse rounded bg-surface-2/80" />
        <div className="h-8 w-12 animate-pulse rounded bg-surface-2/80" />
      </div>
    </div>
  );
}

export interface AuthorCardEmptyProps {
  title?: string;
  description?: string;
  className?: string;
}

export function AuthorCardEmpty({
  title = "No authors to introduce",
  description = "Featured storytellers will appear here as editors highlight new voices.",
  className,
}: AuthorCardEmptyProps) {
  return (
    <div
      className={cn(
        "w-full rounded-[20px] bg-surface-1/50 px-6 py-14 text-center",
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
