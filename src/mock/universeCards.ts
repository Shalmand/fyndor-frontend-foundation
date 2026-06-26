import type { Universe } from "@/components/universe-card";

/**
 * Showcase universes for the Universe Card v1.0.
 * Each one carries a distinct atmosphere, palette and trait set.
 * (Separate from `mockUniverses` which seeds the broader domain.)
 */
export const mockUniverseCards: Universe[] = [
  {
    id: "u_ashen_kingdom",
    slug: "the-ashen-kingdom",
    name: "The Ashen Kingdom",
    description:
      "A drowning empire of grey banners and quieter gods. Crowns rust faster than oaths break here.",
    bannerUrl:
      "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=1800&h=900&fit=crop",
    traits: [
      { icon: "🏰", label: "Medieval Kingdom" },
      { icon: "👑", label: "Noble Houses" },
      { icon: "⚔", label: "Political Intrigue" },
      { icon: "🐉", label: "Dragons" },
    ],
    openUniverse: true,
  },
  {
    id: "u_arcane_coast",
    slug: "the-arcane-coast",
    name: "The Arcane Coast",
    description:
      "Salt-bright harbors where every lantern is a spell and every tide hides a covenant older than the city.",
    bannerUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=900&fit=crop",
    traits: [
      { icon: "🌊", label: "Coastal Cities" },
      { icon: "🧙", label: "Ancient Magic" },
      { icon: "📜", label: "Lost Covenants" },
      { icon: "🏴", label: "Smuggler Lanes" },
    ],
    openUniverse: true,
  },
  {
    id: "u_nova_frontier",
    slug: "nova-frontier",
    name: "Nova Frontier",
    description:
      "The last lit edge of the colonies. Out here the company runs the air, and the stars keep their own counsel.",
    bannerUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1800&h=900&fit=crop",
    traits: [
      { icon: "🌌", label: "Space Colonies" },
      { icon: "🚀", label: "Deep Space" },
      { icon: "🤖", label: "Android Society" },
      { icon: "🛰", label: "Frontier Politics" },
    ],
    openUniverse: true,
  },
  {
    id: "u_iron_dominion",
    slug: "iron-dominion",
    name: "Iron Dominion",
    description:
      "An empire of smokestacks and signed treaties. Loyalty is a contract, and rebellion is a quarterly forecast.",
    bannerUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1800&h=900&fit=crop",
    traits: [
      { icon: "⚙", label: "Industrial Empire" },
      { icon: "🪖", label: "Standing Army" },
      { icon: "📈", label: "Corporate Crowns" },
      { icon: "🕯", label: "Underground Cells" },
    ],
  },
  {
    id: "u_hollow_forest",
    slug: "hollow-forest",
    name: "Hollow Forest",
    description:
      "A green country that remembers more than it tells. The trees are kind, the trails are not, the gods are listening.",
    bannerUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&h=900&fit=crop",
    traits: [
      { icon: "🌿", label: "Cozy Village" },
      { icon: "🦌", label: "Forest Spirits" },
      { icon: "🕯", label: "Old Folklore" },
      { icon: "🧛", label: "Gothic Edges" },
    ],
    openUniverse: true,
  },
  {
    id: "u_ivory_academy",
    slug: "the-ivory-academy",
    name: "The Ivory Academy",
    description:
      "Marble cloisters, late-night libraries, and a syllabus that occasionally bites. Genius here is never quite alone.",
    bannerUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&h=900&fit=crop",
    traits: [
      { icon: "🎓", label: "Magic Academy" },
      { icon: "📚", label: "Ancient Library" },
      { icon: "🕰", label: "Forbidden Studies" },
      { icon: "🪄", label: "Rival Houses" },
    ],
    openUniverse: true,
  },
];
