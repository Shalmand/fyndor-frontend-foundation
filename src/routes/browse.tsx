import { createFileRoute } from "@tanstack/react-router";
import { ReaderLayout } from "@/layouts";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse — Fyndor" },
      { name: "description", content: "Browse stories, universes and franchises on Fyndor." },
    ],
  }),
  component: BrowseRoute,
});

function BrowseRoute() {
  return (
    <ReaderLayout>
      <RoutePlaceholder label="Browse" />
    </ReaderLayout>
  );
}

function RoutePlaceholder({ label }: { label: string }) {
  return (
    <div className="container-wide flex min-h-[60vh] items-center justify-center py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">{label}</p>
        <p className="mt-3 font-display text-2xl text-foreground">Coming in the next sprint</p>
      </div>
    </div>
  );
}
