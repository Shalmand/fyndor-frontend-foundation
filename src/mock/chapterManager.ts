/**
 * Mock data for the Chapter Manager v1.0 showcase.
 *
 * Chapters intentionally mirror the World Builder's "Ash & Atlas" world so
 * the two modules visibly share a source of truth. The Story World link
 * counts and sample entity references are mock only — no autocomplete or
 * Lore wiring runs here.
 */

export type ChapterStatus =
  | "draft"
  | "in-progress"
  | "ready"
  | "scheduled"
  | "published"
  | "needs-revision"
  | "archived";

export type StoryStatus = "draft" | "ongoing" | "completed" | "paused";

export interface ChapterLinkedEntity {
  id: string;
  name: string;
  kind:
    | "character"
    | "location"
    | "organization"
    | "item"
    | "creature"
    | "glossary";
}

export interface ChapterReadinessItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ChapterRecord {
  id: string;
  number: number;
  title: string;
  excerpt: string;
  status: ChapterStatus;
  words: number;
  readingMinutes: number;
  storyWorldLinks: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  lastAutosaveAt?: string;
  authorNote?: string;
  privateNote?: string;
  contentWarningReviewed?: boolean;
  linkedEntities: ChapterLinkedEntity[];
  readiness: ChapterReadinessItem[];
}

export interface ChapterStoryMeta {
  id: string;
  title: string;
  coverUrl: string;
  type: "original" | "fanfiction";
  status: StoryStatus;
  lastEditedAt: string;
}

const now = Date.now();
const hours = (n: number) => new Date(now - n * 3_600_000).toISOString();
const days = (n: number) => new Date(now - n * 86_400_000).toISOString();
const inDays = (n: number) => new Date(now + n * 86_400_000).toISOString();

const readiness = (over: Partial<Record<string, boolean>> = {}): ChapterReadinessItem[] => [
  { id: "title", label: "Title added", done: over.title ?? true },
  { id: "content", label: "Content added", done: over.content ?? true },
  { id: "lore", label: "Story World links reviewed", done: over.lore ?? false },
  { id: "author-note", label: "Author note (optional)", done: over["author-note"] ?? false },
  { id: "content-warning", label: "Content warning reviewed", done: over["content-warning"] ?? false },
  { id: "preview", label: "Preview checked", done: over.preview ?? false },
];

export const chapterManagerStory: ChapterStoryMeta = {
  id: "story-ash-and-atlas",
  title: "Ash & Atlas",
  coverUrl:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop",
  type: "original",
  status: "ongoing",
  lastEditedAt: hours(2),
};

