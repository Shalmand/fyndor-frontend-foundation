import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { WritingSession, type AutosaveState } from "@/components/studio/writing";

export const Route = createFileRoute("/showcase/writing-session")({
  head: () => ({
    meta: [
      { title: "Writing Session — Fyndor Studio" },
      {
        name: "description",
        content:
          "The Fyndor Writing Session — a focused, distraction-free environment for authors.",
      },
    ],
  }),
  component: WritingSessionShowcase,
});

const sampleChapter = `The fire took the western coast first — which was, as far as Eda was concerned, the only part of the map that had ever mattered.

She watched the parchment curl from the edges in, the way a leaf gives up in autumn. The ink she had ground herself, from oak galls and rainwater and the patience of three winters, climbed into the air as black smoke and was gone. There was, she thought distantly, a kind of mercy in that.

Behind her, the door of the Silverquill Atelier was still open to the street. No one had come running. No one ever did, in this district, at this hour. The bell-towers were tolling Second Watch and the only sound louder than the fire was her own breath, very slow, very even, the way her mother had taught her to breathe when she was about to lie to a stranger.

The map finished burning at the same moment the last bell finished ringing. Eda took this as a sign, although she did not yet know of what.

By the time the city's grey morning seeped under the shutters, she had swept the ashes into a tin and labelled the tin in her neat, contemptuous hand: WESTERN COAST, FIRST DRAFT. She put the tin on the shelf where the map had lived, and it looked, she decided, exactly as wrong as it should.`;

function WritingSessionShowcase() {
  const [focus, setFocus] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [forcedAutosave, setForcedAutosave] = useState<AutosaveState | "auto">(
    "auto",
  );

  const autosaveProp =
    forcedAutosave === "auto" ? undefined : forcedAutosave;
  const lastSavedProp =
    forcedAutosave === "saved"
      ? new Date(Date.now() - 2 * 60_000).toISOString()
      : undefined;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-0 px-6 pt-10 sm:px-10">
        <div className="mx-auto max-w-[var(--container-wide)]">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-brand">
            NDS · Studio
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Writing Session v1.0
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A focused writing environment. The interface disappears whenever it
            can. Authors sit in front of a blank page — not in front of
            software.
          </p>
        </div>
      </header>

      <section className="mx-auto mt-12 max-w-[var(--container-wide)] px-6 sm:px-10">
        <DemoBar
          focus={focus}
          onToggleFocus={() => setFocus((v) => !v)}
          showSelection={showSelection}
          onToggleSelection={() => setShowSelection((v) => !v)}
          autosave={forcedAutosave}
          onAutosaveChange={setForcedAutosave}
        />

        <div className="mt-8">
          <WritingSession
            storyTitle="Ash & Atlas"
            chapterTitle="The Burned Map"
            initialContent={sampleChapter}
            focusMode={focus}
            onFocusModeChange={setFocus}
            demoSelection={showSelection}
            autosaveState={autosaveProp}
            lastSavedAt={lastSavedProp}
          />
        </div>

        <Notes />
      </section>

      <div className="h-32" />
    </div>
  );
}

interface DemoBarProps {
  focus: boolean;
  onToggleFocus: () => void;
  showSelection: boolean;
  onToggleSelection: () => void;
  autosave: AutosaveState | "auto";
  onAutosaveChange: (v: AutosaveState | "auto") => void;
}

function DemoBar({
  focus,
  onToggleFocus,
  showSelection,
  onToggleSelection,
  autosave,
  onAutosaveChange,
}: DemoBarProps) {
  const autosaveOptions: { id: AutosaveState | "auto"; label: string }[] = [
    { id: "auto", label: "Live" },
    { id: "saving", label: "Saving…" },
    { id: "saved", label: "Saved 2 min ago" },
    { id: "offline", label: "Offline" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface-1/70 p-4 text-xs backdrop-blur-md">
      <span className="px-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
        Showcase controls
      </span>
      <Toggle active={focus} onClick={onToggleFocus}>
        Focus mode
      </Toggle>
      <Toggle active={showSelection} onClick={onToggleSelection}>
        Contextual popover
      </Toggle>
      <span className="ml-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        Autosave
      </span>
      <div className="inline-flex flex-wrap gap-1 rounded-full bg-surface-2/70 p-1">
        {autosaveOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onAutosaveChange(opt.id)}
            className={
              "rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors " +
              (autosave === opt.id
                ? "bg-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors " +
        (active
          ? "bg-brand text-primary-foreground"
          : "bg-surface-2/70 text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

function Notes() {
  const points = [
    "Header carries only what the author needs to orient themselves: story, chapter, autosave, exit.",
    "The floating feather opens the full palette — formatting, inserts, story world, publishing — then closes itself.",
    "Focus mode strips everything except the page itself. The autosave whispers from the bottom.",
    "Statistics live behind a quiet 'Stats' chip. Writing is never measured at the author by default.",
    "A contextual popover demonstrates what a selection action will feel like — visual only for this sprint.",
  ];
  return (
    <div className="mt-16 grid gap-6 rounded-3xl bg-surface-1/60 p-8 sm:p-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-brand">
          Principles
        </p>
        <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground">
          Writing comes first.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Every interface element must justify its existence. If it interrupts
          concentration, it is removed.
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
