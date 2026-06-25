import type { Author, Genre, Story, Universe } from "@/types";

/**
 * Shared contract for every Story Card concept.
 *
 * Every concept consumes the same data shape so that the chosen winner can
 * drop into Home, Library, Universe pages, Search, etc. without rewiring.
 *
 * `state` is for *demonstration only* in the Sprint 01.0 showcase — it lets
 * us force a hover / pressed / focus look without real interaction. Real
 * usage relies on native :hover / :active / :focus-visible.
 */
export type StoryCardState = "default" | "hover" | "pressed" | "focus";

export interface StoryCardProps {
  story: Story;
  author?: Author;
  universe?: Universe;
  genres?: Genre[];
  /** Demo override — leave undefined in production. */
  state?: StoryCardState;
  className?: string;
}

export interface StoryCardSkeletonProps {
  className?: string;
}
