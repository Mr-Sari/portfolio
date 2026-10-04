/**
 * Content model for the portfolio.
 *
 * Content is authored bilingually (see content.ts): any text field may be a
 * plain string (technology names, URLs) or a `{ en, ar }` pair. `localize()`
 * resolves the whole tree to one language, producing the `PortfolioData`
 * shape that components render.
 */
import type { Locale } from '../i18n/strings.ts';

export type IconKey = string;

export interface Personal {
  name: string;
  shortName: string;
  altName: string;
  initials: string;
  title: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  linkedin: string;
  github: string;
  resume: string;
  languages: { name: string; level?: string }[];
}

export interface About {
  paragraphs: string[];
  /** Analytics → BI → Data Science → AI, in order of emphasis. */
  chain: { title: string; description: string; icon: IconKey }[];
}

/** A real, sourced figure shown in the hero. */
export interface HeroStat {
  value: string;
  label: string;
  source: string;
}

export interface Experience {
  id: string;
  company: string;
  via?: string;
  role: string;
  location: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  employmentType?: string;
  sector: string;
  /** The discipline this role represents in the career path. */
  stage: string;
  summary: string;
  /** Bullets from the CV. Figures such as "10+" are highlighted automatically. */
  achievements: string[];
  responsibilities: string[];
  technologies: string[];
}

export type ProjectKind = 'personal' | 'graduation' | 'professional';

export type ProjectCategory = 'ai' | 'data-science' | 'data-engineering' | 'analytics';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  context: string;
  kind: ProjectKind;
  start: string;
  end: string;
  categories: ProjectCategory[];
  visual: 'rag' | 'resume' | 'vision' | 'platform' | 'dashboard' | 'reporting' | 'pipeline' | 'timeseries';
  technologies: string[];
  /** 1–3 short phrases shown on the card. */
  highlights: string[];
  /** Problem → Approach → Result, one line each. */
  brief: { problem: string; approach: string; result: string };
  /** Quantified results from the CV. */
  metrics: { value: string; label: string }[];
  overview: string;
  /** Only set when the CV states or directly implies the problem. */
  problem?: string;
  solution: string;
  methodology: string[];
  /** Only set when the CV states an outcome. */
  impact?: string[];
  /** Real repository URL, or empty when none has been provided. */
  githubUrl: string;
  /** Real live-demo URL, or empty when none exists. */
  demoUrl: string;
}

export type SkillCategoryId = 'analytics' | 'bi' | 'ai' | 'engineering';

export interface Skill {
  name: string;
  icon: IconKey;
  category: SkillCategoryId;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  description: string;
  /** The primary group gets the strongest emphasis. */
  primary?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  college: string;
  location: string;
  start: string;
  end: string;
  gpa?: { value: number; scale: number };
  honors?: string;
  coursework: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerIcon: IconKey;
  date: string; // YYYY-MM
  category: string;
  credentialUrl?: string;
}

export interface PortfolioData {
  personal: Personal;
  heroStats: HeroStat[];
  about: About;
  experience: Experience[];
  projects: Project[];
  projectCategories: { id: ProjectCategory; label: string }[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  tools: string[];
  softSkills: string[];
  education: Education[];
  certifications: Certification[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/* ---------- Bilingual authoring ---------- */

export type Text = { en: string; ar: string };

/** Same shape as T, but every string may also be an `{ en, ar }` pair. */
export type Bilingual<T> = T extends string
  ? string | Text
  : T extends readonly (infer U)[]
    ? Bilingual<U>[]
    : T extends object
      ? { [K in keyof T]: Bilingual<T[K]> }
      : T;

const isText = (v: unknown): v is Text =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length === 2 && 'en' in v && 'ar' in v;

/** Resolves bilingual content to a single language. */
export function localize<T>(value: Bilingual<T>, locale: Locale): T {
  if (isText(value)) return value[locale] as T;
  if (Array.isArray(value)) return value.map((v) => localize(v, locale)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v as Bilingual<unknown>, locale)])) as T;
  }
  return value as T;
}
