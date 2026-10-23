import Lenis from "lenis";

// Smoothed, eased wheel scrolling (Lenis), approved by Howard. Kept brisk for
// recruiters skimming: at lerp 0.16 a three-notch flick (300px) is 95% of the
// way there in about 0.3s and fully settles about 0.7s after the last notch.
const LERP = 0.16;
// Keys that scroll the page natively; a key press cancels any smooth wheel glide.
const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);

/**
 * Starts Lenis and returns a function that tears it down. Loaded lazily by
 * <SmoothScroll>. One requestAnimationFrame loop runs only while Lenis is
 * moving and stops when it settles.
 */
export function startSmoothScroll() {
  const lenis = new Lenis({ lerp: LERP, anchors: false });

  // On-demand loop. Lenis takes its time step from the clock it's given, so
  // feed it a clock that skips idle gaps: the first frame after a pause counts
  // as one frame rather than a jump to the target.
  let frame = 0;
  let last = 0;
  let clock = 0;
  const loop = (now: number) => {
    // Real frame times (so a janky frame doesn't slow the glide), capped in
    // case the tab was backgrounded mid-glide.
    clock += last ? Math.min(now - last, 100) : 1000 / 60;
    last = now;
    lenis.raf(clock);
    if (lenis.isScrolling) {
      frame = requestAnimationFrame(loop);
    } else {
      frame = 0;
      last = 0;
    }
  };
  const kick = () => {
    if (!frame) frame = requestAnimationFrame(loop);
  };

  // Lenis ignores the first native scroll event after a glide ends, so a jump
  // in that frame (End, Home) would leave it at the old position and the next
  // glide would leap. Resync before starting one.
  const resync = () => {
    if (!lenis.isScrolling && Math.abs(lenis.animatedScroll - scrollY) > 1) lenis.resize();
  };
  // Capture phase: runs before Lenis's own wheel listener.
  const onWheel = () => {
    resync();
    kick();
  };

  const onKey = (event: KeyboardEvent) => {
    if (!SCROLL_KEYS.has(event.key) || lenis.isScrolling !== "smooth") return;
    // stop() + start() is Lenis's public way to drop a glide in progress.
    lenis.stop();
    lenis.start();
  };

  // Mouse and trackpad clicks on #anchors glide there through Lenis, which
  // honours each target's scroll-margin. Keyboard activation (detail 0) stays
  // native so focus moves to the target as usual.
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.detail === 0 || event.metaKey || event.ctrlKey) return;
    const link = (event.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
    const hash = link?.getAttribute("href");
    const target =
      hash && hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    resync();
    history.pushState(null, "", hash);
    // pushState doesn't update :target, so the flash on a route set is a class
    // too, re-added a frame later so it replays.
    for (const el of document.querySelectorAll(".is-target")) el.classList.remove("is-target");
    requestAnimationFrame(() => target.classList.add("is-target"));
    lenis.scrollTo(target, { force: true });
    kick();
  };

  // While any dialog is open (menu, ticket sheet) the page behind stays put.
  // CSS already locks scrolling the moment a dialog opens; stopping Lenis a
  // task later keeps its restyle out of the open/close interaction's frame.
  let sync = 0;
  const dialogs = new MutationObserver(() => {
    clearTimeout(sync);
    sync = window.setTimeout(() => {
      if (document.querySelector("dialog[open]")) lenis.stop();
      else lenis.start();
    });
  });
  dialogs.observe(document.body, { subtree: true, attributeFilter: ["open"] });

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const teardown = () => {
    removeEventListener("wheel", onWheel, { capture: true });
    removeEventListener("keydown", onKey);
    removeEventListener("click", onClick);
    reduce.removeEventListener("change", onReduce);
    dialogs.disconnect();
    clearTimeout(sync);
    cancelAnimationFrame(frame);
    lenis.destroy();
  };
  // Switching reduced motion on mid-visit hands scrolling straight back.
  const onReduce = () => {
    if (reduce.matches) teardown();
  };

  addEventListener("wheel", onWheel, { capture: true, passive: true });
  addEventListener("keydown", onKey);
  addEventListener("click", onClick);
  reduce.addEventListener("change", onReduce);
  return teardown;
}
