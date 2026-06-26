import type { Franchise } from "@/components/franchise-card";

/**
 * Showcase franchises for the Franchise Card v1.0.
 * Existing entertainment properties only — no original/platform worlds.
 * (Distinct from `mockFranchises` which seeds the broader domain.)
 */
export const mockFranchiseCards: Franchise[] = [
  {
    id: "f_harry_potter",
    slug: "harry-potter",
    name: "Harry Potter",
    description:
      "A magical school where generations of readers continue writing new stories about house ties, second wars and quieter mornings.",
    bannerUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&h=900&fit=crop",
    media: "books",
    storyCount: 24500,
    activeAuthors: 1820,
    popular: true,
  },
  {
    id: "f_got",
    slug: "game-of-thrones",
    name: "Game of Thrones",
    description:
      "A world of political intrigue, dragons and noble houses — endlessly rewritten by readers unwilling to let the throne stay cold.",
    bannerUrl:
      "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1800&h=900&fit=crop",
    media: "tv",
    storyCount: 9300,
    activeAuthors: 740,
    popular: true,
  },
  {
    id: "f_naruto",
    slug: "naruto",
    name: "Naruto",
    description:
      "Ninja villages, found family and the long shadow of legacy. A franchise whose fandom never stops asking 'what if?'",
    bannerUrl:
      "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=1800&h=900&fit=crop",
    media: "anime-manga",
    storyCount: 18200,
    activeAuthors: 1340,
    popular: true,
  },
  {
    id: "f_one_piece",
    slug: "one-piece",
    name: "One Piece",
    description:
      "Pirate seas, found crews and impossible dreams. Readers chart their own islands across a world that refuses to end.",
    bannerUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=900&fit=crop",
    media: "anime-manga",
    storyCount: 7600,
    activeAuthors: 590,
  },
  {
    id: "f_pokemon",
    slug: "pokemon",
    name: "Pokémon",
    description:
      "Trainers, regions and quiet companionship. A franchise where every route map is also an invitation to write your own journey.",
    bannerUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&h=900&fit=crop",
    media: "games",
    storyCount: 5400,
    activeAuthors: 420,
  },
  {
    id: "f_marvel",
    slug: "marvel",
    name: "Marvel",
    description:
      "A multiverse of heroes, empires and unforgettable team-ups. Readers keep finding new corners of it worth telling.",
    bannerUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1800&h=900&fit=crop",
    media: "comics",
    storyCount: 21800,
    activeAuthors: 1610,
    popular: true,
  },
  {
    id: "f_star_wars",
    slug: "star-wars",
    name: "Star Wars",
    description:
      "A galaxy full of heroes, empires and unforgettable adventures — rewritten one quiet outer-rim story at a time.",
    bannerUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1800&h=900&fit=crop",
    media: "movies",
    storyCount: 13700,
    activeAuthors: 980,
    popular: true,
  },
  {
    id: "f_witcher",
    slug: "the-witcher",
    name: "The Witcher",
    description:
      "Monsters that are mostly human, contracts that are mostly tragedies. A continent readers can't stop walking back into.",
    bannerUrl:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1800&h=900&fit=crop",
    media: "games",
    storyCount: 4200,
    activeAuthors: 310,
  },
];
