import type { Franchise } from "@/types";

export const mockFranchises: Franchise[] = [
  {
    id: "f_long_hallow",
    slug: "the-long-hallow",
    name: "The Long Hallow",
    description: "A century-spanning gothic saga about a city that refuses to forget.",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=1600&fit=crop",
    storiesCount: 142,
  },
  {
    id: "f_mireborn",
    slug: "mireborn-cycle",
    name: "Mireborn Cycle",
    description: "Generation ships, terraformers, and the politics of belonging to nowhere.",
    coverUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=1600&fit=crop",
    storiesCount: 87,
  },
  {
    id: "f_silverquill",
    slug: "silverquill-academy",
    name: "Silverquill Academy",
    description: "A scholastic fantasy where ink is currency and grades change the weather.",
    coverUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=1600&fit=crop",
    storiesCount: 213,
  },
];
