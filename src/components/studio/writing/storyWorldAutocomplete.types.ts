import type { LoreEntityKind } from "@/components/story-world/types";

/**
 * Lightweight entity shape consumed by the autocomplete.
 * Decoupled from the full LoreEntity so the autocomplete can work
 * with any future Story World entity type — only id / kind / name
 * (and optional aliases) are required.
 */
export interface AutocompleteEntity {
  id: string;
  kind: LoreEntityKind;
  name: string;
  /** Optional alternate spellings/nicknames also matched verbatim. */
  aliases?: string[];
}

export interface AutocompleteMatch {
  entity: AutocompleteEntity;
  /** The exact text in the document that matched (preserves casing). */
  matchedText: string;
  /** Absolute index of the match start inside the textarea value. */
  start: number;
  /** Absolute index of the match end (exclusive). */
  end: number;
}

export interface ConfirmedLink {
  id: string;
  name: string;
  kind: LoreEntityKind;
  /** "auto" when inserted by Auto-Link mode, "manual" otherwise. */
  source: "manual" | "auto" | "palette";
}
