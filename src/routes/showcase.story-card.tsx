import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import {
  StoryCardSignature,
  StoryCardSignatureSkeleton,
  type StoryCardState,
} from "@/components/story-card";
import { mockAuthors, mockGenres, mockStories, mockUniverses } from "@/mock";
import type { Story } from "@/types";

export const Route = createFileRoute("/showcase/story-card")({
  head: () => ({
    meta: [
      { title: "Story Card v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official Story Card for the Fyndor Narrative Design System. Locked, refined, and ready for production.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

const STATES: StoryCardState[] = ["default", "hover", "pressed", "focus"];

function getMeta(story: Story) {
  const author = mockAuthors.find((a) => a.id === story.authorId);
  const universe = story.universeId
    ? mockUniverses.find((u) => u.id === story.universeId)
    : undefined;
  const genres = story.genreIds
    .map((id) => mockGenres.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));
  return { author, universe, genres };
}

function ShowcasePage() {
  const sampleStories = mockStories.slice(0, 4);
  const stateStory = mockStories[0];
  const stateMeta = getMeta(stateStory);

  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Header */}
        <header className="mb-14 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NDS-001
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
              Locked
            </span>
          </div>
          <h1 className="font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Story Card <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The official card for the Fyndor Narrative Design System. Cover-first,
            frameless, and almost weightless. Hover gently zooms the artwork and
            reveals a single genre line. Nothing competes with the story.
          </p>
        </header>

        {/* Philosophy */}
        <section className="mb-20">
          <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
            Philosophy
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Cover-first",
                text: "The artwork is the headline. Everything else whispers.",
              },
              {
                label: "Frameless",
                text: "No hard borders. The card floats naturally on the surface.",
              },
              {
                label: "Minimal metadata",
                text: "Kind, status, and one genre. No statistics. No noise.",
              },
              {
                label: "Calm motion",
                text: "A 2–3% cover zoom and a soft shadow lift. Nothing else moves.",
              },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-sm font-medium text-foreground">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample grid */}
        <section className="mb-20">
          <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
            Sample grid
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {sampleStories.map((story) => {
              const meta = getMeta(story);
              return <StoryCardSignature key={story.id} story={story} {...meta} />;
            })}
          </div>
        </section>

        {/* States */}
        <section className="mb-20">
          <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
            States
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
            {STATES.map((state) => (
              <div key={state} className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-surface-2/70 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {state}
                </span>
                <StoryCardSignature
                  story={stateStory}
                  {...stateMeta}
                  state={state}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skeleton */}
        <section className="mb-20">
          <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
            Loading skeleton
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            <StoryCardSignatureSkeleton />
            <StoryCardSignatureSkeleton />
            <StoryCardSignatureSkeleton />
            <StoryCardSignatureSkeleton />
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-28">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This component is locked as the official Story Card v1.0 for the
            Fyndor Narrative Design System. It will be reused across Home,
            Library, Universe pages, Search, and Collections without further
            visual redesign.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
