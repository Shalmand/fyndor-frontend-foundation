import type { ReactNode } from "react";

/**
 * Collection — an editorial recommendation of stories, organized around a
 * reading experience, mood, or theme. NOT a story, NOT a franchise dump.
 */
export interface Collection {
  id: string;
  slug: string;
  title: string;
  /** Short editorial line. 1–2 sentences. */
  description: string;
  /** Cinematic banner artwork URL. */
  bannerUrl: string;
  /** Number of stories in the collection. */
  storyCount: number;
  /** Optional curator display name. */
  curator?: string;
  /** Optional curator label flavor — drives the subtle leading icon. */
  curatorKind?: CuratorKind;
  /** Optional theme chips. Keep to 1–2 max. */
  themes?: string[];
}

export type CuratorKind =
  | "staff"           // ✨ Staff Picks
  | "editor"          // 👤 Curated by …
  | "community"       // 🏆 Community Favorite
  | "editorial"       // 📚 Fyndor Editorial
  | "trending";       // 🔥 Trending This Week

export type CollectionCardState = "default" | "hover" | "focus" | "pressed";

export interface CollectionCardProps {
  collection: Collection;
  /** Click target. Defaults to `#` (showcase). */
  href?: string;
  /** Force a visual state for documentation. */
  state?: CollectionCardState;
  className?: string;
  /** Optional override for the curator label text. */
  curatorOverride?: ReactNode;
}

export interface CollectionCardSkeletonProps {
  className?: string;
}
