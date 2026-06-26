import { ArrowRight, Feather } from "lucide-react";
import type { ChapterRecord } from "@/mock/chapterManager";
import { formatRelative, formatWords } from "./shared";

interface Props {
  chapter: ChapterRecord | null;
  onContinue?: (id: string) => void;
}

export function ContinueWritingShortcut({ chapter, onContinue }: Props) {
  if (!chapter) return null;

  return (
    <section
      aria-label="Continue writing"
      className="group relative overflow-hidden rounded-3xl bg-surface-1/70 p-6 md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 90% at 85% 30%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-brand">
            <Feather className="h-3.5 w-3.5" /> Continue writing
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight md:text-3xl">
            Chapter {chapter.number} — {chapter.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-muted-foreground">
            <span>Last edited {formatRelative(chapter.updatedAt)}</span>
            <span aria-hidden>·</span>
            <span>{formatWords(chapter.words)} words</span>
            <span aria-hidden>·</span>
            <span className="text-foreground/70">Autosaved</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onContinue?.(chapter.id)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-[filter] hover:brightness-110"
          style={{ backgroundImage: "var(--gradient-brand-soft)" }}
        >
          Continue writing
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
