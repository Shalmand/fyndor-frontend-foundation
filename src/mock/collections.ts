import type { Collection } from "@/components/collection-card";

/**
 * Editorial collections — themes, moods and curatorial picks.
 * Never franchise-specific (those live inside Universe pages).
 */
export const mockCollections: Collection[] = [
  {
    id: "c_slow_burn",
    slug: "slow-burn-comfort-reads",
    title: "Slow Burn Comfort Reads",
    description:
      "Stories that take their time. Quiet tension, patient hearts, and endings worth the wait.",
    bannerUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1600&h=1067&fit=crop",
    storyCount: 18,
    curatorKind: "staff",
    themes: ["Romance", "Slow burn"],
  },
  {
    id: "c_hidden_fantasy",
    slug: "hidden-fantasy-gems",
    title: "Hidden Fantasy Gems",
    description:
      "Under-the-radar worlds with rare voices — handpicked by Fyndor editors for readers who've already read the classics.",
    bannerUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&h=1067&fit=crop",
    storyCount: 24,
    curatorKind: "editorial",
    themes: ["Fantasy", "Original"],
  },
  {
    id: "c_medieval",
    slug: "best-medieval-adventures",
    title: "Best Medieval Adventures",
    description:
      "Iron, ink, and oath-bound knights. The finest medieval arcs Fyndor has to offer right now.",
    bannerUrl:
      "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1600&h=1067&fit=crop",
    storyCount: 14,
    curatorKind: "editor",
    curator: "Amara Solène",
    themes: ["Adventure", "Medieval"],
  },
  {
    id: "c_rainy_day",
    slug: "rainy-day-stories",
    title: "Rainy Day Stories",
    description:
      "Tea, a blanket, and a long afternoon. Stories built for grey skies and quiet rooms.",
    bannerUrl:
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=1600&h=1067&fit=crop",
    storyCount: 12,
    curatorKind: "trending",
    themes: ["Cozy", "Literary"],
  },
  {
    id: "c_slice_of_life",
    slug: "cozy-slice-of-life",
    title: "Cozy Slice of Life",
    description:
      "Small towns, small wins, and the people who make them feel enormous.",
    bannerUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=1067&fit=crop",
    storyCount: 9,
    curatorKind: "community",
    themes: ["Slice of life"],
  },
  {
    id: "c_political",
    slug: "political-intrigue",
    title: "Political Intrigue",
    description:
      "Whispered alliances, paper-thin loyalties, and one wrong signature away from a war.",
    bannerUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&h=1067&fit=crop",
    storyCount: 21,
    curatorKind: "editorial",
    themes: ["Intrigue", "Drama"],
  },
];
