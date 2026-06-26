import {
  BookOpen,
  Library,
  Layers,
  Sparkles,
  Globe2,
  Combine,
  Quote,
  Feather,
  type LucideIcon,
} from "lucide-react";
import type {
  SeriesStatus,
  SeriesType,
  SeriesVisibility,
  StoryRole,
  ReaderLabel,
  DiscoveryLabel,
} from "@/mock/seriesManager";

export const SERIES_TYPE_META: Record<
  SeriesType,
  { label: string; short: string; icon: LucideIcon }
> = {
  series: { label: "Series", short: "Series", icon: BookOpen },
  saga: { label: "Saga", short: "Saga", icon: Library },
  duology: { label: "Duology", short: "Duology", icon: Layers },
  trilogy: { label: "Trilogy", short: "Trilogy", icon: Layers },
  anthology: { label: "Anthology", short: "Anthology", icon: Quote },
  "shared-universe": {
    label: "Shared Universe",
    short: "Universe",
    icon: Globe2,
  },
  "spin-off-collection": {
    label: "Spin-off Collection",
    short: "Spin-offs",
    icon: Combine,
  },
  "fanfiction-arc": {
    label: "Fanfiction Arc",
    short: "Fanfiction",
    icon: Feather,
  },
};

export const SERIES_STATUS_META: Record<
  SeriesStatus,
  { label: string; tone: "draft" | "ongoing" | "completed" | "paused" | "planned" }
> = {
  draft: { label: "Draft", tone: "draft" },
  ongoing: { label: "Ongoing", tone: "ongoing" },
  completed: { label: "Completed", tone: "completed" },
  paused: { label: "Paused", tone: "paused" },
  planned: { label: "Planned", tone: "planned" },
};

export const STATUS_TONE_CLASS: Record<
  "draft" | "ongoing" | "completed" | "paused" | "planned",
  string
> = {
  draft: "bg-foreground/[0.05] text-foreground/75",
  ongoing: "bg-[color-mix(in_oklab,var(--brand)_22%,transparent)] text-foreground",
  completed: "bg-[color-mix(in_oklab,var(--brand)_14%,transparent)] text-foreground/90",
  paused: "bg-amber-500/12 text-amber-200/85",
  planned: "bg-foreground/[0.04] text-muted-foreground",
};

export const VISIBILITY_LABEL: Record<SeriesVisibility, string> = {
  draft: "Draft",
  public: "Public",
  private: "Private",
};

export const STORY_ROLE_LABEL: Record<StoryRole, string> = {
  "main-entry": "Main Entry",
  sequel: "Sequel",
  prequel: "Prequel",
  "spin-off": "Spin-off",
  "side-story": "Side Story",
  "companion-story": "Companion Story",
  "bonus-story": "Bonus Story",
};

export const READER_LABEL_META: Record<
  ReaderLabel,
  { label: string; icon?: string }
> = {
  "start-here": { label: "Start Here", icon: "✦" },
  "main-story": { label: "Main Story" },
  optional: { label: "Optional" },
  "read-after-book-2": { label: "Read After Book 2" },
  "contains-spoilers": { label: "Contains Spoilers" },
  "spin-off": { label: "Spin-off" },
};

export const DISCOVERY_LABEL_META: Record<DiscoveryLabel, string> = {
  "featured-series": "Featured Series",
  "recommended-saga": "Recommended Saga",
  "popular-universe": "Popular Universe",
  "start-here": "Start Here",
};

export type OrderMode = "publication" | "chronological" | "recommended";

export const ORDER_MODE_META: Record<
  OrderMode,
  { label: string; description: string }
> = {
  publication: {
    label: "Publication order",
    description: "The order in which the stories were released.",
  },
  chronological: {
    label: "Chronological order",
    description: "The order events unfold inside the world.",
  },
  recommended: {
    label: "Recommended reading",
    description: "How you'd guide a first-time reader through the arc.",
  },
};

export function formatWords(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return n.toLocaleString("en-US");
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w} wk ago`;
  const mo = Math.floor(d / 30);
  return `${mo} mo ago`;
}

export const STORY_STATUS_LABEL: Record<
  "draft" | "ongoing" | "completed" | "paused",
  string
> = {
  draft: "Draft",
  ongoing: "Ongoing",
  completed: "Completed",
  paused: "Paused",
};

export { Sparkles };
