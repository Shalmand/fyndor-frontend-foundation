/**
 * Reading Experience — Chapter content model.
 *
 * The reader is built on a structured chapter block format rather than
 * raw HTML so that future systems can attach interactivity (Lore
 * references, annotations, inline media) without re-parsing prose.
 *
 * Inline "lore tokens" are the seam for the future Story World Drawer:
 * any text run can carry a `loreId` that a renderer can later wire to
 * an interactive reference. Today the renderer simply prints the text.
 */

export type ChapterInlineToken =
  | { kind: "text"; text: string }
  | { kind: "lore-ref"; text: string; loreId: string };

export type ChapterBlock =
  | { type: "paragraph"; tokens: ChapterInlineToken[] }
  | { type: "heading"; text: string }
  | { type: "scene-break" }
  | { type: "blockquote"; text: string; attribution?: string };

export interface ChapterAuthorNote {
  body: string;
}

export interface ChapterCommentPreview {
  id: string;
  author: string;
  avatarUrl?: string;
  body: string;
  likes: number;
}

export interface Chapter {
  id: string;
  storyId: string;
  index: number;
  title: string;
  /** Approximate reading time in minutes. */
  readingMinutes: number;
  /** Total word count, used for the reading-progress baseline. */
  words: number;
  blocks: ChapterBlock[];
  authorNote?: ChapterAuthorNote;
  comments: ChapterCommentPreview[];
  /** Optional next chapter pointer — null when at the end of the story. */
  nextChapterId: string | null;
}

/**
 * ReadingPreferences — extension points only.
 *
 * The interface is intentionally exhaustive so future settings UI can
 * be added without touching the renderer contract. Defaults are
 * defined in `ReadingPreferencesContext`.
 */
export interface ReadingPreferences {
  fontSize: "sm" | "md" | "lg" | "xl";
  fontFamily: "serif" | "sans" | "dyslexic";
  lineSpacing: "compact" | "comfortable" | "spacious";
  theme: "dark" | "sepia" | "light";
  readingWidth: "narrow" | "default" | "wide";
}
