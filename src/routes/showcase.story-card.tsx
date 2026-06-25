import { createFileRoute } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { PublicLayout } from "@/layouts/PublicLayout";
import {
  StoryCardBookstore,
  StoryCardBookstoreSkeleton,
  StoryCardCinematic,
  StoryCardCinematicSkeleton,
  StoryCardEditorial,
  StoryCardEditorialSkeleton,
  StoryCardMinimal,
  StoryCardMinimalSkeleton,
  StoryCardSignature,
  StoryCardSignatureSkeleton,
  type StoryCardProps,
  type StoryCardSkeletonProps,
  type StoryCardState,
} from "@/components/story-card";
import { mockAuthors, mockGenres, mockStories, mockUniverses } from "@/mock";
import type { Story } from "@/types";

export const Route = createFileRoute("/showcase/story-card")({
  head: () => ({
    meta: [
      { title: "Story Card — Fyndor Showcase" },
      {
        name: "description",
        content:
          "Sprint 01.0 — five Story Card concepts explored before choosing the official Fyndor card.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

interface Concept {
  id: string;
  letter: string;
  name: string;
  philosophy: string;
  Card: ComponentType<StoryCardProps>;
  Skeleton: ComponentType<StoryCardSkeletonProps>;
  /** Bookstore wants a single column at any width. */
  layout: "grid" | "stack";
}

const CONCEPTS: Concept[] = [
  {
    id: "minimal",
    letter: "A",
    name: "Minimal",
    philosophy:
      "Cover does almost all of the talking. A serif title and a single line of byline. Built for very dense walls of stories where covers must read as artwork first.",
    Card: StoryCardMinimal,
    Skeleton: StoryCardMinimalSkeleton,
    layout: "grid",
  },
  {
    id: "editorial",
    letter: "B",
    name: "Editorial",
    philosophy:
      "Reads like a literary magazine entry. A small all-caps eyebrow, serif title, two-line synopsis, and a quiet byline. Higher information density without ever feeling loud.",
    Card: StoryCardEditorial,
    Skeleton: StoryCardEditorialSkeleton,
    layout: "grid",
  },
  {
    id: "cinematic",
    letter: "C",
    name: "Cinematic",
    philosophy:
      "Pure cover by default. On hover or focus, a soft gradient lifts the lower third and reveals title, status, and tags. Made for streaming-style rails where the artwork is the headline.",
    Card: StoryCardCinematic,
    Skeleton: StoryCardCinematicSkeleton,
    layout: "grid",
  },
  {
    id: "bookstore",
    letter: "D",
    name: "Bookstore",
    philosophy:
      "A horizontal listing that reads like a shelf entry in a quiet independent bookshop. Cover left, serif title, italic byline, a few genre pills, synopsis, and a small caps footer.",
    Card: StoryCardBookstore,
    Skeleton: StoryCardBookstoreSkeleton,
    layout: "stack",
  },
  {
    id: "signature",
    letter: "E",
    name: "Fyndor Signature",
    philosophy:
      "Original to Fyndor. Cover on a floating plinth with a near-invisible brand rail tracing its left edge, a soft kind chip top-right, and a single status / reads line at the cover's foot. Calm, cinematic, ours.",
    Card: StoryCardSignature,
    Skeleton: StoryCardSignatureSkeleton,
    layout: "grid",
  },
];

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
  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Title */}
        <header className="mb-14 max-w-3xl">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Sprint 01.0 · Narrative Design System
          </p>
          <h1 className="mt-3 font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Story Card <span className="text-gradient-brand">explorations</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Five concepts for the most important component in Fyndor. Each
            shares the same visual language but proposes a different answer to
            hierarchy, density and presence. No choice is final.
          </p>
        </header>

        <div className="space-y-24">
          {CONCEPTS.map((concept) => (
            <ConceptSection key={concept.id} concept={concept} />
          ))}
        </div>

        <FooterNote />
      </div>
    </PublicLayout>
  );
}

function ConceptSection({ concept }: { concept: Concept }) {
  const { Card, Skeleton } = concept;
  const stories = mockStories.slice(0, concept.layout === "stack" ? 3 : 4);
  const stateStory = mockStories[0];
  const stateMeta = getMeta(stateStory);

  return (
    <section aria-labelledby={`concept-${concept.id}`} className="scroll-mt-24">
      {/* Heading */}
      <div className="mb-8 flex items-baseline gap-5">
        <span className="font-display text-5xl text-muted-foreground/40 tabular-nums">
          {concept.letter}
        </span>
        <div className="min-w-0">
          <h2
            id={`concept-${concept.id}`}
            className="font-display text-2xl text-foreground sm:text-3xl"
          >
            {concept.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
            {concept.philosophy}
          </p>
        </div>
      </div>

      {/* Sample row */}
      <div className="mb-12">
        <SubLabel>Sample</SubLabel>
        {concept.layout === "stack" ? (
          <div className="space-y-3">
            {stories.map((story) => {
              const meta = getMeta(story);
              return <Card key={story.id} story={story} {...meta} />;
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {stories.map((story) => {
              const meta = getMeta(story);
              return <Card key={story.id} story={story} {...meta} />;
            })}
          </div>
        )}
      </div>

      {/* States */}
      <div className="mb-12">
        <SubLabel>States</SubLabel>
        <div
          className={
            concept.layout === "stack"
              ? "space-y-4"
              : "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6"
          }
        >
          {STATES.map((state) => (
            <div key={state} className="space-y-3">
              <StateTag state={state} />
              <Card story={stateStory} {...stateMeta} state={state} />
            </div>
          ))}
        </div>
      </div>

      {/* Loading */}
      <div>
        <SubLabel>Loading skeleton</SubLabel>
        {concept.layout === "stack" ? (
          <div className="space-y-3">
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </section>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
      {children}
    </p>
  );
}

function StateTag({ state }: { state: StoryCardState }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-2/70 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {state}
    </span>
  );
}

function FooterNote() {
  return (
    <div className="mt-28">
      <div className="soft-rule mb-10" />
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        This showcase exists only to evaluate and choose the official Story
        Card for the Narrative Design System. Cards are rendered at the actual
        sizes they will take across Home, Library, Universe pages, and Search.
        Resize the window to inspect mobile, tablet, and desktop behaviour —
        the cards reflow without changing their visual language.
      </p>
    </div>
  );
}
