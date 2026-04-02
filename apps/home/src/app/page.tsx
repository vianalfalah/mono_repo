'use client'

import { getProjectsExcludeHome } from '@mono/projects'
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
    <>
      <main className="min-h-full py-8 text-foreground w-full flex justify-center">
        <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">
            ~/projects
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of web applications, games, and experiments
          </p>
          {isDev && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-900/30 text-yellow-500 border border-yellow-900/50 rounded-none text-xs">
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
            const prodUrl = project.externalUrl || project.path
            const url = devUrl || prodUrl

            return (
              <Card
                key={project.id}
                className="group hover:border-primary border border-border bg-card transition-none rounded-none"
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
                  {!isDev && prodUrl && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {prodUrl}
                    </p>
                  )}
                </CardContent>

                <CardFooter>
                  <a
                    href={url}
                    target={project.externalUrl ? '_blank' : undefined}
                    rel={project.externalUrl ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  >
                    View Project →
                  </a>
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
    </>
  )
}
