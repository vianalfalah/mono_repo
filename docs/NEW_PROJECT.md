# Creating a New Project

This guide walks through creating a new project in the monorepo.

## Overview

When you create a new project, you'll:
1. Choose a framework (Next.js or Vite)
2. Create the app folder
3. Configure it to use shared packages
4. Register it in the project registry
5. Update routing configuration

---

## Step 1: Choose Your Framework

| Framework | Best For | Template |
|-----------|----------|----------|
| **Next.js** | SSR, SEO, complex apps | `create next-app` |
| **Vite + React** | SPAs, fast dev, simple apps | `create vite` |
| **Vite + Vue** | Vue.js projects | `create vite` |
| **Vite + Svelte** | Svelte projects | `create vite` |
| **Astro** | Content-heavy sites | `npm create astro@latest` |

---

## Step 2: Create the App

### Option A: Using Vite (React)

```bash
# From the monorepo root
pnpm create vite apps/my-new-project --template react-ts

cd apps/my-new-project
pnpm install
```

### Option B: Using Next.js

```bash
# From the monorepo root
pnpm create next-app apps/my-new-project

# Or with specific options
pnpm create next-app@latest apps/my-new-project --typescript --tailwind --eslint
```

### Option C: Using Vite (Other Frameworks)

```bash
# Vue
pnpm create vite apps/my-new-project --template vue-ts

# Svelte
pnpm create vite apps/my-new-project --template svelte-ts
```

---

## Step 3: Update package.json

Open `apps/my-new-project/package.json` and update:

```json
{
  "name": "@mono/my-new-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mono/ui": "workspace:*",
    "@mono/utils": "workspace:*",
    // ... other dependencies
  },
  "devDependencies": {
    "@mono/config": "workspace:*",
    // ... other dev dependencies
  }
}
```

### Key Changes:
1. **Rename**: `name` from `my-new-project` to `@mono/my-new-project`
2. **Add shared deps** (optional):
   - `@mono/ui` - for shared components
   - `@mono/utils` - for shared utilities
   - `@mono/config` - for base configs

---

## Step 4: Update Vite Config (Vite Projects)

Update `apps/my-new-project/vite.config.ts`:

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
    port: 3004, // Choose an unused port
  },
})
```

### Port Allocation Reference:
```
3000 - home
3001 - landing-page
3002 - dashboard
3003 - game-2048
3004 - your new project
3005 - next project
...
```

---

## Step 5: Update TypeScript Config

### For Vite Projects: `tsconfig.json`

```json
{
  "extends": "@mono/config/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### For Next.js Projects: `tsconfig.json`

```json
{
  "extends": "@mono/config/tsconfig/base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Step 6: Configure Tailwind (Optional)

If using shared Tailwind config, update `tailwind.config.js`:

```javascript
import config from '@mono/config/tailwind'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  ...config,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
}
```

Or create a custom theme for your project.

---

## Step 7: Register in Project Registry

Edit `packages/projects/src/index.ts`:

```typescript
import type { Project } from './types'

export const projects: Project[] = [
  // ... existing projects
  {
    id: 'my-new-project',
    name: 'My New Project',
    description: 'A brief description of your project',
    icon: '🚀',
    path: '/my-new-project',
    tech: ['Vite', 'React', 'TypeScript', 'Tailwind'],
    status: 'live',
    featured: true, // Set to true to show on home page
  },
]
```

---

## Step 8: Update Vercel Routing

Edit `vercel.json` at root:

```json
{
  "rewrites": [
    // ... existing routes
    {
      "source": "/my-new-project",
      "destination": "/apps/my-new-project"
    },
    {
      "source": "/my-new-project/:match*",
      "destination": "/apps/my-new-project/:match*"
    }
  ]
}
```

---

## Step 9: Update Home Page (Dev Links)

Edit `apps/home/src/app/page.tsx` and add your port:

```typescript
const DEV_PORTS: Record<string, number> = {
  'landing-page': 3001,
  'dashboard': 3002,
  'game-2048': 3003,
  'my-new-project': 3004, // Add this line
}
```

---

## Step 10: Install and Test

```bash
# From monorepo root
pnpm install

# Run your new project
pnpm --filter @mono/my-new-project dev

# Or run all projects
pnpm dev
```

---

## Verification Checklist

- [ ] Project builds successfully (`pnpm --filter @mono/my-new-project build`)
- [ ] Project runs on assigned port
- [ ] Shared packages import correctly (if using)
- [ ] Project appears in home page registry
- [ ] Vercel routing configured (for deployment)
- [ ] TypeScript compiles without errors

---

## Example: Minimal Vite Project

If you want a minimal starting point, here's the bare minimum structure:

```
apps/minimal/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    └── globals.css
```

**package.json**:
```json
{
  "name": "@mono/minimal",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^6.0.7"
  }
}
```

---

## Troubleshooting

### Issue: "Cannot find module '@mono/ui'"

**Solution**: Make sure you've run `pnpm install` from the root after adding the dependency.

### Issue: "Port already in use"

**Solution**: Choose a different port in your vite.config.ts or next.config.js.

### Issue: TypeScript errors in shared packages

**Solution**: Make sure `@mono/config` is in your devDependencies.

### Issue: Imports not resolving

**Solution**: Check your tsconfig.json has correct `paths` configuration.

---

## Next Steps

- [ ] Add your project to this monorepo
- [ ] Test it locally
- [ ] Deploy to Vercel
- [ ] Update CHANGELOG.md

For more information, see:
- [MIGRATING.md](./MIGRATING.md) - Migrate existing projects
- [SHARED_PACKAGES.md](./SHARED_PACKAGES.md) - Using shared packages
