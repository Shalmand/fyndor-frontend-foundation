import type { ReactNode } from "react";

/**
 * Author Card v1.0 — editorial presentation of a storyteller, not a social
 * profile. Storytelling > metrics.
 */

export interface AuthorCardStory {
  title: string;
  coverUrl: string;
  status: "ongoing" | "completed" | "hiatus" | "draft";
}

export interface AuthorCardData {
  id: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  /** Short personal tagline. 1 line ideally, max 2. */
  signature: string;
  /** Up to ~3 primary genres / creative identity tags. */
  primaryGenres: string[];
  verified?: boolean;
  storiesCount: number;
  collectionsCount: number;
  universesCount?: number;
  /** Smaller, secondary metric. */
  followers?: number;
  /** Featured story to encourage exploration. */
  latestRelease: AuthorCardStory;
}

export type AuthorCardState = "default" | "hover" | "focus" | "pressed";

export interface AuthorCardProps {
  author: AuthorCardData;
  href?: string;
  state?: AuthorCardState;
  className?: string;
  /** Optional override of the verification mark. */
  verifiedSlot?: ReactNode;
}

export interface AuthorCardSkeletonProps {
  className?: string;
}
