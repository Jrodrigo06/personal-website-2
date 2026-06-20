# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **Next.js 16 / React 19.** This repo runs `next@16.2.6` and `react@19.2.4`. The
> APIs and conventions differ from older Next.js — when in doubt, read the bundled
> guides in `node_modules/next/dist/docs/` before writing code (see AGENTS.md).

## Commands

```bash
npm run dev      # next dev — local dev server at http://localhost:3000
npm run build    # next build — production build (run this to type-check the whole app)
npm run start    # next start — serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + TS)
```

There is no test suite. `npm run build` is the closest thing to a full check — it
type-checks every route/component. `npx tsc --noEmit` type-checks without building.

### Photo pipeline (Python, separate from the Node app)

```bash
pip install -r scripts/requirements.txt      # torch, transformers, umap-learn, Pillow, numpy (CPU-only)
python scripts/embed_photos.py                # regenerate the constellation from public/photos/raw/
python scripts/embed_photos.py --force        # ignore caches; re-embed + re-resize everything
```

## Architecture

A single-page personal portfolio (Next.js App Router) plus a standalone `/photos`
visualization. Styling is **plain CSS, not styled components** — Tailwind v4 is
imported but most styling lives in CSS variables + utility classes in
[app/globals.css](app/globals.css), with heavy use of inline `style={{}}` in components.

### Page composition

- [app/page.tsx](app/page.tsx) — the home page, composed of section components in
  order: `Hero → Experience → Projects → Music → PhotosTeaser`, wrapped by `Nav` and a footer.
- [app/layout.tsx](app/layout.tsx) — loads Google fonts (Fraunces serif, DM Sans) as
  CSS variables and applies the theme class to `<html>`.
- [app/photos/page.tsx](app/photos/page.tsx) — full-viewport route rendering
  `PhotoConstellation` from the generated photo data.

### Theming

Two themes (`moss` default, `sand`) are defined as CSS-variable blocks in
[app/globals.css](app/globals.css). The active theme is selected by a single constant in
[config/theme.ts](config/theme.ts) (`THEME`), which `layout.tsx` reads to conditionally
add the `theme-sand` class. **Never hardcode colors** — reference the `--text-*`,
`--bg-*`, `--border*`, `--badge-*`, etc. variables so both themes stay correct.

### Content as data

Page content is centralized in typed modules under [data/](data/), imported directly
by components (no CMS/fetch): [data/projects.ts](data/projects.ts),
[data/experience.ts](data/experience.ts), [data/photos.ts](data/photos.ts). The music
track list is currently inlined in [components/Music.tsx](components/Music.tsx).

### Photo constellation (generated content)

[data/photos.ts](data/photos.ts) and `public/photos/photos.json` are
**auto-generated — do not edit by hand.** The source of truth is the raw JPGs in
`public/photos/raw/`. [scripts/embed_photos.py](scripts/embed_photos.py) is the pipeline:
discover raw JPGs → CLIP (`clip-vit-base-patch32`) 512-d embeddings (cached by
name:mtime:size in `scripts/.cache/`) → UMAP to 2D `(x,y)` normalized 0..1 → resize each
image into committed `thumbs/` (~400px) and `display/` (~1600px) JPEGs → emit the JSON
+ typed `.ts`. To change which photos appear, add/remove files in `raw/` and re-run the
script; commit the regenerated assets and data file.

### Music section (Spotify top tracks)

[components/Music.tsx](components/Music.tsx) is an **async server component** that renders
the user's top 5 Spotify tracks (last 4 weeks) as a list of album-cover rows linking out to
each track on Spotify — display-only, no in-page audio. Data comes from
[lib/spotify.ts](lib/spotify.ts) `getTopTracks()`, which uses the **refresh-token flow**:
it exchanges `SPOTIFY_REFRESH_TOKEN` for a short-lived access token, then calls
`GET /me/top/tracks?limit=5&time_range=short_term`, cached hourly (`next: { revalidate: 3600 }`).
On any failure it returns `[]` and the section shows a quiet fallback line. Album covers load
from `i.scdn.co` (allowlisted in `next.config.ts` `remotePatterns`).

The Spotify env vars live in `.env.local` (gitignored): `SPOTIFY_CLIENT_ID`,
`SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`, `SPOTIFY_REFRESH_TOKEN`. To mint the refresh
token, hit [app/api/spotify/login/route.ts](app/api/spotify/login/route.ts) (redirects to
Spotify auth with the `user-top-read` scope), approve, and copy `refresh_token` from the
[callback](app/api/spotify/callback/route.ts) response into `.env.local`.

### Spotify taste-compare (stubbed)

[app/api/spotify/compare/route.ts](app/api/spotify/compare/route.ts) and
[components/TasteMap.tsx](components/TasteMap.tsx) are **placeholders that return 501 /
render null** — a separate planned "taste comparison" feature, not yet implemented.

## Conventions

- Import alias `@/*` maps to the repo root (e.g. `@/components/...`, `@/data/...`).
- Components needing hooks/browser APIs must start with `"use client"`
  (`MusicPlayer`, `PhotoConstellation`); section components are server components by default.
- `next.config.ts` widens image `qualities` to `[75, 90, 100]` — Next 16 rejects
  `quality` values not listed there, so add a value here before using it on `<Image>`.
