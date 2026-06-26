import { Plus } from "lucide-react";

export function ChapterManagerEmpty({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="rounded-3xl bg-surface-1/50 px-6 py-20 text-center md:py-28">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-brand">
        A blank page is a beginning
      </p>
      <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
        Start your first chapter.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Every story begins with one scene. Create a chapter and start writing.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
        style={{ backgroundImage: "var(--gradient-brand-soft)" }}
      >
        <Plus className="h-4 w-4" />
        Create first chapter
      </button>
    </section>
  );
}
