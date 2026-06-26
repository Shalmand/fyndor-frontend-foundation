import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Bold,
  BookOpen,
  ChevronLeft,
  Eye,
  Feather,
  FileText,
  Focus,
  Heading2,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  Mail,
  Minus,
  Plus,
  Quote,
  Settings,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* ============================================================
 * Types
 * ============================================================ */

export type AutosaveState = "idle" | "saving" | "saved" | "offline";

export interface WritingSessionProps {
  storyTitle: string;
  chapterTitle: string;
  /** Initial chapter body, plain text with blank lines as paragraph breaks. */
  initialContent: string;
  /** Forced autosave state for the showcase. If omitted, simulates real saving. */
  autosaveState?: AutosaveState;
  /** ISO timestamp of last save — used to render "Saved 2 min ago". */
  lastSavedAt?: string;
  /** Force focus mode on/off externally (showcase). */
  focusMode?: boolean;
  onFocusModeChange?: (next: boolean) => void;
  onExit?: () => void;
  /** Render a fake contextual popover (showcase demo). */
  demoSelection?: boolean;
  className?: string;
}

/* ============================================================
 * Root
 * ============================================================ */

export function WritingSession({
  storyTitle,
  chapterTitle,
  initialContent,
  autosaveState: autosaveStateProp,
  lastSavedAt: lastSavedAtProp,
  focusMode: focusModeProp,
  onFocusModeChange,
  onExit,
  demoSelection = false,
  className,
}: WritingSessionProps) {
  const [content, setContent] = useState(initialContent);
  const [internalFocus, setInternalFocus] = useState(false);
  const focusMode = focusModeProp ?? internalFocus;
  const setFocusMode = (next: boolean) => {
    onFocusModeChange?.(next);
    if (focusModeProp === undefined) setInternalFocus(next);
  };

  // Autosave simulation
  const [internalState, setInternalState] = useState<AutosaveState>("saved");
  const [internalSavedAt, setInternalSavedAt] = useState<string>(
    new Date().toISOString(),
  );
  const autosaveState = autosaveStateProp ?? internalState;
  const lastSavedAt = lastSavedAtProp ?? internalSavedAt;

  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (autosaveStateProp !== undefined) return;
    setInternalState("saving");
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setInternalState("saved");
      setInternalSavedAt(new Date().toISOString());
    }, 900);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [content, autosaveStateProp]);

  // Stats (hidden until requested)
  const [statsOpen, setStatsOpen] = useState(false);
  const stats = useMemo(() => computeStats(content), [content]);

  // Selection demo
  const [selectionOpen, setSelectionOpen] = useState(demoSelection);
  useEffect(() => setSelectionOpen(demoSelection), [demoSelection]);

  return (
    <div
      className={cn(
        "relative isolate min-h-[680px] w-full overflow-hidden rounded-3xl bg-surface-0",
        className,
      )}
    >
      {/* Very subtle ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% -10%, color-mix(in oklab, var(--brand) 9%, transparent), transparent 65%)",
        }}
      />

      {/* Header */}
      <WritingHeader
        storyTitle={storyTitle}
        chapterTitle={chapterTitle}
        autosaveState={autosaveState}
        lastSavedAt={lastSavedAt}
        focusMode={focusMode}
        onExit={onExit}
        onToggleFocus={() => setFocusMode(!focusMode)}
      />

      {/* Canvas */}
      <div
        className={cn(
          "relative mx-auto w-full max-w-[var(--container-reader)] px-6 pb-40 pt-10 transition-[padding] duration-300 sm:px-10 md:pt-16",
          focusMode && "pt-24 md:pt-28",
        )}
      >
        <p className="font-display text-[0.75rem] uppercase tracking-[0.32em] text-muted-foreground/80">
          Chapter draft
        </p>
        <h1 className="mt-3 font-display text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-[2.6rem]">
          {chapterTitle}
        </h1>
        <div className="mt-8 soft-rule opacity-60" />

        <WritingCanvas
          value={content}
          onChange={setContent}
          demoSelection={selectionOpen}
        />

        {/* Subtle focus-mode autosave whisper */}
        {focusMode && (
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground/60">
            {renderAutosaveLabel(autosaveState, lastSavedAt)}
          </div>
        )}
      </div>

      {/* Stats peek (hidden until requested) */}
      <StatsPeek
        open={statsOpen}
        onOpenChange={setStatsOpen}
        words={stats.words}
        characters={stats.characters}
        minutes={stats.minutes}
        hidden={focusMode}
      />

      {/* Floating Palette */}
      <WritingPalette hidden={focusMode} />

      {/* Exit focus shortcut */}
      {focusMode && (
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className="fixed right-6 top-6 z-40 inline-flex h-9 items-center gap-2 rounded-full bg-surface-2/70 px-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden /> Exit focus
        </button>
      )}
    </div>
  );
}

