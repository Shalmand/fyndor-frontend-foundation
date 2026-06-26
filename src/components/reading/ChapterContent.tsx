import { useLoreReference } from "./LoreReferenceContext";
import type { ChapterBlock, ChapterInlineToken } from "./types";

/**
 * ChapterContent — renders the structured block model.
 *
 * The renderer is deliberately quiet: paragraphs, scene breaks, the
 * occasional heading or blockquote. Inline lore tokens render as
 * normal text today; when a LoreReferenceProvider supplies a handler
 * they upgrade in place into interactive references.
 */
export function ChapterContent({ blocks }: { blocks: ChapterBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ChapterBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-display text-2xl font-medium leading-tight text-reader-fg">
          {block.text}
        </h2>
      );
    case "scene-break":
      return (
        <div
          className="flex items-center justify-center py-2 text-reader-muted"
          aria-hidden="true"
        >
          <span className="tracking-[0.6em] text-sm">⁂</span>
        </div>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-2 border-white/10 pl-6 italic text-reader-fg/90">
          <p>{block.text}</p>
          {block.attribution && (
            <footer className="mt-2 text-sm not-italic text-reader-muted">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "paragraph":
      return (
        <p>
          {block.tokens.map((tok, i) => (
            <InlineToken key={i} token={tok} />
          ))}
        </p>
      );
  }
}

function InlineToken({ token }: { token: ChapterInlineToken }) {
  const lore = useLoreReference();
  if (token.kind === "text") return <>{token.text}</>;

  // Lore reference — quiet underline when the future drawer is wired.
  if (!lore.enabled) return <>{token.text}</>;
  return (
    <button
      type="button"
      onClick={() => lore.onOpen(token.loreId)}
      className="cursor-pointer rounded-sm underline decoration-[color:var(--brand-glow)]/40 decoration-dotted underline-offset-[6px] transition-colors hover:decoration-[color:var(--brand-glow)]"
    >
      {token.text}
    </button>
  );
}

/**
 * Small helper to build paragraphs from plain strings.
 * Use `lore("word", "lore-id")` to embed a future reference.
 */
export function p(...tokens: (string | ChapterInlineToken)[]): ChapterBlock {
  return {
    type: "paragraph",
    tokens: tokens.map((t) =>
      typeof t === "string" ? { kind: "text", text: t } : t,
    ),
  };
}

export function lore(text: string, loreId: string): ChapterInlineToken {
  return { kind: "lore-ref", text, loreId };
}
