import type { Universe } from "@/types";

export const mockUniverses: Universe[] = [
  {
    id: "u_hallow_city",
    slug: "hallow-city",
    name: "Hallow City",
    description: "The drowned districts, the cathedral mile, and the people who pretend not to hear the bells.",
    coverUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&h=900&fit=crop",
    franchiseId: "f_long_hallow",
    curatorId: "a_juno_marsh",
    loreCardIds: ["lc_bellringers", "lc_cathedral", "lc_drownmarket"],
  },
  {
    id: "u_mireborn_fleet",
    slug: "mireborn-fleet",
    name: "The Mireborn Fleet",
    description: "Forty-eight ships, one charter, and a thousand quiet mutinies.",
    coverUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1600&h=900&fit=crop",
    franchiseId: "f_mireborn",
    curatorId: "a_kenji_okafor",
    loreCardIds: ["lc_charter", "lc_navigator_guild"],
  },
  {
    id: "u_silverquill",
    slug: "silverquill",
    name: "Silverquill",
    description: "An academy carved into a mountain that grades you back.",
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1600&h=900&fit=crop",
    franchiseId: "f_silverquill",
    curatorId: "a_iris_vale",
    loreCardIds: ["lc_inkwells", "lc_cartographers"],
  },
];
