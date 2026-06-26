import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Globe,
  Heart,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import { Carousel, CarouselItem } from "@/components/carousel";
import { StoryHero } from "@/components/story-hero/StoryHero";
import { StoryCardSignature } from "@/components/story-card/StoryCardSignature";
import { AuthorCard, type AuthorCardData } from "@/components/author-card";
import {
  CollectionCard,
  type Collection,
} from "@/components/collection-card";
import {
  kindLabel,
  readingTime,
  statusLabel,
} from "@/components/story-card/shared";
import { mockStories } from "@/mock/stories";
import { mockAuthors } from "@/mock/authors";
import { mockGenres } from "@/mock/genres";
import { mockCollections } from "@/mock/collections";
import type { ContentRating, Story } from "@/types";

export const Route = createFileRoute("/showcase/story-detail")({
  head: () => ({
    meta: [
      { title: "Story Detail Experience v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official Story Detail Experience for Fyndor. Editorial presentation of a story, built entirely from the locked Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

/* ──────────────────────────────────────────────────────────────────────── */
/*  Data assembly — mock only                                                */
/* ──────────────────────────────────────────────────────────────────────── */

const story = mockStories.find((s) => s.id === "s_ash_and_atlas")!;
const author = mockAuthors.find((a) => a.id === story.authorId)!;
const genres = story.genreIds
  .map((id) => mockGenres.find((g) => g.id === id))
  .filter((g): g is NonNullable<typeof g> => Boolean(g));

const relatedStories: Story[] = mockStories
  .filter(
    (s) =>
      s.id !== story.id &&
      s.genreIds.some((g) => story.genreIds.includes(g)),
  )
  .slice(0, 6);

const seriesBooks: Array<{
  id: string;
  order: number;
  title: string;
  coverUrl: string;
  status: Story["status"];
  current?: boolean;
}> = [
  {
    id: "sb_1",
    order: 1,
    title: story.title,
    coverUrl: story.coverUrl,
    status: story.status,
    current: true,
  },
  {
    id: "sb_2",
    order: 2,
    title: "Salt & Compass",
    coverUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop",
    status: "draft",
  },
  {
    id: "sb_3",
    order: 3,
    title: "The Cartographer's Last Coast",
    coverUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=900&fit=crop",
    status: "draft",
  },
];

const featuredCollections: Collection[] = mockCollections.slice(0, 2);

const authorCard: AuthorCardData = {
  id: author.id,
  displayName: author.displayName,
  handle: author.handle,
  avatarUrl: author.avatarUrl,
  signature:
    "I draw maps of places that don't exist, then write the people brave enough to walk them.",
  primaryGenres: ["Fantasy", "Adventure"],
  verified: author.verified,
  storiesCount: author.storiesCount,
  collectionsCount: 2,
  universesCount: 1,
  followers: author.followers,
  latestRelease: {
    title: story.title,
    coverUrl: story.coverUrl,
    status: story.status,
  },
};

/* Lore preview — characters, locations, organizations from the Silverquill world. */
type LoreCategory = "Character" | "Location" | "Organization";
const lorePreview: Array<{
  id: string;
  name: string;
  category: LoreCategory;
  blurb: string;
  imageUrl: string;
}> = [
  {
    id: "lp_eda",
    name: "Eda Mercer",
    category: "Character",
    blurb:
      "Disgraced royal cartographer. The fire that ended her career started in her own hand.",
    imageUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=600&fit=crop&crop=faces",
  },
  {
    id: "lp_callow",
    name: "Callow & the Hush",
    category: "Character",
    blurb:
      "A retired surveyor and the silent boy he refuses to leave behind on the western road.",
    imageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&crop=faces",
  },
  {
    id: "lp_silverquill",
    name: "Silverquill Atelier",
    category: "Location",
    blurb:
      "Quiet northern academy that licenses every legal map on the continent. Few of them are honest.",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
  },
  {
    id: "lp_drowncoast",
    name: "The Drown Coast",
    category: "Location",
    blurb:
      "Five hundred miles of shoreline that the official atlases stopped redrawing forty years ago.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  },
  {
    id: "lp_compasshouse",
    name: "House of the Three Compasses",
    category: "Organization",
    blurb:
      "Cartographers' guild. Holds the only key to the master atlas — and to Eda's old room.",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
  },
];

const comments: Array<{
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  body: string;
  postedAt: string;
  likes: number;
  replies: number;
}> = [
  {
    id: "co_1",
    name: "Amara Solène",
    handle: "amara.solene",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    body: "The scene with the burned map. I had to put the phone down. That was a whole grief in three paragraphs.",
    postedAt: "2 days ago",
    likes: 412,
    replies: 23,
  },
  {
    id: "co_2",
    name: "Juno Marsh",
    handle: "juno.marsh",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    body: "Eda and Callow's stand-off on the bridge is the cleanest dialogue scene I've read on this site. No notes.",
    postedAt: "5 days ago",
    likes: 188,
    replies: 9,
  },
  {
    id: "co_3",
    name: "Theodor Lyne",
    handle: "theodor.lyne",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    body: "Reading this slowly on purpose. I want the Cartographer Saga to last me through autumn.",
    postedAt: "1 week ago",
    likes: 96,
    replies: 4,
  },
];

/* ──────────────────────────────────────────────────────────────────────── */
/*  Page                                                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function ShowcasePage() {
  return (
    <PublicLayout>
      {/* 1. Story Hero — flagship editorial surface */}
      <StoryHero story={story} author={author} genres={genres} />

      <div className="container-wide pb-28">
        {/* 2. Story Metadata — minimal, calm strip */}
        <MetadataStrip story={story} />

        {/* 3. Synopsis */}
        <Synopsis story={story} />

        <div className="mt-24 space-y-24">
          {/* 4. Story World Preview */}
          <Section
            title="Inside the Story World"
            subtitle="A glimpse of the people, places and powers that shape this story. The full Lore System opens from the story page."
            action={{
              label: "Explore Story World",
              href: "#",
              ariaLabel: "Explore the Story World — coming soon",
            }}
            icon={Globe}
          >
            <LorePreviewGrid />
          </Section>

          {/* 5. Author Preview */}
          <Section
            title="About the author"
            subtitle="The voice behind the Cartographer Saga."
          >
            <div className="max-w-2xl">
              <AuthorCard author={authorCard} />
            </div>
          </Section>

          {/* 6. Series */}
          <Section
            title="The Cartographer Saga"
            subtitle="A planned trilogy. The atlas keeps growing."
            icon={Layers}
          >
            <SeriesList />
          </Section>

          {/* 7. Featured Collections */}
          <Section
            title="Featured in"
            subtitle="Editorial shelves where readers have placed this story."
            icon={Sparkles}
          >
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {featuredCollections.map((c) => (
                <CollectionCard key={c.id} collection={c} />
              ))}
            </div>
          </Section>

          {/* 8. Related Stories */}
          <Section
            title="Readers who finished this also opened"
            subtitle="Adjacent worlds — picked by Fyndor's quiet hand, not by algorithm noise."
            action={{ label: "View all", href: "#" }}
          >
            <Carousel ariaLabel="Related stories">
              {relatedStories.map((s) => (
                <CarouselItem key={s.id} size="md">
                  <StoryCardSignature
                    story={s}
                    author={mockAuthors.find((a) => a.id === s.authorId)}
                    genres={s.genreIds
                      .map((id) => mockGenres.find((g) => g.id === id))
                      .filter(
                        (g): g is NonNullable<typeof g> => Boolean(g),
                      )}
                  />
                </CarouselItem>
              ))}
            </Carousel>
          </Section>

          {/* 9. Comments Preview */}
          <Section
            title="From the margins"
            subtitle="Quiet reader reactions. The full conversation lives on each chapter."
            action={{ label: "Open discussion", href: "#" }}
            icon={MessageCircle}
          >
            <CommentsPreview />
          </Section>
        </div>
      </div>
    </PublicLayout>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Sub-sections                                                             */
/* ──────────────────────────────────────────────────────────────────────── */

function MetadataStrip({ story }: { story: Story }) {
  const items: Array<{
    icon: typeof BookOpen;
    label: string;
    value: string;
  }> = [
    { icon: Sparkles, label: "Kind", value: kindLabel(story) },
    { icon: BookOpen, label: "Status", value: statusLabel(story.status) },
    {
      icon: Layers,
      label: "Chapters",
      value: String(story.chaptersCount),
    },
    {
      icon: Clock,
      label: "Reading time",
      value: readingTime(story.wordsCount),
    },
    { icon: Globe, label: "Language", value: "English" },
  ];
  if (story.rating !== "general") {
    items.push({
      icon: ShieldCheck,
      label: "Content rating",
      value: ratingLabel(story.rating),
    });
  }

  return (
    <div className="-mt-6 rounded-3xl bg-surface-1/55 px-6 py-6 sm:px-10 sm:py-7">
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <dt className="inline-flex items-center gap-1.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
              <item.icon className="size-3 opacity-80" />
              {item.label}
            </dt>
            <dd className="text-sm font-medium text-foreground/95">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ratingLabel(r: ContentRating): string {
  switch (r) {
    case "general":
      return "General";
    case "teen":
      return "Teen";
    case "mature":
      return "Mature";
    case "explicit":
      return "Explicit";
  }
}

function Synopsis({ story }: { story: Story }) {
  return (
    <section
      aria-labelledby="story-synopsis"
      className="mx-auto mt-20 max-w-3xl"
    >
      <h2
        id="story-synopsis"
        className="font-display text-[1.6rem] leading-tight text-foreground sm:text-[1.9rem]"
      >
        The story
      </h2>
      <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.1rem]">
        {story.synopsis}
      </p>
      <p className="mt-5 text-[1.05rem] leading-[1.75] text-muted-foreground sm:text-[1.1rem]">
        What begins as a forgery becomes a confession. Eda's redrawn coast is
        accurate in ways the original never was — and the people whose homes
        she's restoring to the map are starting to remember her name.
      </p>

      {story.tags.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-2/70 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LorePreviewGrid() {
  const grouped: Record<LoreCategory, typeof lorePreview> = {
    Character: [],
    Location: [],
    Organization: [],
  };
  for (const card of lorePreview) grouped[card.category].push(card);

  return (
    <div className="space-y-10">
      {(Object.keys(grouped) as LoreCategory[]).map((cat) =>
        grouped[cat].length === 0 ? null : (
          <div key={cat}>
            <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
              {cat}s
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[cat].map((card) => (
                <article
                  key={card.id}
                  className="group/lore flex gap-4 rounded-2xl bg-surface-1/60 p-4 transition-colors duration-[var(--transition-base)] hover:bg-surface-1/80"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                    <img
                      src={card.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[var(--transition-slow,300ms)] group-hover/lore:scale-[1.04]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.05rem] leading-tight text-foreground">
                      {card.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                      {card.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function SeriesList() {
  return (
    <ol className="space-y-3">
      {seriesBooks.map((book) => (
        <li key={book.id}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group/series flex items-center gap-5 rounded-2xl bg-surface-1/55 p-4 pr-6 transition-colors duration-[var(--transition-base)] hover:bg-surface-1/80"
          >
            <span className="hidden w-8 text-center font-display text-[1.15rem] text-muted-foreground/70 sm:inline-block">
              {romanise(book.order)}
            </span>
            <div className="aspect-[2/3] w-14 shrink-0 overflow-hidden rounded-[10px] bg-surface-2">
              <img
                src={book.coverUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[1.1rem] leading-tight text-foreground">
                {book.title}
              </p>
              <p className="mt-1 text-[0.78rem] text-muted-foreground">
                {book.current ? (
                  <span className="text-foreground/80">You're reading this</span>
                ) : (
                  statusLabel(book.status)
                )}
              </p>
            </div>
            <ArrowRight
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--transition-base)] group-hover/series:translate-x-1"
            />
          </a>
        </li>
      ))}
    </ol>
  );
}

function romanise(n: number): string {
  return ["I", "II", "III", "IV", "V", "VI"][n - 1] ?? String(n);
}

function CommentsPreview() {
  return (
    <ul className="space-y-5">
      {comments.map((c) => (
        <li
          key={c.id}
          className="rounded-2xl bg-surface-1/55 p-5 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 shrink-0 overflow-hidden rounded-full bg-surface-2">
              <img
                src={c.avatarUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-medium text-foreground/95">{c.name}</span>
                <span className="text-muted-foreground/70">@{c.handle}</span>
                <span aria-hidden className="text-muted-foreground/40">
                  ·
                </span>
                <span className="text-muted-foreground/70">{c.postedAt}</span>
              </p>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-foreground/85">
                {c.body}
              </p>
              <div className="mt-3.5 flex items-center gap-5 text-[0.72rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="size-3.5 opacity-80" />
                  {c.likes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle className="size-3.5 opacity-80" />
                  {c.replies} replies
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
