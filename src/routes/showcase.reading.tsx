import { createFileRoute } from "@tanstack/react-router";
import { ReadingExperience } from "@/components/reading";
import {
  firstChapterId,
  getMockChapter,
  mockChapters,
} from "@/mock/chapters";

export const Route = createFileRoute("/showcase/reading")({
  head: () => ({
    meta: [
      { title: "Reading Experience v1.0 — Fyndor NDS" },
      {
        name: "description",
        content:
          "The official Fyndor Reading Experience. Distraction-free, immersive chapter reader with continuous reading flow.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShowcasePage,
});

function ShowcasePage() {
  const initial = mockChapters[firstChapterId];
  return (
    <ReadingExperience
      storyTitle="Ash & Atlas"
      initialChapter={initial}
      getChapter={getMockChapter}
      backTo="/showcase/story-detail"
    />
  );
}
