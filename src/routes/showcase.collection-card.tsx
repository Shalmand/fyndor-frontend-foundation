import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { Section } from "@/components/section";
import {
  Carousel,
  CarouselItem,
} from "@/components/carousel";
import {
  CollectionCard,
  CollectionCardSkeleton,
  CollectionCardEmpty,
} from "@/components/collection-card";
import { mockCollections } from "@/mock";

export const Route = createFileRoute("/showcase/collection-card")({
  head: () => ({
    meta: [
      { title: "Collection Card v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official editorial recommendation card for the Fyndor Narrative Design System.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const [first, second, third, fourth, fifth, sixth] = mockCollections;

  return (
    <PublicLayout>
      <div className="container-wide pt-10 pb-24 sm:pt-16">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              NDS-005
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
              v1.0
            </span>
          </div>
          <h1 className="font-display text-display-md leading-[1.05] text-foreground sm:text-display-lg">
            Collection Card <span className="text-gradient-brand">v1.0</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            An editorial recommendation, not a story. Collections gather reading
            experiences — moods, themes, staff picks — around large banner
            artwork and a calm editorial line. Cinematic, premium, quietly
            curated.
          </p>
        </header>

        {/* 1. Default grid */}
        <Section
          title="Editorial collections"
          subtitle="Default state across curator flavors. Whole card is the link target."
        >
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {mockCollections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        </Section>

        {/* 2. Interaction states */}
        <Section
          title="Interaction states"
          subtitle="Soft elevation and a 4% banner zoom on hover. No motion competes with the artwork."
          tone="utility"
        >
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Default
              </p>
              <CollectionCard collection={first} />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Hover
              </p>
              <CollectionCard collection={second} state="hover" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Focus
              </p>
              <CollectionCard collection={third} state="focus" />
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Pressed
              </p>
              <CollectionCard collection={fourth} state="pressed" />
            </div>
          </div>
        </Section>

        {/* 3. Inside a Carousel */}
        <Section
          title="In a Carousel"
          subtitle="Collections behave naturally inside the locked Carousel v1.0 rhythm."
        >
          <Carousel ariaLabel="Editorial collections">
            {mockCollections.map((c) => (
              <CarouselItem key={c.id} size="lg">
                <CollectionCard collection={c} />
              </CarouselItem>
            ))}
          </Carousel>
        </Section>

        {/* 4. Loading skeleton */}
        <Section
          title="Loading"
          subtitle="Matches the 3:2 banner rhythm. No shimmer."
          tone="utility"
        >
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <CollectionCardSkeleton />
            <CollectionCardSkeleton />
            <CollectionCardSkeleton />
          </div>
        </Section>

        {/* 5. Empty state */}
        <Section
          title="Empty"
          subtitle="When a curator has nothing to show, the surface stays quiet."
          tone="utility"
        >
          <CollectionCardEmpty />
        </Section>

        {/* 6. Responsive frames */}
        <Section
          title="Responsive behavior"
          subtitle="Banner-led on every breakpoint. No layout swap, no broken hierarchy."
          tone="utility"
        >
          <div className="grid gap-10 lg:grid-cols-[20rem_28rem_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Mobile
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <div className="mx-auto w-full max-w-[18rem]">
                  <CollectionCard collection={fifth} />
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Tablet
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <CollectionCard collection={sixth} />
              </div>
            </div>
            <div>
              <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/70">
                Desktop
              </p>
              <div className="overflow-hidden rounded-2xl bg-surface-1/40 p-5">
                <div className="grid grid-cols-2 gap-6">
                  <CollectionCard collection={first} />
                  <CollectionCard collection={third} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer note */}
        <div className="mt-20">
          <div className="soft-rule mb-10" />
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This component is locked as the official Collection Card v1.0 for
            the Fyndor Narrative Design System. Editorial themes only —
            franchise-specific collections belong inside their respective
            Universe pages.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
