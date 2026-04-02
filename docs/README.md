# Mono Repo Documentation

Welcome to the monorepo documentation. This folder contains guides for working with this monorepo.

## Quick Links

| Topic | Description |
|-------|-------------|
| [New Project Guide](./NEW_PROJECT.md) | Create a new project in the monorepo |
| [Migrating Projects](./MIGRATING.md) | Move existing projects into the monorepo |
| [Shared Packages](./SHARED_PACKAGES.md) | Using and extending shared packages |

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific app
pnpm --filter @mono/home dev

# Build all
pnpm build
```

---

## Project Structure

```
mono-repo/
├── apps/                    # Your projects
│   ├── home/                # Project hub (Next.js)
│   ├── landing-page/        # Landing page (Vite)
│   ├── dashboard/           # Dashboard (Next.js)
│   └── game-2048/           # 2048 Game (Vite)
├── packages/                # Shared packages
│   ├── ui/                  # Shared components
│   ├── config/              # Base configs
│   ├── utils/               # Shared utilities
│   └── projects/            # Project registry
├── docs/                    # This documentation
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── vercel.json
```

---

## Available Projects

| Project | Framework | Port | Path |
|---------|-----------|------|------|
| Home | Next.js | 3000 | `/` |
| Landing Page | Vite | 3001 | `/landing-page` |
| Dashboard | Next.js | 3002 | `/dashboard` |
| Game 2048 | Vite | 3003 | `/game-2048` |

---

## Common Tasks

### Add a New Project

See [NEW_PROJECT.md](./NEW_PROJECT.md)

1. Create app with Vite or Next.js
2. Update `package.json` name
3. Add shared dependencies (optional)
4. Register in `packages/projects/src/index.ts`
5. Update `vercel.json` routing

### Migrate Existing Project

See [MIGRATING.md](./MIGRATING.md)

1. Copy project to `apps/` folder
2. Update package.json
3. Configure workspace dependencies
4. Register in project registry
5. Test the migration

### Use Shared Components

See [SHARED_PACKAGES.md](./SHARED_PACKAGES.md)

```tsx
import { Button, Card } from '@mono/ui'
import { cn, formatDate } from '@mono/utils'
```

---

## Development Workflow

### Local Development

Each app runs on its own port:

```bash
# Terminal 1
pnpm --filter @mono/home dev         # http://localhost:3000

# Terminal 2
pnpm --filter @mono/landing-page dev # http://localhost:3001

# Terminal 3
pnpm --filter @mono/dashboard dev    # http://localhost:3002

# Terminal 4
pnpm --filter @mono/game-2048 dev    # http://localhost:3003
```

Or run all with `pnpm dev`.

### Adding Dependencies

```bash
# Add to specific app
pnpm --filter @mono/my-app add package-name

# Add to root (shared dev dependency)
pnpm add -D -w package-name

# Add internal dependency
# Edit package.json directly:
# "@mono/ui": "workspace:*"
```

### Building

```bash
# Build all
pnpm build

# Build specific app
pnpm --filter @mono/my-app build
```

---

## Deployment

Projects deploy to Vercel with path-based routing:

| Local | Production |
|-------|------------|
| `localhost:3000` | `yourname.vercel.app/` |
| `localhost:3001` | `yourname.vercel.app/landing-page` |
| `localhost:3002` | `yourname.vercel.app/dashboard` |
| `localhost:3003` | `yourname.vercel.app/game-2048` |

---

## Troubleshooting

### "Cannot find module '@mono/xxx'"

Run `pnpm install` from the root to link workspace packages.

### "Port already in use"

Change the port in your app's config file (vite.config.ts or next.config.ts).

### Build errors

Try cleaning and rebuilding:
```bash
rm -rf node_modules apps/*/node_modules
rm -rf apps/*/.next apps/*/dist
pnpm install
pnpm build
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

## Contributing

When making changes:

1. **Document your changes** - Update CHANGELOG.md
2. **Test across apps** - Shared packages affect all projects
3. **Update docs** - Keep guides current

---

## Need Help?

- Check the specific guide for your task
- Review [CHANGELOG.md](../CHANGELOG.md) for recent changes
- See individual app README files for app-specific info
