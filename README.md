# philipbunford.com

Personal site built with Astro. Dark/white plexus background, an interactive
network where every experience, education entry, writing link, contact button and
monthly-activity blob points a filament to a node in the background.

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to ./dist
```

## Editing content (no code needed)
- **Writing & projects** — `src/data/writing.json`. Add `{ "title", "url", "date" }`.
  Each links straight to your Substack post (or anywhere it's hosted).
- **Experience** — `src/data/experience.json` (`name`, `date`).
- **Education** — `src/data/education.json` (`name`, `date`).
- **Bio + "who am I" text** — `src/pages/about.astro`.

## Contributions (the right-hand rail)
- **Live from GitHub:** built automatically from your public commit activity for
  `PHIL-E-B3` via a public contributions feed (no token needed), fetched at build time.
- **Add anything that isn't a commit** — `src/data/contributions.json`:
  `{ "date": "2026-06-10", "count": 3, "note": "Launched the site" }`. These merge
  into the monthly totals.
- The deploy workflow rebuilds **daily** (cron) so the graph stays current.

## Deploy (GitHub Pages, custom domain)
1. Push this repo to GitHub (replace your old static site).
2. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and deploys on every push.
4. `public/CNAME` keeps `philipbunford.com` pointed at the site (DNS already set).

## Icons
`public/icons/` — your three custom marks, extracted to white-on-transparent so they
tint with the theme. Swap the PNGs to change them.
