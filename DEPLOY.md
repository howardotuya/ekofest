# Deploying Èkó Fest

A static site: `output: "export"` makes `next build` write plain HTML/CSS/JS to `out/`. There's no
server runtime, no API routes and no environment variables.

Production URL: `https://ekofest.howardotuya.com`

## One-time Vercel setup

1. In Vercel, **Add New → Project** and import this repository.
2. Framework preset: **Next.js**. Leave the root directory, build, install and output settings on
   their defaults. Vercel sees `pnpm-lock.yaml` and installs with pnpm.
3. **Settings → General → Node.js Version**: `22.x`.
4. **Settings → Domains**: add `ekofest.howardotuya.com`, then create the DNS record Vercel shows (a
   `CNAME` for `ekofest`) at the `howardotuya.com` DNS provider.

## Checks before deploying

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm build
pnpm measure      # first-load JS per page, gzip
pnpm lighthouse   # mobile Lighthouse against out/, reports in reports/lighthouse
```

Images are pre-rendered: after changing anything in `images/`, run `pnpm images` and commit the
results in `public/img/` and `src/lib/images.gen.ts`.
