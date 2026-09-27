/**
 * Content model for the portfolio. Every piece of personal/professional
 * content rendered by the UI comes from an object that satisfies these types.
 */

export type IconKey = string;

export interface Personal {
  name: string;
  shortName: string;
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

export interface Stat {
  value: string;
  label: string;
  /** Where the number comes from in the CV. */
  source: string;
}

export interface About {
  paragraphs: string[];
  focusAreas: { title: string; description: string; icon: IconKey }[];
  stats: Stat[];
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
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  metrics: { value: string; label: string }[];
}

export type ProjectKind = 'personal' | 'graduation' | 'professional';

export type ProjectCategory = 'ai' | 'data-science' | 'data-engineering' | 'analytics';

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'github' | 'demo' | 'other';
}

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
  metrics: { value: string; label: string }[];
  overview: string;
  /** Only set when the CV states or directly implies the problem. */
  problem?: string;
  solution: string;
  methodology: string[];
  /** Only set when the CV states an outcome. */
  impact?: string[];
  links: ProjectLink[];
  featured: boolean;
}

export type SkillCategoryId = 'languages' | 'ai' | 'llm' | 'data-engineering' | 'analytics' | 'tools';

export interface Skill {
  name: string;
  icon: IconKey;
  category: SkillCategoryId;
  description: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  shortLabel: string;
  description: string;
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

export interface Achievement {
  title: string;
  detail: string;
}

export interface PortfolioData {
  personal: Personal;
  about: About;
  experience: Experience[];
  projects: Project[];
  projectCategories: { id: ProjectCategory; label: string; shortLabel: string }[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  softSkills: string[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
  };
}
