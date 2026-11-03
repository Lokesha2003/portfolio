import type { NavItem } from './types';

/** Section order on the page. `primary` items also appear in the desktop navbar. */
export const sections: NavItem[] = [
  { id: 'about', label: 'About', primary: true },
  { id: 'skills', label: 'Skills', primary: true },
  { id: 'experience', label: 'Experience', primary: true },
  { id: 'projects', label: 'Projects', primary: true },
  { id: 'education', label: 'Education', primary: true },
  { id: 'certifications', label: 'Certifications' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact', primary: true },
];

export const primaryNav = sections.filter((s) => s.primary);

/** Two-digit section number used in headings, e.g. "03". */
export function sectionIndex(id: string): string {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');
}
