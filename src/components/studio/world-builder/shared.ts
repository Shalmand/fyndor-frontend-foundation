import {
  Users,
  MapPin,
  Castle,
  Sparkles,
  PawPrint,
  BookMarked,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import type { LoreEntityKind } from "@/components/story-world/types";
import type { VisibilityRule } from "@/mock/worldBuilder";

export type EntityKindFilter = LoreEntityKind | "all";

export const ENTITY_KINDS: EntityKindFilter[] = [
  "all",
  "character",
  "location",
  "organization",
  "item",
  "creature",
  "glossary",
];

interface EntityMeta {
  label: string;
  plural: string;
  icon: LucideIcon;
}

export const ENTITY_META: Record<EntityKindFilter, EntityMeta> = {
  all: { label: "All", plural: "All entities", icon: Globe2 },
  character: { label: "Characters", plural: "Characters", icon: Users },
  location: { label: "Locations", plural: "Locations", icon: MapPin },
  organization: { label: "Organizations", plural: "Organizations", icon: Castle },
  item: { label: "Items", plural: "Items", icon: Sparkles },
  creature: { label: "Creatures", plural: "Creatures", icon: PawPrint },
  glossary: { label: "Glossary", plural: "Glossary", icon: BookMarked },
};

export const VISIBILITY_META: Record<
  VisibilityRule,
  { label: string; short: string; tone: "public" | "soft" | "guarded" | "private" }
> = {
  public: { label: "Public from the beginning", short: "Public", tone: "public" },
  "hidden-until-chapter": {
    label: "Hidden until a later chapter",
    short: "Hidden",
    tone: "soft",
  },
  "spoiler-protected": {
    label: "Spoiler protected",
    short: "Spoiler",
    tone: "guarded",
  },
  "author-only": { label: "Author-only notes", short: "Private", tone: "private" },
};

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
