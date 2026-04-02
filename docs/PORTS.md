# Port Assignments

This document defines the fixed port assignments for all apps in development mode.

## Port Assignment Rules

1. **Home app always runs on port 3000** (the main hub)
2. **Other apps run on sequential ports starting from 3001**
3. Ports are explicitly configured to prevent conflicts

## Current Port Assignments

| Order | App | Port | Framework | Config File |
|-------|-----|------|-----------|-------------|
| 1 | home | 3000 | Next.js | `apps/home/package.json` |
| 2 | dashboard | 3001 | Next.js | `apps/dashboard/package.json` |
| 3 | game-2048 | 3002 | Vite | `apps/game-2048/vite.config.ts` |
| 4 | landing-page | 3003 | Vite | `apps/landing-page/vite.config.ts` |
| 5 | htop-monitor | 3004 | Vite | `apps/htop-monitor/vite.config.ts` |

## Adding a New App

When adding a new app, use the next available port:

```bash
# Next available port is 3005
```

### For Next.js Apps

Update `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p 3005"
  }
}
```

### For Vite Apps

Update `vite.config.ts`:
```typescript
export default defineConfig({
  // ...
  server: {
    port: 3005,
  },
})
```

### Update Home Page

Add to `apps/home/src/app/page.tsx`:
```typescript
const DEV_PORTS: Record<string, number> = {
  'dashboard': 3001,
  'game-2048': 3002,
  'landing-page': 3003,
  'your-new-app': 3004,  // Add this
}
```

## Reserved Ports

- **3000-3099**: Reserved for monorepo apps
- **3000**: Always home app

## Troubleshooting

### "Port already in use" error

This means another process is using the port. Find and kill it:

```bash
# Find process using port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or for all dev servers
pkill -f "next dev"
pkill -f "vite"
```

### App starting on wrong port

Check the app's configuration file:
- Next.js: `package.json` → `scripts.dev`
- Vite: `vite.config.ts` → `server.port`

## Development URLs

| App | Development URL | Production URL |
|-----|-----------------|----------------|
| home | http://localhost:3000 | `/` |
| dashboard | http://localhost:3001 | `/dashboard` |
| game-2048 | http://localhost:3002 | `/game-2048` |
| landing-page | http://localhost:3003 | `/landing-page` |
| htop-monitor | http://localhost:3004 | `/htop-monitor` |

---

Last updated: 2025-04-02
