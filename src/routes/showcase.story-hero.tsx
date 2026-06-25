import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import {
  StoryHero,
  StoryHeroEmpty,
  StoryHeroSkeleton,
} from "@/components/story-hero";
import { mockStories, mockAuthors, mockGenres } from "@/mock";

export const Route = createFileRoute("/showcase/story-hero")({
  head: () => ({
    meta: [
      { title: "Story Hero v1.0 — Fyndor NDS-003" },
      {
        name: "description",
        content:
          "The flagship discovery component of the Fyndor Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StoryHeroShowcase,
});

function Group({
  eyebrow,
  description,
  frame = "bleed",
  children,
}: {
  eyebrow: string;
  description: string;
  frame?: "bleed" | "tablet" | "mobile";
  children: React.ReactNode;
}) {
  const frameClass =
    frame === "mobile"
      ? "mx-auto max-w-[420px]"
      : frame === "tablet"
        ? "mx-auto max-w-[860px]"
        : "";

  return (
    <section className="border-t border-foreground/[0.04] pt-12 first:border-t-0 first:pt-0">
      <div className="container-wide">
        <div className="mb-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
          {eyebrow}
        </div>
        <p className="mb-8 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div
        className={
          frame === "bleed"
            ? ""
            : "container-wide"
        }
      >
        <div
          className={
            frame === "bleed"
              ? ""
              : `${frameClass} overflow-hidden rounded-3xl bg-surface-0 ring-1 ring-foreground/[0.04]`
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function StoryHeroShowcase() {
  const story = mockStories[0];
  const author = mockAuthors.find((a) => a.id === story.authorId);
  const genres = mockGenres.filter((g) => story.genreIds.includes(g.id));

  return (
    <PublicLayout>
      <main className="pb-24">
        <header className="container-wide pb-12 pt-16">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground/80">
            NDS-003
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Story Hero v1.0
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            The flagship discovery surface for Fyndor. One featured story,
            framed cinematically. The cover stays the protagonist; the banner
            is atmosphere; the type stays quiet around them.
          </p>
        </header>

        <div className="space-y-20">
          <Group
            eyebrow="01 — Default · Desktop"
            description="Full-bleed presentation as it would appear at the top of Home or a Story Detail page."
            frame="bleed"
          >
            <StoryHero
              story={story}
              author={author}
              genres={genres}
            />
          </Group>

          <Group
            eyebrow="02 — Tablet"
            description="Cover scales gently. Information remains beside it. Same emotional weight."
            frame="tablet"
          >
            <StoryHero
              story={mockStories[1] ?? story}
              author={mockAuthors.find(
                (a) => a.id === (mockStories[1] ?? story).authorId,
              )}
              genres={mockGenres.filter((g) =>
                (mockStories[1] ?? story).genreIds.includes(g.id),
              )}
            />
          </Group>

          <Group
            eyebrow="03 — Mobile"
            description="Banner above, cover centered, information stacked. The hierarchy stays intact."
            frame="mobile"
          >
            <StoryHero
              story={mockStories[2] ?? story}
              author={mockAuthors.find(
                (a) => a.id === (mockStories[2] ?? story).authorId,
              )}
              genres={mockGenres.filter((g) =>
                (mockStories[2] ?? story).genreIds.includes(g.id),
              )}
            />
          </Group>

          <Group
            eyebrow="04 — Loading skeleton"
            description="Calm placeholder mirroring the eventual layout. No spinners."
            frame="bleed"
          >
            <StoryHeroSkeleton />
          </Group>

          <Group
            eyebrow="05 — Empty placeholder"
            description="Used when no featured story is available. Holds the space gracefully."
            frame="bleed"
          >
            <StoryHeroEmpty />
          </Group>
        </div>
      </main>
    </PublicLayout>
  );
}
