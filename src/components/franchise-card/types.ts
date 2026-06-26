import type { ReactNode } from "react";

/**
 * Franchise — an existing entertainment property readers can explore
 * through fanfiction. NOT a story, NOT an original world.
 *
 * Original story worlds belong inside the Story (Lore System) and are
 * never listed globally on Fyndor. Only existing franchises appear here.
 */
export type FranchiseMedia =
  | "anime-manga"
  | "books"
  | "games"
  | "movies"
  | "tv"
  | "comics"
  | "cartoons"
  | "music"
  | "celebrities";

export interface Franchise {
  id: string;
  slug: string;
  /** Franchise name (e.g. "Harry Potter"). */
  name: string;
  /** 1–2 line editorial description of the franchise itself. */
  description: string;
  /** Cinematic panoramic banner artwork. */
  bannerUrl: string;
  /** Media category the franchise originated in. */
  media: FranchiseMedia;
  /** Optional fanfiction story count. Keep secondary. */
  storyCount?: number;
  /** Optional active author count. Keep secondary. */
  activeAuthors?: number;
  /** When true, renders the optional popularity badge. */
  popular?: boolean;
}

export type FranchiseCardState = "default" | "hover" | "focus" | "pressed";

export interface FranchiseCardProps {
  franchise: Franchise;
  /** Click target. Defaults to `#`. */
  href?: string;
  /** Force a visual state for documentation. */
  state?: FranchiseCardState;
  className?: string;
  /** Optional override for the popularity badge label. */
  badgeOverride?: ReactNode;
}

export interface FranchiseCardSkeletonProps {
  className?: string;
}
