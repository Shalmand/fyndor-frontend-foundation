/** App-wide constants. Anything shared across layouts/features lives here. */

export const APP_NAME = "Fyndor";
export const APP_TAGLINE = "Where stories live";

export const ROUTES = {
  home: "/",
  browse: "/browse",
  reader: "/library",
  reading: (storyId: string) => `/read/${storyId}`,
  studio: "/studio",
  admin: "/admin",
} as const;

/**
 * Public navigation. Labels are tuned to communicate that Fyndor is a
 * storytelling platform — not a generic SaaS — and to avoid the
 * Discover/Browse semantic overlap of earlier drafts.
 *
 * Stories   → the curated front door (was: Discover)
 * Library   → the full catalog to explore (was: Browse)
 * Universes → worlds, franchises, lore
 * Studio    → the author surface
 */
export const NAV_PUBLIC = [
  { label: "Stories", to: "/" },
  { label: "Library", to: "/browse" },
  { label: "Universes", to: "/universes" },
  { label: "Studio", to: "/studio" },
] as const;
