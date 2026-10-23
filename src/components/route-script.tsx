// The route's motion, inline so it costs no client component:
// - pops each [data-f] element in once the road reaches it (data-f is how far
//   along the desktop road it sits; on the vertical mobile road it's measured);
// - where scroll-driven animations are missing, also sets --p, which draws the
//   road. Same mapping as the CSS: the road's head sits at 70% of the viewport.
// Reduced motion: nothing runs, so the road and every set are shown at once.
const script = `(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const sda = CSS.supports("animation-timeline: view()");
  document.documentElement.classList.add("route-js");
  addEventListener("DOMContentLoaded", () => {
    const art = document.querySelector("[data-route]");
    if (!art) return;
    const items = [...art.querySelectorAll("[data-f]")];
    const wide = matchMedia("(min-width: 64rem)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = art.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      const at = items.map((el) => wide.matches ? +el.dataset.f : (el.getBoundingClientRect().top - r.top) / r.height);
      if (!sda) art.style.setProperty("--p", p);
      items.forEach((el, i) => el.classList.toggle("on", p >= at[i]));
    };
    const queue = () => { frame ||= requestAnimationFrame(update); };
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { addEventListener("scroll", queue, { passive: true }); queue(); }
      else removeEventListener("scroll", queue);
    }, { rootMargin: "50% 0px" }).observe(art);
    addEventListener("resize", queue);
  });
})();`;

export function RouteScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
