import type { Certification, EducationItem } from './types';

export const education: EducationItem[] = [
  {
    id: 'sliit',
    qualification: 'BSc (Hons) in Information Technology',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    location: 'Malabe',
    period: 'May 2023 — Present',
    current: true,
  },
  {
    id: 'al',
    qualification: 'G.C.E. Advanced Level',
    institution: 'Viharamahadevi Balika Vidyalaya',
    location: 'Kiribathgoda',
    period: '2022',
    detail: 'Arts Stream',
  },
  {
    id: 'ol',
    qualification: 'G.C.E. Ordinary Level',
    period: '2019',
  },
];

export const certifications: Certification[] = [
  {
    id: 'nibm-cs',
    title: 'Certificate Course in Computer Science',
    issuer: 'National Institute of Business Management',
    issuerShort: 'NIBM',
    date: '2020',
  },
  {
    id: 'powerbi',
    title: 'Power BI for Beginners',
    issuer: 'Simplilearn SkillUp',
    issuerShort: 'SL',
    date: 'December 2025',
    credentialId: '9547904',
  },
];
