import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ReadingExperience } from "@/components/reading";
import {
  StoryWorldDrawerProvider,
  useStoryWorldDrawer,
  type LoreEntity,
} from "@/components/story-world";
import {
  firstChapterId,
  getMockChapter,
  mockChapters,
} from "@/mock/chapters";
import {
  getMockLoreEntity,
  mockStoryWorldList,
} from "@/mock/storyWorld";

export const Route = createFileRoute("/showcase/story-world")({
  head: () => ({
    meta: [
      { title: "Story World Drawer v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The Story World Drawer lets readers explore characters, locations, organizations, items, creatures, and glossary terms without leaving the chapter.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const [mode, setMode] = useState<"reading" | "gallery">("reading");

  return (
    <StoryWorldDrawerProvider resolve={getMockLoreEntity}>
      <div className="min-h-screen bg-reader-bg text-reader-fg">
        <ModeToggle mode={mode} onChange={setMode} />
        {mode === "reading" ? <ReadingMode /> : <GalleryMode />}
      </div>
    </StoryWorldDrawerProvider>
  );
}

/* ─── mode toggle ────────────────────────────────────────────────────── */

function ModeToggle({
  mode,
  onChange,
}: {
  mode: "reading" | "gallery";
  onChange: (m: "reading" | "gallery") => void;
}) {
  return (
    <div className="fixed inset-x-0 top-3 z-30 flex justify-center">
      <div className="inline-flex rounded-full bg-white/[0.04] p-1 text-xs backdrop-blur-xl">
        {(["reading", "gallery"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className={[
              "rounded-full px-4 py-1.5 transition-colors",
              mode === m
                ? "bg-white/10 text-reader-fg"
                : "text-reader-muted hover:text-reader-fg",
            ].join(" ")}
          >
            {m === "reading" ? "Reading Mode" : "Entity Gallery"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── reading mode: drawer wired into chapter ────────────────────────── */

function ReadingMode() {
  const drawer = useStoryWorldDrawer();
  return (
    <ReadingExperience
      storyTitle="Ash & Atlas"
      initialChapter={mockChapters[firstChapterId]}
      getChapter={getMockChapter}
      backTo="/showcase/story-detail"
      onOpenLore={drawer.open}
    />
  );
}

/* ─── gallery mode: side-by-side previews of every entity kind ───────── */

function GalleryMode() {
  const drawer = useStoryWorldDrawer();
  return (
    <div className="container-narrow pt-24 pb-32">
      <header className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-reader-muted">
          Story World System v1.0
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-tight text-reader-fg">
          A beautiful book appendix.
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-reading text-base leading-relaxed text-reader-muted">
          The Story World Drawer overlays any chapter without interrupting the
          reader. Open any entry below to preview its layout.
        </p>
      </header>

      <ul className="divide-y divide-white/[0.04]">
        {mockStoryWorldList.map((entity) => (
          <EntityRow
            key={entity.id}
            entity={entity}
            onOpen={() => drawer.open(entity.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function EntityRow({
  entity,
  onOpen,
}: {
  entity: LoreEntity;
  onOpen: () => void;
}) {
  const thumb = thumbForEntity(entity);
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="group flex w-full items-center gap-5 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/5">
          {thumb && (
            <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.28em] text-reader-muted">
            {entity.kind}
          </p>
          <p className="mt-1 font-display text-xl text-reader-fg">
            {entity.name}
          </p>
          {entity.tagline && (
            <p className="mt-0.5 truncate text-sm text-reader-muted">
              {entity.tagline}
            </p>
          )}
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-reader-muted transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:text-reader-fg" />
      </button>
    </li>
  );
}

function thumbForEntity(entity: LoreEntity): string | undefined {
  switch (entity.kind) {
    case "character":
      return entity.portraitUrl;
    case "location":
      return entity.bannerUrl;
    case "organization":
      return entity.symbolUrl;
    case "item":
    case "creature":
      return entity.artworkUrl;
    case "glossary":
      return undefined;
  }
}
