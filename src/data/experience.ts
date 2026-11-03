import { Activity, KeyRound, Network, ScrollText, Siren, Ticket, TrendingUp } from 'lucide-react';
import type { Experience } from './types';

export const experience: Experience[] = [
  {
    id: 'virtusa',
    role: 'Intern',
    team: 'Technology Operations (L2 Support)',
    company: 'Virtusa (Pvt) Ltd',
    employmentType: 'Internship',
    start: '2025',
    // TODO: confirm the exact end date before publishing.
    end: 'Present',
    current: true,
    summary:
      'Supporting day-to-day IT operations as part of an L2 support team: handling access requests, keeping an eye on system and application health, and working incidents through to resolution.',
    responsibilities: [
      { icon: KeyRound, text: 'Managing IT access and provisioning requests' },
      { icon: Activity, text: 'Monitoring system performance and application health' },
      { icon: Siren, text: 'Investigating and resolving incidents' },
      { icon: Network, text: 'Supporting network troubleshooting' },
      { icon: ScrollText, text: 'Maintaining operational logs' },
      { icon: Ticket, text: 'Following ticketing and escalation processes' },
      { icon: TrendingUp, text: 'Supporting weekly reporting and process improvements' },
    ],
    tags: ['IT Operations', 'L2 Support', 'Incident Management', 'Access Management', 'Monitoring'],
  },
];
