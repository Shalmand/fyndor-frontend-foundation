import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fyndor — Discover stories worth reading" },
      {
        name: "description",
        content:
          "A cinematic reading platform for original fiction and fanfiction. Sprint 00.1 — frontend foundation.",
      },
    ],
  }),
  component: IndexRoute,
});

function IndexRoute() {
  return (
    <PublicLayout>
      <PlaceholderSection
        eyebrow="Sprint 00.1"
        title="Foundation ready"
        body="Design system, layouts, routing and mock data are in place. Pages will be implemented in the next sprint."
      />
    </PublicLayout>
  );
}

/**
 * Shared placeholder for empty routes during foundation sprint.
 * Lives here intentionally — gets removed when real pages land.
 */
function PlaceholderSection({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="container-wide flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">{eyebrow}</p>
      <h1 className="mt-4 max-w-2xl font-display text-display-md font-semibold tracking-tight text-foreground sm:text-display-lg">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">{body}</p>
    </section>
  );
}
