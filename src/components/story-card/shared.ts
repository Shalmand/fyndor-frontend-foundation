import type { Story, StoryStatus } from "@/types";
import type { StoryCardState } from "./types";

export function formatReads(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(n);
}

export function statusLabel(s: StoryStatus): string {
  switch (s) {
    case "ongoing": return "Ongoing";
    case "completed": return "Completed";
    case "hiatus": return "On hiatus";
    case "draft": return "Draft";
  }
}

/** Avg reading time in minutes assuming 220 wpm, then humanised. */
export function readingTime(words: number): string {
  const minutes = Math.round(words / 220);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours}h`;
}

export function kindLabel(s: Story): string {
  return s.kind === "original" ? "Original" : "Fanfiction";
}

/**
 * Map demo `state` prop into class fragments. Returning empty when undefined
 * means real native :hover / :active / :focus-visible take over.
 */
export function demoStateClasses(state: StoryCardState | undefined): {
  group: string;
  ring: string;
  press: string;
} {
  switch (state) {
    case "hover":
      return { group: "is-hover", ring: "", press: "" };
    case "pressed":
      return {
        group: "is-hover",
        ring: "",
        press: "scale-[0.985] brightness-95",
      };
    case "focus":
      return {
        group: "",
        ring:
          "shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_color-mix(in_oklab,var(--brand)_70%,transparent)]",
        press: "",
      };
    default:
      return { group: "", ring: "", press: "" };
  }
}
