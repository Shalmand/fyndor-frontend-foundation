/** App-wide constants. Anything shared across layouts/features lives here. */

export const APP_NAME = "Fyndor";
export const APP_TAGLINE = "Discover stories worth reading";

export const ROUTES = {
  home: "/",
  browse: "/browse",
  reader: "/library",
  reading: (storyId: string) => `/read/${storyId}`,
  studio: "/studio",
  admin: "/admin",
} as const;

export const NAV_PUBLIC = [
  { label: "Discover", to: "/" },
  { label: "Browse", to: "/browse" },
  { label: "Universes", to: "/universes" },
  { label: "Studio", to: "/studio" },
] as const;
