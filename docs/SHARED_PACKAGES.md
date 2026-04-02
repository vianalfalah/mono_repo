# Shared Packages Guide

This guide explains how to use and extend the shared packages in this monorepo.

---

## Available Packages

| Package | Purpose | Import |
|---------|---------|--------|
| `@mono/ui` | Shared UI components (shadcn/ui) | `import { Button } from '@mono/ui'` |
| `@mono/config` | Base configs (Tailwind, TypeScript) | Extends in config files |
| `@mono/utils` | Shared utility functions | `import { cn } from '@mono/utils'` |
| `@mono/projects` | Project registry/metadata | `import { projects } from '@mono/projects'` |

---

## @mono/ui

### Available Components

```typescript
import {
  Button,
  buttonVariants,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  badgeVariants,
} from '@mono/ui'
```

### Button

```tsx
import { Button } from '@mono/ui'

export default function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </>
  )
}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@mono/ui'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Badge

```tsx
import { Badge } from '@mono/ui'

export default function Example() {
  return (
    <>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </>
  )
}
```

---

## @mono/utils

### Available Utilities

```typescript
import { cn, formatDate, formatNumber, truncate, getInitials } from '@mono/utils'
```

### cn() - Class Name Merger

Merges Tailwind classes intelligently:

```tsx
import { cn } from '@mono/utils'

export default function Example() {
  return (
    <div className={cn(
      'base-class',
      isActive && 'active-class',
      'another-class'
    )} />
  )
}
```

### formatDate()

```typescript
import { formatDate } from '@mono/utils'

formatDate(new Date())
// "April 2, 2025"

formatDate('2025-04-02')
// "April 2, 2025"
```

### formatNumber()

```typescript
import { formatNumber } from '@mono/utils'

formatNumber(1234567)
// "1,234,567"
```

### truncate()

```typescript
import { truncate } from '@mono/utils'

truncate('Very long text that needs to be shortened', 20)
// "Very long text that ne..."
```

### getInitials()

```typescript
import { getInitials } from '@mono/utils'

getInitials('John Doe')
// "JD"

getInitials('Alice')
// "AL"
```

---

## @mono/config

### TypeScript Config

Extend in your `tsconfig.json`:

```json
{
  "extends": "@mono/config/tsconfig/base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Config

Import and extend in `tailwind.config.js`:

```javascript
import baseConfig from '@mono/config/tailwind'

export default {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your custom theme
    },
  },
}
```

---

## @mono/projects

### Get All Projects

```typescript
import { projects } from '@mono/projects'

console.log(projects)
// [{ id: 'home', name: 'Home', ... }, ...]
```

### Get Single Project

```typescript
import { getProjectById } from '@mono/projects'

const project = getProjectById('landing-page')
```

### Get Projects by Status

```typescript
import { getProjectsByStatus } from '@mono/projects'

const liveProjects = getProjectsByStatus('live')
const wipProjects = getProjectsByStatus('wip')
```

### Get Featured Projects

```typescript
import { getFeaturedProjects } from '@mono/projects'

const featured = getFeaturedProjects()
```

### Project Type

```typescript
interface Project {
  id: string
  name: string
  description: string
  icon: string
  path: string
  tech: string[]
  status: 'live' | 'wip' | 'experimental' | 'archived'
  githubUrl?: string
  externalUrl?: string
  featured?: boolean
}
```

---

## Adding to Shared Packages

### Adding a New Component to @mono/ui

1. Create component file:

```typescript
// packages/ui/src/components/ui/my-component.tsx
import * as React from 'react'
import { cn } from '@mono/utils'

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Your props here
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-classes', className)} {...props} />
    )
  }
)
MyComponent.displayName = 'MyComponent'

export { MyComponent }
```

2. Export from index:

```typescript
// packages/ui/src/index.ts
export { MyComponent } from './components/ui/my-component'
```

3. Update package.json exports (if needed):

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./components/ui/my-component": "./src/components/ui/my-component.tsx"
  }
}
```

### Adding a New Utility to @mono/utils

1. Create utility file:

```typescript
// packages/utils/src/my-util.ts
export function myUtil(value: string): string {
  // Your logic here
  return value.toUpperCase()
}
```

2. Export from index:

```typescript
// packages/utils/src/index.ts
export * from './my-util'
```

3. Add peer dependencies if needed:

```json
// packages/utils/package.json
{
  "dependencies": {
    "some-library": "^1.0.0"
  }
}
```

---

## Project-Specific vs Shared

### When to Use Shared Packages

| Scenario | Use |
|----------|-----|
| Generic button, input, card | ✅ `@mono/ui` |
| Format date, merge classes | ✅ `@mono/utils` |
| Project-specific hero section | ❌ Local component |
| Custom app layout | ❌ Local component |
| Project-specific colors | ❌ Local Tailwind config |

### Example: Mixed Approach

```tsx
// In your app component
import { Button, Card } from '@mono/ui'  // Shared
import { HeroSection } from './components/hero'  // Local
import { formatDate } from '@mono/utils'  // Shared
import { localHelper } from './lib/helpers'  // Local

export default function App() {
  return (
    <div className="app-specific-styles">
      <HeroSection />  {/* Custom for this app */}
      <Card>  {/* Shared component */}
        <p>{formatDate(new Date())}</p>  {/* Shared utility */}
        <Button>Click</Button>  {/* Shared component */}
      </Card>
    </div>
  )
}
```

---

## Theming

Each project can have its own theme while using shared components.

### Custom Theme in Your Project

```css
/* apps/my-project/src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Override with your colors */
    --primary: 220 90% 56%;  /* Blue instead of default */
    --secondary: 280 80% 60%;  /* Purple */
    /* ... */
  }
}
```

Shared components will use your project's CSS variables.

---

## Troubleshooting

### Issue: "Cannot find module '@mono/xxx'"

**Solution**: Make sure the package is in your `package.json`:
```json
{
  "dependencies": {
    "@mono/ui": "workspace:*"
  }
}
```

Then run `pnpm install` from root.

### Issue: Shared component styles not working

**Solution**: Make sure your Tailwind content includes the shared package:
```javascript
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',  // Add this
  ],
}
```

### Issue: Type errors from shared packages

**Solution**: Make sure TypeScript is using the workspace tsconfig:
```json
{
  "extends": "@mono/config/tsconfig/base.json"
}
```

---

## Best Practices

1. **Keep shared packages minimal** - Only include truly shared code
2. **Document new exports** - Update this guide when adding components
3. **Test changes** - Shared packages affect all apps
4. **Version carefully** - Use semantic versioning for breaking changes
5. **Avoid app-specific logic** - Keep packages framework-agnostic when possible

---

## See Also

- [NEW_PROJECT.md](./NEW_PROJECT.md) - Creating new projects
- [MIGRATING.md](./MIGRATING.md) - Migrating existing projects
- [CHANGELOG.md](../CHANGELOG.md) - Recent updates
