import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { StudioLayout } from "@/layouts";
import { WorldBuilder } from "@/components/studio/world-builder";
import { mockWorldBuilderEntities } from "@/mock/worldBuilder";

export const Route = createFileRoute("/showcase/world-builder")({
  head: () => ({
    meta: [
      { title: "World Builder v1.0 — Fyndor" },
      {
        name: "description",
        content:
          "Organize the living universe of a story — characters, locations, organizations, items, creatures and glossary terms.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WorldBuilderShowcase,
});

type DemoMode = "populated" | "empty" | "loading";

const MODES: Array<{ id: DemoMode; label: string }> = [
  { id: "populated", label: "Populated" },
  { id: "empty", label: "Empty" },
  { id: "loading", label: "Loading" },
];

function WorldBuilderShowcase() {
  const [mode, setMode] = useState<DemoMode>("populated");

  return (
    <StudioLayout>
      <div className="container-wide space-y-2 px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
              Studio · World Builder
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Build the living world.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              A quiet, creative workspace for the characters, places and ideas
              that belong to your story.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Demo mode"
            className="flex items-center gap-1 rounded-full bg-foreground/[0.04] p-1"
          >
            {MODES.map((m) => {
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(m.id)}
                  className={
                    "rounded-full px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors " +
                    (active
                      ? "bg-background/80 text-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="pt-10">
          <WorldBuilder
            entities={
              mode === "empty"
                ? []
                : mode === "loading"
                  ? []
                  : mockWorldBuilderEntities
            }
            loading={mode === "loading"}
          />
        </div>
      </div>
    </StudioLayout>
  );
}
