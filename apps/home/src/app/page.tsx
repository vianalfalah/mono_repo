'use client'

import { getProjectsExcludeHome } from '@mono/projects'
import { Button } from '@mono/ui'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@mono/ui'
import { Badge } from '@mono/ui'

const DEV_PORTS: Record<string, number> = {
  'dashboard': 3001,
  'game-2048': 3002,
  'landing-page': 3003,
}

function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export default function HomePage() {
  const projects = getProjectsExcludeHome()
  const isDev = isDevelopment()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400">
            My Projects
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of web applications, games, and experiments
          </p>
          {isDev && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-lg text-sm">
              <span className="font-medium">Development Mode:</span>
              <span>Projects open on different ports</span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const devUrl = isDev && DEV_PORTS[project.id]
              ? `http://localhost:${DEV_PORTS[project.id]}`
              : null

            return (
              <Card
                key={project.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {project.icon && (
                        <span className="text-4xl">{project.icon}</span>
                      )}
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                    </div>
                    <Badge
                      variant={
                        project.status === 'live'
                          ? 'default'
                          : project.status === 'wip'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {isDev && devUrl && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {devUrl}
                    </p>
                  )}
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full" type="button">
                    <a
                      href={devUrl || project.path}
                      target={devUrl ? '_blank' : undefined}
                      rel={devUrl ? 'noopener noreferrer' : undefined}
                    >
                      View Project →
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </main>
  )
}
