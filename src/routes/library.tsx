import { createFileRoute } from "@tanstack/react-router";
import { ReaderLayout } from "@/layouts";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Fyndor" },
      { name: "description", content: "Your reading library on Fyndor." },
    ],
  }),
  component: LibraryRoute,
});

function LibraryRoute() {
  return (
    <ReaderLayout>
      <div className="container-wide flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Library</p>
          <p className="mt-3 font-display text-2xl text-foreground">Coming in the next sprint</p>
        </div>
      </div>
    </ReaderLayout>
  );
}
