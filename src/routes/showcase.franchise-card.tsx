import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import { Carousel, CarouselItem } from "@/components/carousel";
import {
  FranchiseCard,
  FranchiseCardSkeleton,
  FranchiseCardEmpty,
} from "@/components/franchise-card";
import { mockFranchiseCards } from "@/mock/franchiseCards";

export const Route = createFileRoute("/showcase/franchise-card")({
  head: () => ({
    meta: [
      { title: "Franchise Card v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official Franchise Card for the Fyndor Narrative Design System. A landscape editorial card that invites readers into fanfiction inside an existing entertainment property.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const [hp, got, naruto, op, pokemon, marvel, sw, witcher] =
    mockFranchiseCards;

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
            Franchise Card <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Franchise Card is a doorway into fanfiction written inside an
            existing entertainment property. Panoramic atmosphere, a short
            editorial line, the media category, and an optional popularity
            badge. The entire card is the link.
          </p>
          <p className="mt-4 max-w-2xl rounded-2xl bg-surface-1/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground/90">
              Architecture note —
            </span>{" "}
            Original story worlds never appear in this component. They live
            inside each Story via the Lore System and are never listed
            globally on Fyndor. Only existing franchises belong here.
          </p>
        </header>

        {/* 1. Default grid — eight known franchises */}
        <Section
          title="Eight franchises"
          subtitle="Each card invites readers into the fanfiction written inside one existing world."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {mockFranchiseCards.map((f) => (
              <FranchiseCard key={f.id} franchise={f} />
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
              <FranchiseCard franchise={hp} />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Hover
              </p>
              <FranchiseCard franchise={got} state="hover" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Focus
              </p>
              <FranchiseCard franchise={naruto} state="focus" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Pressed
              </p>
              <FranchiseCard franchise={op} state="pressed" />
            </div>
          </div>
        </Section>

        {/* 3. In a Carousel */}
        <Section
          title="In a Carousel"
          subtitle="Franchises scroll naturally inside the locked Carousel v1.0."
        >
          <Carousel ariaLabel="Featured franchises">
            {mockFranchiseCards.map((f) => (
              <CarouselItem
                key={f.id}
                size="xl"
                className="!max-w-none w-[82vw] sm:!w-[26rem] md:!w-[30rem] lg:!w-[34rem]"
              >
                <FranchiseCard franchise={f} />
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
            <FranchiseCardSkeleton />
            <FranchiseCardSkeleton />
          </div>
        </Section>

        {/* 5. Empty state */}
        <Section
          title="Empty"
          subtitle="When no franchises are surfaced yet, the surface stays calm."
          tone="utility"
        >
          <FranchiseCardEmpty />
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
                  <FranchiseCard franchise={pokemon} />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Tablet
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <FranchiseCard franchise={marvel} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Desktop
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <FranchiseCard franchise={sw} />
              </div>
            </div>
          </div>
        </Section>

        {/* Footer note */}
        <div className="mt-20">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Locked as the official Franchise Card v1.0 for the Fyndor
            Narrative Design System. Existing entertainment franchises only —
            original story worlds belong inside each story's Lore System and
            are never listed globally. The eighth card, {witcher.name}, is
            shown above in the default grid.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
