import type {
  CharacterEntity,
  CreatureEntity,
  GlossaryEntity,
  ItemEntity,
  LocationEntity,
  LoreEntity,
  OrganizationEntity,
} from "@/components/story-world/types";

/**
 * Mock Story World entries for "Ash & Atlas".
 *
 * Lore IDs match the inline `lore("text", "id")` tokens in
 * `src/mock/chapters.ts` so the Reading Experience renders them as
 * clickable references when the drawer is wired.
 */

const eda: CharacterEntity = {
  id: "char-eda-mercer",
  kind: "character",
  name: "Eda Mercer",
  tagline: "Cartographer. Reluctant heir. The one who burned the map.",
  portraitUrl:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop",
  role: "Protagonist · Master Cartographer",
  firstAppearance: "Chapter 1 — The Burned Map",
  status: "Alive",
  relationships: [
    { name: "M.", relation: "Childhood companion", entityId: undefined },
    { name: "Iren Mercer", relation: "Father (deceased)" },
  ],
  organizations: [
    { name: "Silverquill Atelier", entityId: undefined },
    { name: "Cartographers' Guild" },
  ],
  description:
    "Born to the Silverquill line and trained by her father from the age of nine, Eda became the youngest Master of Silverquill in seven generations. She is precise, withholding, and famously unkind to her own work — a habit those close to her have learned to read as grief, not perfectionism.",
};

const silverquill: LocationEntity = {
  id: "loc-silverquill-atelier",
  kind: "location",
  name: "Silverquill Atelier",
  tagline: "A workshop older than the district that surrounds it.",
  bannerUrl:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1800&h=900&fit=crop",
  type: "Workshop · Heritage building",
  importantCharacters: [
    { name: "Eda Mercer", entityId: "char-eda-mercer" },
    { name: "Iren Mercer" },
  ],
  description:
    "Tucked between two shuttered tailor shops on the lower city's bell-street, Silverquill has produced every official chart of the western coast for two centuries. Its windows face north on principle; its door is rarely closed.",
};

const guild: OrganizationEntity = {
  id: "org-cartographers-guild",
  kind: "organization",
  name: "The Cartographers' Guild",
  tagline: "Older than the kingdom it claims to map.",
  symbolUrl:
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=900&h=900&fit=crop",
  members: [
    { name: "Eda Mercer", role: "Master of Silverquill", entityId: "char-eda-mercer" },
    { name: "Provost Halen", role: "Guildmaster" },
    { name: "Sera Ondine", role: "Master of the Eastern Reach" },
  ],
  description:
    "A confederation of seven ateliers whose seals are required to publish any official map. Internally polite, externally untouchable, and — as Eda is about to discover — quietly fractured along the western seam.",
};

const excalibur: ItemEntity = {
  id: "item-western-coast-draft",
  kind: "item",
  name: "Western Coast, First Draft",
  tagline: "The only complete map of the western coast. Now a tin of ash.",
  artworkUrl:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&h=900&fit=crop",
  owner: "Eda Mercer",
  status: "Destroyed (Chapter 1)",
  description:
    "Three winters of field surveys, hand-ground oak gall ink, rainwater wash, vellum from the northern abbeys. Eda burned it herself, on a Tuesday, at Second Watch, for reasons she has not yet admitted to anyone — including the reader.",
};

const wolf: CreatureEntity = {
  id: "creature-hollow-hound",
  kind: "creature",
  name: "Hollow Hound",
  tagline: "The reason no cartographer surveys the Reaches alone.",
  artworkUrl:
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&h=900&fit=crop",
  classification: "Apex predator · Pack-bound",
  habitat: "The Hollow Reaches, particularly the bell-fog basins",
  description:
    "Sized like a small horse, silent on broken ground, and — according to the surviving field notes of three Silverquill apprentices — capable of mimicking the timbre of a human voice well enough to be answered.",
};

const mastery: GlossaryEntity = {
  id: "concept-silverquill-mastery",
  kind: "glossary",
  name: "Master of Silverquill",
  term: "Master of Silverquill",
  definition:
    "The hereditary title held by the senior cartographer of the Silverquill Atelier. The title is not strictly inherited — it is awarded by the Guild — but in two centuries it has never left the Mercer line.",
  relatedTerms: [
    { name: "Silverquill Atelier", entityId: "loc-silverquill-atelier" },
    { name: "Cartographers' Guild", entityId: "org-cartographers-guild" },
    { name: "Eda Mercer", entityId: "char-eda-mercer" },
  ],
};

export const mockStoryWorld: Record<string, LoreEntity> = {
  [eda.id]: eda,
  [silverquill.id]: silverquill,
  [guild.id]: guild,
  [excalibur.id]: excalibur,
  [wolf.id]: wolf,
  [mastery.id]: mastery,
};

export function getMockLoreEntity(id: string): LoreEntity | undefined {
  return mockStoryWorld[id];
}

/** Convenience list for showcase tiles. */
export const mockStoryWorldList: LoreEntity[] = [
  eda,
  silverquill,
  guild,
  excalibur,
  wolf,
  mastery,
];
