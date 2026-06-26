import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Globe2,
  Image as ImageIcon,
  PenLine,
  Search,
  Sparkles,
  Tags,
  Upload,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockGenres } from "@/mock/genres";
import { mockFranchiseCards } from "@/mock/franchiseCards";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type StoryType = "original" | "fanfiction";
export type AgeRating = "all" | "teen" | "mature" | "adult";

export interface WizardDraft {
  type: StoryType | null;
  franchiseSlug?: string;
  title: string;
  synopsis: string;
  language: string;
  genres: string[];
  tags: string[];
  ageRating: AgeRating;
  coverUrl?: string;
  bannerUrl?: string;
  storyWorldEnabled: boolean;
  // bookkeeping
  step: number;
  updatedAt: number;
}

export const emptyDraft: WizardDraft = {
  type: null,
  title: "",
  synopsis: "",
  language: "en",
  genres: [],
  tags: [],
  ageRating: "teen",
  storyWorldEnabled: false,
  step: 0,
  updatedAt: Date.now(),
};

// Steps per flow (after Step 0 type selection).
const ORIGINAL_STEPS = [
  "Story details",
  "Genres & tags",
  "Cover & banner",
  "Story World",
  "Review",
] as const;

const FANFIC_STEPS = [
  "Franchise",
  "Story details",
  "Genres & tags",
  "Cover & banner",
  "Review",
] as const;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "ja", label: "Japanese" },
];

const AGE_RATINGS: { id: AgeRating; label: string; hint: string }[] = [
  { id: "all", label: "All ages", hint: "Suitable for everyone." },
  { id: "teen", label: "Teen", hint: "Mild themes, no explicit content." },
  { id: "mature", label: "Mature", hint: "Violence, language, complex themes." },
  { id: "adult", label: "Adult", hint: "Explicit content. 18+ readers only." },
];

const SUGGESTED_TAGS = [
  "slow burn", "found family", "enemies to lovers", "morally grey",
  "coming of age", "magic", "first contact", "court intrigue",
  "heist", "redemption", "post-war", "epistolary",
];

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────

export interface StoryWizardProps {
  /** Initial draft (used when resuming). */
  initialDraft?: WizardDraft;
  onCancel?: (draft: WizardDraft) => void;
  onComplete?: (draft: WizardDraft, action: "draft" | "later" | "write") => void;
  /** Called whenever the wizard autosaves between steps. */
  onAutosave?: (draft: WizardDraft) => void;
}

