import {
  PenLine,
  Clock,
  CheckCircle2,
  CalendarClock,
  Sparkles,
  AlertCircle,
  Archive,
  type LucideIcon,
} from "lucide-react";
import type { ChapterStatus, StoryStatus } from "@/mock/chapterManager";

export interface StatusMeta {
  label: string;
  short: string;
  icon: LucideIcon;
  /** Visual tone of the status pill. Resolved via Tailwind classes below. */
  tone: "neutral" | "soft" | "ready" | "scheduled" | "live" | "warn" | "muted";
}

export const CHAPTER_STATUS_META: Record<ChapterStatus, StatusMeta> = {
  draft: { label: "Draft", short: "Draft", icon: PenLine, tone: "neutral" },
  "in-progress": { label: "In Progress", short: "In progress", icon: Clock, tone: "soft" },
  ready: { label: "Ready to Publish", short: "Ready", icon: CheckCircle2, tone: "ready" },
  scheduled: { label: "Scheduled", short: "Scheduled", icon: CalendarClock, tone: "scheduled" },
  published: { label: "Published", short: "Published", icon: Sparkles, tone: "live" },
  "needs-revision": { label: "Needs Revision", short: "Revise", icon: AlertCircle, tone: "warn" },
  archived: { label: "Archived", short: "Archived", icon: Archive, tone: "muted" },
};

export const STATUS_TONE_CLASS: Record<StatusMeta["tone"], string> = {
  neutral: "bg-foreground/[0.06] text-foreground/85",
  soft: "bg-foreground/[0.04] text-foreground/80",
  ready: "bg-[color-mix(in_oklab,var(--brand)_18%,transparent)] text-foreground",
  scheduled: "bg-foreground/[0.05] text-foreground/85",
  live: "bg-[color-mix(in_oklab,var(--brand)_24%,transparent)] text-foreground",
  warn: "bg-amber-500/15 text-amber-200/90",
  muted: "bg-foreground/[0.03] text-muted-foreground",
};

export const STORY_STATUS_LABEL: Record<StoryStatus, string> = {
  draft: "Draft",
  ongoing: "Ongoing",
  completed: "Completed",
  paused: "Paused",
};

export const KIND_EMOJI: Record<string, string> = {
  character: "👤",
  location: "📍",
  organization: "🏰",
  item: "✦",
  creature: "🐾",
  glossary: "📖",
};

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const abs = Math.abs(diff);
  const future = diff < 0;
  const m = Math.floor(abs / 60_000);
  const prefix = (s: string) => (future ? `in ${s}` : `${s} ago`);
  if (m < 1) return future ? "in a moment" : "just now";
  if (m < 60) return prefix(`${m} min`);
  const h = Math.floor(m / 60);
  if (h < 24) return prefix(`${h} hr`);
  const d = Math.floor(h / 24);
  if (d < 7) return prefix(`${d} day${d === 1 ? "" : "s"}`);
  const w = Math.floor(d / 7);
  if (w < 5) return prefix(`${w} wk`);
  const mo = Math.floor(d / 30);
  return prefix(`${mo} mo`);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatWords(n: number): string {
  return n.toLocaleString("en-US");
}
