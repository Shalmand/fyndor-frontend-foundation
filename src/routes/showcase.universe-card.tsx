import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import { Carousel, CarouselItem } from "@/components/carousel";
import {
  UniverseCard,
  UniverseCardSkeleton,
  UniverseCardEmpty,
} from "@/components/universe-card";
import { mockUniverseCards } from "@/mock/universeCards";

export const Route = createFileRoute("/showcase/universe-card")({
  head: () => ({
    meta: [
      { title: "Universe Card v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official Universe Card for the Fyndor Narrative Design System. A landscape editorial card that invites readers to explore an entire world.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const [ashen, arcane, nova, iron, hollow, ivory] = mockUniverseCards;

  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NDS-007
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
              v1.0
            </span>
          </div>
          <h1 className="font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Universe Card <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Universe is not a story — it is a world readers can step into.
            Panoramic atmosphere, an editorial line, a handful of traits that
            describe the world's identity. No statistics, no buttons. The
            entire card is the doorway.
          </p>
        </header>

        {/* 1. Default grid — six fictional universes */}
        <Section
          title="Six worlds"
          subtitle="Each universe carries its own atmosphere, palette and traits."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {mockUniverseCards.map((u) => (
              <UniverseCard key={u.id} universe={u} />
            ))}
          </div>
        </Section>

        {/* 2. Interaction states */}
        <Section
          title="Interaction states"
          subtitle="Soft elevation and a quiet banner zoom on hover. The card never moves up."
          tone="utility"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Default
              </p>
              <UniverseCard universe={ashen} />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Hover
              </p>
              <UniverseCard universe={arcane} state="hover" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Focus
              </p>
              <UniverseCard universe={nova} state="focus" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Pressed
              </p>
              <UniverseCard universe={iron} state="pressed" />
            </div>
          </div>
        </Section>

        {/* 3. In a Carousel */}
        <Section
          title="In a Carousel"
          subtitle="Universes scroll naturally inside the locked Carousel v1.0."
        >
          <Carousel ariaLabel="Featured universes">
            {mockUniverseCards.map((u) => (
              <CarouselItem key={u.id} size="xl">
                <UniverseCard universe={u} />
              </CarouselItem>
            ))}
          </Carousel>
        </Section>

        {/* 4. Loading skeletons */}
        <Section
          title="Loading"
          subtitle="Mirrors the panoramic rhythm. No shimmer."
          tone="utility"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <UniverseCardSkeleton />
            <UniverseCardSkeleton />
          </div>
        </Section>

        {/* 5. Empty state */}
        <Section
          title="Empty"
          subtitle="When no worlds are open yet, the surface stays calm."
          tone="utility"
        >
          <UniverseCardEmpty />
        </Section>

        {/* 6. Responsive frames */}
        <Section
          title="Responsive behavior"
          subtitle="Banner-led on every breakpoint. Content reflows, the hierarchy holds."
          tone="utility"
        >
          <div className="grid gap-10 lg:grid-cols-[20rem_30rem_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Mobile
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <div className="mx-auto w-full max-w-[19rem]">
                  <UniverseCard universe={hollow} />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Tablet
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <UniverseCard universe={ivory} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Desktop
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <UniverseCard universe={ashen} />
              </div>
            </div>
          </div>
        </Section>

        {/* Footer note */}
        <div className="mt-20">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This component is locked as the official Universe Card v1.0 for the
            Fyndor Narrative Design System. A doorway into a world — never a
            story, never a database row.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
