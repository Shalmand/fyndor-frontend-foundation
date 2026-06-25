import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NDS-004 — Carousel v1.0
 *
 * The official horizontal discovery primitive for Fyndor.
 *
 * Quiet, premium, frameless. Native horizontal scroll with snap, dark
 * semi-transparent arrows that only appear when scrolling is possible and
 * a pointer is present. Generous spacing, no visible container, no autoplay.
 *
 * Reusable with any card primitive (Story, Universe, Franchise, Collection,
 * Author). Wrap each child in <CarouselItem> to keep sizing consistent.
 */

export type CarouselItemSize = "sm" | "md" | "lg" | "xl";

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label describing the rail ("Trending stories", etc.). */
  ariaLabel: string;
  /** Children — typically <CarouselItem> wrappers. */
  children: ReactNode;
  /** Override gap between cards. Defaults to the system rhythm. */
  gapClassName?: string;
  /** Localized previous label. */
  previousLabel?: string;
  /** Localized next label. */
  nextLabel?: string;
}

/**
 * Per-viewport widths chosen to match the Story Card v1.0 grid rhythm
 * (mobile 2-up, tablet 3-up, desktop 4-up, wide 5-up at `md`).
 */
const SIZE_CLASSES: Record<CarouselItemSize, string> = {
  sm: "w-[40vw] max-w-[10rem] sm:w-[9rem] md:w-[10rem]",
  md: "w-[44vw] max-w-[12.5rem] sm:w-[12rem] md:w-[13.5rem] lg:w-[14.5rem]",
  lg: "w-[58vw] max-w-[15rem] sm:w-[15rem] md:w-[16.5rem] lg:w-[18rem]",
  xl: "w-[72vw] max-w-[18rem] sm:w-[18rem] md:w-[20rem] lg:w-[22rem]",
};

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Width preset that aligns with the Story Card grid rhythm. */
  size?: CarouselItemSize;
  children: ReactNode;
}

export function CarouselItem({
  size = "md",
  className,
  children,
  ...rest
}: CarouselItemProps) {
  return (
    <div
      {...rest}
      className={cn(
        "snap-start shrink-0",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Tunables for how far the arrow buttons advance the scroller. */
const SCROLL_RATIO = 0.85;

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      ariaLabel,
      children,
      gapClassName = "gap-4 sm:gap-5 lg:gap-6",
      previousLabel = "Previous",
      nextLabel = "Next",
      className,
      ...rest
    },
    ref,
  ) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const headingId = useId();

    const update = useCallback(() => {
      const el = trackRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      // 1px tolerance to avoid flicker on sub-pixel rounding.
      setCanPrev(scrollLeft > 1);
      setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
    }, []);

    useEffect(() => {
      const el = trackRef.current;
      if (!el) return;
      update();
      el.addEventListener("scroll", update, { passive: true });
      const ro = new ResizeObserver(update);
      ro.observe(el);
      Array.from(el.children).forEach((c) => ro.observe(c));
      return () => {
        el.removeEventListener("scroll", update);
        ro.disconnect();
      };
    }, [update, children]);

    const scrollBy = (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({
        left: el.clientWidth * SCROLL_RATIO * dir,
        behavior: "smooth",
      });
    };

    const isEmpty = Children.count(children) === 0;

    return (
      <div
        {...rest}
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={headingId}
        className={cn("relative", className)}
      >
        <span id={headingId} className="sr-only">
          {ariaLabel}
        </span>

        {/*
         * Track. Edge-to-edge: negative margin pulls scroll edges out of the
         * container padding so cards can travel cleanly off-screen, while
         * scroll-padding keeps the first and last items aligned with the
         * page container.
         */}
        <div
          ref={trackRef}
          className={cn(
            "flex overflow-x-auto scroll-smooth snap-x snap-mandatory",
            "px-5 -mx-5",
            "scroll-px-5",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "motion-reduce:scroll-auto",
            gapClassName,
          )}
        >
          {children}
        </div>

        {/* Arrows — pointer-only, fade in on hover when scrolling is possible. */}
        {!isEmpty && (
          <>
            <ArrowButton
              direction="prev"
              label={previousLabel}
              visible={canPrev}
              onClick={() => scrollBy(-1)}
            />
            <ArrowButton
              direction="next"
              label={nextLabel}
              visible={canNext}
              onClick={() => scrollBy(1)}
            />
          </>
        )}
      </div>
    );
  },
);

function ArrowButton({
  direction,
  label,
  visible,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  visible: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={onClick}
      className={cn(
        // Pointer-only — hidden on touch (no hover capability).
        "hidden md:inline-flex",
        "absolute top-1/2 z-10 -translate-y-1/2",
        "h-11 w-11 items-center justify-center rounded-full",
        "bg-background/55 text-foreground/85 backdrop-blur-md",
        "shadow-[0_4px_20px_-8px_oklch(0_0_0_/_0.55)]",
        "opacity-0 transition-[opacity,background-color,transform] duration-200 ease-out",
        "group-hover/carousel:opacity-100 focus-visible:opacity-100",
        "hover:bg-background/80 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none",
        direction === "prev" ? "left-2" : "right-2",
        !visible && "pointer-events-none !opacity-0",
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Skeleton                                                                   */
/* -------------------------------------------------------------------------- */

export interface CarouselSkeletonProps {
  /** Number of placeholder slots. Defaults to 6. */
  count?: number;
  /** Item size preset; should match the live carousel. */
  size?: CarouselItemSize;
  /** Aspect ratio for the placeholder block. Matches Story Card 2:3 by default. */
  aspectClassName?: string;
  gapClassName?: string;
  className?: string;
}

export function CarouselSkeleton({
  count = 6,
  size = "md",
  aspectClassName = "aspect-[2/3]",
  gapClassName = "gap-4 sm:gap-5 lg:gap-6",
  className,
}: CarouselSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={cn("relative", className)}
    >
      <div
        className={cn(
          "flex overflow-hidden px-5 -mx-5",
          gapClassName,
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn("shrink-0", SIZE_CLASSES[size])}>
            <div
              className={cn(
                "w-full rounded-[15px] bg-surface-2/60 animate-pulse motion-reduce:animate-none",
                aspectClassName,
              )}
            />
            <div className="mt-5 h-3.5 w-3/4 rounded-full bg-surface-2/60 animate-pulse motion-reduce:animate-none" />
            <div className="mt-2.5 h-3 w-1/2 rounded-full bg-surface-2/40 animate-pulse motion-reduce:animate-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

export interface CarouselEmptyProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function CarouselEmpty({
  title = "Nothing here yet",
  description = "New stories will appear in this rail as they are published.",
  action,
  className,
}: CarouselEmptyProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-1/40 px-8 py-14 text-center",
        className,
      )}
    >
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
