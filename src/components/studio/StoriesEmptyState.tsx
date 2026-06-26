import { PenLine, Feather } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StoriesEmptyStateProps {
  onCreate?: () => void;
  className?: string;
}

/**
 * Studio v1.0 — Empty stories state.
 *
 * Not a dead end. A quiet, hand-drawn invitation to begin.
 * The illustration is a soft SVG feather over a faint paper field —
 * no stock graphics, no clip-art.
 */
export function StoriesEmptyState({ onCreate, className }: StoriesEmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-surface-1/50 px-6 py-16 text-center backdrop-blur-md",
        className,
      )}
    >
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-md">
        <div
          aria-hidden
          className="mx-auto grid size-20 place-items-center rounded-2xl bg-surface-2/80"
        >
          <Feather className="size-8 text-brand" strokeWidth={1.4} />
        </div>

        <h3 className="mt-7 font-display text-[1.75rem] leading-tight tracking-tight text-foreground">
          A blank page is a beginning.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          You haven't started a story yet. Open a fresh manuscript and write
          the first line — the rest will follow.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCreate}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-primary-foreground",
              "transition-all duration-[var(--transition-base)] hover:brightness-110",
              "shadow-[0_15px_40px_-15px_color-mix(in_oklab,var(--brand)_60%,transparent)]",
            )}
            style={{ backgroundImage: "var(--gradient-brand-soft)" }}
          >
            <PenLine className="size-4" aria-hidden />
            Create your first story
          </button>
        </div>
      </div>
    </div>
  );
}
