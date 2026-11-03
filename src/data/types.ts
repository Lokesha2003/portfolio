import type { LucideIcon } from 'lucide-react';

/** Progress of a project feature or research area. */
export type WorkStatus = 'implemented' | 'in-progress' | 'planned';

export interface NavItem {
  id: string;
  label: string;
  /** Shown in the desktop navbar; everything is always shown in the mobile menu. */
  primary?: boolean;
}

export interface InfoCard {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}

export interface Interest {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
  /** Grid width on large screens. */
  span?: 1 | 2 | 3;
}

export interface Responsibility {
  icon: LucideIcon;
  text: string;
}

export interface Experience {
  id: string;
  role: string;
  team: string;
  company: string;
  employmentType: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
  responsibilities: Responsibility[];
  tags: string[];
  /** Path to a logo image in /public. Leave undefined to show the monogram placeholder. */
  logo?: string;
}

export type ProjectVisualKind = 'pharmatwin' | 'events' | 'hospital' | 'finance' | 'career' | 'advertising';

export interface ProjectFeature {
  label: string;
  status?: WorkStatus;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  summary: string;
  /** Your specific part of a team project. */
  contribution?: { title: string; text: string };
  /** Short status line, e.g. "Ongoing research". */
  status?: string;
  features: ProjectFeature[];
  tech: string[];
  featured?: boolean;
  visual: ProjectVisualKind;
  /** Real screenshot. When set, it replaces the illustrated placeholder. */
  image?: { src: string; alt: string };
  /** Only add links that actually exist. Buttons are hidden when these are empty. */
  links?: ProjectLinks;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution?: string;
  location?: string;
  period: string;
  detail?: string;
  current?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  date: string;
  credentialId?: string;
  /** Only add when you have a public verification link. */
  credentialUrl?: string;
  /** Path to a certificate image in /public. Leave undefined to show the illustrated preview. */
  previewImage?: string;
}

export type ActivityTheme = 'leadership' | 'teamwork' | 'communication' | 'collaboration';

export interface Activity {
  id: string;
  role: string;
  organization?: string;
  period: string;
  current?: boolean;
  icon: LucideIcon;
  themes: ActivityTheme[];
}
