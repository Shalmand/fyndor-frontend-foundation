import { createElement, type ComponentType } from "react";
import { cn } from "@/lib/utils";

export interface QuickActionCardProps {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  /** Visually elevate one action (e.g. "New Story"). */
  primary?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Studio v1.0 — Quick Action card.
 *
 * One-click entry points to the most frequent author tasks.
 * Quiet by default; the optional `primary` variant carries the brand
 * accent as a soft tinted surface — never as a heavy button.
 */
export function QuickActionCard({
  label,
  description,
  icon,
  primary,
  onClick,
  className,
}: QuickActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group/qa relative flex h-full flex-col items-start gap-4 rounded-2xl p-5 text-left",
        "bg-surface-1/60 backdrop-blur-md transition-all duration-[var(--transition-base)]",
        "hover:bg-surface-2/70 hover:-translate-y-[1px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
        primary && "bg-[color-mix(in_oklab,var(--brand)_14%,var(--surface-1))]",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          primary
            ? "bg-brand/25 text-white"
            : "bg-surface-2/80 text-foreground/85",
        )}
        aria-hidden
      >
        {createElement(icon, { className: "size-[1.15rem]" })}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
