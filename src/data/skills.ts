import { Braces, ChartColumn, Database, GitPullRequest, Monitor, PenTool, Server, Wrench } from 'lucide-react';
import type { SkillCategory } from './types';

/**
 * Skill names are matched (case-insensitively) against each project's `tech` list,
 * so the Skills section can show which projects use a skill. Keep spellings consistent.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Braces,
    skills: ['Python', 'R', 'PHP', 'JavaScript', 'Java', 'C++', 'C'],
    span: 2,
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Monitor,
    skills: ['HTML', 'CSS', 'React.js'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    skills: ['Node.js', 'Express.js'],
  },
  {
    id: 'databases',
    title: 'Database Management',
    icon: Database,
    skills: ['MongoDB', 'MySQL'],
  },
  {
    id: 'data',
    title: 'Data Analysis & Visualization',
    icon: ChartColumn,
    skills: ['Excel', 'R', 'Power BI'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Android Studio', 'RStudio', 'XAMPP', 'Eclipse'],
    span: 2,
  },
  {
    id: 'design',
    title: 'Design & Prototyping',
    icon: PenTool,
    skills: ['Figma', 'Canva'],
  },
  {
    id: 'practices',
    title: 'Additional Skills',
    icon: GitPullRequest,
    skills: ['REST API Development', 'JSON Handling', 'Version Control', 'Git Branching & Pull Requests'],
    span: 3,
  },
];