export const mockChapters: ChapterRecord[] = [
  {
    id: "ch-1",
    number: 1,
    title: "The First Door",
    excerpt:
      "Avallon at dusk: the bells, the salt, the small betrayals of light. Abel opens a door he has been told never to open.",
    status: "published",
    words: 2840,
    readingMinutes: 11,
    storyWorldLinks: 12,
    commentsCount: 184,
    createdAt: days(64),
    updatedAt: days(58),
    publishedAt: days(58),
    linkedEntities: [
      { id: "wb-char-abel", name: "Abel", kind: "character" },
      { id: "wb-loc-avallon", name: "Avallon", kind: "location" },
      { id: "wb-loc-silverquill", name: "Silverquill Atelier", kind: "location" },
    ],
    readiness: readiness({ lore: true, "content-warning": true, preview: true }),
  },
  {
    id: "ch-2",
    number: 2,
    title: "Avallon Burns",
    excerpt:
      "The western coast catches first. Eda watches her own map curl from the edges in and decides, calmly, that this is mercy.",
    status: "published",
    words: 3420,
    readingMinutes: 14,
    storyWorldLinks: 8,
    commentsCount: 142,
    createdAt: days(55),
    updatedAt: days(40),
    publishedAt: days(40),
    linkedEntities: [
      { id: "wb-char-eda", name: "Eda Mercer", kind: "character" },
      { id: "wb-loc-avallon", name: "Avallon", kind: "location" },
      { id: "wb-item-burned-map", name: "The Burned Map", kind: "item" },
    ],
    readiness: readiness({ lore: true, "content-warning": true, preview: true }),
  },
  {
    id: "ch-3",
    number: 3,
    title: "The Hollow Crown",
    excerpt:
      "A child king who refuses to be crowned. A regent who has already chosen the coin. The court watches and says nothing.",
    status: "draft",
    words: 1980,
    readingMinutes: 8,
    storyWorldLinks: 5,
    commentsCount: 0,
    createdAt: days(20),
    updatedAt: hours(2),
    lastAutosaveAt: hours(2),
    privateNote:
      "Lean into the silence in the throne room — let the regent speak for far too long.",
    linkedEntities: [
      { id: "wb-char-abel", name: "Abel", kind: "character" },
      { id: "wb-loc-avallon", name: "Avallon", kind: "location" },
      { id: "wb-org-ashen-order", name: "The Ashen Order", kind: "organization" },
    ],
    readiness: readiness({ lore: false, preview: false, "content-warning": false }),
  },
  {
    id: "ch-4",
    number: 4,
    title: "The Ashen Order",
    excerpt:
      "An order that wears no colour and signs no document. Their first lesson to a new recruit is how to forget your own name.",
    status: "scheduled",
    words: 2600,
    readingMinutes: 10,
    storyWorldLinks: 9,
    commentsCount: 0,
    createdAt: days(18),
    updatedAt: days(3),
    scheduledFor: inDays(2),
    authorNote:
      "Readers asked for more of the Order — this chapter pulls back the first veil. Pace it slow.",
    linkedEntities: [
      { id: "wb-org-ashen-order", name: "The Ashen Order", kind: "organization" },
      { id: "wb-char-abel", name: "Abel", kind: "character" },
      { id: "wb-glossary-moonbind", name: "Moonbind", kind: "glossary" },
    ],
    readiness: readiness({ lore: true, "content-warning": true, preview: true, "author-note": true }),
  },
  {
    id: "ch-5",
    number: 5,
    title: "What the Diaries Say",
    excerpt:
      "Twelve leather-bound volumes she once swore never to read. The first cord is the hardest. The first sentence is worse.",
    status: "ready",
    words: 3120,
    readingMinutes: 12,
    storyWorldLinks: 6,
    commentsCount: 0,
    createdAt: days(14),
    updatedAt: days(1),
    linkedEntities: [
      { id: "wb-char-eda", name: "Eda Mercer", kind: "character" },
      { id: "wb-item-diaries", name: "The Mercer Diaries", kind: "item" },
    ],
    readiness: readiness({ lore: true, preview: true, "content-warning": true, "author-note": true }),
  },
  {
    id: "ch-6",
    number: 6,
    title: "Salt and Ink",
    excerpt:
      "A cartographer's apprentice learns that some inks bind only when the tide is out.",
    status: "needs-revision",
    words: 2210,
    readingMinutes: 9,
    storyWorldLinks: 4,
    commentsCount: 0,
    createdAt: days(10),
    updatedAt: days(2),
    privateNote: "Continuity: confirm Avallon's tide schedule against Chapter 2.",
    linkedEntities: [
      { id: "wb-char-abel", name: "Abel", kind: "character" },
      { id: "wb-loc-silverquill", name: "Silverquill Atelier", kind: "location" },
    ],
    readiness: readiness({ lore: false, preview: false, "content-warning": false }),
  },
  {
    id: "ch-7",
    number: 7,
    title: "The Hollow Stag",
    excerpt:
      "A creature seen by three witnesses, none of whom agree on its colour, its size, or whether it spoke.",
    status: "in-progress",
    words: 1340,
    readingMinutes: 5,
    storyWorldLinks: 3,
    commentsCount: 0,
    createdAt: days(6),
    updatedAt: hours(28),
    lastAutosaveAt: hours(28),
    linkedEntities: [
      { id: "wb-creature-hollow-stag", name: "Hollow Stag", kind: "creature" },
      { id: "wb-loc-hollow-reaches", name: "Hollow Reaches", kind: "location" },
    ],
    readiness: readiness({ content: true, lore: false, preview: false, "content-warning": false }),
  },
  {
    id: "ch-8",
    number: 8,
    title: "The Second Atlas",
    excerpt: "A draft. A frame. A few sentences that already know where they are going.",
    status: "draft",
    words: 410,
    readingMinutes: 2,
    storyWorldLinks: 1,
    commentsCount: 0,
    createdAt: days(2),
    updatedAt: hours(6),
    lastAutosaveAt: hours(6),
    linkedEntities: [
      { id: "wb-char-eda", name: "Eda Mercer", kind: "character" },
    ],
    readiness: readiness({ content: false, lore: false, preview: false, "content-warning": false }),
  },
  {
    id: "ch-archived-prologue",
    number: 0,
    title: "Prologue — A Door That Was Always Open",
    excerpt:
      "Cut from the final manuscript. Kept here as a reference for the opening atmosphere.",
    status: "archived",
    words: 1180,
    readingMinutes: 5,
    storyWorldLinks: 2,
    commentsCount: 0,
    createdAt: days(80),
    updatedAt: days(60),
    privateNote: "Useful tone reference. Don't delete.",
    linkedEntities: [
      { id: "wb-loc-avallon", name: "Avallon", kind: "location" },
    ],
    readiness: readiness({ lore: true }),
  },
];
