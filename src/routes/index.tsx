import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Compass, Bookmark, Clock3, Gem } from "lucide-react";
import { PublicLayout } from "@/layouts";
import { StoryHero } from "@/components/story-hero";
import { Section } from "@/components/section";
import { Carousel, CarouselItem } from "@/components/carousel";
import { StoryCardSignature } from "@/components/story-card";
import {
  mockStories,
  mockAuthors,
  mockGenres,
  mockUniverses,
} from "@/mock";
import type { Story } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fyndor — Discover stories worth reading" },
      {
        name: "description",
        content:
          "A cinematic reading platform for original fiction and fanfiction. Discover, save and continue stories you love.",
      },
      { property: "og:title", content: "Fyndor — Discover stories worth reading" },
      {
        property: "og:description",
        content:
          "A cinematic reading platform for original fiction and fanfiction.",
      },
    ],
  }),
  component: HomeRoute,
});

const authorById = new Map(mockAuthors.map((a) => [a.id, a]));
const universeById = new Map(mockUniverses.map((u) => [u.id, u]));
const genreById = new Map(mockGenres.map((g) => [g.id, g]));

function storyExtras(story: Story) {
  return {
    author: authorById.get(story.authorId),
    universe: story.universeId ? universeById.get(story.universeId) : undefined,
    genres: story.genreIds.map((id) => genreById.get(id)).filter(Boolean) as ReturnType<typeof Array.prototype.flat>,
  };
}

function StoryRow({
  ariaLabel,
  stories,
  keyPrefix,
}: {
  ariaLabel: string;
  stories: Story[];
  keyPrefix: string;
}) {
  return (
    <Carousel ariaLabel={ariaLabel}>
      {stories.map((story) => {
        const extras = storyExtras(story);
        return (
          <CarouselItem key={`${keyPrefix}-${story.id}`} size="md">
            <StoryCardSignature
              story={story}
              author={extras.author}
              universe={extras.universe}
              genres={extras.genres as never}
            />
          </CarouselItem>
        );
      })}
    </Carousel>
  );
}

function pickByIds(ids: string[]): Story[] {
  return ids
    .map((id) => mockStories.find((s) => s.id === id))
    .filter((s): s is Story => Boolean(s));
}

function HomeRoute() {
  const heroStory = mockStories.find((s) => s.id === "s_ash_and_atlas")!;
  const heroExtras = storyExtras(heroStory);

  // Curated row compositions — same locked card, varying order per rail.
  const continueReading = pickByIds([
    "s_quiet_engines",
    "s_paper_kingdoms",
    "s_letters_to_calliope",
    "s_hollow_shrine_protocols",
  ]);

  const recentlyUpdated = [...mockStories].sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
  );

  const popularInInterests = pickByIds([
    "s_paper_kingdoms",
    "s_ash_and_atlas",
    "s_the_understudy_heir",
    "s_hollow_shrine_protocols",
    "s_quiet_engines",
    "s_the_long_hallow_bells",
  ]);

  const hiddenGems = [...mockStories]
    .filter((s) => s.readsCount < 150_000)
    .sort((a, b) => b.likesCount / b.readsCount - a.likesCount / a.readsCount);

  const curatedCollection = pickByIds([
    "s_letters_to_calliope",
    "s_one_more_summer",
    "s_salt_and_signal",
    "s_velvet_recursion",
  ]);

  const silverquillUniverse = mockUniverses.find((u) => u.id === "u_silverquill")!;
  const universeSpotlight = mockStories.filter(
    (s) => s.universeId === silverquillUniverse.id,
  );

  return (
    <PublicLayout>
      {/* 1. Story Hero — ~62vh, next section breathes below the fold */}
      <StoryHero
        story={heroStory}
        author={heroExtras.author}
        genres={heroExtras.genres as never}
      />

      {/* Content rails — generous vertical rhythm, no dividers */}
      <div className="container-wide space-y-20 pb-28 pt-10 md:space-y-24 md:pt-14">
        <Section
          title="Continue reading"
          subtitle="Pick up where you left off."
          icon={Clock3}
          action={{ label: "Your library", to: "/library" }}
        >
          <StoryRow
            ariaLabel="Continue reading"
            stories={continueReading}
            keyPrefix="continue"
          />
        </Section>

        <Section
          title="Recently updated"
          subtitle="New chapters from stories moving this week."
          action={{ label: "Browse all", to: "/browse" }}
        >
          <StoryRow
            ariaLabel="Recently updated stories"
            stories={recentlyUpdated}
            keyPrefix="recent"
          />
        </Section>

        <Section
          title="Popular in your interests"
          subtitle="Fantasy, romance and fanfiction picked for you."
          icon={Sparkles}
          action={{ label: "Refine taste", to: "/library" }}
        >
          <StoryRow
            ariaLabel="Popular in your interests"
            stories={popularInInterests}
            keyPrefix="popular"
          />
        </Section>

        <Section
          title="Hidden gems"
          subtitle="Quietly brilliant stories with devoted readers."
          icon={Gem}
        >
          <StoryRow
            ariaLabel="Hidden gems"
            stories={hiddenGems}
            keyPrefix="gems"
          />
        </Section>

        <Section
          title="Curated — Slow-burn comfort reads"
          subtitle="A reading list by Amara Solène."
          icon={Bookmark}
          action={{ label: "Open collection", to: "/browse" }}
        >
          <StoryRow
            ariaLabel="Slow-burn comfort reads collection"
            stories={curatedCollection}
            keyPrefix="curated"
          />
        </Section>

        <Section
          title={`Universe spotlight — ${silverquillUniverse.name}`}
          subtitle={silverquillUniverse.description}
          icon={Compass}
          action={{ label: "Enter universe", to: "/browse" }}
        >
          <StoryRow
            ariaLabel={`Stories in ${silverquillUniverse.name}`}
            stories={universeSpotlight}
            keyPrefix="universe"
          />
        </Section>
      </div>
    </PublicLayout>
  );
}
