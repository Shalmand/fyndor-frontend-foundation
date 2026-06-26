import type { LoreEntityKind } from "@/components/story-world/types";

/**
 * Mock data shape for the World Builder.
 *
 * Each entity intentionally carries the fields that the Story World
 * Autocomplete will consume later (id / name / aliases / kind /
 * firstAppearanceChapter / visibilityRule / matchPriority).
 */

export type VisibilityRule =
  | "public"
  | "hidden-until-chapter"
  | "spoiler-protected"
  | "author-only";

export interface WorldBuilderEntity {
  id: string;
  kind: LoreEntityKind;
  name: string;
  /** Sub-category shown under the name. */
  role: string;
  description: string;
  aliases: string[];
  imageUrl?: string;
  firstAppearanceChapter: number;
  firstAppearanceTitle: string;
  linkedChapters: number;
  mentionCount: number;
  visibility: VisibilityRule;
  /** Chapter after which the entity becomes visible. */
  visibleFromChapter?: number;
  matchPriority: number;
  updatedAt: string;
  authorNotes?: string;
  related: Array<{ id: string; name: string; relation: string }>;
}

export interface WorldBuilderMeta {
  storyTitle: string;
  worldName: string;
  worldDescription: string;
}

export const worldBuilderMeta: WorldBuilderMeta = {
  storyTitle: "Ash & Atlas",
  worldName: "The Cartographer's World",
  worldDescription:
    "A continent of map-makers, secret orders and burned charts — where the act of drawing a coastline is a political one.",
};

const now = Date.now();
const days = (n: number) => new Date(now - n * 86_400_000).toISOString();

