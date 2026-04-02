'use client'

import { useState } from 'react'
import { projects, type Project } from '@mono/projects'

function isDevelopment(): boolean {
  if (typeof process !== 'undefined') {
    return process.env.NODE_ENV === 'development'
  }
  // @ts-ignore - Vite environment check
  return import.meta.env?.DEV === true
}

function NavLink({ project, isDev, onClick }: { project: Project; isDev: boolean; onClick?: () => void }) {
  const href = isDev ? project.path : (project.externalUrl || project.path)
  const isExternal = !!project.externalUrl && !isDev

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        onClick={onClick}
      >
        {project.name}
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ${project.path === href ? 'font-bold underline' : ''}`}
      onClick={onClick}
    >
      {project.name}
    </a>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const isDev = isDevelopment()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2 font-semibold text-lg">
            <span className="text-2xl">🚀</span>
            <span>My Projects</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {projects.map((project: Project) => (
              <NavLink key={project.id} project={project} isDev={isDev} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-4">
              {projects.map((project: Project) => (
                <NavLink
                  key={project.id}
                  project={project}
                  isDev={isDev}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
