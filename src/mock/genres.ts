import type { Genre } from "@/types";

export const mockGenres: Genre[] = [
  { id: "g_fantasy", slug: "fantasy", name: "Fantasy", description: "Magic, myth and impossible kingdoms.", accentColor: "oklch(0.62 0.24 295)" },
  { id: "g_scifi", slug: "science-fiction", name: "Science Fiction", description: "Tomorrow imagined in sharp detail.", accentColor: "oklch(0.7 0.18 220)" },
  { id: "g_romance", slug: "romance", name: "Romance", description: "Longing, devotion and the spaces between.", accentColor: "oklch(0.7 0.22 350)" },
  { id: "g_mystery", slug: "mystery", name: "Mystery & Thriller", description: "Slow-burn tension and impossible cases.", accentColor: "oklch(0.55 0.1 260)" },
  { id: "g_horror", slug: "horror", name: "Horror", description: "Whispers in the dark you can't unhear.", accentColor: "oklch(0.45 0.18 25)" },
  { id: "g_litfic", slug: "literary", name: "Literary", description: "Prose that lingers like an aftertaste.", accentColor: "oklch(0.7 0.08 80)" },
  { id: "g_historical", slug: "historical", name: "Historical", description: "Borrowed time, rendered intimately.", accentColor: "oklch(0.62 0.12 60)" },
  { id: "g_adventure", slug: "adventure", name: "Adventure", description: "Maps, oaths and far horizons.", accentColor: "oklch(0.7 0.16 140)" },
];
