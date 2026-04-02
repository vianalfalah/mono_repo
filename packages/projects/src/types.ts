export type ProjectStatus = 'live' | 'wip' | 'experimental' | 'archived'

export interface Project {
  id: string
  name: string
  description: string
  icon: string
  path: string
  tech: string[]
  status: ProjectStatus
  githubUrl?: string
  externalUrl?: string
  featured?: boolean
}
