# Mono Repo

A portfolio monorepo hosting multiple web projects with shared UI components, utilities, and design tokens.

## 📚 Documentation

For detailed guides and documentation, see the **[docs/](./docs/README.md)** folder:

| Guide | Description |
|-------|-------------|
| [New Project](./docs/NEW_PROJECT.md) | Create a new project in the monorepo |
| [Migrating](./docs/MIGRATING.md) | Migrate existing projects into the monorepo |
| [Shared Packages](./docs/SHARED_PACKAGES.md) | Use and extend shared packages |
| [Deployment](./docs/DEPLOYMENT.md) | Deploy to Vercel |
| [Port Assignments](./docs/PORTS.md) | Development port reference |
| [Changelog](./CHANGELOG.md) | Version history and updates |

---

## Projects

| Project | Framework | Path | Description |
|---------|-----------|------|-------------|
| [Home](./apps/home) | Next.js | `/` | Project hub and navigation |
| [Landing Page](./apps/landing-page) | Vite + React | `/landing-page` | Modern landing page with animations |
| [Dashboard](./apps/dashboard) | Next.js | `/dashboard` | Analytics dashboard with charts |
| [Game 2048](./apps/game-2048) | Vite + React | `/game-2048` | Classic 2048 puzzle game |

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Run all apps (each on its own port)
pnpm dev

# Run specific app
pnpm --filter @mono/home dev
pnpm --filter @mono/landing-page dev
pnpm --filter @mono/dashboard dev
pnpm --filter @mono/game-2048 dev
```

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @mono/home build
```

---

## Project Structure

```
mono-repo/
├── apps/                    # Individual projects
│   ├── home/                # Next.js - Project hub
│   ├── landing-page/        # Vite + React - Landing page
│   ├── dashboard/           # Next.js - Dashboard
│   └── game-2048/           # Vite + React - Game
├── packages/                # Shared packages
│   ├── ui/                  # shadcn/ui components
│   ├── config/              # Tailwind, TypeScript configs
│   ├── utils/               # Shared utilities
│   └── projects/            # Project registry
├── docs/                    # Documentation
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── vercel.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + pnpm |
| Frameworks | Next.js, Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Deployment | Vercel |

---

## Adding a New Project

```bash
# 1. Create the app
pnpm create vite apps/my-new-project --template react-ts

# 2. Update package.json name to "@mono/my-new-project"

# 3. Register in packages/projects/src/index.ts

# 4. Add route to vercel.json

# 5. Install and run
pnpm install
pnpm --filter @mono/my-new-project dev
```

📖 **See [NEW_PROJECT.md](./docs/NEW_PROJECT.md) for detailed guide.**

---

## Migrating Existing Project

```bash
# 1. Copy your project
cp -r /path/to/project apps/my-project

# 2. Update package.json (name, dependencies)

# 3. Configure workspace links

# 4. Register in project registry
```

📖 **See [MIGRATING.md](./docs/MIGRATING.md) for detailed guide.**

---

## Development Ports

| App | Dev URL | Production URL |
|-----|---------|----------------|
| Home | http://localhost:3000 | `/` |
| Landing Page | http://localhost:3001 | `/landing-page` |
| Dashboard | http://localhost:3002 | `/dashboard` |
| Game 2048 | http://localhost:3003 | `/game-2048` |

> **Note**: In development, each app runs on its own port. Links in the home page open projects in new tabs with the correct port.

---

## Using Shared Packages

```tsx
// Shared components
import { Button, Card, Badge } from '@mono/ui'

// Shared utilities
import { cn, formatDate } from '@mono/utils'

// Project registry
import { projects, getProjectById } from '@mono/projects'
```

📖 **See [SHARED_PACKAGES.md](./docs/SHARED_PACKAGES.md) for details.**

---

## Deployment

Projects deploy to Vercel with automatic path-based routing:

```
yourname.vercel.app/              → Home app
yourname.vercel.app/landing-page  → Landing Page app
yourname.vercel.app/dashboard     → Dashboard app
yourname.vercel.app/game-2048     → Game 2048 app
```

The `vercel.json` configuration handles the routing automatically.

---

## Common Commands

```bash
# Development
pnpm dev                  # Run all apps
pnpm --filter @mono/home dev  # Run specific app

# Building
pnpm build                # Build all
pnpm --filter @mono/home build  # Build specific

# Dependencies
pnpm install              # Install all
pnpm --filter @mono/home add package-name  # Add to specific app
pnpm add -D -w package-name  # Add to root

# Linting
pnpm lint                 # Lint all
```

---

## Troubleshooting

### "Cannot find module '@mono/xxx'"

Run `pnpm install` from root to link workspace packages.

### "Port already in use"

Change the port in your app's config file (vite.config.ts or next.config.ts).

### Build fails after changes

```bash
rm -rf node_modules apps/*/node_modules
rm -rf apps/*/.next apps/*/dist
pnpm install
pnpm build
```

---

## License

MIT
# mono_repo
