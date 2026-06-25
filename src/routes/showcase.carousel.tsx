import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import {
  Carousel,
  CarouselItem,
  CarouselSkeleton,
  CarouselEmpty,
} from "@/components/carousel";
import { StoryCardSignature } from "@/components/story-card";
import { mockAuthors, mockGenres, mockStories, mockUniverses } from "@/mock";
import type { Story } from "@/types";

export const Route = createFileRoute("/showcase/carousel")({
  head: () => ({
    meta: [
      { title: "Carousel v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official horizontal discovery primitive for the Fyndor Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

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
  const many = mockStories;
  const few = mockStories.slice(0, 3);

  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NDS-004
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
              v1.0
            </span>
          </div>
          <h1 className="font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Carousel <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The official horizontal discovery rail. Frameless, quiet, and
            cover-first. Native swipe on touch, semi-transparent arrows on
            pointer. Generous rhythm, no autoplay, no decoration.
          </p>
        </header>

        {/* 1. Default — many items */}
        <div className="mb-20">
          <Section
            title="Trending this week"
            subtitle="Stories rising fastest across the platform."
            action={{ label: "View all", to: "/browse" }}
          >
            <Carousel ariaLabel="Trending this week">
              {many.map((story) => (
                <CarouselItem key={story.id}>
                  <StoryCardSignature story={story} {...getMeta(story)} />
                </CarouselItem>
              ))}
            </Carousel>
          </Section>
        </div>

        {/* 2. Few items — no arrows (nothing to scroll) */}
        <div className="mb-20">
          <Section
            title="Editor's picks"
            subtitle="A short, curated selection. Arrows hide when there is nothing to reveal."
          >
            <Carousel ariaLabel="Editor's picks">
              {few.map((story) => (
                <CarouselItem key={story.id}>
                  <StoryCardSignature story={story} {...getMeta(story)} />
                </CarouselItem>
              ))}
            </Carousel>
          </Section>
        </div>

        {/* 3. Larger item size */}
        <div className="mb-20">
          <Section
            title="Featured universes"
            subtitle="Larger cards for editorial rails."
          >
            <Carousel ariaLabel="Featured universes">
              {many.slice(0, 8).map((story) => (
                <CarouselItem key={story.id} size="lg">
                  <StoryCardSignature story={story} {...getMeta(story)} />
                </CarouselItem>
              ))}
            </Carousel>
          </Section>
        </div>

        {/* 4. Loading skeleton */}
        <div className="mb-20">
          <Section
            title="Loading"
            subtitle="Calm placeholder that matches the card rhythm. No shimmer."
            tone="utility"
          >
            <CarouselSkeleton count={6} />
          </Section>
        </div>

        {/* 5. Empty state */}
        <div className="mb-20">
          <Section
            title="Empty"
            subtitle="When a rail has nothing to show, it stays quiet."
            tone="utility"
          >
            <CarouselEmpty
              title="No stories in this rail yet"
              description="Follow universes and authors to start filling your feed."
            />
          </Section>
        </div>

        {/* 6. Responsive frames */}
        <div className="mb-20">
          <Section
            title="Responsive behavior"
            subtitle="Native swipe on mobile, semi-transparent arrows on pointer."
            tone="utility"
          >
            <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
              {/* Mobile frame */}
              <div>
                <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                  Mobile — swipe, no arrows
                </p>
                <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-4">
                  <div className="mx-auto w-full max-w-[20rem]">
                    <Carousel ariaLabel="Mobile preview">
                      {many.slice(0, 6).map((story) => (
                        <CarouselItem key={story.id} size="sm">
                          <StoryCardSignature
                            story={story}
                            {...getMeta(story)}
                          />
                        </CarouselItem>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>

              {/* Desktop frame */}
              <div>
                <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                  Desktop — hover to reveal arrows
                </p>
                <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-4">
                  <Carousel ariaLabel="Desktop preview">
                    {many.slice(0, 8).map((story) => (
                      <CarouselItem key={story.id}>
                        <StoryCardSignature
                          story={story}
                          {...getMeta(story)}
                        />
                      </CarouselItem>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer note */}
        <div className="mt-28">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This component is locked as the official Carousel v1.0 for the
            Fyndor Narrative Design System. It will be reused across Home,
            Explore, Library, Universe pages, Collections, and Author profiles
            without further visual redesign.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
