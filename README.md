# Sari Owaid Alsulami — Portfolio

Personal portfolio and interactive resume for **Sari Owaid Alsulami, Data Analyst**.
A one-page site built with React, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

The site is **bilingual**: English by default (LTR) and a full Arabic translation (RTL) behind the
language toggle. All personal and professional content lives in one typed, bilingual data file,
[`src/data/content.ts`](src/data/content.ts), extracted from the CV in
[`public/assets/Sari-Owaid-Alsulami-Resume.pdf`](public/assets/Sari-Owaid-Alsulami-Resume.pdf).
Components render that data; none of them hard-code CV content.

## Features

- **Sections:** Hero → About (bento: who I am, education, philosophy, location, focus) → Experience
  (centre timeline) → Projects (snap carousel + detail modal) → statement interlude → Skills → Certifications →
  Contact (closing statement, contact chips, form) → one-line footer
- **Positioning:** Data Analyst first; BI, data engineering and AI/ML as supporting skills. Skills are grouped
  by priority, and the Data Analytics group gets larger, emphasised chips.
- **Personal voice:** a few short statements (hero, About philosophy, interlude, closing), edited in
  `statements` inside `src/data/content.ts`
- **Projects:** cards read Problem → Solution → Result (`brief` field, only where the CV supports it);
  methodology, metrics and links live in the modal. GitHub/Live Demo buttons render only for real URLs.
- **Motion (Framer Motion):** blur-to-sharp section titles, staggered reveals, typing stack line in the hero,
  hero parallax, timeline line that grows with scroll, side-entering timeline cards, carousel focus scaling,
  self-drawing skill dividers, soft-skills marquee. Everything is reduced or static under `prefers-reduced-motion`.
- **Theme:** dark / light, following the system preference on first visit, saved per visitor, no flash on load
- **Language:** English (default, LTR) / Arabic (RTL), with both interface and content translated
- **Navigation:** floating pill navbar with active-section indicator, Contact CTA, language and theme toggles,
  animated mobile menu, reading-progress bar, back-to-top
- **Accessibility:** semantic landmarks, skip link, ordered headings, keyboard-operable filters, carousel
  (arrows, scrubber, arrow keys), accordions and dialog (focus trap, Escape, focus return), visible focus rings,
  labelled form fields with inline errors
- **SEO:** title, description, keywords, author, Open Graph / Twitter tags, a 1200×630 OG image and
  `Person` JSON-LD, all generated at build time from the same data file

## Project structure

```
.
├── index.html                  # HTML shell, pre-paint theme script, SEO placeholder
├── vite.config.ts              # Vite + React + Tailwind, SEO tag generation, BASE_PATH support
├── public/
│   ├── assets/Sari-Owaid-Alsulami-Resume.pdf   # "Download Resume" target
│   ├── og-image.png            # Social preview image
│   ├── favicon.svg
│   └── robots.txt
├── scripts/extract-brand-icons.mjs             # Regenerates src/lib/brandIcons.ts
└── src/
    ├── main.tsx                # Entry: providers + App
    ├── App.tsx                 # Page composition, skip link, MotionConfig
    ├── index.css               # Tailwind v4, design tokens (light/dark), utilities
    ├── data/
    │   ├── types.ts            # Content model
    │   ├── content.ts          # All content, as { en, ar } pairs
    │   └── types.ts            # Content model + localize()
    ├── i18n/
    │   ├── strings.ts          # UI strings (en, ar) and section ids
    │   └── LanguageProvider.tsx
    ├── hooks/                  # useTheme, useActiveSection, useScrolled, useSpotlight
    ├── lib/
    │   ├── contact.ts          # Contact form validation + submission (isolated)
    │   ├── icons.tsx           # Tech/brand icon registry
    │   ├── brandIcons.ts       # Generated brand icon paths (simple-icons, CC0)
    │   ├── scroll.ts
    │   └── assets.ts           # Base-path-aware public asset URLs
    └── components/
        ├── Navbar.tsx  ThemeToggle.tsx  LanguageToggle.tsx  ScrollChrome.tsx
        ├── Hero.tsx  About.tsx  Interlude.tsx
        ├── Projects.tsx  ProjectCard.tsx  ProjectModal.tsx  ProjectVisual.tsx
        ├── Experience.tsx  Skills.tsx  Certifications.tsx
        ├── Contact.tsx  Footer.tsx
        └── ui/                 # BigTitle, Button, Tag, Section, Reveal, motion presets
```

