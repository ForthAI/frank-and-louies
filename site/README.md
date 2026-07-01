# Frank & Louie's Italian Specialties — Website

The marketing site for **Frank & Louie's**, the Rehoboth Beach original. A modern,
premium brand-landing experience built on the existing F&L brand system — home of
the legendary Buttercake.

> **Standalone project.** No shared code, config, or deployment with any other site.

---

## Stack

- **Next.js 16** (App Router, TypeScript) — static-first, no database
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **next/image** for optimized imagery, **next/font** for self-hosted fonts
- **Resend** for the contact form (via a Next.js Route Handler)
- Deploys to **Vercel**

---

## Quick start

```bash
cd site
npm install
cp .env.example .env.local   # fill in values when ready (optional for local dev)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

> The Next.js app lives in **`site/`**. The repo root also holds `brand-assets/`
> (logos, brand guide PDF, sauce label, product catalog) for reference.

---

## Editing content (no code required)

All copy and products live in plain TypeScript data files under **`src/content/`**
and **`src/lib/`** — edit these and the whole site updates.

| File | What's in it |
|------|--------------|
| `src/lib/site.ts` | Business facts: name, phone, email, **the two locations**, social links, the production URL. *Single source of truth.* |
| `src/content/products.ts` | Buttercake flavors + every product category and its items. |
| `src/content/story.ts` | The family story, taglines, and the brothers' speech-bubble banter. |
| `src/content/nav.ts` | Header & footer navigation links. |
| `src/content/images.ts` | **The image map** — where photos are wired in (see below). |
| `src/lib/contact.ts` | Contact-form topics + validation. |

---

## Swapping in final photography

Product, family, and lifestyle photos are wired through **one file**:
`src/content/images.ts`. Each entry is either a path under `/public` or `null`
(which renders a tasteful on-brand placeholder, so nothing ever looks broken).

To drop in finals:

1. Add the image files to `public/photos/` (create the folder).
2. Point the relevant key in `src/content/images.ts` at the new path, e.g.
   ```ts
   heroButtercakes: "/photos/buttercakes-hero.jpg",
   productCookies: "/photos/cookies.jpg",   // was null → placeholder
   ```
3. That's it — no component changes. The component (`SmartImage`) handles
   cropping, optimization, and the placeholder fallback.

> The current images under `public/interim/` are **interim stand-ins** pulled from
> the existing brand presence. Replace them with the new shoot when it lands.

---

## Typography & brand

The site follows **`BRAND.md`** (the Tandem brand export — the source of truth):

- **Font:** the licensed **Greycliff CF** (Regular/Medium/Bold/Heavy `.otf` in
  `src/fonts/`) powers both body and headlines via `next/font/local`.
- **Colors:** only the exact BRAND.md palette is used (Bascio Blue, Teal,
  Background, Red, Evergreen, Brown, Basil Green, Blush Red, Spicy Red). Tokens
  live in `src/app/globals.css`.
- **Assets:** product/lifestyle photography lives in `brand-assets/` and is
  wired through `src/content/images.ts`. Breads & Cookies have no photo yet, so
  they show on-brand placeholders until one is added.

---

## Contact form (Resend)

The form posts to `POST /api/contact`, which emails **FrankandLouiesRB@gmail.com**
via [Resend](https://resend.com).

**To activate:**

1. Create a free Resend account and an **API key**.
2. (Recommended) Verify the `frankandlouies.com` domain in Resend so email can be
   sent *from* an address on the domain.
3. Set the environment variables (see `.env.example`):
   - `RESEND_API_KEY` — your key
   - `CONTACT_TO_EMAIL` — defaults to `FrankandLouiesRB@gmail.com`
   - `CONTACT_FROM_EMAIL` — e.g. `Frank & Louie's <website@frankandlouies.com>`

Until the key is set, the form is fully built and validating — it just shows a
friendly "call or email us" notice instead of sending (and logs submissions to the
server console in development). Includes a spam honeypot + validation.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel. **Set the Root Directory to `site`** (the app is in a
   subfolder). Framework preset: **Next.js** (auto-detected).
3. Add the environment variables from `.env.example` (Production + Preview).
4. Deploy.

### Connect the domain

- In Vercel → **Settings → Domains**, add `frankandlouies.com` (and `www`).
- Update the registrar's DNS as Vercel instructs.
- The canonical URL is already set to `https://frankandlouies.com` in
  `src/lib/site.ts` — change it there if the domain ever differs.

---

## SEO & accessibility

- Per-page metadata, Open Graph + Twitter cards, generated `og.png`
- `sitemap.xml`, `robots.txt`, web manifest, SVG favicon + Apple touch icon
- schema.org `Bakery` / `LocalBusiness` JSON-LD on the home page
- Semantic HTML, skip-link, keyboard-navigable, WCAG-AA color contrast,
  `prefers-reduced-motion` respected

---

## Project structure

```
site/
├── public/
│   ├── brand/        logo.svg, logo-reverse.svg, deli-tile*.svg, faces-detailed.svg
│   ├── interim/      interim photography (replace with finals)
│   ├── og.png        generated social-share image
│   └── apple-icon.png
├── src/
│   ├── app/          routes: / about / products / visit / contact, api/contact,
│   │                 sitemap, robots, manifest, icon.svg, not-found
│   ├── components/
│   │   ├── brand/    Logo, FacesMark, SpeechBubble, SmartImage, Cta, Reveal, …
│   │   ├── layout/   SiteHeader, SiteFooter, PageHero
│   │   ├── sections/ Hero, Story, Buttercake, Products, Locations, Contact, …
│   │   ├── seo/      JsonLd
│   │   └── ui/       shadcn primitives
│   ├── content/      products, story, nav, images  ← edit copy here
│   └── lib/          site config, contact validation, utils
└── ...
```
