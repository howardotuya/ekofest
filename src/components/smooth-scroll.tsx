"use client";

import { useEffect } from "react";

/**
 * Smooth wheel scrolling (src/lib/smooth-scroll.ts). Lenis and its setup load
 * after hydration, once the browser is idle, so first paint and TBT don't
 * move. Not started at all under reduced motion or on touch-first devices:
 * phones and tablets keep native scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(hover: none)").matches) return;

    let cancelled = false;
    let stop: (() => void) | undefined;
    const load = () =>
      void import("@/lib/smooth-scroll").then((m) => {
        if (!cancelled) stop = m.startSmoothScroll();
      });
    // Safari has no requestIdleCallback.
    const idle = "requestIdleCallback" in window;
    const handle = idle
      ? requestIdleCallback(load, { timeout: 1500 })
      : window.setTimeout(load, 200);

    return () => {
      cancelled = true;
      if (idle) cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      stop?.();
    };
  }, []);

  return null;
}