export function StoryWizard({
  initialDraft,
  onCancel,
  onComplete,
  onAutosave,
}: StoryWizardProps) {
  const [draft, setDraft] = useState<WizardDraft>(
    initialDraft ?? emptyDraft,
  );

  const steps = useMemo(
    () =>
      draft.type === "fanfiction"
        ? FANFIC_STEPS
        : draft.type === "original"
          ? ORIGINAL_STEPS
          : null,
    [draft.type],
  );

  const totalSteps = steps?.length ?? 0;
  // step 0 = type choice. step 1..N = per-flow.
  const isTypeStep = draft.step === 0 || draft.type === null;
  const flowIndex = isTypeStep ? -1 : draft.step - 1;

  // Autosave whenever step changes.
  useEffect(() => {
    if (draft.step > 0) onAutosave?.(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.step]);

  function patch(partial: Partial<WizardDraft>) {
    setDraft((d) => ({ ...d, ...partial, updatedAt: Date.now() }));
  }

  function goNext() {
    setDraft((d) => ({ ...d, step: d.step + 1, updatedAt: Date.now() }));
  }
  function goBack() {
    setDraft((d) => ({ ...d, step: Math.max(0, d.step - 1), updatedAt: Date.now() }));
  }

  // Validate current step → controls Next button state.
  const canAdvance = useMemo(() => {
    if (isTypeStep) return draft.type !== null;
    if (!draft.type) return false;
    const stepName = steps?.[flowIndex];
    switch (stepName) {
      case "Franchise":
        return Boolean(draft.franchiseSlug);
      case "Story details":
        return draft.title.trim().length >= 2 && draft.synopsis.trim().length >= 10;
      case "Genres & tags":
        return draft.genres.length >= 1;
      case "Cover & banner":
        return true; // optional
      case "Story World":
        return true; // optional
      case "Review":
        return true;
      default:
        return false;
    }
  }, [draft, steps, flowIndex, isTypeStep]);

  const progress = isTypeStep
    ? 0.05
    : (flowIndex + 1) / (totalSteps + 1) + 1 / (totalSteps + 1);

  return (
    <div className="relative">
      <WizardHeader
        progress={Math.min(1, progress)}
        stepLabel={
          isTypeStep
            ? "Begin"
            : `Step ${flowIndex + 1} of ${totalSteps} · ${steps?.[flowIndex]}`
        }
        onCancel={() => onCancel?.(draft)}
      />

      <div className="mx-auto max-w-2xl px-5 pb-32 pt-12 md:max-w-3xl md:pt-16">
        {isTypeStep ? (
          <Step0Type
            value={draft.type}
            onChange={(t) => patch({ type: t })}
          />
        ) : (
          <FlowStep
            draft={draft}
            stepName={steps![flowIndex]}
            patch={patch}
            onComplete={onComplete}
          />
        )}
      </div>

      {/* Don't show nav on Review step — it provides its own CTAs */}
      {!(steps?.[flowIndex] === "Review") && (
        <WizardFooter
          canBack={draft.step > 0}
          canNext={canAdvance}
          isFirst={isTypeStep}
          onBack={goBack}
          onNext={goNext}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header / Footer
// ─────────────────────────────────────────────────────────────────────────────

function WizardHeader({
  progress,
  stepLabel,
  onCancel,
}: {
  progress: number;
  stepLabel: string;
  onCancel?: () => void;
}) {
  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.04] bg-surface-0/70 px-4 backdrop-blur-xl md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          <Wand2 className="size-3.5 text-brand" aria-hidden />
          <span>New story</span>
          <span className="text-foreground/30">/</span>
          <span className="text-foreground/80">{stepLabel}</span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          aria-label="Save and close"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="relative h-px w-full overflow-hidden bg-white/[0.04]">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand/70 via-brand to-brand/70 transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function WizardFooter({
  canBack,
  canNext,
  isFirst,
  onBack,
  onNext,
}: {
  canBack: boolean;
  canNext: boolean;
  isFirst: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.04] bg-surface-0/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          disabled={!canBack}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]",
            "disabled:opacity-30 disabled:pointer-events-none",
          )}
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <p className="hidden text-xs text-muted-foreground/70 md:block">
          Autosaved as you go.
        </p>

        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
            "bg-gradient-to-r from-brand to-brand/85 text-white shadow-[0_8px_24px_-12px_var(--brand)]",
            "hover:from-brand hover:to-brand hover:shadow-[0_12px_28px_-12px_var(--brand)]",
            "disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none",
          )}
        >
          {isFirst ? "Continue" : "Next"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 0 — Type
// ─────────────────────────────────────────────────────────────────────────────

function Step0Type({
  value,
  onChange,
}: {
  value: StoryType | null;
  onChange: (t: StoryType) => void;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="Step 1"
        title="What are you about to write?"
        subtitle="This shapes the rest of the journey. You can always change your mind later."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <TypeCard
          selected={value === "original"}
          onClick={() => onChange("original")}
          icon={<PenLine className="size-5" />}
          label="Original story"
          description="A new world, your characters, your rules. Includes optional Story World tools."
        />
        <TypeCard
          selected={value === "fanfiction"}
          onClick={() => onChange("fanfiction")}
          icon={<Sparkles className="size-5" />}
          label="Fanfiction"
          description="Write inside an existing universe — Harry Potter, Marvel, Naruto, and more."
        />
      </div>
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  icon,
  label,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-[var(--transition-base)]",
        "bg-surface-1/60 backdrop-blur-md hover:bg-surface-2/70",
        selected &&
          "bg-[color-mix(in_oklab,var(--brand)_14%,var(--surface-1))] ring-1 ring-brand/60",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl",
            selected ? "bg-brand/30 text-white" : "bg-surface-2/80 text-foreground/85",
          )}
        >
          {icon}
        </span>
        <h3 className="font-display text-xl tracking-tight">{label}</h3>
        {selected && (
          <Check className="ml-auto size-4 text-brand" aria-hidden />
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Flow steps
// ─────────────────────────────────────────────────────────────────────────────

function FlowStep({
  draft,
  stepName,
  patch,
  onComplete,
}: {
  draft: WizardDraft;
  stepName: string;
  patch: (p: Partial<WizardDraft>) => void;
  onComplete?: StoryWizardProps["onComplete"];
}) {
  switch (stepName) {
    case "Franchise":
      return (
        <StepFranchise
          value={draft.franchiseSlug}
          onChange={(slug) => patch({ franchiseSlug: slug })}
        />
      );
    case "Story details":
      return <StepDetails draft={draft} patch={patch} />;
    case "Genres & tags":
      return <StepGenresTags draft={draft} patch={patch} />;
    case "Cover & banner":
      return <StepCover draft={draft} patch={patch} />;
    case "Story World":
      return (
        <StepStoryWorld
          enabled={draft.storyWorldEnabled}
          onChange={(v) => patch({ storyWorldEnabled: v })}
        />
      );
    case "Review":
      return <StepReview draft={draft} onComplete={onComplete} />;
    default:
      return null;
  }
}

// ── Franchise ────────────────────────────────────────────────────────────────

function StepFranchise({
  value,
  onChange,
}: {
  value?: string;
  onChange: (slug: string) => void;
}) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return mockFranchiseCards;
    return mockFranchiseCards.filter((f) =>
      f.name.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div className="space-y-8">
      <StepHeading
        eyebrow="Fanfiction"
        title="Pick the universe you want to write in."
        subtitle="Choose the franchise your story lives inside. You can write characters, settings, and storylines from this world."
      />
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search franchises…"
          className="w-full rounded-full bg-surface-1/60 py-3 pl-11 pr-4 text-sm outline-none placeholder:text-muted-foreground/70 focus:bg-surface-1/80 focus:ring-1 focus:ring-brand/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {results.map((f) => {
          const selected = f.slug === value;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.slug)}
              className={cn(
                "group relative overflow-hidden rounded-xl text-left transition-all duration-[var(--transition-base)]",
                "aspect-[3/2] bg-surface-1/60",
                selected && "ring-2 ring-brand",
              )}
            >
              <img
                src={f.bannerUrl}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-65 transition-opacity duration-500 group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/60">
                  {f.media.replace("-", " / ")}
                </p>
                <p className="mt-1 font-display text-base leading-tight tracking-tight text-white">
                  {f.name}
                </p>
              </div>
              {selected && (
                <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-brand text-white shadow">
                  <Check className="size-3.5" />
                </span>
              )}
            </button>
          );
        })}
        {results.length === 0 && (
          <div className="col-span-full rounded-xl bg-surface-1/40 px-4 py-12 text-center text-sm text-muted-foreground">
            No franchises match "{q}". More are being added.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Details ─────────────────────────────────────────────────────────────────

function StepDetails({
  draft,
  patch,
}: {
  draft: WizardDraft;
  patch: (p: Partial<WizardDraft>) => void;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow={draft.type === "fanfiction" ? "Step 2" : "Step 1"}
        title="Give your story a voice."
        subtitle="A working title and a short pitch — both can change later."
      />

      <Field label="Title" hint="Keep it evocative. Around 2–8 words.">
        <input
          value={draft.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Untitled manuscript"
          className="w-full rounded-xl bg-surface-1/60 px-4 py-3 font-display text-xl tracking-tight outline-none placeholder:text-muted-foreground/60 focus:bg-surface-1/80 focus:ring-1 focus:ring-brand/40"
        />
      </Field>

      <Field
        label="Synopsis"
        hint="2–3 sentences. Imagine a back-cover blurb."
        counter={`${draft.synopsis.length}/600`}
      >
        <textarea
          value={draft.synopsis}
          onChange={(e) => patch({ synopsis: e.target.value.slice(0, 600) })}
          rows={5}
          placeholder="In a city of paper lanterns, a young cartographer maps the only thing no one has seen…"
          className="w-full resize-none rounded-xl bg-surface-1/60 px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground/60 focus:bg-surface-1/80 focus:ring-1 focus:ring-brand/40"
        />
      </Field>

      <Field label="Language" icon={<Globe2 className="size-3.5" />}>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => {
            const selected = draft.language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => patch({ language: l.code })}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  selected
                    ? "bg-brand/20 text-foreground ring-1 ring-brand/50"
                    : "bg-surface-1/60 text-muted-foreground hover:bg-surface-2/70 hover:text-foreground",
                )}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </Field>
    </div>
  );
}

// ── Genres & Tags ───────────────────────────────────────────────────────────

function StepGenresTags({
  draft,
  patch,
}: {
  draft: WizardDraft;
  patch: (p: Partial<WizardDraft>) => void;
}) {
  const [tagDraft, setTagDraft] = useState("");

  function toggleGenre(id: string) {
    const exists = draft.genres.includes(id);
    if (exists) patch({ genres: draft.genres.filter((g) => g !== id) });
    else if (draft.genres.length < 3) patch({ genres: [...draft.genres, id] });
  }
  function addTag(t: string) {
    const v = t.trim().toLowerCase();
    if (!v || draft.tags.includes(v) || draft.tags.length >= 8) return;
    patch({ tags: [...draft.tags, v] });
    setTagDraft("");
  }
  function removeTag(t: string) {
    patch({ tags: draft.tags.filter((x) => x !== t) });
  }

  function onTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagDraft);
    }
  }

  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow={draft.type === "fanfiction" ? "Step 3" : "Step 2"}
        title="Help readers find you."
        subtitle="Pick up to three genres and a handful of tags. Less is more."
      />

      <Field label="Genres" hint={`${draft.genres.length}/3 chosen`}>
        <div className="flex flex-wrap gap-2">
          {mockGenres.map((g) => {
            const selected = draft.genres.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleGenre(g.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-all",
                  selected
                    ? "bg-brand/20 text-foreground ring-1 ring-brand/50"
                    : "bg-surface-1/60 text-muted-foreground hover:bg-surface-2/70 hover:text-foreground",
                )}
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </Field>

      <Field
        label="Tags"
        icon={<Tags className="size-3.5" />}
        hint="Press Enter to add. Up to 8."
      >
        <div className="rounded-xl bg-surface-1/60 px-3 py-2 focus-within:bg-surface-1/80 focus-within:ring-1 focus-within:ring-brand/40">
          <div className="flex flex-wrap items-center gap-2">
            {draft.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-2/70 px-2.5 py-1 text-xs text-foreground"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${t}`}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <input
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              onKeyDown={onTagKeyDown}
              placeholder={draft.tags.length === 0 ? "slow burn, found family…" : ""}
              className="min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_TAGS.filter((t) => !draft.tags.includes(t))
            .slice(0, 8)
            .map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => addTag(t)}
                className="rounded-full bg-foreground/[0.04] px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground"
              >
                + {t}
              </button>
            ))}
        </div>
      </Field>

      <Field label="Age rating">
        <div className="grid gap-2 sm:grid-cols-2">
          {AGE_RATINGS.map((r) => {
            const selected = draft.ageRating === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => patch({ ageRating: r.id })}
                className={cn(
                  "rounded-xl p-4 text-left transition-all",
                  selected
                    ? "bg-[color-mix(in_oklab,var(--brand)_12%,var(--surface-1))] ring-1 ring-brand/50"
                    : "bg-surface-1/60 hover:bg-surface-2/70",
                )}
              >
                <p className="text-sm font-medium">{r.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.hint}</p>
              </button>
            );
          })}
        </div>
      </Field>
    </div>
  );
}