/* ============================================================
 * Header
 * ============================================================ */

interface WritingHeaderProps {
  storyTitle: string;
  chapterTitle: string;
  autosaveState: AutosaveState;
  lastSavedAt: string;
  focusMode: boolean;
  onExit?: () => void;
  onToggleFocus: () => void;
}

function WritingHeader({
  storyTitle,
  chapterTitle,
  autosaveState,
  lastSavedAt,
  focusMode,
  onExit,
  onToggleFocus,
}: WritingHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        focusMode
          ? "pointer-events-none -translate-y-4 opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden /> Exit
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-3 text-center">
          <div className="min-w-0 truncate text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground/80">
            {storyTitle}
          </div>
          <span aria-hidden className="text-muted-foreground/40">·</span>
          <div className="min-w-0 truncate font-display text-sm italic text-foreground/85">
            {chapterTitle}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AutosaveBadge state={autosaveState} lastSavedAt={lastSavedAt} />
          <button
            type="button"
            onClick={onToggleFocus}
            aria-label="Enter focus mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <Focus className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
 * Autosave indicator
 * ============================================================ */

function AutosaveBadge({
  state,
  lastSavedAt,
}: {
  state: AutosaveState;
  lastSavedAt: string;
}) {
  const label = renderAutosaveLabel(state, lastSavedAt);
  return (
    <span
      className={cn(
        "hidden items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex",
        state === "offline" && "text-amber-300/80",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          state === "saving" && "animate-pulse bg-brand",
          state === "saved" && "bg-emerald-400/70",
          state === "idle" && "bg-muted-foreground/40",
          state === "offline" && "bg-amber-300/80",
        )}
      />
      {label}
    </span>
  );
}

function renderAutosaveLabel(state: AutosaveState, lastSavedAt: string) {
  if (state === "saving") return "Saving…";
  if (state === "offline") return "Offline — changes kept locally";
  if (state === "idle") return "Draft";
  return `Saved ${relativeTime(lastSavedAt)}`;
}

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "just now";
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 hour ago";
  return `${hours} hours ago`;
}

/* ============================================================
 * Canvas
 * ============================================================ */

interface WritingCanvasProps {
  value: string;
  onChange: (next: string) => void;
  demoSelection: boolean;
}

