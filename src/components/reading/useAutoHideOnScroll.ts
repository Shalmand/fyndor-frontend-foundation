import { useEffect, useState } from "react";

/**
 * useAutoHideOnScroll — hides a sticky element when the user scrolls
 * down past `revealThreshold` and reveals it on any upward scroll.
 *
 * Used by the Reading Header so the chrome disappears during active
 * reading and returns the moment the reader looks for it.
 */
export function useAutoHideOnScroll(options?: {
  revealThreshold?: number;
  deltaThreshold?: number;
}) {
  const revealThreshold = options?.revealThreshold ?? 96;
  const deltaThreshold = options?.deltaThreshold ?? 6;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < revealThreshold) {
          setHidden(false);
        } else if (delta > deltaThreshold) {
          setHidden(true);
        } else if (delta < -deltaThreshold) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealThreshold, deltaThreshold]);

  return hidden;
}
