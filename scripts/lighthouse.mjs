// Lighthouse (default mobile profile: Moto G Power, simulated slow 4G) against
// the production build, served the way Vercel would serve it.
// Usage: node scripts/lighthouse.mjs [route ...]   (default route: /)
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { root, serve } from "./serve.mjs";

const routes = process.argv.length > 2 ? process.argv.slice(2) : ["/"];
const port = 4100;
const reportDir = path.join(root, "reports", "lighthouse");
mkdirSync(reportDir, { recursive: true });

const server = await serve(port);
const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new"] });

const pct = (score) => Math.round((score ?? 0) * 100);
const ms = (audit) => `${Math.round(audit.numericValue)} ms`;

try {
  for (const route of routes) {
    const { lhr, report } = await lighthouse(`http://localhost:${port}${route}`, {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
    });
    const slug = route === "/" ? "index" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-");
    writeFileSync(path.join(reportDir, `${slug}.html`), report[0]);
    writeFileSync(path.join(reportDir, `${slug}.json`), report[1]);

    const c = lhr.categories;
    const a = lhr.audits;
    console.log(`\n${route}`);
    console.log(
      `  Performance ${pct(c.performance.score)}  Accessibility ${pct(c.accessibility.score)}  ` +
        `Best Practices ${pct(c["best-practices"].score)}  SEO ${pct(c.seo.score)}`,
    );
    console.log(
      `  LCP ${ms(a["largest-contentful-paint"])}  FCP ${ms(a["first-contentful-paint"])}  ` +
        `TBT ${ms(a["total-blocking-time"])}  CLS ${a["cumulative-layout-shift"].numericValue.toFixed(3)}  ` +
        `SI ${ms(a["speed-index"])}`,
    );
    const failing = Object.values(c)
      .flatMap((cat) => cat.auditRefs)
      .map((ref) => a[ref.id])
      .filter(
        (audit) =>
          audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "informative",
      )
      .map((audit) => `${audit.id} (${pct(audit.score)})`);
    if (failing.length) console.log(`  Below 90: ${[...new Set(failing)].join(", ")}`);
  }
} finally {
  chrome.kill();
  server.close();
}
