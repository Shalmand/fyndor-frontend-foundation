import { createFileRoute } from "@tanstack/react-router";
import { ReadingLayout } from "@/layouts";

export const Route = createFileRoute("/read/$storyId")({
  head: () => ({
    meta: [
      { title: "Reading — Fyndor" },
      { name: "description", content: "Read on Fyndor." },
    ],
  }),
  component: ReadRoute,
});

function ReadRoute() {
  const { storyId } = Route.useParams();
  return (
    <ReadingLayout storyTitle="Untitled Story" chapterTitle={`Story ${storyId} · Chapter 1`}>
      <p className="text-reader-muted">
        Chapter content will render here in a future sprint.
      </p>
    </ReadingLayout>
  );
}
