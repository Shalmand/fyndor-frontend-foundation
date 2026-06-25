import type { ReadingList } from "@/types";

export const mockReadingLists: ReadingList[] = [
  {
    id: "rl_slow_burn",
    ownerId: "a_amara_solene",
    title: "Slow-Burn Comfort Reads",
    description: "Stories that take their time and earn the ache.",
    coverUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
    storyIds: ["s_ash_and_atlas", "s_letters_to_calliope", "s_paper_kingdoms"],
    isPublic: true,
    updatedAt: "2026-06-19T11:00:00Z",
  },
  {
    id: "rl_hallow_canon",
    ownerId: "a_juno_marsh",
    title: "The Long Hallow — Canon Order",
    description: "Reading the saga in the order it actually makes sense in.",
    coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop",
    storyIds: ["s_the_long_hallow_bells", "s_velvet_recursion"],
    isPublic: true,
    updatedAt: "2026-05-30T22:14:00Z",
  },
  {
    id: "rl_to_finish",
    ownerId: "a_kenji_okafor",
    title: "To finish over the holidays",
    description: "Private shelf.",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=600&fit=crop",
    storyIds: ["s_quiet_engines", "s_ash_and_atlas"],
    isPublic: false,
    updatedAt: "2026-06-10T07:48:00Z",
  },
];