## Getting started

Requires Node.js 20.19+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

## Editing content

Update **`src/data/content.ts`**. Translatable text is written as a pair:

```ts
title: { en: 'Car Damage Analysis Pipeline', ar: 'نظام تحليل أضرار المركبات' },
technologies: ['YOLOv8', 'OpenCV'], // technology names stay as plain strings
```

`localize()` in `src/data/types.ts` resolves the file to one language, and TypeScript checks it
against the content model. The default language is `DEFAULT_LOCALE` in
`src/i18n/LanguageProvider.tsx` (mirrored in the pre-paint script in `index.html`).

- **Projects:** each has `categories` (drives the filter tabs), `brief` (card: optional problem,
  solution, optional result), plus `metrics`, `methodology` and optional `problem` / `impact` for the
  modal (omitted sections are hidden). `githubUrl` and `demoUrl` show their buttons only when non-empty,
  so leave them `''` until a real URL exists.
- **Statements & hero:** `statements` (hero line, philosophy, interlude, closing) and `heroStack`
  (the typed stack line) are in `content.ts`.
- **Certifications:** add `credentialUrl` to show a "View credential" link.
- **Resume:** replace `public/assets/Sari-Owaid-Alsulami-Resume.pdf`, keeping the same file name.
- **UI text:** edit `src/i18n/strings.ts` (both languages).
- **Brand icons:** to add one, append its `simple-icons` export name in
  `scripts/extract-brand-icons.mjs`, run `npm run icons`, then register it in `src/lib/icons.tsx`.

## Contact form

The form validates in the browser. Submission lives in `src/lib/contact.ts`:

The provider is chosen from environment variables at build time (Formspree first):

**Formspree (recommended)**
1. Create a free form at [formspree.io](https://formspree.io) and set its notification email.
2. Copy the form endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Set `VITE_FORMSPREE_ENDPOINT` to it (locally in `.env.local`, and in your host's build settings).

**EmailJS**
1. In the [EmailJS dashboard](https://dashboard.emailjs.com) add an *Email Service* and an *Email Template*.
2. Use these template variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`.
3. Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`
   (*Account → General → Public Key*). The form calls the EmailJS REST API, so no SDK is bundled.

Both values are designed to be public (they are visible in the browser by nature); never put a
private key or password in a `VITE_` variable.

The success state appears only after the provider confirms delivery. A failed request shows an
error with the direct email address. With **no provider configured**, *Send* opens a pre-filled
draft in the visitor's email app and the UI says so. It never claims the message was sent.

Copy `.env.example` to `.env.local` for local development.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_FORMSPREE_ENDPOINT` | Formspree form endpoint (contact form). |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (alternative to Formspree). |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID. |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key. |
| `VITE_SITE_URL` | Optional absolute site origin, e.g. `https://sari.dev`. Enables canonical/`og:url` and absolute OG image URLs, which social networks need for previews. |
| `BASE_PATH` | Public base path. `/` by default; use `/<repo>/` for GitHub project pages. |

## Deployment

The build outputs static files to `dist/`.

**Vercel:** import the repository. The Vite preset is detected (build `npm run build`, output `dist`).
Add `VITE_SITE_URL` and the contact-form variables under *Environment Variables*.

**Netlify:** *Add new site → Import from Git*. Build command `npm run build`, publish directory `dist`.

**Cloudflare Pages:** framework preset *Vite* (build `npm run build`, output `dist`). Set
`NODE_VERSION=22` if the default Node version is older. Add the contact-form variables under
*Settings → Variables and Secrets* (as build variables) and redeploy. `VITE_` values are baked in at build time.

**GitHub Pages:** `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`.
Enable it once under *Settings → Pages → Source: GitHub Actions*. The workflow sets
`BASE_PATH=/<repo-name>/` and `VITE_SITE_URL=https://<owner>.github.io`. To connect the form,
add repository variables (e.g. `VITE_FORMSPREE_ENDPOINT`) under *Settings → Secrets and variables → Actions → Variables*.
For a custom domain or a `<user>.github.io` repository, change `BASE_PATH` to `/`.

## Tech stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide icons · Simple Icons (brand marks)

## License

Code: MIT. Content, the resume PDF and personal information: © Sari Owaid Alsulami, all rights reserved.
