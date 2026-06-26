import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, PenLine, Trash2 } from "lucide-react";
import { StudioLayout } from "@/layouts";
import {
  StoryWizard,
  emptyDraft,
  type WizardDraft,
} from "@/components/studio/wizard";

export const Route = createFileRoute("/showcase/story-wizard")({
  head: () => ({
    meta: [
      { title: "Story Creation Wizard v1.0 — Fyndor" },
      {
        name: "description",
        content:
          "The Story Creation Wizard — Fyndor's guided flow for starting a new manuscript.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StoryWizardShowcase,
});

type View = "landing" | "wizard";

function StoryWizardShowcase() {
  const [view, setView] = useState<View>("landing");
  const [savedDraft, setSavedDraft] = useState<WizardDraft | null>(null);
  const [resumeKey, setResumeKey] = useState(0);

  function startFresh() {
    setSavedDraft(null);
    setResumeKey((k) => k + 1);
    setView("wizard");
  }
  function resume() {
    setResumeKey((k) => k + 1);
    setView("wizard");
  }
  function discard() {
    setSavedDraft(null);
  }

  function onCancel(draft: WizardDraft) {
    // Mock autosave: keep the draft only if user has made meaningful progress.
    const hasProgress =
      draft.type !== null ||
      draft.title.trim().length > 0 ||
      draft.synopsis.trim().length > 0;
    setSavedDraft(hasProgress ? draft : null);
    setView("landing");
  }

  function onAutosave(draft: WizardDraft) {
    setSavedDraft(draft);
  }

  function onComplete(draft: WizardDraft, _action: "draft" | "later" | "write") {
    setSavedDraft(null);
    setView("landing");
    // In a real app: route to the chapter editor / studio dashboard.
    console.log("[wizard] complete", _action, draft);
  }

  return (
    <StudioLayout>
      {view === "wizard" ? (
        <StoryWizard
          key={resumeKey}
          initialDraft={savedDraft ?? emptyDraft}
          onCancel={onCancel}
          onAutosave={onAutosave}
          onComplete={onComplete}
        />
      ) : (
        <Landing
          savedDraft={savedDraft}
          onStart={startFresh}
          onResume={resume}
          onDiscard={discard}
        />
      )}
    </StudioLayout>
  );
}

function Landing({
  savedDraft,
  onStart,
  onResume,
  onDiscard,
}: {
  savedDraft: WizardDraft | null;
  onStart: () => void;
  onResume: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="container-wide mx-auto max-w-3xl px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
        Story Studio
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
        Start something new.
      </h1>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
        Five quiet steps. One blank page at the end. The wizard guides you
        without slowing you down — and saves your progress as you go.
      </p>

      {savedDraft && (
        <div className="mt-10 rounded-2xl bg-[color-mix(in_oklab,var(--brand)_10%,var(--surface-1))] p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brand">
            Draft in progress
          </p>
          <h3 className="mt-2 font-display text-xl tracking-tight">
            {savedDraft.title?.trim() || "Untitled manuscript"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {savedDraft.type
              ? `${savedDraft.type === "original" ? "Original story" : "Fanfiction"} · `
              : ""}
            Last edited just now.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand/85 px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_-12px_var(--brand)] transition-all hover:shadow-[0_12px_28px_-12px_var(--brand)]"
            >
              Continue draft
              <ArrowRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
            >
              <Trash2 className="size-3.5" />
              Discard
            </button>
          </div>
        </div>
      )}

      <div className="mt-10">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand/85 px-6 py-3 text-sm font-medium text-white shadow-[0_8px_24px_-12px_var(--brand)] transition-all hover:shadow-[0_12px_28px_-12px_var(--brand)]"
        >
          <PenLine className="size-4" />
          New story
        </button>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        <FlowCard
          label="Original story flow"
          steps={[
            "Type",
            "Title · Synopsis · Language",
            "Genres · Tags · Age rating",
            "Cover · Banner",
            "Story World",
            "Review",
          ]}
        />
        <FlowCard
          label="Fanfiction flow"
          steps={[
            "Type",
            "Choose franchise",
            "Title · Synopsis · Language",
            "Genres · Tags · Age rating",
            "Cover · Banner",
            "Review",
          ]}
        />
      </div>
    </div>
  );
}

function FlowCard({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div className="rounded-2xl bg-surface-1/60 p-5 backdrop-blur-md">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <ol className="mt-4 space-y-2 text-sm text-foreground/90">
        {steps.map((s, i) => (
          <li key={s} className="flex items-baseline gap-3">
            <span className="text-xs tabular-nums text-muted-foreground/60">
              {String(i).padStart(2, "0")}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
