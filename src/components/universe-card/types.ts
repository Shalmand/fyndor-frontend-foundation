import type { ReactNode } from "react";

/**
 * Universe — an entire world readers can explore.
 * NOT a story, NOT a collection. A setting with its own atmosphere.
 */
export interface UniverseTrait {
  /** Single emoji or short symbol that hints at the trait's identity. */
  icon: string;
  /** Short label — 1–3 words. */
  label: string;
}

export interface Universe {
  id: string;
  slug: string;
  /** Universe name. Treated as editorial title. */
  name: string;
  /** 1–2 line editorial description of the world's atmosphere. */
  description: string;
  /** Panoramic cinematic banner. Wider than tall — 21:9 / 2:1. */
  bannerUrl: string;
  /** 3–5 world traits. */
  traits: UniverseTrait[];
  /** When true, renders the optional "Open Universe" badge. */
  openUniverse?: boolean;
}

export type UniverseCardState = "default" | "hover" | "focus" | "pressed";

export interface UniverseCardProps {
  universe: Universe;
  /** Click target. Defaults to `#`. */
  href?: string;
  /** Force a visual state for documentation. */
  state?: UniverseCardState;
  className?: string;
  /** Optional override for the open-universe badge label. */
  badgeOverride?: ReactNode;
}

export interface UniverseCardSkeletonProps {
  className?: string;
}
