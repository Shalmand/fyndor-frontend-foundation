import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Sparkles } from "lucide-react";
import type { LoreEntityKind } from "@/components/story-world/types";
import { cn } from "@/lib/utils";
import { getCaretCoords } from "./caretCoords";
import type {
  AutocompleteEntity,
  AutocompleteMatch,
  ConfirmedLink,
} from "./storyWorldAutocomplete.types";

/* ============================================================
 * Kind metadata (extensible — any future LoreEntityKind drops in here)
 * ============================================================ */

const KIND_META: Record<
  LoreEntityKind,
  { emoji: string; label: string }
> = {
  character: { emoji: "👤", label: "Character" },
  location: { emoji: "📍", label: "Location" },
  organization: { emoji: "🏛", label: "Organization" },
  item: { emoji: "🗡", label: "Item" },
  creature: { emoji: "🐉", label: "Creature" },
  glossary: { emoji: "📖", label: "Glossary" },
};

/* ============================================================
 * Public types
 * ============================================================ */

export interface StoryWorldAutocompleteProps {
  entities: AutocompleteEntity[];
  /** "default" shows suggestion popup; "auto" links instantly when a
   *  single exact match exists, popup only on multiple matches. */
  mode?: "default" | "auto";
  initialContent?: string;
  placeholder?: string;
  className?: string;
  textareaClassName?: string;
  onLinksChange?: (links: ConfirmedLink[]) => void;
}

/* ============================================================
 * Matching
 * ============================================================ */

interface IndexedAlias {
  entity: AutocompleteEntity;
  alias: string;
  aliasLower: string;
  wordCount: number;
}

function buildIndex(entities: AutocompleteEntity[]): IndexedAlias[] {
  const out: IndexedAlias[] = [];
  for (const e of entities) {
    const names = [e.name, ...(e.aliases ?? [])];
    for (const alias of names) {
      out.push({
        entity: e,
        alias,
        aliasLower: alias.toLowerCase(),
        wordCount: alias.trim().split(/\s+/).length,
      });
    }
  }
  return out;
}

/**
 * Find the tail-token at the caret and return matching entities
 * by exact (case-insensitive) name/alias. Considers the last
 * 1..maxWords tokens so multi-word names ("Eda Mercer") match.
 */
