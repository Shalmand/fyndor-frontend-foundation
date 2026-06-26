import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EntityView } from "./EntityView";
import type { LoreEntity, LoreResolver } from "./types";

/**
 * StoryWorldDrawer — the official Story World System v1.0 surface.
 *
 * Architecture notes:
 *  • The drawer is a Radix Dialog under the hood, so focus restoration,
 *    Escape-to-close, and scroll-lock are handled correctly — Reading
 *    Continuity (return to exact reading position) comes for free.
 *  • A single component renders every entity kind; per-kind layouts
 *    live in `EntityView`.
 *  • A small in-drawer history stack supports "deep" navigation
 *    (Character → linked Organization → linked Member) without ever
 *    leaving the chapter.
 *  • View-only by design. The shape is ready for the future Story
 *    Studio (which will provide an edit affordance via a slot prop).
 */

interface StoryWorldDrawerContextValue {
  open: (entityId: string) => void;
  close: () => void;
  isOpen: boolean;
}

const StoryWorldDrawerContext = createContext<StoryWorldDrawerContextValue | null>(
  null,
);

export function useStoryWorldDrawer(): StoryWorldDrawerContextValue {
  const ctx = useContext(StoryWorldDrawerContext);
  if (!ctx) {
    return { open: () => {}, close: () => {}, isOpen: false };
  }
  return ctx;
}

interface StoryWorldDrawerProviderProps {
  children: ReactNode;
  /** Resolves entity ids → entities. Mock-backed today. */
  resolve: LoreResolver;
}

/**
 * Wraps the app section that should be able to open the drawer.
 * Provides context AND mounts the drawer surface itself.
 */
export function StoryWorldDrawerProvider({
  children,
  resolve,
}: StoryWorldDrawerProviderProps) {
  const [stack, setStack] = useState<LoreEntity[]>([]);
  const isOpen = stack.length > 0;
  // Remember the active element so we restore focus exactly on close.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(
    (id: string) => {
      const entity = resolve(id);
      if (!entity) return;
      if (typeof document !== "undefined") {
        previouslyFocused.current = document.activeElement as HTMLElement | null;
      }
      setStack([entity]);
    },
    [resolve],
  );

  const close = useCallback(() => {
    setStack([]);
    // Radix Dialog already restores focus to the trigger, but if the
    // caller is an inline lore link inside chapter text we also want
    // to re-focus that specific element for screen-reader continuity.
    requestAnimationFrame(() => {
      previouslyFocused.current?.focus({ preventScroll: true });
    });
  }, []);

  const pushEntity = useCallback(
    (id: string) => {
      const entity = resolve(id);
      if (!entity) return;
      setStack((prev) => [...prev, entity]);
    },
    [resolve],
  );

  const popEntity = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  const current = stack[stack.length - 1];

  return (
    <StoryWorldDrawerContext.Provider value={value}>
      {children}
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(o) => {
          if (!o) close();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-200 data-[state=closed]:duration-150"
          />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className={[
              "fixed z-50 flex flex-col bg-reader-bg text-reader-fg shadow-[0_-12px_60px_-20px_oklch(0_0_0/0.6)]",
              // Mobile — bottom sheet
              "inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-[28px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
              // Desktop — right-side appendix
              "sm:inset-y-0 sm:right-0 sm:bottom-auto sm:left-auto sm:h-full sm:max-h-none sm:w-[440px] sm:rounded-none sm:rounded-l-[24px]",
              "sm:data-[state=open]:slide-in-from-right sm:data-[state=closed]:slide-out-to-right",
              "data-[state=open]:duration-[260ms] data-[state=closed]:duration-200",
            ].join(" ")}
          >
            {/* Mobile grab-handle — visible only on small screens */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>

            {/* Drawer chrome */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2 sm:px-5 sm:pt-5">
              {stack.length > 1 ? (
                <button
                  type="button"
                  onClick={popEntity}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-xs text-reader-muted transition-colors hover:bg-white/5 hover:text-reader-fg"
                  aria-label="Back"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <DialogPrimitive.Title className="text-[11px] uppercase tracking-[0.28em] text-reader-muted">
                  Story World
                </DialogPrimitive.Title>
              )}

              <DialogPrimitive.Close
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-white/5 hover:text-reader-fg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>

            {/* Visually-hidden title when on the root view, so the dialog
             *  still has an accessible name as Radix requires. */}
            {stack.length > 1 && (
              <DialogPrimitive.Title className="sr-only">
                {current?.name ?? "Story World entry"}
              </DialogPrimitive.Title>
            )}

            <div className="flex-1 overflow-y-auto pb-6">
              {current && <EntityView entity={current} onSelect={pushEntity} />}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </StoryWorldDrawerContext.Provider>
  );
}
