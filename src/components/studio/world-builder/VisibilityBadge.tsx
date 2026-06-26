import { Lock, EyeOff, ShieldAlert, Eye } from "lucide-react";
import type { VisibilityRule } from "@/mock/worldBuilder";
import { VISIBILITY_META } from "./shared";
import { cn } from "@/lib/utils";

interface Props {
  visibility: VisibilityRule;
  visibleFromChapter?: number;
  /** "chip" for cards, "pill" for the drawer. */
  variant?: "chip" | "pill";
  className?: string;
}

const ICONS = {
  public: Eye,
  "hidden-until-chapter": EyeOff,
  "spoiler-protected": ShieldAlert,
  "author-only": Lock,
} as const;

export function VisibilityBadge({
  visibility,
  visibleFromChapter,
  variant = "chip",
  className,
}: Props) {
  const meta = VISIBILITY_META[visibility];
  const Icon = ICONS[visibility];
  const tone = meta.tone;

  const toneClass =
    tone === "public"
      ? "text-muted-foreground"
      : tone === "soft"
        ? "text-foreground/80"
        : tone === "guarded"
          ? "text-brand-glow"
          : "text-foreground/70";

  const label =
    variant === "pill"
      ? meta.label +
        (visibility === "hidden-until-chapter" && visibleFromChapter
          ? ` · from Ch. ${visibleFromChapter}`
          : "")
      : meta.short;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em]",
        toneClass,
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}
