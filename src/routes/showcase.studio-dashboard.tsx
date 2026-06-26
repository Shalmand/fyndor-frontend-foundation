import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  PenLine,
  Upload,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { StudioLayout } from "@/layouts";
import { Section } from "@/components/section";
import {
  ContinueWritingHero,
  StudioStoryCard,
  QuickActionCard,
  InsightStat,
  StoryFilters,
  StoriesEmptyState,
  type StoryFilterId,
  type StorySortId,
  type PublishState,
} from "@/components/studio";
import { mockStories } from "@/mock/stories";
import type { Story } from "@/types";

export const Route = createFileRoute("/showcase/studio-dashboard")({
  head: () => ({
    meta: [
      { title: "Studio Dashboard v1.0 — Fyndor" },
      {
        name: "description",
        content:
          "The Story Studio Dashboard — the author's creative workspace on Fyndor.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudioDashboardShowcase,
});

const CURRENT_AUTHOR_ID = "a_iris_vale";

/** Synthesize an author-side publish state for each mock story. */
function publishStateFor(story: Story, idx: number): PublishState {
  if (story.status === "draft") return "draft";
  // First non-draft story gets a scheduled state for demo purposes.
  if (idx === 0) return "scheduled";
  return "published";
}

function StudioDashboardShowcase() {
  const baseStories = useMemo(
    () => mockStories.filter((s) => s.authorId === CURRENT_AUTHOR_ID),
    [],
  );

  // Decorate the author's stories with publish state so filters/sort/cards
  // can reason about them as a single shape.
  const decorated = useMemo(
    () =>
      baseStories.map((s, i) => ({
        story: s,
        publishState: publishStateFor(s, i),
      })),
    [baseStories],
  );

  const [filter, setFilter] = useState<StoryFilterId>("all");
  const [sort, setSort] = useState<StorySortId>("recently-edited");
  const [showEmpty, setShowEmpty] = useState(false);

  const counts = useMemo(
    () => ({
      all: decorated.length,
      drafts: decorated.filter((d) => d.publishState === "draft").length,
      published: decorated.filter((d) => d.publishState === "published").length,
      originals: decorated.filter((d) => d.story.kind === "original").length,
      fanfiction: decorated.filter((d) => d.story.kind === "fanfiction").length,
    }),
    [decorated],
  );

  const visible = useMemo(() => {
    const filtered = decorated.filter(({ story, publishState }) => {
      switch (filter) {
        case "drafts": return publishState === "draft";
        case "published": return publishState === "published";
        case "originals": return story.kind === "original";
        case "fanfiction": return story.kind === "fanfiction";
        default: return true;
      }
    });
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "alphabetical":
          return a.story.title.localeCompare(b.story.title);
        case "recently-published":
          return (
            new Date(b.story.publishedAt).getTime() -
            new Date(a.story.publishedAt).getTime()
          );
        case "recently-edited":
        default:
          return (
            new Date(b.story.updatedAt).getTime() -
            new Date(a.story.updatedAt).getTime()
          );
      }
    });
    return sorted;
  }, [decorated, filter, sort]);

  const heroStory = baseStories[0] ?? mockStories[0];
  const heroLastEdited = new Date(Date.now() - 1000 * 60 * 47).toISOString();

  return (
    <StudioLayout>
      <div className="container-wide space-y-2 px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
              Studio
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Good evening, Iris.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Your draft is waiting. Pick up where you left off, or open something new.
            </p>
          </div>

          {/* Demo-only toggle so the empty state is reviewable */}
          <button
            type="button"
            onClick={() => setShowEmpty((v) => !v)}
            className="rounded-full bg-foreground/[0.04] px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
          >
            Demo · {showEmpty ? "with stories" : "empty state"}
          </button>
        </header>

        {/* 1 — Continue Writing */}
        {!showEmpty && (
          <div className="pt-10">
            <ContinueWritingHero
              storyTitle={heroStory.title}
              storyCoverUrl={heroStory.coverUrl}
              chapterIndex={heroStory.chaptersCount + 1}
              chapterTitle="The Smoke Atlas"
              lastEditedAt={heroLastEdited}
              draftWordCount={2_184}
              writingStreakDays={12}
            />
          </div>
        )}

        {/* 2 — My Stories */}
        <Section
          tone="utility"
          title="My stories"
          subtitle="Everything you're writing, in one quiet shelf."
        >
          {showEmpty ? (
            <StoriesEmptyState onCreate={() => setShowEmpty(false)} />
          ) : (
            <div className="space-y-8">
              <StoryFilters
                filter={filter}
                onFilterChange={setFilter}
                sort={sort}
                onSortChange={setSort}
                counts={counts}
              />
              {visible.length === 0 ? (
                <div className="rounded-2xl bg-surface-1/40 px-6 py-12 text-center text-sm text-muted-foreground">
                  Nothing here yet under this filter.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {visible.map(({ story, publishState }) => (
                    <StudioStoryCard
                      key={story.id}
                      story={story}
                      publishState={publishState}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Section>

        {/* 3 — Quick Actions */}
        <Section
          tone="utility"
          title="Quick actions"
          subtitle="One click to the things you reach for most."
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <QuickActionCard
              primary
              label="New story"
              description="Start a fresh manuscript."
              icon={PenLine}
            />
            <QuickActionCard
              label="Import story"
              description="Bring work in from elsewhere."
              icon={Upload}
            />
            <QuickActionCard
              label="Story World"
              description="Characters, places, lore."
              icon={Sparkles}
            />
            <QuickActionCard
              label="Publishing queue"
              description="Scheduled and ready to ship."
              icon={CalendarClock}
            />
          </div>
        </Section>

        {/* 4 — Writing Insights */}
        <Section
          tone="utility"
          title="Writing insights"
          subtitle="A quiet pulse of how your work is being read."
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <InsightStat label="Stories published" value={String(counts.published)} />
            <InsightStat label="Drafts" value={String(counts.drafts)} />
            <InsightStat label="Followers" value="48.2K" />
            <InsightStat label="Reads" value="1.2M" hint="all-time" />
            <InsightStat label="Comments" value="3,140" hint="last 30 days" />
          </div>
        </Section>
      </div>
    </StudioLayout>
  );
}
