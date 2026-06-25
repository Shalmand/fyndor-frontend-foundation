import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Compass, BarChart3, BookOpen } from "lucide-react";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section, SectionSkeleton, SectionEmpty } from "@/components/section";

export const Route = createFileRoute("/showcase/section")({
  head: () => ({
    meta: [
      { title: "Section v1.0 — Fyndor NDS-002" },
      {
        name: "description",
        content:
          "The reusable Section primitive for the Fyndor Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SectionShowcase,
});

function Placeholder({ label }: { label: string }) {
  // Quiet body placeholder — represents where Carousel/Grid/Table will live.
  return (
    <div className="grid h-32 place-items-center rounded-2xl bg-surface-1/40 text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
      {label}
    </div>
  );
}

function Group({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-foreground/[0.04] pt-10 first:border-t-0 first:pt-0">
      <div className="mb-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
        {eyebrow}
      </div>
      <p className="mb-2 max-w-xl text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}

function SectionShowcase() {
  return (
    <PublicLayout>
      <main className="container-wide py-16">
        <header className="mb-16 max-w-3xl">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground/80">
            NDS-002
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Section v1.0
          </h1>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            The reusable content-block primitive for Fyndor. Every block on
            Home, Explore, Library, Universes, Franchises, Collections,
            Studio and Community begins here. Separation comes from
            whitespace — never lines.
          </p>
        </header>

        <div className="space-y-16">
          <Group
            eyebrow="01 — Title only"
            description="The quietest form. Used when context already makes the section's intent obvious."
          >
            <Section title="Continue Reading">
              <Placeholder label="Body slot · carousel / grid / table" />
            </Section>
          </Group>

          <Group
            eyebrow="02 — Title + Subtitle"
            description="Subtitle supports the title without competing. Reserved for editorial framing."
          >
            <Section
              title="Hidden Gems"
              subtitle="Quietly remarkable stories surfaced by the Fyndor editors this week."
            >
              <Placeholder label="Body slot" />
            </Section>
          </Group>

          <Group
            eyebrow="03 — Title + Subtitle + Action"
            description="The full editorial header. The action is deliberately understated and never competes with the title."
          >
            <Section
              title="Editor's Picks"
              subtitle="Hand-selected stories from across the Fyndor universe."
              action={{ label: "View all", onClick: () => undefined }}
            >
              <Placeholder label="Body slot" />
            </Section>
          </Group>

          <Group
            eyebrow="04 — With icon"
            description="A small leading mark, used sparingly to signal recurring rails like 'Featured' or 'Trending'."
          >
            <Section
              icon={Sparkles}
              title="Featured Collections"
              subtitle="Curated journeys through worlds, characters and themes."
              action={{ label: "Explore all", onClick: () => undefined }}
            >
              <Placeholder label="Body slot" />
            </Section>
          </Group>

          <Group
            eyebrow="05 — Utility tone"
            description="Sans-serif interface variant. Use in Studio, Settings, Analytics and Admin where the voice is functional, not editorial."
          >
            <Section
              tone="utility"
              icon={BarChart3}
              title="Reading Analytics"
              subtitle="Last 30 days across all your published stories."
              action={{ label: "Open report", onClick: () => undefined }}
            >
              <Placeholder label="Chart / table" />
            </Section>
          </Group>

          <Group
            eyebrow="06 — Loading skeleton"
            description="Calm placeholder that mirrors the eventual layout. No spinners, no shimmer noise."
          >
            <SectionSkeleton withSubtitle withAction>
              <Placeholder label="Body skeleton" />
            </SectionSkeleton>
          </Group>

          <Group
            eyebrow="07 — Empty state"
            description="Lives inside the Section as its body. Soft surface, no borders, a single gentle next step."
          >
            <Section
              icon={BookOpen}
              title="Your Library"
              subtitle="Stories you save will appear here."
            >
              <SectionEmpty
                message="Nothing saved yet."
                hint="Bookmark a story while you read and it will land here for next time."
                action={{ label: "Discover stories", onClick: () => undefined }}
              />
            </Section>
          </Group>

          <Group
            eyebrow="08 — Responsive behaviour"
            description="On desktop the action sits opposite the title. On narrow viewports it drops beneath, preserving rhythm."
          >
            <div className="mx-auto max-w-sm rounded-3xl bg-surface-1/30 px-5">
              <Section
                icon={Compass}
                title="Explore Universes"
                subtitle="Worlds growing across the Fyndor community."
                action={{ label: "View all", onClick: () => undefined }}
              >
                <Placeholder label="Mobile width preview" />
              </Section>
            </div>
          </Group>
        </div>
      </main>
    </PublicLayout>
  );
}
