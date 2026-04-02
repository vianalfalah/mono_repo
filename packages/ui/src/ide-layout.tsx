'use client'

import React, { useState, useEffect } from 'react'
import { projects, type Project } from '@mono/projects'

function isDevelopment(): boolean {
  if (typeof process !== 'undefined') {
    return process.env.NODE_ENV === 'development'
  }
  // @ts-ignore - Vite environment check
  return import.meta.env?.DEV === true
}

type IDELayoutProps = {
  children: React.ReactNode;
  activePath?: string;
  appName?: string;
}

export function IDELayout({ children, activePath = '/', appName = 'app' }: IDELayoutProps) {
  const isDev = isDevelopment()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen w-full flex-col bg-[#1e1e1e] text-[#cccccc] font-mono overflow-hidden">
      {/* Title Bar */}
      <div className="flex h-10 shrink-0 w-full items-center justify-between border-b border-[#333333] bg-[#181818] px-4 text-xs select-none relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="opacity-70 text-sm">vian-portfolio — {appName}</span>
        </div>
        <button
          className="md:hidden opacity-80 hover:opacity-100"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close Explorer' : 'Explorer'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Activity Bar (Icons) */}
        <div className="hidden md:flex flex-col items-center h-full w-12 shrink-0 border-r border-[#333333] bg-[#181818] py-4 relative z-10">
          <div className="w-full flex justify-center opacity-100 border-l-2 border-primary text-primary pb-1 cursor-pointer" title="Explorer">
            📄
          </div>
        </div>

        {/* Sidebar (File Explorer) */}
        {isSidebarOpen && (
          <div className={`${isMobile ? 'absolute z-50 h-full shadow-2xl' : ''} flex w-64 shrink-0 flex-col border-r border-[#333333] bg-[#181818] text-sm overflow-y-auto`}>
            <div className="px-5 py-3 uppercase tracking-wider text-xs opacity-60 font-semibold">
              EXPLORER
            </div>

            <div className="px-2 pb-4">
              <div className="flex items-center gap-1 px-3 py-1 font-semibold opacity-90 cursor-default">
                <span className="text-[10px]">▼</span> MONO_REPO
              </div>
              <div className="flex flex-col mt-1">
                {projects.map((project: Project) => {
                  const href = isDev && project.devUrl ? project.devUrl : (project.externalUrl || project.path)
                  const isActive = activePath === project.path || (activePath === '/' && project.path === '/')

                  return (
                    <a
                      key={project.id}
                      href={href}
                      className={`flex items-center gap-2 px-8 py-1.5 cursor-pointer hover:bg-[#2a2d2e] ${isActive ? 'bg-[#37373d] text-white' : 'opacity-80'}`}
                    >
                      <span className="opacity-60 text-xs">ts</span> {project.name.toLowerCase().replace(/\s+/g, '-')}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Pane */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e] relative z-0">
          {/* Tab Bar */}
          <div className="flex h-10 w-full shrink-0 flex-row items-center border-b border-[#333333] bg-[#1f1f1f] text-sm overflow-x-auto">
            <div className="flex h-10 items-center justify-between border-t-2 border-primary bg-[#1e1e1e] px-4 min-w-[150px]">
              <div className="flex items-center">
                <span className="mr-2 text-primary opacity-80 text-[10px] font-bold">TS</span>
                <span className="whitespace-nowrap">{appName.toLowerCase().replace(/\s+/g, '-')}.tsx</span>
              </div>
              <span className="ml-3 opacity-50 hover:opacity-100 cursor-pointer text-sm">×</span>
            </div>
          </div>

          {/* Editor Content Area */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto relative w-full hide-scrollbar">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 w-full min-h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
