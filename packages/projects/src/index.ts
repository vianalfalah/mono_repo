import type { Project, ProjectStatus } from './types'

export const projects: Project[] = [
  {
    id: 'home',
    name: 'Home',
    description: 'Project hub and navigation',
    icon: '',
    path: '/',
    externalUrl: 'https://vian-project.pages.dev',
    tech: ['Next.js', 'Tailwind', 'TypeScript'],
    status: 'live',
    featured: false,
  },
  {
    id: 'landing-page',
    name: 'Portfolio Landing',
    description: 'Modern landing page with smooth animations',
    icon: '🏠',
    path: '/landing-page',
    externalUrl: 'https://mono-repo-landing.pages.dev',
    tech: ['Vite', 'React', 'Framer Motion', 'Tailwind'],
    status: 'live',
    featured: true,
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Admin dashboard with charts and data visualization',
    icon: '📊',
    path: '/dashboard',
    externalUrl: 'https://mono-repo-dashboard.pages.dev',
    tech: ['Next.js', 'Tailwind', 'Recharts', 'TypeScript'],
    status: 'live',
    featured: true,
  },
  {
    id: 'game-2048',
    name: '2048 Game',
    description: 'Classic puzzle game recreated with React',
    icon: '🎮',
    path: '/game-2048',
    externalUrl: 'https://mono-repo-game2048.pages.dev',
    tech: ['Vite', 'React', 'Tailwind', 'TypeScript'],
    status: 'live',
    featured: false,
  },
]

export type { Project, ProjectStatus }

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter(p => p.status === status)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured && p.status === 'live')
}

export function getProjectsExcludeHome(): Project[] {
  return projects.filter(p => p.id !== 'home')
}
