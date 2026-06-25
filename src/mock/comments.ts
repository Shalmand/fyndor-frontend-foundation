import type { Comment } from "@/types";

export const mockComments: Comment[] = [
  {
    id: "c_001",
    storyId: "s_ash_and_atlas",
    chapterId: "ch_12",
    authorId: "a_amara_solene",
    body: "The scene with the burned map. I had to put the phone down. That was a whole grief in three paragraphs.",
    likes: 412,
    createdAt: "2026-06-19T14:02:00Z",
    replyCount: 23,
  },
  {
    id: "c_002",
    storyId: "s_quiet_engines",
    chapterId: "ch_40",
    authorId: "a_juno_marsh",
    body: "Calling it now — the second signature on the charter is the navigator's grandmother. Tell me I'm wrong.",
    likes: 188,
    createdAt: "2026-06-21T09:20:00Z",
    replyCount: 47,
  },
  {
    id: "c_003",
    storyId: "s_the_long_hallow_bells",
    authorId: "a_theodor_lyne",
    body: "This is the cleanest entry in the Hallow canon I've read in years. The bell motif alone deserves its own essay.",
    likes: 96,
    createdAt: "2026-06-22T18:11:00Z",
    replyCount: 8,
  },
];
