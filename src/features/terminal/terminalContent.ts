import type { OutputRow } from './types'
import { themeNames } from '../theme/themes'

export const ORDERED_SECTIONS = [
  'education',
  'experience',
  'contact',
  'projects',
  'skills',
  'achievements',
] as const

export const QUICK_COMMANDS = [
  ...ORDERED_SECTIONS,
  'resume',
  'theme',
  'clear',
] as const

export const COMMAND_ALIASES: Record<string, string> = {
  social: 'contact',
}

export const RESUME_URL = 'https://drive.google.com/file/d/1TLN5vqBdWRFQvw3sbgIxcWFny2LW6Mpq/view?usp=sharing'

export const HELP_TEXT: string[] = [
  'Terminal guide:',
  '1. Type a command and press Enter.',
  '2. Use ArrowUp/ArrowDown for command history.',
  '3. Use `theme` to toggle; `theme list` shows names; `theme <name>` sets a theme.',
  '4. Run `clear` to reset output.',
  `5. Available themes: ${themeNames.join(', ')}`,
]

export const COMMAND_OUTPUTS: Record<string, OutputRow[]> = {
  education: [
    {
      type: 'text',
      value:
        'Institute of Engineering and Technology (IET), Lucknow | Expected May 2026',
    },
    {
      type: 'text',
      value:
        'B.Tech in Computer Science and Engineering (AI) | Lucknow, Uttar Pradesh',
    },
    {
      type: 'text',
      value:
        'Coursework: Data Structures and Algorithms (C++), DBMS, OS, Computer Networks, Linux',
    },
  ],
  experience: [
    {
      type: 'text',
      value:
        'Serene Minds | Software Developer Intern | Aug 2025 - Nov 2025 | Lucknow, UP, India',
    },
    {
      type: 'text',
      value:
        '- Engineered scalable full-stack features with React and Node.js across micro-repositories.',
    },
    {
      type: 'text',
      value:
        '- Implemented Authentication + RBAC for secure API and route-level data protection.',
    },
    {
      type: 'text',
      value:
        '- Architected a centralized admin dashboard for operational visibility and maintenance.',
    },
    {
      type: 'text',
      value: 'Zulip | Open Source Contributor | Feb 2025 - Jul 2025 | Remote',
    },
    {
      type: 'text',
      value:
        '- Refactored backend validation modules for identity and naming flow consistency.',
    },
    {
      type: 'text',
      value:
        '- Fixed frontend DevTools theming regression to restore reliable dark-mode rendering.',
    },
  ],
  contact: [
    { type: 'text', value: 'Mayank Kumar' },
    { type: 'text', value: 'Phone: hidden by default' },
    {
      type: 'link',
      label: 'Email: mayank.snippets@gmail.com',
      href: 'mailto:mayank.snippets@gmail.com',
    },
    {
      type: 'link',
      label: 'LinkedIn: linkedin.com/in/x64mayank',
      href: 'https://www.linkedin.com/in/x64mayank',
    },
    {
      type: 'link',
      label: 'GitHub: github.com/x64mayank',
      href: 'https://github.com/x64mayank',
    },
  ],
  projects: [
    {
      type: 'text',
      value:
        'VideoTube API | Node.js, Express, MongoDB, Cloudinary, JWT, Multer | Oct 2025 - Jan 2026',
    },
    {
      type: 'text',
      value:
        '- Built JWT auth with refresh rotation and HTTP-only cookie session handling.',
    },
    {
      type: 'text',
      value:
        '- Designed MongoDB aggregation pipelines for channel analytics and feed optimization.',
    },
    {
      type: 'text',
      value: 'C++20 Desktop Text Editor | C++, raylib, OOP, Makefile | Jan 2025 - May 2025',
    },
    {
      type: 'text',
      value:
        '- Implemented custom render loop, viewport scrolling, and low-latency text operations.',
    },

  ],
  skills: [
    { type: 'text', value: 'Languages: C/C++, JavaScript (ES6)' },
    {
      type: 'text',
      value: 'Frameworks/Libraries: React.js, Node.js, Express, Mongoose, Tailwind CSS',
    },
    {
      type: 'text',
      value: 'Tools & Platforms: Git, MongoDB, Cloudinary, Postman, Linux',
    },
  ],
  achievements: [
    { type: 'text', value: 'Certifications:' },
    {
      type: 'link',
      label: '- Software Engineer (Intermediate) | HackerRank',
      href: 'https://www.hackerrank.com/certificates/7643cb1e6d67',
    },
    {
      type: 'link',
      label: '- GitHub Foundations | DataCamp',
      href: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/bf45aa5809d55c80755c979876e8bc9332549109',
    },
    {
      type: 'text',
      value: 'JEE Mains: AIR 74,486 out of 1M+ candidates (Top 7% nationwide).',
    },
    {
      type: 'text',
      value: 'Competitive Programming: 150+ DSA problems on LeetCode and GeeksforGeeks.',
    },
  ],
}
