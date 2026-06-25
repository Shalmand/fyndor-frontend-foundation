import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/layouts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Fyndor" },
      { name: "description", content: "Internal administration console." },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <AdminLayout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Admin</p>
          <p className="mt-3 font-display text-2xl text-foreground">Coming in the next sprint</p>
        </div>
      </div>
    </AdminLayout>
  );
}
