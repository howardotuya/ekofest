// Links to a <details> (the "Venue." links point at the "Where is it?" FAQ)
// open it, whether followed by a click or loaded straight from the URL. Inline
// so it costs no client component; without JS the link still lands on the FAQ.
const script = `(() => {
  const open = (hash) => {
    const el = hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el && el.tagName === "DETAILS") el.open = true;
  };
  addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a) open(a.getAttribute("href"));
  });
  addEventListener("hashchange", () => open(location.hash));
  addEventListener("DOMContentLoaded", () => open(location.hash));
})();`;

export function DetailsScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