function findMatchesAtCaret(
  value: string,
  caret: number,
  index: IndexedAlias[],
): AutocompleteMatch[] {
  // Only trigger when caret is at a word boundary
  const charAtCaret = value[caret];
  if (charAtCaret && /[A-Za-z0-9'\u00C0-\u017F]/.test(charAtCaret)) {
    // Still mid-word — don't suggest until they leave the word.
    return [];
  }

  // Walk backward to collect up to 4 words behind the caret.
  let i = caret - 1;
  // Skip trailing whitespace/punctuation immediately before caret.
  // (We allow ONE trailing non-word char such as space or period.)
  while (
    i >= 0 &&
    /\s/.test(value[i]) &&
    caret - i <= 1
  ) {
    i--;
  }
  if (i < 0) return [];

  // Collect words.
  const words: Array<{ text: string; start: number; end: number }> = [];
  let j = i;
  while (j >= 0 && words.length < 4) {
    // skip whitespace
    while (j >= 0 && /\s/.test(value[j])) j--;
    if (j < 0) break;
    const wordEnd = j + 1;
    while (j >= 0 && /[A-Za-z0-9'\u00C0-\u017F]/.test(value[j])) j--;
    const wordStart = j + 1;
    if (wordStart === wordEnd) break;
    words.unshift({
      text: value.slice(wordStart, wordEnd),
      start: wordStart,
      end: wordEnd,
    });
  }
  if (words.length === 0) return [];

  // Build candidate phrases of length 1..N from the tail.
  const matches = new Map<string, AutocompleteMatch>();
  for (let len = 1; len <= words.length; len++) {
    const slice = words.slice(words.length - len);
    const phrase = slice.map((w) => w.text).join(" ");
    const phraseLower = phrase.toLowerCase();
    const start = slice[0].start;
    const end = slice[slice.length - 1].end;
    for (const idx of index) {
      if (idx.aliasLower === phraseLower && !matches.has(idx.entity.id)) {
        matches.set(idx.entity.id, {
          entity: idx.entity,
          matchedText: phrase,
          start,
          end,
        });
      }
    }
  }

  return Array.from(matches.values());
}

/* ============================================================
 * Component
 * ============================================================ */

export function StoryWorldAutocomplete({
  entities,
  mode = "default",
  initialContent = "",
  placeholder = "Begin where the chapter wants to begin…",
  className,
  textareaClassName,
  onLinksChange,
}: StoryWorldAutocompleteProps) {
  const [value, setValue] = useState(initialContent);
  const [links, setLinks] = useState<ConfirmedLink[]>([]);
  const [matches, setMatches] = useState<AutocompleteMatch[]>([]);
  const [selected, setSelected] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [dismissed, setDismissed] = useState<{ key: string } | null>(null);
  const [autoLinkedToast, setAutoLinkedToast] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const index = useMemo(() => buildIndex(entities), [entities]);

  const pushLink = useCallback(
    (match: AutocompleteMatch, source: ConfirmedLink["source"]) => {
      setLinks((prev) => [
        ...prev,
        {
          id: match.entity.id,
          name: match.matchedText,
          kind: match.entity.kind,
          source,
        },
      ]);
      onLinksChange?.([
        ...links,
        {
          id: match.entity.id,
          name: match.matchedText,
          kind: match.entity.kind,
          source,
        },
      ]);
    },
    [links, onLinksChange],
  );

  /** Re-evaluate matches whenever the value or caret position changes. */
  const evaluate = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const caret = el.selectionStart ?? value.length;
    const found = findMatchesAtCaret(value, caret, index);

    // Key dismissal by phrase+position so a new edit re-opens the popup.
    if (found.length > 0) {
      const key = `${found[0].start}-${found[0].end}-${found
        .map((m) => m.entity.id)
        .join(",")}`;
      if (dismissed && dismissed.key === key) {
        setMatches([]);
        setCoords(null);
        return;
      }

      // Auto-Link mode: exactly one match → insert silently, skip popup.
      if (mode === "auto" && found.length === 1) {
        pushLink(found[0], "auto");
        setMatches([]);
        setCoords(null);
        setAutoLinkedToast(found[0].matchedText);
        window.setTimeout(() => setAutoLinkedToast(null), 1800);
        return;
      }

      setMatches(found);
      setSelected(0);
      const c = getCaretCoords(el, caret);
      setCoords({ top: c.top + c.height + 6, left: c.left });
    } else {
      setMatches([]);
      setCoords(null);
    }
  }, [value, index, dismissed, mode, pushLink]);

  useEffect(() => {
    evaluate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /** Manual link from contextual palette — uses the current text selection. */
  const linkSelection = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (end <= start) return;
    const text = value.slice(start, end);
    const lower = text.trim().toLowerCase();
    const hit = index.find((i) => i.aliasLower === lower);
    if (!hit) return;
    pushLink(
      {
        entity: hit.entity,
        matchedText: text.trim(),
        start,
        end,
      },
      "palette",
    );
    setAutoLinkedToast(text.trim());
    window.setTimeout(() => setAutoLinkedToast(null), 1800);
  }, [value, index, pushLink]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (matches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const match = matches[selected];
      if (match) pushLink(match, "manual");
      setMatches([]);
      setCoords(null);
    } else if (e.key === "Escape") {
      e.preventDefault();
      const key = `${matches[0].start}-${matches[0].end}-${matches
        .map((m) => m.entity.id)
        .join(",")}`;
      setDismissed({ key });
      setMatches([]);
      setCoords(null);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setDismissed(null);
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onClick={evaluate}
        onKeyUp={(e) => {
          // Re-evaluate on caret-only movement.
          if (
            ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
          ) {
            evaluate();
          }
        }}
        placeholder={placeholder}
        spellCheck
        className={cn(
          "block w-full resize-none bg-transparent font-reading text-[1.0625rem] leading-[1.85] text-reader-fg outline-none",
          "placeholder:font-display placeholder:italic placeholder:text-muted-foreground/50",
          "selection:bg-[color-mix(in_oklab,var(--brand)_35%,transparent)]",
          textareaClassName,
        )}
        style={{ minHeight: "260px" }}
      />

      {/* Suggestion popup */}
      {coords && matches.length > 0 && (
        <SuggestionPopup
          style={{ top: coords.top, left: coords.left }}
          matches={matches}
          selected={selected}
          onPick={(i) => {
            const m = matches[i];
            if (m) pushLink(m, "manual");
            setMatches([]);
            setCoords(null);
          }}
          onHover={(i) => setSelected(i)}
        />
      )}

      {/* Auto-link whisper */}
      {autoLinkedToast && (
        <div
          aria-live="polite"
          className="pointer-events-none absolute -bottom-7 right-0 inline-flex items-center gap-2 rounded-full bg-surface-2/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-brand backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3" aria-hidden />
          Linked · {autoLinkedToast}
        </div>
      )}

      {/* Confirmed links strip */}
      {links.length > 0 && (
        <div className="mt-8">
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70">
            Story World references in this draft
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {links.map((l, idx) => (
              <li
                key={`${l.id}-${idx}`}
                className="inline-flex items-center gap-2 rounded-full bg-surface-2/80 px-3 py-1.5 text-xs text-foreground/85"
              >
                <span aria-hidden>{KIND_META[l.kind].emoji}</span>
                <span className="font-medium">{l.name}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground/70">
                  {KIND_META[l.kind].label}
                </span>
                {l.source !== "manual" && (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.22em] text-brand">
                    {l.source === "auto" ? "Auto" : "Palette"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Manual link affordance (contextual palette stand-in) */}
      <div className="mt-4 flex items-center justify-end gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground/70">
        <span>Selected text?</span>
        <button
          type="button"
          onClick={linkSelection}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface-2/70 px-3 py-1.5 text-foreground/85 transition-colors hover:bg-surface-2"
        >
          <Sparkles className="h-3 w-3" aria-hidden /> Link to Story World
        </button>
      </div>
    </div>
  );
}

/* ============================================================
 * Popup
 * ============================================================ */

function SuggestionPopup({
  style,
  matches,
  selected,
  onPick,
  onHover,
}: {
  style: React.CSSProperties;
  matches: AutocompleteMatch[];
  selected: number;
  onPick: (i: number) => void;
  onHover: (i: number) => void;
}) {
  const single = matches.length === 1;
  return (
    <div
      role="listbox"
      aria-label="Story World suggestions"
      style={style}
      className={cn(
        "absolute z-30 w-[260px] overflow-hidden rounded-xl bg-surface-2/95 shadow-[0_24px_60px_-24px_oklch(0_0_0_/_0.65)] ring-1 ring-foreground/5 backdrop-blur-xl animate-fade-in",
      )}
    >
      <div className="flex items-center justify-between px-3 pt-2.5 text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground/70">
        <span className="inline-flex items-center gap-1.5 text-brand">
          <Sparkles className="h-3 w-3" aria-hidden />
          Story World
        </span>
        <span>{single ? "1 match" : `${matches.length} matches`}</span>
      </div>
      <ul className="mt-1 max-h-[220px] overflow-y-auto px-1.5 py-1.5">
        {matches.map((m, i) => {
          const meta = KIND_META[m.entity.kind];
          const active = i === selected;
          return (
            <li key={m.entity.id}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onMouseEnter={() => onHover(i)}
                onClick={() => onPick(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                  active
                    ? "bg-brand/15 text-foreground"
                    : "text-foreground/85 hover:bg-foreground/5",
                )}
              >
                <span aria-hidden className="text-base">
                  {meta.emoji}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {m.entity.name}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground/70">
                    {meta.label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between gap-3 border-t border-foreground/5 px-3 py-2 text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground/70">
        <span>
          <Kbd>TAB</Kbd> Link
        </span>
        <span>
          <Kbd>↑↓</Kbd> Navigate
        </span>
        <span>
          <Kbd>ESC</Kbd> Ignore
        </span>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1 rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[0.55rem] text-foreground/80">
      {children}
    </kbd>
  );
}
