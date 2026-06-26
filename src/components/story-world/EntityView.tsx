import type {
  CharacterEntity,
  CreatureEntity,
  GlossaryEntity,
  ItemEntity,
  LocationEntity,
  LoreEntity,
  OrganizationEntity,
} from "./types";
import {
  DrawerProse,
  DrawerSectionHeader,
  KindEyebrow,
  MetaRow,
  RelationChip,
} from "./shared";

interface ViewProps {
  entity: LoreEntity;
  onSelect?: (entityId: string) => void;
}

/**
 * EntityView — routes to the correct per-kind layout.
 * The drawer shell stays kind-agnostic; this is the only switch.
 */
export function EntityView({ entity, onSelect }: ViewProps) {
  switch (entity.kind) {
    case "character":
      return <CharacterView entity={entity} onSelect={onSelect} />;
    case "location":
      return <LocationView entity={entity} onSelect={onSelect} />;
    case "organization":
      return <OrganizationView entity={entity} onSelect={onSelect} />;
    case "item":
      return <ItemView entity={entity} />;
    case "creature":
      return <CreatureView entity={entity} />;
    case "glossary":
      return <GlossaryView entity={entity} onSelect={onSelect} />;
  }
}

/* ─── per-kind layouts ───────────────────────────────────────────────── */

