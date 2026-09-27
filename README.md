# Sari Owaid Alsulami — Portfolio

Personal portfolio and interactive resume for **Sari Owaid Alsulami, Data Analyst & AI Engineer**.
A one-page site built with React, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

All personal and professional content comes from one typed data file,
[`src/data/portfolioData.ts`](src/data/portfolioData.ts), extracted from the CV in
[`public/assets/Sari-Owaid-Alsulami-Resume.pdf`](public/assets/Sari-Owaid-Alsulami-Resume.pdf).
Components render that data; none of them hard-code CV content.

## Features

- **Sections:** Hero, About, Projects (filterable, with detail modal), Experience timeline,
  Skills, Education, Certifications, Contact, Footer
- **Theme:** dark / light, following the system preference on first visit, saved per visitor, no flash on load
- **Language:** English (default) / Arabic interface toggle with full RTL layout
- **Navigation:** sticky glass navbar, active-section indicator, smooth scrolling, animated mobile menu,
  reading-progress bar, back-to-top button
- **Motion:** entrance, scroll-reveal, filter, timeline, modal and hover animations, all
  disabled for visitors with `prefers-reduced-motion`
- **Accessibility:** semantic landmarks, skip link, one `h1` and ordered headings, keyboard-operable
  filters, accordions and dialog (focus trap, Escape, focus return), visible focus rings, labelled form fields with
  inline errors, AA contrast in both themes
- **SEO:** title, description, keywords, author, Open Graph / Twitter tags, a 1200×630 OG image and
  `Person` JSON-LD, all generated at build time from the same data file
- **Performance:** the project modal is code-split; only the 18 brand icons in use are bundled;
  static output is deployable anywhere

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
    │   └── portfolioData.ts    # ← all CV content lives here
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
        ├── Hero.tsx  About.tsx
        ├── Projects.tsx  ProjectCard.tsx  ProjectModal.tsx  ProjectVisual.tsx
        ├── Experience.tsx  Skills.tsx  Education.tsx  Certifications.tsx
        ├── Contact.tsx  Footer.tsx
        └── ui/                 # Button, Tag, Section, SectionHeading, Reveal, motion presets
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

Update **`src/data/portfolioData.ts`**. The file is typed by `src/data/types.ts`, so
TypeScript flags missing or misspelled fields.

- **Projects:** each has `categories` (drives the filter tabs), `metrics`, `methodology`, and
  optional `problem`, `impact` and `links`. When `problem` or `impact` is omitted, the modal
  says the CV doesn't state it rather than inventing one. To link a repository or demo, add
  `{ label: 'Source code', href: 'https://github.com/…', kind: 'github' }` to that project's `links`.
- **Certifications:** add `credentialUrl` to show a "View credential" link.
- **Resume:** replace `public/assets/Sari-Owaid-Alsulami-Resume.pdf`, keeping the same file name.
- **UI text / Arabic:** edit `src/i18n/strings.ts`. The Arabic toggle translates the interface;
  CV content stays English. To translate the content too, create an Arabic `PortfolioData`
  and return it from `getPortfolioData()` in `src/i18n/LanguageProvider.tsx`.
- **Brand icons:** to add one, append its `simple-icons` export name in
  `scripts/extract-brand-icons.mjs`, run `npm run icons`, then register it in `src/lib/icons.tsx`.

## Contact form

The form validates in the browser. Submission lives in `src/lib/contact.ts`:

- **No backend configured (default):** pressing *Send* opens the visitor's email app with a
  pre-filled draft addressed to the portfolio email, and the UI says exactly that. It never
  claims a message was sent.
- **With a backend:** set `VITE_CONTACT_ENDPOINT` to any URL that accepts a JSON `POST` of
  `{ name, email, subject, message }`, such as a [Formspree](https://formspree.io) form URL. The form
  then posts there and shows real success and error states.
- **EmailJS / Resend / custom API:** replace the body of `sendToEndpoint()` in `src/lib/contact.ts`.

Copy `.env.example` to `.env.local` for local development.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Optional form backend URL (see above). |
| `VITE_SITE_URL` | Optional absolute site origin, e.g. `https://sari.dev`. Enables canonical/`og:url` and absolute OG image URLs, which social networks need for previews. |
| `BASE_PATH` | Public base path. `/` by default; use `/<repo>/` for GitHub project pages. |

## Deployment

The build outputs static files to `dist/`.

**Vercel:** import the repository. The Vite preset is detected (build `npm run build`, output `dist`).
Add `VITE_SITE_URL` (and optionally `VITE_CONTACT_ENDPOINT`) under *Environment Variables*.

**Netlify:** *Add new site → Import from Git*. Build command `npm run build`, publish directory `dist`.

**Cloudflare Pages:** framework preset *Vite* (build `npm run build`, output `dist`). Set
`NODE_VERSION=22` if the default Node version is older.

**GitHub Pages:** `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`.
Enable it once under *Settings → Pages → Source: GitHub Actions*. The workflow sets
`BASE_PATH=/<repo-name>/` and `VITE_SITE_URL=https://<owner>.github.io`. To connect a form backend,
add a repository variable `VITE_CONTACT_ENDPOINT` under *Settings → Secrets and variables → Actions → Variables*.
For a custom domain or a `<user>.github.io` repository, change `BASE_PATH` to `/`.

## Tech stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide icons · Simple Icons (brand marks)

## License

Code: MIT. Content, the resume PDF and personal information: © Sari Owaid Alsulami, all rights reserved.
