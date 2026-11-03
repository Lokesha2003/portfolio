import { Award, BadgeCheck, Globe, Megaphone, Music, Users } from 'lucide-react';
import type { Activity, ActivityTheme } from './types';

export const activityThemes: { id: ActivityTheme; label: string }[] = [
  { id: 'leadership', label: 'Leadership' },
  { id: 'teamwork', label: 'Teamwork' },
  { id: 'communication', label: 'Communication' },
  { id: 'collaboration', label: 'Collaboration' },
];

export const activities: Activity[] = [
  {
    id: 'rotaract',
    role: 'Committee Member, Club Service Avenue',
    organization: 'Rotaract Club of Colombo Port City',
    period: '2025 — Present',
    current: true,
    icon: Users,
    themes: ['teamwork', 'collaboration'],
  },
  {
    id: 'choir',
    role: 'Chorister & Crew Member',
    organization: 'SLIIT Choir',
    period: '2023 — Present',
    current: true,
    icon: Music,
    themes: ['teamwork', 'collaboration'],
  },
  {
    id: 'ambassador',
    role: 'Student Ambassador',
    organization: 'SLIIT',
    period: '2024',
    icon: BadgeCheck,
    themes: ['communication', 'collaboration'],
  },
  {
    id: 'prefect',
    role: 'Senior Prefect in Charge of Media & Communication',
    period: '2024',
    icon: Megaphone,
    themes: ['leadership', 'communication'],
  },
  {
    id: 'mun',
    role: 'President, Model United Nations Club',
    period: '2023',
    icon: Globe,
    themes: ['leadership', 'communication'],
  },
  {
    id: 'guide-award',
    role: 'President Guide Award',
    period: '2023',
    icon: Award,
    themes: ['leadership'],
  },
];
