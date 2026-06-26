/**
 * Story World — entity model.
 *
 * Single discriminated union covering every entity type the Drawer
 * can present. Mock-only today; same shape will back the future
 * Story Studio editor (view-only here, by design).
 */

export type LoreEntityKind =
  | "character"
  | "location"
  | "organization"
  | "item"
  | "creature"
  | "glossary";

interface BaseEntity {
  id: string;
  kind: LoreEntityKind;
  name: string;
  /** Short editorial caption shown under the name. */
  tagline?: string;
}

export interface CharacterEntity extends BaseEntity {
  kind: "character";
  portraitUrl: string;
  role: string;
  firstAppearance: string;
  status: "Alive" | "Deceased" | "Unknown" | "Missing";
  relationships: Array<{ name: string; relation: string; entityId?: string }>;
  organizations: Array<{ name: string; entityId?: string }>;
  description: string;
}

export interface LocationEntity extends BaseEntity {
  kind: "location";
  bannerUrl: string;
  type: string;
  importantCharacters: Array<{ name: string; entityId?: string }>;
  description: string;
}

export interface OrganizationEntity extends BaseEntity {
  kind: "organization";
  symbolUrl: string;
  members: Array<{ name: string; role?: string; entityId?: string }>;
  description: string;
}

export interface ItemEntity extends BaseEntity {
  kind: "item";
  artworkUrl: string;
  owner: string;
  status: string;
  description: string;
}

export interface CreatureEntity extends BaseEntity {
  kind: "creature";
  artworkUrl: string;
  classification: string;
  habitat: string;
  description: string;
}

export interface GlossaryEntity extends BaseEntity {
  kind: "glossary";
  term: string;
  definition: string;
  relatedTerms: Array<{ name: string; entityId?: string }>;
}

export type LoreEntity =
  | CharacterEntity
  | LocationEntity
  | OrganizationEntity
  | ItemEntity
  | CreatureEntity
  | GlossaryEntity;

/** Resolver signature — the drawer fetches entities by id. */
export type LoreResolver = (id: string) => LoreEntity | undefined;
