import { Feather } from "lucide-react";

interface Props {
  onCreate?: () => void;
}

export function WorldBuilderEmpty({ onCreate }: Props) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-surface-1/40 px-8 py-16 text-center">
      <div
        className="mx-auto grid size-14 place-items-center rounded-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 70%)",
        }}
      >
        <Feather className="h-6 w-6 text-brand-glow" aria-hidden />
      </div>
      <h3 className="mt-6 font-display text-2xl tracking-tight text-foreground">
        Start building your world.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Create characters, locations, organizations and terms that help your
        story universe feel alive.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-7 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-primary-foreground transition-[filter] duration-[var(--transition-base)] hover:brightness-110"
        style={{ backgroundImage: "var(--gradient-brand-soft)" }}
      >
        Create first entity
      </button>
    </div>
  );
}
