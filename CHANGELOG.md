# Changelog

All notable changes to this monorepo will be documented in this file.

## [Unreleased]

### Added
- Initial monorepo setup with Turborepo + pnpm
- Shared packages:
  - `@mono/ui` - shadcn/ui components (Button, Card, Badge)
  - `@mono/config` - Tailwind and TypeScript base configs
  - `@mono/utils` - Shared utilities (cn, formatDate, etc.)
  - `@mono/projects` - Project registry
- Documentation:
  - [docs/README.md](docs/README.md) - Documentation index
  - [docs/NEW_PROJECT.md](docs/NEW_PROJECT.md) - Creating new projects
  - [docs/MIGRATING.md](docs/MIGRATING.md) - Migrating existing projects
  - [docs/SHARED_PACKAGES.md](docs/SHARED_PACKAGES.md) - Using shared packages
  - [docs/PORTS.md](docs/PORTS.md) - Port assignment reference

### Changed
- **Fixed port assignments for consistent development:**
  - `@mono/home` → Port 3000 (Next.js)
  - `@mono/dashboard` → Port 3001 (Next.js)
  - `@mono/game-2048` → Port 3002 (Vite)
  - `@mono/landing-page` → Port 3003 (Vite)

### Fixed
- Fixed `slide` function type definition in game-2048 hook
- Added `@types/react` to `@mono/ui` package for proper TypeScript support
- Updated turbo.json `pipeline` → `tasks` for Turborepo 2.x compatibility
- Fixed home page links to work in development mode (opens on correct ports)
- All apps now have explicitly configured ports to prevent conflicts

---

## [2025-04-02] - Initial Release

### Project Structure
```
mono-repo/
├── apps/                    # Individual projects
│   ├── home/                # Next.js - Project hub
│   ├── landing-page/        # Vite + React - Landing page
│   ├── dashboard/           # Next.js - Dashboard
│   └── game-2048/           # Vite + React - Game
├── packages/                # Shared packages
│   ├── ui/                  # Shared components
│   ├── config/              # Configs
│   ├── utils/               # Utilities
│   └── projects/            # Project registry
├── package.json             # Root config
├── pnpm-workspace.yaml      # Workspace config
├── turbo.json               # Turborepo config
└── vercel.json              # Vercel routing
```

### Technology Stack
- **Monorepo**: Turborepo 2.9.3 + pnpm 9.15.0
- **Frameworks**: Next.js 15, Vite 6
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui
- **Deployment**: Vercel (path-based routing)

---

## Format

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of Changes
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security vulnerability fixes
