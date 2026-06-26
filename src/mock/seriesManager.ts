/**
 * Mock data for the Series Manager v1.0 showcase.
 *
 * Series organize multiple connected stories — sagas, trilogies, shared
 * universes, anthologies, fanfiction arcs. The data shape is intentionally
 * close to what a real Series record would look like: an identity block,
 * a positioning block, and ordered story references. No backend wired.
 */

export type SeriesType =
  | "series"
  | "saga"
  | "duology"
  | "trilogy"
  | "anthology"
  | "shared-universe"
  | "spin-off-collection"
  | "fanfiction-arc";

export type SeriesStatus =
  | "draft"
  | "ongoing"
  | "completed"
  | "paused"
  | "planned";

export type SeriesVisibility = "draft" | "public" | "private";

export type StoryRole =
  | "main-entry"
  | "sequel"
  | "prequel"
  | "spin-off"
  | "side-story"
  | "companion-story"
  | "bonus-story";

export type StoryStatus = "draft" | "ongoing" | "completed" | "paused";

export interface SeriesStoryRef {
  id: string;
  title: string;
  cover?: string;
  role: StoryRole;
  /** Position in publication order (1-indexed). */
  publicationOrder: number;
  /** Optional chronological order, where it differs from publication. */
  chronologicalOrder?: number;
  /** Optional recommended reading order. */
  recommendedOrder?: number;
  status: StoryStatus;
  chapters: number;
  words: number;
  updatedAt: string;
  /** Reader-facing notes that surface in the Reading Order preview. */
  readerLabels?: ReaderLabel[];
}

export type ReaderLabel =
  | "start-here"
  | "main-story"
  | "optional"
  | "read-after-book-2"
  | "contains-spoilers"
  | "spin-off";

export interface SeriesRecord {
  id: string;
  title: string;
  description: string;
  type: SeriesType;
  status: SeriesStatus;
  visibility: SeriesVisibility;
  /** Main genre tag, kept editorial — never a list of database tags. */
  genre?: string;
  cover?: string;
  updatedAt: string;
  /** Optional positioning — Progressive Creation: all may be undefined. */
  positioning?: {
    mainArc?: string;
    tone?: string;
    audience?: string;
    complexity?: "approachable" | "layered" | "demanding";
    spoilerSensitivity?: "low" | "medium" | "high";
  };
  stories: SeriesStoryRef[];
  /** Discovery surfaces this series may appear on later — visual only. */
  discoveryLabels?: DiscoveryLabel[];
}

export type DiscoveryLabel =
  | "featured-series"
  | "recommended-saga"
  | "popular-universe"
  | "start-here";

