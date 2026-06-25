import type { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "n_001",
    kind: "new_chapter",
    title: "New chapter: Ash & Atlas",
    body: "Iris Vale published Chapter 24 — \"The Western Coast, From Memory\".",
    href: "/read/s_ash_and_atlas",
    read: false,
    createdAt: "2026-06-18T20:14:00Z",
  },
  {
    id: "n_002",
    kind: "new_follower",
    title: "Juno Marsh followed you",
    body: "Curator of the Hallow City universe.",
    href: "/u/juno.marsh",
    read: false,
    createdAt: "2026-06-20T11:02:00Z",
  },
  {
    id: "n_003",
    kind: "comment_reply",
    title: "Amara Solène replied to your comment",
    body: "\"Honestly? Same. That chapter rewired me.\"",
    href: "/read/s_ash_and_atlas",
    read: true,
    createdAt: "2026-06-21T09:48:00Z",
  },
  {
    id: "n_004",
    kind: "story_recommended",
    title: "Picked for you: Quiet Engines",
    body: "Because you finished Ash & Atlas, Chapter 23.",
    href: "/read/s_quiet_engines",
    read: true,
    createdAt: "2026-06-22T07:01:00Z",
  },
  {
    id: "n_005",
    kind: "system",
    title: "Welcome to Fyndor",
    body: "Your reading library is ready. Start by following a universe.",
    read: true,
    createdAt: "2026-06-15T08:00:00Z",
  },
];
