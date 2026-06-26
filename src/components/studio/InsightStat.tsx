import { cn } from "@/lib/utils";

export interface InsightStatProps {
  label: string;
  value: string;
  /** Subtle qualifier, e.g. "last 30 days". */
  hint?: string;
  className?: string;
}

/**
 * Studio v1.0 — Insight stat.
 *
 * Writing is the protagonist; numbers stay quiet. No charts, no deltas,
 * no celebratory colour. A serif value over a small uppercase label.
 */
export function InsightStat({ label, value, hint, className }: InsightStatProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-1/50 px-5 py-6 backdrop-blur-md",
        className,
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground/80">
        {label}
      </p>
      <p className="mt-3 font-display text-[2rem] leading-none tracking-tight text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-[0.7rem] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
