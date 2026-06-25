import type { Review } from "@/types";

export const mockReviews: Review[] = [
  {
    id: "r_001",
    storyId: "s_ash_and_atlas",
    authorId: "a_kenji_okafor",
    rating: 5,
    title: "The fantasy debut of the year",
    body: "Vale writes maps the way other authors write love letters. The prose is restrained, the world feels lived-in, and the slow burn between Eda and the diaries is genuinely unbearable. Twenty-four chapters in and I still don't know how she's going to land this — but I trust her completely.",
    createdAt: "2026-05-12T10:00:00Z",
    helpfulCount: 1240,
  },
  {
    id: "r_002",
    storyId: "s_quiet_engines",
    authorId: "a_iris_vale",
    rating: 5,
    title: "Hard sci-fi with a soul",
    body: "Okafor's worldbuilding is doing work most series spend three books on, and he does it in dialogue. The charter mystery is the best long-form puzzle I've followed in years.",
    createdAt: "2026-04-02T22:30:00Z",
    helpfulCount: 884,
  },
  {
    id: "r_003",
    storyId: "s_letters_to_calliope",
    authorId: "a_theodor_lyne",
    rating: 4,
    title: "Small, but it stays",
    body: "Eighteen chapters of nothing happening, in the best sense. The ending pivots cleanly and I haven't stopped thinking about the last letter.",
    createdAt: "2026-01-08T07:15:00Z",
    helpfulCount: 312,
  },
];
