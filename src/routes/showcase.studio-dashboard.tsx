import { createFileRoute } from "@tanstack/react-router";
import {
  PenLine,
  BookPlus,
  Sparkles,
  Send,
} from "lucide-react";
import { StudioLayout } from "@/layouts";
import { Section } from "@/components/section";
import {
  ContinueWritingHero,
  StudioStoryCard,
  QuickActionCard,
  InsightStat,
} from "@/components/studio";
import { mockStories } from "@/mock/stories";

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

/* The author we render the studio for. Iris Vale has multiple stories,
   so the My Stories shelf has real content. */
const CURRENT_AUTHOR_ID = "a_iris_vale";

function StudioDashboardShowcase() {
  const myStories = mockStories.filter((s) => s.authorId === CURRENT_AUTHOR_ID);
  const heroStory = myStories[0] ?? mockStories[0];

  // Synthesize a "current draft" for the hero — Studio data is mock-only.
  const heroLastEdited = new Date(Date.now() - 1000 * 60 * 47).toISOString();

  return (
    <StudioLayout>
      <div className="container-wide space-y-2 px-4 pb-24 pt-10 md:px-8 md:pt-14">
        {/* Greeting */}
        <header className="max-w-2xl">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
            Studio
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Good evening, Iris.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your draft is waiting. Pick up where you left off, or open something new.
          </p>
        </header>

        {/* 1 — Continue Writing */}
        <div className="pt-10">
          <ContinueWritingHero
            storyTitle={heroStory.title}
            storyCoverUrl={heroStory.coverUrl}
            chapterIndex={heroStory.chaptersCount + 1}
            chapterTitle="The Smoke Atlas"
            lastEditedAt={heroLastEdited}
            draftWordCount={2_184}
          />
        </div>

        {/* 2 — My Stories */}
        <Section
          tone="utility"
          title="My stories"
          subtitle="Everything you're writing, in one quiet shelf."
          action={{ label: "All stories", onClick: () => {} }}
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {myStories.map((s, i) => (
              <StudioStoryCard
                key={s.id}
                story={s}
                // Demonstrate the Draft state for one card.
                isDraft={i === myStories.length - 1}
              />
            ))}
          </div>
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
              label="New chapter"
              description="Continue a current story."
              icon={BookPlus}
            />
            <QuickActionCard
              label="Story World"
              description="Characters, places, lore."
              icon={Sparkles}
            />
            <QuickActionCard
              label="Publish"
              description="Share a finished draft."
              icon={Send}
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
            <InsightStat label="Stories published" value="6" />
            <InsightStat label="Total reads" value="1.2M" hint="all-time" />
            <InsightStat label="Followers" value="48.2K" />
            <InsightStat label="Comments" value="3,140" hint="last 30 days" />
            <InsightStat
              label="Avg. reading time"
              value="22 min"
              hint="per session"
            />
          </div>
        </Section>
      </div>
    </StudioLayout>
  );
}
