import { Bot, Boxes, Briefcase, Cloud, Code, GraduationCap, Layers, Workflow } from 'lucide-react';
import type { InfoCard, Interest } from './types';

export const profile = {
  name: 'Lokesha Perera',
  firstName: 'Lokesha',
  initials: 'LP',
  title: 'Information Technology Undergraduate',
  roles: ['Aspiring Software Engineer', 'TechOps & DevOps Enthusiast'],
  location: 'Sri Lanka',

  headline: 'Building Digital Experiences Through Code & Innovation.',
  /** Words in the headline rendered in the accent serif style. */
  headlineAccents: ['Experiences', 'Innovation.'],

  intro:
    "I'm an IT undergraduate at SLIIT and a Technology Operations intern at Virtusa. I build full-stack and mobile applications, and I'm most curious about what happens after the code ships: deployment, automation, and keeping systems healthy in production.",

  photo: {
    src: 'images/lokesha-perera.webp',
    alt: 'Portrait of Lokesha Perera',
    width: 480,
    height: 480,
  },

  email: 'lokeshajeewaniperera@gmail.com',
  /** Kept off the site on purpose. Add a number here only if you want it shown publicly. */
  phone: null as string | null,

  /**
   * Shows a green "available" badge in the hero when set, e.g. 'Open to internship opportunities'.
   * Leave null until you've confirmed your availability.
   */
  availability: null as string | null,

  socials: {
    github: 'https://github.com/Lokesha2003',
    githubHandle: 'Lokesha2003',
    /** Add your LinkedIn profile URL here. Until then it shows as "coming soon" and isn't a link. */
    linkedin: null as string | null,
  },

  languages: ['Sinhala', 'English', 'Japanese'],
};

export const about = {
  statement: [
    "I'm an Information Technology undergraduate at SLIIT, and I work on both sides of software. In my degree and projects, I build things: MERN web apps, Java systems, Android apps and the occasional Figma prototype.",
    'At Virtusa, as a Technology Operations intern on the L2 support team, I look after systems once they’re running. That means access requests, monitoring, incidents and the tickets in between.',
    'Working on both sides is what pulled me towards DevOps. I want to work where development and operations meet: automating the repetitive parts, shortening the path from commit to deployment, and building systems that are easier to run, not just to ship.',
  ],
};

export const interests: Interest[] = [
  { icon: Code, title: 'Software Engineering', description: 'Clean, maintainable code and solid fundamentals.' },
  { icon: Workflow, title: 'DevOps Engineering', description: 'Bridging development and operations.' },
  { icon: Cloud, title: 'Cloud Computing', description: 'Scalable, resilient infrastructure.' },
  { icon: Layers, title: 'Full-Stack Development', description: 'End-to-end web applications.' },
  { icon: Bot, title: 'AI & Intelligent Systems', description: 'Models that turn data into decisions.' },
  { icon: Boxes, title: 'Automation & Infrastructure', description: 'Less manual work, more reliable systems.' },
];

export const infoCards: InfoCard[] = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'SLIIT',
    detail: 'BSc (Hons) in Information Technology',
  },
  {
    icon: Briefcase,
    label: 'Professional Experience',
    value: 'Virtusa',
    detail: 'Technology Operations Intern (L2 Support)',
  },
  {
    icon: Cloud,
    label: 'Main Interest',
    value: 'DevOps & Cloud',
    detail: 'Automation, CI/CD and infrastructure',
  },
  {
    icon: Layers,
    label: 'Development Focus',
    value: 'Full-Stack Apps',
    detail: 'MERN stack, REST APIs and mobile',
  },
];