// ── Cover / Banner ──────────────────────────────────────────────────────────

function StepCover({
  draft,
  patch,
}: {
  draft: WizardDraft;
  patch: (p: Partial<WizardDraft>) => void;
}) {
  function onPick(field: "coverUrl" | "bannerUrl") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      patch({ [field]: URL.createObjectURL(file) } as Partial<WizardDraft>);
    };
  }

  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow={draft.type === "fanfiction" ? "Step 4" : "Step 3"}
        title="Dress your story."
        subtitle="The cover is the protagonist. The banner sets the atmosphere — both can wait."
      />

      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <Uploader
          label="Cover"
          required
          aspect="2/3"
          width={180}
          previewUrl={draft.coverUrl}
          onChange={onPick("coverUrl")}
          onClear={() => patch({ coverUrl: undefined })}
          hint="2 : 3 ratio recommended"
        />
        <Uploader
          label="Banner"
          aspect="21/9"
          previewUrl={draft.bannerUrl}
          onChange={onPick("bannerUrl")}
          onClear={() => patch({ bannerUrl: undefined })}
          hint="Optional cinematic backdrop"
        />
      </div>
    </div>
  );
}

function Uploader({
  label,
  required,
  aspect,
  width,
  previewUrl,
  onChange,
  onClear,
  hint,
}: {
  label: string;
  required?: boolean;
  aspect: string;
  width?: number;
  previewUrl?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
          {!required && <span className="ml-2 normal-case tracking-normal text-muted-foreground/60">· optional</span>}
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Remove
          </button>
        )}
      </div>
      <label
        className={cn(
          "group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-surface-1/60 transition-all",
          "hover:bg-surface-2/70",
        )}
        style={{
          aspectRatio: aspect,
          width: width ? `${width}px` : undefined,
        }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            {label === "Cover" ? (
              <ImageIcon className="size-6" />
            ) : (
              <Upload className="size-6" />
            )}
            <p className="text-xs">Click to upload</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

// ── Story World (Original only) ─────────────────────────────────────────────

function StepStoryWorld({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="Step 4 · Optional"
        title="A world behind the words."
        subtitle="Story World lets you write characters, places, and lore as living entries that readers can explore beside your chapters. You can enable this any time — no need to fill anything in now."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <ToggleCard
          selected={!enabled}
          onClick={() => onChange(false)}
          title="Not now"
          description="Focus on writing. You can turn on Story World later from the Studio."
        />
        <ToggleCard
          selected={enabled}
          onClick={() => onChange(true)}
          accent
          title="Enable Story World"
          description="Adds a Story World tab to your project. Empty for now — fill it as your story grows."
        />
      </div>
      <div className="rounded-xl bg-surface-1/40 p-4 text-xs text-muted-foreground">
        <BookOpen className="mr-2 inline size-3.5" />
        Original story worlds live inside their story — they're never listed in the global Discovery.
      </div>
    </div>
  );
}

function ToggleCard({
  selected,
  onClick,
  title,
  description,
  accent,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl p-5 text-left transition-all",
        "bg-surface-1/60 hover:bg-surface-2/70",
        selected &&
          (accent
            ? "bg-[color-mix(in_oklab,var(--brand)_14%,var(--surface-1))] ring-1 ring-brand/60"
            : "ring-1 ring-foreground/15"),
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        {selected && <Check className="size-4 text-brand" />}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </button>
  );
}

// ── Review ──────────────────────────────────────────────────────────────────

function StepReview({
  draft,
  onComplete,
}: {
  draft: WizardDraft;
  onComplete?: StoryWizardProps["onComplete"];
}) {
  const franchise = mockFranchiseCards.find((f) => f.slug === draft.franchiseSlug);
  const genres = mockGenres.filter((g) => draft.genres.includes(g.id));
  const lang = LANGUAGES.find((l) => l.code === draft.language)?.label ?? draft.language;
  const ageLabel = AGE_RATINGS.find((r) => r.id === draft.ageRating)?.label ?? draft.ageRating;

  return (
    <div className="space-y-10">
      <StepHeading
        eyebrow="Final look"
        title="Almost ready."
        subtitle="One last glance before the page turns."
      />

      <div className="flex gap-5">
        <div
          className="relative aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-xl bg-surface-1/60 md:w-40"
        >
          {draft.coverUrl ? (
            <img src={draft.coverUrl} alt="" className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <ImageIcon className="size-6" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brand">
            {draft.type === "fanfiction" ? "Fanfiction" : "Original story"}
            {franchise && <> · {franchise.name}</>}
          </p>
          <h2 className="font-display text-3xl leading-tight tracking-tight">
            {draft.title || "Untitled manuscript"}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {draft.synopsis || "No synopsis yet."}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm md:grid-cols-3">
        <ReviewRow label="Language" value={lang} />
        <ReviewRow label="Age rating" value={ageLabel} />
        <ReviewRow label="Genres" value={genres.map((g) => g.name).join(", ") || "—"} />
        <ReviewRow
          label="Tags"
          value={draft.tags.length ? draft.tags.join(", ") : "—"}
        />
        {draft.type === "original" && (
          <ReviewRow
            label="Story World"
            value={draft.storyWorldEnabled ? "Enabled" : "Disabled"}
          />
        )}
        <ReviewRow label="Banner" value={draft.bannerUrl ? "Uploaded" : "—"} />
      </dl>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onComplete?.(draft, "draft")}
          className="rounded-full bg-foreground/[0.05] px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/[0.1]"
        >
          Save draft
        </button>
        {draft.type === "original" && (
          <button
            type="button"
            onClick={() => onComplete?.(draft, "later")}
            className="rounded-full bg-foreground/[0.05] px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/[0.1]"
          >
            Publish later
          </button>
        )}
        <button
          type="button"
          onClick={() => onComplete?.(draft, "write")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand/85 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-12px_var(--brand)] transition-all hover:shadow-[0_12px_28px_-12px_var(--brand)]"
        >
          Start writing
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-foreground/90">{value}</dd>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────────────────────

function StepHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-brand">
        {eyebrow}
      </p>
      <h1 className="font-display text-3xl leading-[1.1] tracking-tight md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  counter,
  icon,
  children,
}: {
  label: string;
  hint?: string;
  counter?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          {icon}
          {label}
        </label>
        {counter && (
          <span className="text-xs text-muted-foreground/70">{counter}</span>
        )}
      </div>
      {children}
      {hint && <p className="text-xs text-muted-foreground/70">{hint}</p>}
    </div>
  );
}
