import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  StoryWorldAutocomplete,
  type AutocompleteEntity,
} from "@/components/studio/writing";

export const Route = createFileRoute("/showcase/story-world-autocomplete")({
  head: () => ({
    meta: [
      { title: "Story World Autocomplete — Fyndor Studio" },
      {
        name: "description",
        content:
          "Inline Story World linking inside the Fyndor Writing Session. Small, fast, never intrusive.",
      },
    ],
  }),
  component: Showcase,
});

/* ============================================================
 * Mock Story World — kept local so the showcase demonstrates the
 * exact brief verbatim ("Abel entered Avallon." with an extra
 * "Avalon" character for the multi-match example).
 * ============================================================ */

const entities: AutocompleteEntity[] = [
  { id: "char-abel", kind: "character", name: "Abel" },
  { id: "char-avalon", kind: "character", name: "Avalon" },
  { id: "loc-avallon", kind: "location", name: "Avallon" },
  { id: "loc-silverquill", kind: "location", name: "Silverquill Atelier" },
  { id: "char-eda", kind: "character", name: "Eda Mercer", aliases: ["Eda"] },
  { id: "org-guild", kind: "organization", name: "Cartographers' Guild" },
  { id: "item-map", kind: "item", name: "Western Coast Draft" },
  { id: "creature-hound", kind: "creature", name: "Hollow Hound" },
  { id: "concept-mastery", kind: "glossary", name: "Master of Silverquill" },
];

const singleMatchSeed = `Abel paused at the gate. He could smell the rain on the stones, and beyond them, the long quiet of Avallon `;

const multiMatchSeed = `In the courtyard, Eda waited for word from Avalon `;

const autoLinkSeed = `Eda Mercer stepped into the Silverquill Atelier `;

function Showcase() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="px-6 pt-12 sm:px-10">
        <div className="mx-auto max-w-[var(--container-wide)]">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-brand">
            NDS · Studio
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Story World Autocomplete v1.0
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            The editor recognises existing Story World entities and offers fast
            linking without ever blocking writing. Small, fast, elegant — never
            intrusive.
          </p>
        </div>
      </header>

      <section className="mx-auto mt-14 grid max-w-[var(--container-wide)] gap-10 px-6 sm:px-10">
        <Scenario
          eyebrow="01 · Default · Single match"
          title="The author types a name, the popup confirms it."
          description="Press TAB or ENTER to link. ESC to ignore. Try typing the next sentence — finish a word with a space, and watch the suggestion appear."
        >
          <StoryWorldAutocomplete
            entities={entities}
            mode="default"
            initialContent={singleMatchSeed}
          />
        </Scenario>

        <Scenario
          eyebrow="02 · Default · Multiple matches"
          title="When more than one entity matches, the author chooses."
          description='Type "Avalon" or "Avallon" — both a Character and a Location share the name. Use ↑ ↓ to navigate, ENTER or TAB to confirm.'
        >
          <StoryWorldAutocomplete
            entities={entities}
            mode="default"
            initialContent={multiMatchSeed}
          />
        </Scenario>

        <Scenario
          eyebrow="03 · Auto-Link mode"
          title="One exact match links itself. The author never breaks flow."
          description='Type any unambiguous name — "Eda Mercer", "Silverquill Atelier", "Hollow Hound" — and it links silently. A brief whisper confirms the link. Ambiguous names still open the popup.'
        >
          <StoryWorldAutocomplete
            entities={entities}
            mode="auto"
            initialContent={autoLinkSeed}
          />
        </Scenario>

        <Scenario
          eyebrow="04 · Manual · From the writing palette"
          title="Select any phrase and link it explicitly."
          description='Select a Story World name in the text (e.g. select "Eda Mercer"), then press "Link to Story World". This remains available alongside autocomplete for cases where the author wants explicit control.'
        >
          <StoryWorldAutocomplete
            entities={entities}
            mode="default"
            initialContent={`Eda Mercer climbed the worn stair of the Silverquill Atelier. Select any of those names and link them by hand.`}
          />
        </Scenario>

        <Architecture />
      </section>
    </div>
  );
}

function Scenario({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [key, setKey] = useState(0);
  return (
    <article className="rounded-3xl bg-surface-1/60 p-6 sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-brand">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-surface-2/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <div
        key={key}
        className="mt-8 rounded-2xl bg-surface-0/80 p-6 sm:p-10"
      >
        {children}
      </div>
    </article>
  );
}

function Architecture() {
  const points = [
    "Single AutocompleteEntity contract: { id, kind, name, aliases? } — any future LoreEntityKind drops in without new UI.",
    "Matching walks 1..N words back from the caret so multi-word names (\"Eda Mercer\") and aliases are detected without extra config.",
    "Suggestion popup uses caret-anchored coordinates measured by a mirror <div>, so it follows the prose instead of floating over it.",
    "TAB / ENTER confirm, ↑ ↓ navigate, ESC dismisses for the current token — re-opens automatically when the surrounding text changes.",
    "Auto-Link mode is a single prop today; the future setting in Story Studio toggles it per author.",
    "Manual linking from the contextual palette continues to work in parallel — autocomplete never removes existing affordances.",
  ];
  return (
    <div className="grid gap-6 rounded-3xl bg-surface-1/60 p-8 sm:p-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-brand">
          Architecture
        </p>
        <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground">
          Built to disappear behind the prose.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The autocomplete is a thin layer over the Writing Canvas. It must
          never block the page, never demand attention, and never assume what
          the author meant.
        </p>
      </div>
      <ul className="space-y-3 text-sm text-foreground/85">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand"
            />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
