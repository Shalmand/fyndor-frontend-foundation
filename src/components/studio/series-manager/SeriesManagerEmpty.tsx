import { Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export function SeriesManagerEmpty({ onCreate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-foreground/[0.02] px-6 py-24 text-center">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand)_16%,transparent)]">
        <span aria-hidden="true" className="font-display text-2xl">✦</span>
      </div>
      <h2 className="font-display text-3xl tracking-tight">
        Connect your stories.
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Create a series, saga or shared universe to help readers understand how
        your stories belong together.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand/85 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-brand-foreground transition-opacity hover:opacity-90"
      >
        <Plus className="h-3 w-3" /> Create first series
      </button>
    </div>
  );
}