export const mockWorldBuilderEntities: WorldBuilderEntity[] = [
  {
    id: "wb-char-abel",
    kind: "character",
    name: "Abel",
    role: "Main Character",
    description:
      "An apprentice cartographer who refuses to draw what he cannot prove. His silences travel further than his sentences.",
    aliases: ["Abel of Silverquill", "The Apprentice"],
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop",
    firstAppearanceChapter: 1,
    firstAppearanceTitle: "The Burned Map",
    linkedChapters: 12,
    mentionCount: 184,
    visibility: "public",
    matchPriority: 100,
    updatedAt: days(1),
    authorNotes:
      "Abel's quietness is grief, not aloofness. Reveal the cause around chapter 14.",
    related: [
      { id: "wb-loc-avallon", name: "Avallon", relation: "Birthplace" },
      { id: "wb-org-ashen-order", name: "The Ashen Order", relation: "Pursued by" },
    ],
  },
  {
    id: "wb-char-iren",
    kind: "character",
    name: "Iren Mercer",
    role: "Mentor (deceased)",
    description:
      "Abel's master and the last Cartographer of the Western Reach. Dies before chapter one — and rules the story anyway.",
    aliases: ["Master Mercer", "The Old Cartographer"],
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
    firstAppearanceChapter: 3,
    firstAppearanceTitle: "What Iren Left Behind",
    linkedChapters: 6,
    mentionCount: 71,
    visibility: "spoiler-protected",
    matchPriority: 80,
    updatedAt: days(4),
    authorNotes: "The reader should not learn how he died until chapter 18.",
    related: [{ id: "wb-char-abel", name: "Abel", relation: "Apprentice" }],
  },
  {
    id: "wb-loc-avallon",
    kind: "location",
    name: "Avallon",
    role: "Kingdom",
    description:
      "A coastal kingdom whose entire economy depends on the maps it forbids the rest of the world to draw.",
    aliases: ["The Cartographer's Kingdom"],
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
    firstAppearanceChapter: 2,
    firstAppearanceTitle: "Salt and Vellum",
    linkedChapters: 8,
    mentionCount: 96,
    visibility: "public",
    matchPriority: 90,
    updatedAt: days(2),
    related: [{ id: "wb-org-ashen-order", name: "The Ashen Order", relation: "Operates within" }],
  },
  {
    id: "wb-loc-silverquill",
    kind: "location",
    name: "Silverquill Atelier",
    role: "Workshop",
    description:
      "A north-facing workshop tucked between two shuttered tailor shops. Older than the district that surrounds it.",
    aliases: ["The Atelier", "Silverquill"],
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
    firstAppearanceChapter: 1,
    firstAppearanceTitle: "The Burned Map",
    linkedChapters: 9,
    mentionCount: 142,
    visibility: "public",
    matchPriority: 85,
    updatedAt: days(3),
    related: [{ id: "wb-char-abel", name: "Abel", relation: "Workplace" }],
  },
  {
    id: "wb-org-ashen-order",
    kind: "organization",
    name: "The Ashen Order",
    role: "Secret Order",
    description:
      "A confederation of map-burners who believe an unmapped coast is the only honest one. Politely lethal.",
    aliases: ["The Ashen", "Order of Ash"],
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=900&h=900&fit=crop",
    firstAppearanceChapter: 7,
    firstAppearanceTitle: "Smoke on the Cloister",
    linkedChapters: 4,
    mentionCount: 38,
    visibility: "hidden-until-chapter",
    visibleFromChapter: 7,
    matchPriority: 75,
    updatedAt: days(6),
    authorNotes: "Their motivation must remain ambiguous through Act II.",
    related: [
      { id: "wb-item-burned-map", name: "The Burned Map", relation: "Responsible for" },
    ],
  },
  {
    id: "wb-org-guild",
    kind: "organization",
    name: "Cartographers' Guild",
    role: "Trade Confederation",
    description:
      "Seven ateliers whose seals are required to publish any official map. Quietly fractured along the western seam.",
    aliases: ["The Guild"],
    firstAppearanceChapter: 2,
    firstAppearanceTitle: "Salt and Vellum",
    linkedChapters: 7,
    mentionCount: 64,
    visibility: "public",
    matchPriority: 70,
    updatedAt: days(11),
    related: [
      { id: "wb-loc-silverquill", name: "Silverquill Atelier", relation: "Member atelier" },
    ],
  },
  {
    id: "wb-item-burned-map",
    kind: "item",
    name: "The Burned Map",
    role: "Artifact",
    description:
      "Three winters of field surveys. Oak-gall ink, rainwater wash, vellum from the northern abbeys. A tin of ash by chapter one.",
    aliases: ["Western Coast Draft", "The Draft"],
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&h=900&fit=crop",
    firstAppearanceChapter: 1,
    firstAppearanceTitle: "The Burned Map",
    linkedChapters: 3,
    mentionCount: 27,
    visibility: "public",
    matchPriority: 95,
    updatedAt: days(5),
    related: [{ id: "wb-char-abel", name: "Abel", relation: "Inherited by" }],
  },
  {
    id: "wb-item-silver-compass",
    kind: "item",
    name: "Mercer's Compass",
    role: "Heirloom",
    description:
      "A compass that does not point north. What it points to instead is, according to Iren, 'a longer conversation.'",
    aliases: ["The Silver Compass"],
    firstAppearanceChapter: 4,
    firstAppearanceTitle: "Not Quite North",
    linkedChapters: 5,
    mentionCount: 22,
    visibility: "spoiler-protected",
    matchPriority: 80,
    updatedAt: days(8),
    authorNotes: "Reveal what it points to in the epilogue. Not before.",
    related: [],
  },
  {
    id: "wb-creature-hollow-stag",
    kind: "creature",
    name: "Hollow Stag",
    role: "Mythic Creature",
    description:
      "Tall as a watchtower in the bell-fog, said to lead lost cartographers to the edge of a coast that does not exist.",
    aliases: ["The Stag", "The Hollow"],
    imageUrl:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&h=900&fit=crop",
    firstAppearanceChapter: 9,
    firstAppearanceTitle: "Antlers in the Fog",
    linkedChapters: 2,
    mentionCount: 14,
    visibility: "hidden-until-chapter",
    visibleFromChapter: 9,
    matchPriority: 60,
    updatedAt: days(12),
    related: [],
  },
  {
    id: "wb-glossary-moonbind",
    kind: "glossary",
    name: "Moonbind",
    role: "Magic Term",
    description:
      "The practice of inking a map under a full moon so that it shows only what was true on the night it was drawn.",
    aliases: ["Moon-binding", "Moonbound"],
    firstAppearanceChapter: 5,
    firstAppearanceTitle: "Under Full Moon",
    linkedChapters: 6,
    mentionCount: 19,
    visibility: "public",
    matchPriority: 65,
    updatedAt: days(9),
    related: [
      { id: "wb-item-burned-map", name: "The Burned Map", relation: "Was moonbound" },
    ],
  },
  {
    id: "wb-glossary-western-seam",
    kind: "glossary",
    name: "Western Seam",
    role: "Geographic Term",
    description:
      "The contested line where four ateliers' jurisdictions overlap. Officially, it does not exist.",
    aliases: ["The Seam"],
    firstAppearanceChapter: 6,
    firstAppearanceTitle: "Where Four Maps Meet",
    linkedChapters: 4,
    mentionCount: 11,
    visibility: "author-only",
    matchPriority: 50,
    updatedAt: days(14),
    authorNotes: "Strictly for my own continuity tracking. Not for readers.",
    related: [],
  },
];