export interface StandaloneStory {
  id: string;
  title: string;
  cover?: string;
  kind: "original" | "fanfiction";
  status: StoryStatus;
  chapters: number;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Mock series — grounded in the "Ash & Atlas" world used elsewhere.
// --------------------------------------------------------------------------

export const mockSeries: SeriesRecord[] = [
  {
    id: "ser-ashen-crown",
    title: "The Ashen Crown Saga",
    description:
      "An epic fantasy saga following the slow collapse of Avallon and the heirs who refuse to let its memory burn.",
    type: "saga",
    status: "ongoing",
    visibility: "public",
    genre: "Epic Fantasy",
    updatedAt: "2026-06-22T14:00:00.000Z",
    positioning: {
      mainArc: "The fall and re-founding of Avallon.",
      tone: "Mournful, mythic, slow-burn",
      audience: "Readers of long-form epic fantasy",
      complexity: "layered",
      spoilerSensitivity: "high",
    },
    discoveryLabels: ["featured-series", "recommended-saga"],
    stories: [
      {
        id: "sty-ashen-1",
        title: "The Ashen Crown",
        role: "main-entry",
        publicationOrder: 1,
        chronologicalOrder: 2,
        recommendedOrder: 1,
        status: "completed",
        chapters: 38,
        words: 142_000,
        updatedAt: "2025-11-04T10:00:00.000Z",
        readerLabels: ["start-here", "main-story"],
      },
      {
        id: "sty-ashen-2",
        title: "The Burned Map",
        role: "sequel",
        publicationOrder: 2,
        chronologicalOrder: 3,
        recommendedOrder: 3,
        status: "ongoing",
        chapters: 22,
        words: 88_400,
        updatedAt: "2026-06-12T09:30:00.000Z",
        readerLabels: ["main-story", "contains-spoilers"],
      },
      {
        id: "sty-ashen-3",
        title: "Avallon Falls",
        role: "prequel",
        publicationOrder: 3,
        chronologicalOrder: 1,
        recommendedOrder: 2,
        status: "ongoing",
        chapters: 14,
        words: 49_900,
        updatedAt: "2026-06-20T19:45:00.000Z",
        readerLabels: ["optional", "spin-off"],
      },
      {
        id: "sty-ashen-4",
        title: "Letters from the Hollow Court",
        role: "companion-story",
        publicationOrder: 4,
        recommendedOrder: 4,
        status: "draft",
        chapters: 6,
        words: 18_200,
        updatedAt: "2026-06-21T22:10:00.000Z",
        readerLabels: ["optional"],
      },
    ],
  },
  {
    id: "ser-avallon-chronicles",
    title: "Avallon Chronicles",
    description:
      "A shared universe stitched together from spin-offs, side stories and the rare bonus tale.",
    type: "shared-universe",
    status: "ongoing",
    visibility: "public",
    genre: "Mythic Fantasy",
    updatedAt: "2026-06-18T11:20:00.000Z",
    discoveryLabels: ["popular-universe"],
    positioning: {
      mainArc: "Stories that orbit Avallon without retelling it.",
      tone: "Varied — short, intimate, sometimes strange",
      complexity: "approachable",
      spoilerSensitivity: "medium",
    },
    stories: [
      {
        id: "sty-av-1",
        title: "The Stag in the Lake",
        role: "side-story",
        publicationOrder: 1,
        recommendedOrder: 1,
        status: "completed",
        chapters: 5,
        words: 14_300,
        updatedAt: "2025-08-02T10:00:00.000Z",
        readerLabels: ["start-here"],
      },
      {
        id: "sty-av-2",
        title: "Moonbind",
        role: "spin-off",
        publicationOrder: 2,
        recommendedOrder: 2,
        status: "ongoing",
        chapters: 9,
        words: 31_200,
        updatedAt: "2026-05-30T14:00:00.000Z",
        readerLabels: ["spin-off"],
      },
      {
        id: "sty-av-3",
        title: "Hollow Stag",
        role: "bonus-story",
        publicationOrder: 3,
        status: "ongoing",
        chapters: 3,
        words: 8_400,
        updatedAt: "2026-06-15T08:00:00.000Z",
        readerLabels: ["optional"],
      },
      {
        id: "sty-av-4",
        title: "The Inn at Greyfen",
        role: "side-story",
        publicationOrder: 4,
        status: "draft",
        chapters: 2,
        words: 4_900,
        updatedAt: "2026-06-18T11:20:00.000Z",
      },
      {
        id: "sty-av-5",
        title: "Of Lanterns and Other Light",
        role: "side-story",
        publicationOrder: 5,
        status: "draft",
        chapters: 1,
        words: 2_200,
        updatedAt: "2026-06-17T11:20:00.000Z",
      },
      {
        id: "sty-av-6",
        title: "The Cartographer's Wife",
        role: "companion-story",
        publicationOrder: 6,
        status: "completed",
        chapters: 4,
        words: 11_900,
        updatedAt: "2026-04-12T11:20:00.000Z",
      },
      {
        id: "sty-av-7",
        title: "Salt & Rowan",
        role: "side-story",
        publicationOrder: 7,
        status: "paused",
        chapters: 3,
        words: 7_800,
        updatedAt: "2026-03-30T11:20:00.000Z",
      },
    ],
  },
  {
    id: "ser-burned-map",
    title: "The Burned Map",
    description:
      "A duology about a cartographer who refuses to forget — and the empire that needs her to.",
    type: "duology",
    status: "completed",
    visibility: "public",
    genre: "Literary Fantasy",
    updatedAt: "2026-02-14T16:00:00.000Z",
    discoveryLabels: ["start-here"],
    stories: [
      {
        id: "sty-bm-1",
        title: "The Burned Map",
        role: "main-entry",
        publicationOrder: 1,
        recommendedOrder: 1,
        status: "completed",
        chapters: 18,
        words: 64_500,
        updatedAt: "2025-09-20T10:00:00.000Z",
        readerLabels: ["start-here", "main-story"],
      },
      {
        id: "sty-bm-2",
        title: "The Cartographer's Quiet",
        role: "sequel",
        publicationOrder: 2,
        recommendedOrder: 2,
        status: "completed",
        chapters: 21,
        words: 78_900,
        updatedAt: "2026-02-14T16:00:00.000Z",
        readerLabels: ["main-story", "read-after-book-2"],
      },
    ],
  },
  {
    id: "ser-hollow-court",
    title: "Letters from the Hollow Court",
    description:
      "Twelve short letters between courtiers, spies and the king who never wrote back.",
    type: "anthology",
    status: "draft",
    visibility: "draft",
    genre: "Court Intrigue",
    updatedAt: "2026-06-23T09:00:00.000Z",
    stories: Array.from({ length: 12 }).map((_, i) => ({
      id: `sty-hc-${i + 1}`,
      title: `Letter ${String(i + 1).padStart(2, "0")}`,
      role: "side-story" as StoryRole,
      publicationOrder: i + 1,
      status: (i < 7 ? "completed" : "draft") as StoryStatus,
      chapters: 1,
      words: 1200 + i * 180,
      updatedAt: "2026-06-23T09:00:00.000Z",
    })),
  },
  {
    id: "ser-margins",
    title: "Margins of Avallon",
    description:
      "A fanfiction arc reimagining the unwritten chapters of the Ashen Crown.",
    type: "fanfiction-arc",
    status: "ongoing",
    visibility: "public",
    genre: "Fanfiction",
    updatedAt: "2026-06-10T20:00:00.000Z",
    stories: [
      {
        id: "sty-mg-1",
        title: "The Heir Who Stayed",
        role: "main-entry",
        publicationOrder: 1,
        status: "completed",
        chapters: 12,
        words: 38_400,
        updatedAt: "2026-01-08T10:00:00.000Z",
        readerLabels: ["start-here"],
      },
      {
        id: "sty-mg-2",
        title: "Coronation, Reversed",
        role: "sequel",
        publicationOrder: 2,
        status: "ongoing",
        chapters: 8,
        words: 24_900,
        updatedAt: "2026-06-10T20:00:00.000Z",
        readerLabels: ["contains-spoilers"],
      },
    ],
  },
];

export const mockStandaloneStories: StandaloneStory[] = [
  {
    id: "sty-solo-1",
    title: "Glass Lanterns",
    kind: "original",
    status: "completed",
    chapters: 1,
    updatedAt: "2025-05-01T10:00:00.000Z",
  },
  {
    id: "sty-solo-2",
    title: "A Quiet Year in Greyfen",
    kind: "original",
    status: "ongoing",
    chapters: 9,
    updatedAt: "2026-06-08T10:00:00.000Z",
  },
  {
    id: "sty-solo-3",
    title: "The Cartographer's Daughter",
    kind: "fanfiction",
    status: "draft",
    chapters: 2,
    updatedAt: "2026-06-20T10:00:00.000Z",
  },
];