function WritingCanvas({ value, onChange, demoSelection }: WritingCanvasProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // Auto-size textarea
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className="relative mt-10">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        placeholder="Begin where the chapter wants to begin…"
        className={cn(
          "block w-full resize-none bg-transparent font-reading text-[1.125rem] leading-[1.85] text-reader-fg outline-none",
          "placeholder:font-display placeholder:italic placeholder:text-muted-foreground/50",
          "selection:bg-[color-mix(in_oklab,var(--brand)_35%,transparent)]",
        )}
        style={{ minHeight: "60vh" }}
      />

      {/* Contextual popover demo (anchored visually near top of canvas) */}
      {demoSelection && (
        <div className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 animate-fade-in">
          <ContextualPopover />
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * Contextual popover (selection demo)
 * ============================================================ */

function ContextualPopover() {
  const items: { icon: ReactNode; label: string }[] = [
    { icon: <Bold className="h-3.5 w-3.5" />, label: "Bold" },
    { icon: <Italic className="h-3.5 w-3.5" />, label: "Italic" },
    { icon: <Quote className="h-3.5 w-3.5" />, label: "Quote" },
    { icon: <LinkIcon className="h-3.5 w-3.5" />, label: "Link" },
    { icon: <Sparkles className="h-3.5 w-3.5" />, label: "Link to Lore" },
  ];
  return (
    <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-surface-2/95 px-2 py-1.5 shadow-[0_20px_50px_-20px_oklch(0_0_0_/_0.6)] backdrop-blur-xl">
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          aria-label={it.label}
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          {it.icon}
          <span className="hidden sm:inline">{it.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ============================================================
 * Writing Palette (floating + popover)
 * ============================================================ */

function WritingPalette({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const closeAfter = () => setOpen(false);

  return (
    <div
      className={cn(
        "fixed bottom-7 right-7 z-40 transition-all duration-300",
        hidden && "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Writing palette"
            className={cn(
              "group inline-flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-[0_18px_45px_-18px_color-mix(in_oklab,var(--brand)_70%,transparent)] transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]",
            )}
            style={{ backgroundImage: "var(--gradient-brand-soft)" }}
          >
            <Feather className="h-5 w-5" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={14}
          className="w-[320px] border-0 bg-surface-2/95 p-0 shadow-[0_30px_80px_-30px_oklch(0_0_0_/_0.7)] backdrop-blur-2xl"
        >
          <div className="p-4">
            <PaletteSection label="Formatting">
              <PaletteItem icon={<Heading2 className="h-4 w-4" />} label="Heading" onSelect={closeAfter} />
              <PaletteItem icon={<Bold className="h-4 w-4" />} label="Bold" onSelect={closeAfter} />
              <PaletteItem icon={<Italic className="h-4 w-4" />} label="Italic" onSelect={closeAfter} />
              <PaletteItem icon={<Quote className="h-4 w-4" />} label="Quote" onSelect={closeAfter} />
              <PaletteItem icon={<Minus className="h-4 w-4" />} label="Divider" onSelect={closeAfter} />
            </PaletteSection>

            <PaletteSection label="Insert">
              <PaletteItem icon={<ImageIcon className="h-4 w-4" />} label="Image" onSelect={closeAfter} />
              <PaletteItem icon={<LinkIcon className="h-4 w-4" />} label="Link" onSelect={closeAfter} />
              <PaletteItem icon={<Type className="h-4 w-4" />} label="Scene break" onSelect={closeAfter} />
              <PaletteItem icon={<BookOpen className="h-4 w-4" />} label="Chapter divider" onSelect={closeAfter} />
              <PaletteItem icon={<Mail className="h-4 w-4" />} label="Letter" onSelect={closeAfter} />
              <PaletteItem icon={<FileText className="h-4 w-4" />} label="Diary entry" onSelect={closeAfter} />
            </PaletteSection>

            <PaletteSection label="Story World">
              <PaletteItem icon={<Sparkles className="h-4 w-4" />} label="Create character" onSelect={closeAfter} />
              <PaletteItem icon={<Sparkles className="h-4 w-4" />} label="Create location" onSelect={closeAfter} />
              <PaletteItem icon={<Sparkles className="h-4 w-4" />} label="Create organization" onSelect={closeAfter} />
              <PaletteItem icon={<Sparkles className="h-4 w-4" />} label="Create item" onSelect={closeAfter} />
              <PaletteItem icon={<Sparkles className="h-4 w-4" />} label="Create creature" onSelect={closeAfter} />
            </PaletteSection>

            <PaletteSection label="Publishing">
              <PaletteItem icon={<Eye className="h-4 w-4" />} label="Preview" onSelect={closeAfter} />
              <PaletteItem icon={<Settings className="h-4 w-4" />} label="Story settings" onSelect={closeAfter} />
              <PaletteItem
                icon={<Sparkles className="h-4 w-4" />}
                label="Publish chapter"
                emphasis
                onSelect={closeAfter}
              />
            </PaletteSection>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PaletteSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-0 py-2 first:pt-0 last:pb-0 [&_+_&]:mt-2 [&_+_&]:border-t [&_+_&]:border-foreground/5 [&_+_&]:pt-3">
      <p className="px-2 pb-1.5 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70">
        {label}
      </p>
      <div className="grid grid-cols-1 gap-0.5">{children}</div>
    </div>
  );
}

function PaletteItem({
  icon,
  label,
  emphasis,
  onSelect,
}: {
  icon: ReactNode;
  label: string;
  emphasis?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground",
        emphasis && "text-brand-glow hover:text-brand-glow",
      )}
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground",
          emphasis && "text-brand-glow",
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

/* ============================================================
 * Stats peek
 * ============================================================ */

function StatsPeek({
  open,
  onOpenChange,
  words,
  characters,
  minutes,
  hidden,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  words: number;
  characters: number;
  minutes: number;
  hidden: boolean;
}) {
  return (
    <div
      className={cn(
        "fixed bottom-7 left-7 z-30 transition-all duration-300",
        hidden && "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Show writing statistics"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-surface-2/70 px-4 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden /> Stats
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={12}
          className="w-[260px] border-0 bg-surface-2/95 p-5 shadow-[0_30px_80px_-30px_oklch(0_0_0_/_0.7)] backdrop-blur-2xl"
        >
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70">
            Session
          </p>
          <div className="mt-3 space-y-3">
            <StatRow label="Words" value={words.toLocaleString("en-US")} />
            <StatRow label="Characters" value={characters.toLocaleString("en-US")} />
            <StatRow label="Reading time" value={`${minutes} min`} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-display text-xl tracking-tight text-foreground">
        {value}
      </span>
    </div>
  );
}

/* ============================================================
 * Utilities
 * ============================================================ */

function computeStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed.length ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const characters = text.length;
  const minutes = Math.max(1, Math.round(words / 230));
  return { words, characters, minutes };
}
