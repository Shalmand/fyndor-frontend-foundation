import { createElement, isValidElement } from "react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NDS-002 — Section v1.0
 *
 * The official content-block primitive for Fyndor.
 *
 * Quiet, premium header. The title is the protagonist; subtitle and action
 * are deliberately subdued. The body slot stays empty here — future
 * Carousel / Grid / Table primitives slot into `children`.
 *
 * Separation between sections is achieved through whitespace, never lines.
 */

export type SectionTone = "editorial" | "utility";

export interface SectionAction {
  /** Visible label, e.g. "View all". */
  label: string;
  /** Internal route. Mutually exclusive with `href` and `onClick`. */
  to?: string;
  /** External href. Mutually exclusive with `to` and `onClick`. */
  href?: string;
  /** Inline handler. Mutually exclusive with `to` and `href`. */
  onClick?: () => void;
  /** Optional aria-label override for screen readers. */
  ariaLabel?: string;
}

export interface SectionProps {
  /** Required. Primary heading of the block. */
  title: string;
  /** Secondary, supportive copy below the title. */
  subtitle?: string;
  /** Optional terminal action ("View all", "See more", …). */
  action?: SectionAction;
  /**
   * Optional leading icon / badge node — kept small and quiet, never
   * competing with the title. Pass a lucide icon component OR any node.
   */
  icon?: ComponentType<{ className?: string }> | ReactNode;
  /**
   * Tone of voice for the title.
   *  - `editorial` (default): serif display type. Use on Home, Explore,
   *    Library, Universe, Franchise, Collections, Author profiles.
   *  - `utility`: sans-serif interface type. Use in Studio, Settings,
   *    Analytics, Admin.
   */
  tone?: SectionTone;
  /** Heading level for semantic correctness. Defaults to `h2`. */
  as?: "h1" | "h2" | "h3";
  /** Body slot — Carousel, Grid, Table, etc. Optional. */
  children?: ReactNode;
  className?: string;
  /** Stable id for in-page anchors. */
  id?: string;
}

function SectionIcon({ icon }: { icon: NonNullable<SectionProps["icon"]> }) {
  // Pre-rendered node (e.g. <Badge />, custom JSX) — render quietly.
  if (isValidElement(icon)) {
    return (
      <span aria-hidden className="shrink-0">
        {icon}
      </span>
    );
  }
  // Component reference: function, forwardRef (lucide), or memo.
  return (
    <span
      aria-hidden
      className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2/60 text-muted-foreground"
    >
      {createElement(icon as ComponentType<{ className?: string }>, {
        className: "size-4",
      })}
    </span>
  );
}

function ActionEl({ action }: { action: SectionAction }) {
  const label = action.label;
  const className = cn(
    "group/action inline-flex items-center gap-1.5 text-sm text-muted-foreground",
    "transition-colors duration-[var(--transition-base)] hover:text-foreground",
    "focus-visible:outline-none focus-visible:text-foreground",
  );
  const inner = (
    <>
      <span>{label}</span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-[var(--transition-base)] group-hover/action:translate-x-0.5"
      />
    </>
  );
  const aria = action.ariaLabel ?? label;

  if (action.to) {
    return (
      <Link to={action.to} aria-label={aria} className={className}>
        {inner}
      </Link>
    );
  }
  if (action.href) {
    return (
      <a
        href={action.href}
        aria-label={aria}
        className={className}
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={action.onClick} aria-label={aria} className={className}>
      {inner}
    </button>
  );
}

export function Section({
  title,
  subtitle,
  action,
  icon,
  tone = "editorial",
  as: HeadingTag = "h2",
  children,
  className,
  id,
}: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("w-full py-10 md:py-14", className)}
    >
      <header
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-6 gap-y-3",
          // On narrow viewports, let the action wrap underneath the title block.
          "max-sm:grid-cols-1 max-sm:items-start",
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          {icon ? <SectionIcon icon={icon} /> : null}
          <div className="min-w-0">
            <HeadingTag
              id={headingId}
              className={cn(
                "text-foreground",
                tone === "editorial"
                  ? "font-display text-[1.65rem] leading-[1.15] tracking-tight md:text-[2rem]"
                  : "text-lg font-medium tracking-tight md:text-xl",
              )}
            >
              {title}
            </HeadingTag>
            {subtitle ? (
              <p
                className={cn(
                  "mt-2 max-w-2xl text-sm text-muted-foreground",
                  tone === "editorial" ? "md:text-[0.95rem]" : "",
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {action ? (
          <div className="shrink-0 self-end pb-1 max-sm:self-start max-sm:pb-0">
            <ActionEl action={action} />
          </div>
        ) : null}
      </header>

      {children ? <div className="mt-7 md:mt-9">{children}</div> : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export interface SectionSkeletonProps {
  /** Match the tone of the eventual real section for a calm swap. */
  tone?: SectionTone;
  /** Show a skeleton for the action slot. */
  withAction?: boolean;
  /** Show a skeleton for the subtitle. */
  withSubtitle?: boolean;
  className?: string;
  /** Optional skeleton body content. */
  children?: ReactNode;
}

export function SectionSkeleton({
  tone = "editorial",
  withAction = false,
  withSubtitle = false,
  className,
  children,
}: SectionSkeletonProps) {
  return (
    <section
      aria-busy
      aria-live="polite"
      className={cn("w-full py-10 md:py-14", className)}
    >
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-6 gap-y-3 max-sm:grid-cols-1">
        <div className="min-w-0 space-y-3">
          <div
            className={cn(
              "animate-pulse rounded bg-surface-2",
              tone === "editorial" ? "h-7 w-64 md:h-9 md:w-80" : "h-5 w-48 md:h-6",
            )}
          />
          {withSubtitle ? (
            <div className="h-3.5 w-72 animate-pulse rounded bg-surface-2/80" />
          ) : null}
        </div>
        {withAction ? (
          <div className="h-3.5 w-20 animate-pulse rounded bg-surface-2/80 self-end pb-1 max-sm:self-start max-sm:pb-0" />
        ) : null}
      </header>
      {children ? <div className="mt-7 md:mt-9">{children}</div> : null}
    </section>
  );
}

export interface SectionEmptyProps {
  /** Short, calm message. Avoid exclamations. */
  message: string;
  /** Optional supporting line. */
  hint?: string;
  /** Optional inline call-to-action. */
  action?: SectionAction;
  className?: string;
}

/**
 * Empty-state body for a Section. Render INSIDE a Section as its child.
 * Stays quiet — no borders, no icons by default.
 */
export function SectionEmpty({ message, hint, action, className }: SectionEmptyProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-1/40 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="text-base text-foreground/90">{message}</p>
      {hint ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{hint}</p>
      ) : null}
      {action ? (
        <div className="mt-5 inline-flex">
          <ActionEl action={action} />
        </div>
      ) : null}
    </div>
  );
}
