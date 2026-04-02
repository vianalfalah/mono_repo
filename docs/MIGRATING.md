# Migrating Existing Projects to Monorepo

This guide explains how to move an existing project into this monorepo.

---

## Overview

Migration involves:
1. Copying your project to the `apps/` folder
2. Updating package.json name and dependencies
3. Configuring workspace dependencies
4. Registering the project
5. Testing the migration

---

## Before You Begin

### Checklist
- [ ] Your existing project uses Git
- [ ] You have a backup or the original is safe
- [ ] Note any custom configurations you'll need to preserve

---

## Step 1: Copy Your Project

### Option A: Copy Folder (Simple)

```bash
# From monorepo root
cp -r /path/to/your-existing-project apps/my-project

# Or if your project is in a sibling folder
cp -r ../your-project apps/my-project
```

### Option B: Copy with Git History (Preserves History)

```bash
# From your existing project folder
git remote add mono-repo /path/to/mono-repo
git push mono-repo main:apps/my-project

# Then in the monorepo
git checkout apps/my-project
```

---

## Step 2: Update package.json

Open `apps/my-project/package.json` and make these changes:

### Before:
```json
{
  "name": "my-existing-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "some-lib": "^2.0.0"
  }
}
```

### After:
```json
{
  "name": "@mono/my-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",  // or "next dev"
    "build": "vite build",  // or "next build"
    "preview": "vite preview"
  },
  "dependencies": {
    "@mono/ui": "workspace:*",  // Optional: shared components
    "@mono/utils": "workspace:*",  // Optional: shared utilities
    "react": "^19.0.0",  // Use monorepo version
    "some-lib": "^2.0.0"  // Keep your existing dependencies
  },
  "devDependencies": {
    "@mono/config": "workspace:*",  // Optional: shared configs
    // ... other dev dependencies
  }
}
```

### Key Changes:
| Field | Change | Why |
|-------|--------|-----|
| `name` | Add `@mono/` prefix | Namespace convention |
| `version` | Set to `0.0.0` | Internal versioning |
| `private` | Set to `true` | Prevents accidental publish |
| Shared deps | Add `workspace:*` | Links to internal packages |

---

## Step 3: Update Imports (If Using Shared Packages)

### Before:
```tsx
import { Button } from './components/ui/button'
import { cn } from './lib/utils'
```

### After:
```tsx
import { Button } from '@mono/ui'
import { cn } from '@mono/utils'
```

> **Note**: This step is optional. You can keep your original components and utilities.

---

## Step 4: Update Framework Configs

### Vite Projects: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3004, // Choose unused port
  },
})
```

### Next.js Projects: `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
```

### TypeScript: `tsconfig.json`

```json
{
  "extends": "@mono/config/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Step 5: Register the Project

Edit `packages/projects/src/index.ts`:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    id: 'my-project',
    name: 'My Project',
    description: 'Description from your original project',
    icon: '🎨',
    path: '/my-project',
    tech: ['React', 'TypeScript', 'Tailwind'],  // Your actual stack
    status: 'live',
    featured: true,
  },
]
```

---

## Step 6: Update Vercel Routing

Edit `vercel.json` at root:

```json
{
  "rewrites": [
    // ... existing
    {
      "source": "/my-project",
      "destination": "/apps/my-project"
    },
    {
      "source": "/my-project/:match*",
      "destination": "/apps/my-project/:match*"
    }
  ]
}
```

---

## Step 7: Update Home Page Dev Links

Edit `apps/home/src/app/page.tsx`:

```typescript
const DEV_PORTS: Record<string, number> = {
  // ... existing
  'my-project': 3004,
}
```

---

## Step 8: Install and Test

```bash
# From monorepo root
pnpm install

# Test your migrated project
pnpm --filter @mono/my-project dev
pnpm --filter @mono/my-project build
```

---

## Migration Examples

### Example 1: Vite + React Project

**Original structure:**
```
my-landing/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    └── App.tsx
```

**After migration:**
```
apps/landing/
├── index.html
├── package.json  (updated)
├── vite.config.ts  (port added)
├── tsconfig.json  (extends @mono/config)
└── src/
    ├── main.tsx
    └── App.tsx
```

### Example 2: Next.js Project

**Original structure:**
```
my-dashboard/
├── package.json
├── next.config.js
├── tsconfig.json
└── app/
    ├── layout.tsx
    └── page.tsx
```

**After migration:**
```
apps/dashboard/
├── package.json  (updated)
├── next.config.ts
├── tsconfig.json  (extends @mono/config)
└── app/
    ├── layout.tsx
    └── page.tsx
```

---

## Post-Migration Checklist

- [ ] Dependencies install correctly
- [ ] Development server starts
- [ ] Build succeeds
- [ ] All imports resolve
- [ ] Styles load correctly
- [ ] Environment variables work (if applicable)
- [ ] API routes work (if Next.js)
- [ ] Project appears in home page
- [ ] Links work in development

---

## Common Issues and Solutions

### Issue: "Cannot find module '@mono/config'"

**Cause**: TypeScript can't resolve workspace dependencies.

**Solution**:
```bash
# From root, reinstall
pnpm install

# Check pnpm-workspace.yaml includes the path
```

### Issue: "Port already in use"

**Solution**: Update the port in your config file.

### Issue: "Build fails after migration"

**Cause**: Path issues or missing dependencies.

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules
rm -rf apps/*/.next
pnpm install
```

### Issue: "Styles not loading"

**Cause**: CSS import path might be wrong.

**Solution**: Check your `globals.css` or main CSS import path in your entry file.

### Issue: "Environment variables missing"

**Solution**: Copy your `.env` file to the app folder:
```bash
cp .env apps/my-project/.env.local
```

---

## Gradual Migration Strategy

If you're not ready to fully migrate:

1. **Keep original repo** - Don't delete it yet
2. **Copy to monorepo** - Test the copy first
3. **Run both** during development
4. **Compare behavior** - Ensure they work identically
5. **Switch DNS/Links** - When confident
6. **Archive original** - After successful deployment

---

## What Gets Preserved

| What | Status |
|------|--------|
| Your code | ✅ Preserved |
| Your dependencies | ✅ Preserved (may get deduped) |
| Your styles | ✅ Preserved |
| Git history | ⚠️ Requires special steps |
| Environment variables | ⚠️ Need to copy |
| Build artifacts | ❌ Not needed (will rebuild) |
| node_modules | ❌ Not needed (will reinstall) |

---

## Rollback Plan

If migration fails:

```bash
# Remove migrated version
rm -rf apps/my-project

# Remove from registry (edit packages/projects/src/index.ts)
# Remove from routing (edit vercel.json)
# Reinstall to clean links
pnpm install
```

---

## Need Help?

- See [NEW_PROJECT.md](./NEW_PROJECT.md) for creating new projects
- See [SHARED_PACKAGES.md](./SHARED_PACKAGES.md) for using shared packages
- Check [CHANGELOG.md](../CHANGELOG.md) for recent updates
