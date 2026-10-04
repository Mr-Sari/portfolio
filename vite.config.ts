import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { content } from './src/data/content.ts';
import { localize, type PortfolioData } from './src/data/types.ts';

const portfolioData = localize<PortfolioData>(content, 'en');
const portfolioDataAr = localize<PortfolioData>(content, 'ar');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Generates SEO / Open Graph / JSON-LD tags from the portfolio data object. */
function seo(siteUrl: string, base: string): Plugin {
  const { seo, personal } = portfolioData;
  const root = siteUrl ? siteUrl.replace(/\/$/, '') + base : '';
  const ogImage = `${root || base}og-image.png`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    alternateName: portfolioDataAr.personal.name,
    jobTitle: personal.title,
    email: `mailto:${personal.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'SA' },
    alumniOf: portfolioData.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    knowsAbout: portfolioData.skills.map((s) => s.name),
    sameAs: [personal.linkedin, personal.github],
    ...(root ? { url: root } : {}),
  };
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="author" content="${esc(personal.name)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords.join(', '))}" />`,
    root && `<link rel="canonical" href="${root}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${personal.name} — ${personal.title}`)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="ar_SA" />`,
    root && `<meta property="og:url" content="${root}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');

  return {
    name: 'portfolio-seo',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', tags),
  };
}

// BASE_PATH lets the same build run at a domain root (Vercel, Netlify,
// Cloudflare Pages) or under a sub-path such as /portfolio/ on GitHub Pages.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.BASE_PATH || '/portfolio/';
  return {
    base,
    plugins: [react(), tailwindcss(), seo(env.VITE_SITE_URL ?? '', base)],
    build: { target: 'es2022', chunkSizeWarningLimit: 600 },
  };
});
