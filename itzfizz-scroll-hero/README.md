# Itzfizz – Scroll-Driven Hero

Hero section where a car drives across the screen as you scroll. Built for the
Itzfizz Digital web development internship assignment.

**Stack:** Next.js (App Router), React, Tailwind CSS, GSAP + ScrollTrigger, Lenis

## What it does

- Headline and stat cards animate in on load (staggered fade + rise, numbers count up)
- Scrolling pins the hero and moves the car based on scroll progress (`scrub`), not time
- Each headline letter lights up as the car passes over it
- Road markings, headlight beam and speed readout follow the same progress
- Only `transform` / `opacity` are animated, no layout work in the scroll handler
- Respects `prefers-reduced-motion`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on GitHub Pages

1. Push this repo to GitHub (branch `main`)
2. Repo **Settings → Pages → Source: GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` builds and publishes it

The live URL will be `https://<username>.github.io/<repo-name>/`

## Structure

```
app/          layout, page, global styles
components/   Hero (all the animation), Car (SVG), StatCard
data/         stats content
```

## Notes

- The car is an inline SVG so the project has no image dependencies.
- Scroll timeline is rebuilt on resize because letter positions depend on screen width.