function CharacterView({
  entity,
  onSelect,
}: {
  entity: CharacterEntity;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-5 px-6 pt-2">
        <img
          src={entity.portraitUrl}
          alt=""
          className="h-24 w-24 shrink-0 rounded-2xl object-cover shadow-[var(--shadow-elevated)]"
        />
        <div className="min-w-0 flex-1 pt-1">
          <KindEyebrow kind={entity.kind} />
          <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
            {entity.name}
          </h2>
          {entity.tagline && (
            <p className="mt-1.5 text-sm text-reader-muted">{entity.tagline}</p>
          )}
        </div>
      </div>

      <div className="mt-8 px-6">
        <dl className="divide-y divide-white/[0.04]">
          <MetaRow label="Role">{entity.role}</MetaRow>
          <MetaRow label="First seen">{entity.firstAppearance}</MetaRow>
          <MetaRow label="Status">{entity.status}</MetaRow>
        </dl>
      </div>

      {entity.relationships.length > 0 && (
        <div className="mt-8 px-6">
          <DrawerSectionHeader>Relationships</DrawerSectionHeader>
          <div className="mt-3 flex flex-wrap gap-2">
            {entity.relationships.map((r, i) => (
              <RelationChip
                key={i}
                name={`${r.name} · ${r.relation}`}
                onSelect={r.entityId ? () => onSelect?.(r.entityId!) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {entity.organizations.length > 0 && (
        <div className="mt-8 px-6">
          <DrawerSectionHeader>Organizations</DrawerSectionHeader>
          <div className="mt-3 flex flex-wrap gap-2">
            {entity.organizations.map((o, i) => (
              <RelationChip
                key={i}
                name={o.name}
                onSelect={o.entityId ? () => onSelect?.(o.entityId!) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 px-6 pb-10">
        <DrawerSectionHeader>About</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.description}</DrawerProse>
        </div>
      </div>
    </div>
  );
}

function LocationView({
  entity,
  onSelect,
}: {
  entity: LocationEntity;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[21/10] w-full overflow-hidden">
        <img
          src={entity.bannerUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--reader-bg)] via-[var(--reader-bg)]/30 to-transparent" />
      </div>

      <div className="-mt-10 px-6">
        <KindEyebrow kind={entity.kind} />
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
          {entity.name}
        </h2>
        {entity.tagline && (
          <p className="mt-1.5 text-sm text-reader-muted">{entity.tagline}</p>
        )}
      </div>

      <div className="mt-8 px-6">
        <dl className="divide-y divide-white/[0.04]">
          <MetaRow label="Type">{entity.type}</MetaRow>
        </dl>
      </div>

      {entity.importantCharacters.length > 0 && (
        <div className="mt-8 px-6">
          <DrawerSectionHeader>Important characters</DrawerSectionHeader>
          <div className="mt-3 flex flex-wrap gap-2">
            {entity.importantCharacters.map((c, i) => (
              <RelationChip
                key={i}
                name={c.name}
                onSelect={c.entityId ? () => onSelect?.(c.entityId!) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 px-6 pb-10">
        <DrawerSectionHeader>About</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.description}</DrawerProse>
        </div>
      </div>
    </div>
  );
}

function OrganizationView({
  entity,
  onSelect,
}: {
  entity: OrganizationEntity;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 px-6 pt-2">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
          <img src={entity.symbolUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
        </div>
        <div className="min-w-0 flex-1">
          <KindEyebrow kind={entity.kind} />
          <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
            {entity.name}
          </h2>
          {entity.tagline && (
            <p className="mt-1.5 text-sm text-reader-muted">{entity.tagline}</p>
          )}
        </div>
      </div>

      {entity.members.length > 0 && (
        <div className="mt-8 px-6">
          <DrawerSectionHeader>Members</DrawerSectionHeader>
          <ul className="mt-3 divide-y divide-white/[0.04]">
            {entity.members.map((m, i) => (
              <li key={i} className="flex items-center justify-between py-3">
                <button
                  type="button"
                  disabled={!m.entityId}
                  onClick={m.entityId ? () => onSelect?.(m.entityId!) : undefined}
                  className="text-left text-sm text-reader-fg/95 transition-colors enabled:hover:text-reader-fg disabled:cursor-default"
                >
                  {m.name}
                </button>
                {m.role && (
                  <span className="text-xs text-reader-muted">{m.role}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 px-6 pb-10">
        <DrawerSectionHeader>About</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.description}</DrawerProse>
        </div>
      </div>
    </div>
  );
}

function ItemView({ entity }: { entity: ItemEntity }) {
  return (
    <div className="flex flex-col">
      <div className="relative mx-6 mt-2 aspect-square overflow-hidden rounded-2xl">
        <img src={entity.artworkUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="mt-6 px-6">
        <KindEyebrow kind={entity.kind} />
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
          {entity.name}
        </h2>
        {entity.tagline && <p className="mt-1.5 text-sm text-reader-muted">{entity.tagline}</p>}
      </div>
      <div className="mt-6 px-6">
        <dl className="divide-y divide-white/[0.04]">
          <MetaRow label="Owner">{entity.owner}</MetaRow>
          <MetaRow label="Status">{entity.status}</MetaRow>
        </dl>
      </div>
      <div className="mt-8 px-6 pb-10">
        <DrawerSectionHeader>About</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.description}</DrawerProse>
        </div>
      </div>
    </div>
  );
}

function CreatureView({ entity }: { entity: CreatureEntity }) {
  return (
    <div className="flex flex-col">
      <div className="relative mx-6 mt-2 aspect-[4/3] overflow-hidden rounded-2xl">
        <img src={entity.artworkUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="mt-6 px-6">
        <KindEyebrow kind={entity.kind} />
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
          {entity.name}
        </h2>
        {entity.tagline && <p className="mt-1.5 text-sm text-reader-muted">{entity.tagline}</p>}
      </div>
      <div className="mt-6 px-6">
        <dl className="divide-y divide-white/[0.04]">
          <MetaRow label="Classification">{entity.classification}</MetaRow>
          <MetaRow label="Habitat">{entity.habitat}</MetaRow>
        </dl>
      </div>
      <div className="mt-8 px-6 pb-10">
        <DrawerSectionHeader>About</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.description}</DrawerProse>
        </div>
      </div>
    </div>
  );
}

function GlossaryView({
  entity,
  onSelect,
}: {
  entity: GlossaryEntity;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col px-6 pt-2 pb-10">
      <KindEyebrow kind={entity.kind} />
      <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-reader-fg">
        {entity.term}
      </h2>
      <div className="mt-6">
        <DrawerSectionHeader>Definition</DrawerSectionHeader>
        <div className="mt-3">
          <DrawerProse>{entity.definition}</DrawerProse>
        </div>
      </div>
      {entity.relatedTerms.length > 0 && (
        <div className="mt-8">
          <DrawerSectionHeader>Related</DrawerSectionHeader>
          <div className="mt-3 flex flex-wrap gap-2">
            {entity.relatedTerms.map((t, i) => (
              <RelationChip
                key={i}
                name={t.name}
                onSelect={t.entityId ? () => onSelect?.(t.entityId!) : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
