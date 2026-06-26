import { useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SERIES_TYPE_META,
  VISIBILITY_LABEL,
} from "./shared";
import type {
  SeriesType,
  SeriesVisibility,
  StandaloneStory,
} from "@/mock/seriesManager";

interface Props {
  open: boolean;
  onClose: () => void;
  availableStories: StandaloneStory[];
}

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { id: 0, label: "Identity" },
  { id: 1, label: "Add stories" },
  { id: 2, label: "Reading order" },
  { id: 3, label: "Visibility" },
] as const;

export function CreateSeriesFlow({ open, onClose, availableStories }: Props) {
  const [step, setStep] = useState<Step>(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<SeriesType>("series");
  const [description, setDescription] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<SeriesVisibility>("draft");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const canAdvance = step !== 0 || title.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create a new series"
        className="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-[var(--surface-1)] shadow-2xl"
      >
        <header className="flex items-center justify-between px-6 pt-5">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-brand">
            New series · {STEPS[step].label}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Step progress */}
        <div className="flex items-center gap-1.5 px-6 pt-3">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors",
                s.id <= step ? "bg-brand/70" : "bg-foreground/[0.08]",
              )}
            />
          ))}
        </div>

        <div className="min-h-[280px] space-y-5 px-6 py-6">
          {step === 0 ? (
            <div className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Series title
                </span>
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The Ashen Crown Saga"
                  className="w-full rounded-md bg-foreground/[0.04] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-foreground/[0.06]"
                />
              </label>

              <div className="space-y-1.5">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Type
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(SERIES_TYPE_META) as SeriesType[]).map((k) => {
                    const meta = SERIES_TYPE_META[k];
                    const active = k === type;
                    const Icon = meta.icon;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setType(k)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
                          active
                            ? "bg-brand/85 text-brand-foreground"
                            : "bg-foreground/[0.05] text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <Icon className="h-3 w-3" /> {meta.short}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block space-y-1.5">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Short description <span className="text-muted-foreground/60">— optional</span>
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What promise does this series make to readers?"
                  className="w-full resize-none rounded-md bg-foreground/[0.04] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-foreground/[0.06]"
                />
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Add stories now or leave it empty — you can always connect more later.
              </p>
              <ul className="max-h-64 space-y-1 overflow-y-auto">
                {availableStories.map((s) => {
                  const checked = picked.includes(s.id);
                  return (
                    <li key={s.id}>
                      <label
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors",
                          checked
                            ? "bg-[color-mix(in_oklab,var(--brand)_12%,transparent)]"
                            : "bg-foreground/[0.03] hover:bg-foreground/[0.05]",
                        )}
                      >
                        <span>
                          <span className="block font-display text-base tracking-tight">
                            {s.title}
                          </span>
                          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                            {s.kind} · {s.chapters} ch
                          </span>
                        </span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setPicked((p) =>
                              p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id],
                            )
                          }
                          className="h-4 w-4 accent-[color:var(--brand)]"
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You can offer readers up to three orders. All are optional now.
              </p>
              <ul className="space-y-2">
                {[
                  { id: "publication", label: "Publication order", desc: "The order you released them." },
                  { id: "chronological", label: "Chronological order", desc: "The order events unfold." },
                  { id: "recommended", label: "Recommended reading", desc: "Your suggested path for first-time readers." },
                ].map((o) => (
                  <li
                    key={o.id}
                    className="rounded-xl bg-foreground/[0.03] px-4 py-3"
                  >
                    <div className="font-display text-base tracking-tight">{o.label}</div>
                    <div className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {o.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Visibility can change at any time.
              </p>
              <div className="flex flex-col gap-2">
                {(Object.keys(VISIBILITY_LABEL) as SeriesVisibility[]).map((v) => {
                  const active = v === visibility;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVisibility(v)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors",
                        active
                          ? "bg-[color-mix(in_oklab,var(--brand)_14%,transparent)]"
                          : "bg-foreground/[0.03] hover:bg-foreground/[0.05]",
                      )}
                    >
                      <span>
                        <span className="block font-display text-base tracking-tight">
                          {VISIBILITY_LABEL[v]}
                        </span>
                        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                          {v === "draft"
                            ? "Only visible to you."
                            : v === "public"
                              ? "Anyone can discover this series."
                              : "Shared via direct link only."}
                        </span>
                      </span>
                      {active ? <Check className="h-4 w-4 text-brand" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-foreground/[0.04] bg-foreground/[0.015] px-6 py-4">
          <button
            type="button"
            onClick={() => (step > 0 ? setStep((s) => (s - 1) as Step) : onClose())}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> {step === 0 ? "Cancel" : "Back"}
          </button>
          {step < 3 ? (
            <button
              type="button"
              disabled={!canAdvance}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand/85 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-3 w-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand/85 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-brand-foreground transition-opacity hover:opacity-90"
            >
              <Check className="h-3 w-3" /> Create series
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
