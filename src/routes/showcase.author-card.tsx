import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import { Carousel, CarouselItem } from "@/components/carousel";
import {
  AuthorCard,
  AuthorCardSkeleton,
  AuthorCardEmpty,
  type AuthorCardData,
} from "@/components/author-card";

export const Route = createFileRoute("/showcase/author-card")({
  head: () => ({
    meta: [
      { title: "Author Card v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official editorial author card for the Fyndor Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

const showcaseAuthors: AuthorCardData[] = [
  {
    id: "sa_iris_vale",
    displayName: "Iris Vale",
    handle: "iris.vale",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=240&fit=crop&crop=faces",
    signature:
      "I draw maps of places that don't exist, then write the people brave enough to walk them.",
    primaryGenres: ["Fantasy", "Adventure"],
    verified: true,
    storiesCount: 7,
    collectionsCount: 2,
    universesCount: 1,
    followers: 48210,
    latestRelease: {
      title: "Ash & Atlas",
      coverUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      status: "ongoing",
    },
  },
  {
    id: "sa_amara_solene",
    displayName: "Amara Solène",
    handle: "amara.solene",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=faces",
    signature:
      "Quiet romances set in coastal towns nobody remembers naming. Slow weather, slower hearts.",
    primaryGenres: ["Romance", "Literary"],
    verified: false,
    storiesCount: 4,
    collectionsCount: 3,
    followers: 15890,
    latestRelease: {
      title: "One More Summer in Karuizawa",
      coverUrl:
        "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=400&h=600&fit=crop",
      status: "completed",
    },
  },
  {
    id: "sa_kenji_okafor",
    displayName: "Kenji Okafor",
    handle: "kenji.okafor",
    avatarUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=240&h=240&fit=crop&crop=faces",
    signature:
      "Hard science. Soft endings. I am building the Mireborn cycle one orbital station at a time.",
    primaryGenres: ["Sci-Fi", "Hard SF"],
    verified: true,
    storiesCount: 12,
    collectionsCount: 1,
    universesCount: 2,
    followers: 92740,
    latestRelease: {
      title: "Quiet Engines",
      coverUrl:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop",
      status: "ongoing",
    },
  },
  {
    id: "sa_theodor_lyne",
    displayName: "Theodor Lyne",
    handle: "theodor.lyne",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces",
    signature:
      "Gothic mysteries told in letters never meant to be read. Trust nothing the narrator says.",
    primaryGenres: ["Mystery", "Gothic"],
    verified: true,
    storiesCount: 9,
    collectionsCount: 2,
    followers: 31402,
    latestRelease: {
      title: "Salt & Signal",
      coverUrl:
        "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=400&h=600&fit=crop",
      status: "ongoing",
    },
  },
  {
    id: "sa_juno_marsh",
    displayName: "Juno Marsh",
    handle: "juno.marsh",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&crop=faces",
    signature:
      "Sweeping isekai arcs and political fanfiction. The Long Hallow universe lives here.",
    primaryGenres: ["Fanfiction", "Adventure"],
    verified: false,
    storiesCount: 18,
    collectionsCount: 4,
    universesCount: 1,
    followers: 67120,
    latestRelease: {
      title: "The Understudy Heir",
      coverUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
      status: "ongoing",
    },
  },
  {
    id: "sa_noor_haddad",
    displayName: "Noor Haddad",
    handle: "noor.haddad",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=240&h=240&fit=crop&crop=faces",
    signature:
      "Slice-of-life stories about small kitchens, late buses, and the people we sit beside.",
    primaryGenres: ["Slice of Life", "Contemporary"],
    verified: false,
    storiesCount: 11,
    collectionsCount: 5,
    followers: 8420,
    latestRelease: {
      title: "Hollow Shrine Protocols",
      coverUrl:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=600&fit=crop",
      status: "hiatus",
    },
  },
];

function ShowcasePage() {
  const [a, b, c, d] = showcaseAuthors;

  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NDS-006
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
              v1.0
            </span>
          </div>
          <h1 className="font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Author Card <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            An editorial presentation of a storyteller — avatar, signature,
            latest release, creative statistics. Not a social profile, not a
            follower contest. Readers should discover authors the way they
            discover stories.
          </p>
        </header>

        {/* 1. Default grid */}
        <Section
          title="Featured storytellers"
          subtitle="Six distinct creative identities — fantasy, romance, sci-fi, mystery, epic adventure, slice of life."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {showcaseAuthors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </Section>

        {/* 2. Interaction states */}
        <Section
          title="Interaction states"
          subtitle="Soft elevation, calm avatar micro-zoom, whole card is the link target."
          tone="utility"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Default
              </p>
              <AuthorCard author={a} />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Hover
              </p>
              <AuthorCard author={b} state="hover" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Focus
              </p>
              <AuthorCard author={c} state="focus" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Pressed
              </p>
              <AuthorCard author={d} state="pressed" />
            </div>
          </div>
        </Section>

        {/* 3. Inside a Carousel */}
        <Section
          title="In a Carousel"
          subtitle="Author Cards behave naturally inside the locked Carousel v1.0 rhythm."
        >
          <Carousel ariaLabel="Featured authors">
            {showcaseAuthors.map((author) => (
              <CarouselItem key={author.id} size="lg">
                <AuthorCard author={author} />
              </CarouselItem>
            ))}
          </Carousel>
        </Section>

        {/* 4. Loading skeleton */}
        <Section
          title="Loading"
          subtitle="Matches the card's rhythm — avatar, signature, latest release, stats."
          tone="utility"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AuthorCardSkeleton />
            <AuthorCardSkeleton />
            <AuthorCardSkeleton />
          </div>
        </Section>

        {/* 5. Empty state */}
        <Section
          title="Empty"
          subtitle="When a rail has no authors to feature, the surface stays quiet."
          tone="utility"
        >
          <AuthorCardEmpty />
        </Section>

        {/* 6. Responsive frames */}
        <Section
          title="Responsive behavior"
          subtitle="Hierarchy is preserved across breakpoints — avatar, name, signature, latest release."
          tone="utility"
        >
          <div className="grid gap-10 lg:grid-cols-[20rem_28rem_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Mobile
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <div className="mx-auto w-full max-w-[18rem]">
                  <AuthorCard author={a} />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Tablet
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <AuthorCard author={b} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Desktop
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <div className="grid grid-cols-2 gap-6">
                  <AuthorCard author={c} />
                  <AuthorCard author={d} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer note */}
        <div className="mt-20">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This component is locked as the official Author Card v1.0 for the
            Fyndor Narrative Design System. Editorial presentation over social
            metrics — followers stay in supporting text.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
