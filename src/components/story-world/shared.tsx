import { Sparkles } from "lucide-react";
import type { LoreEntityKind } from "./types";

const KIND_LABEL: Record<LoreEntityKind, string> = {
  character: "Character",
  location: "Location",
  organization: "Organization",
  item: "Item",
  creature: "Creature",
  glossary: "Glossary",
};

/** Small uppercase eyebrow tag identifying the entity kind. */
export function KindEyebrow({ kind }: { kind: LoreEntityKind }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-reader-muted">
      <Sparkles className="h-3 w-3" />
      {KIND_LABEL[kind]}
    </span>
  );
}

/**
 * MetaRow — name + value pair used across every entity view.
 * Quiet by default. Stacks on mobile.
 */
export function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-1 py-3">
      <dt className="text-[11px] uppercase tracking-[0.16em] text-reader-muted">
        {label}
      </dt>
      <dd className="text-sm text-reader-fg/95">{children}</dd>
    </div>
  );
}

/** Soft chip for related people / orgs / terms. Optional onClick deep-links to another entity. */
export function RelationChip({
  name,
  onSelect,
}: {
  name: string;
  onSelect?: () => void;
}) {
  const className =
    "inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-xs text-reader-fg/90 transition-colors hover:bg-white/[0.08]";
  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className={className}>
        {name}
      </button>
    );
  }
  return <span className={className}>{name}</span>;
}

/** Section header inside a drawer view — e.g. "Relationships". */
export function DrawerSectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] uppercase tracking-[0.22em] text-reader-muted">
      {children}
    </h3>
  );
}

/** Editorial body copy used for descriptions / definitions. */
export function DrawerProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-reading text-[15px] leading-[1.75] text-reader-fg/90">
      {children}
    </p>
  );
}
