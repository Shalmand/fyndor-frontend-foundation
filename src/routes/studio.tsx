import { createFileRoute } from "@tanstack/react-router";
import { StudioLayout } from "@/layouts";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Fyndor" },
      { name: "description", content: "Author workspace on Fyndor." },
    ],
  }),
  component: StudioRoute,
});

function StudioRoute() {
  return (
    <StudioLayout>
      <div className="container-wide flex min-h-[60vh] items-center justify-center py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Studio</p>
          <p className="mt-3 font-display text-2xl text-foreground">Coming in the next sprint</p>
        </div>
      </div>
    </StudioLayout>
  );
}
