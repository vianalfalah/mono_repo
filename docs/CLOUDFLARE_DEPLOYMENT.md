# Cloudflare Pages Deployment Guide

This guide explains how to deploy this monorepo to Cloudflare Pages with path-based routing.

---

## Why Cloudflare Pages?

| Feature | Cloudflare Pages | Vercel |
|---------|------------------|--------|
| Path-based routing (multi-framework) | ✅ Yes | ❌ No |
| Custom domains | Unlimited (free) | 1 (free) |
| Build minutes | Unlimited (free) | 6,000/month |
| Bandwidth | Unlimited (free) | 100GB/month |
| Pages Functions | 100k requests/day (free) | Serverless Functions |

---

## Architecture

```
yourname.pages.dev/
├── /                    → apps/home (Next.js)
├── /landing-page        → apps/landing-page (Vite)
├── /dashboard           → apps/dashboard (Next.js)
└── /game-2048           → apps/game-2048 (Vite)
```

---

## Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up) (free)
2. GitHub account with code pushed
3. This monorepo structure

---

## Deployment Steps

### Step 1: Connect GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **"Create application"** → **"Pages"** → **"Connect to Git"**
4. Select **GitHub** and authorize
5. Choose `mono_repo` repository

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Project name** | Your desired name |
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | `pnpm build` |
| **Build output directory** | `apps/home/.next` |
| **Root directory** | `/` (leave empty) |
| **Environment variables** | (add if needed) |

### Step 3: Deploy the Home App

Click **"Save and Deploy"** - this deploys the home app as your main site.

### Step 4: Add Other Apps as Additional Projects

For each additional app, create a separate Cloudflare Pages project:

**Dashboard App:**
- Build command: `pnpm --filter @mono/dashboard build`
- Build output directory: `apps/dashboard/.next`

**Landing Page App:**
- Build command: `pnpm --filter @mono/landing-page build`
- Build output directory: `apps/landing-page/dist`

**Game 2048 App:**
- Build command: `pnpm --filter @mono/game-2048 build`
- Build output directory: `apps/game-2048/dist`

---

## Custom Domain Setup

### Option A: Subdomains (Recommended)

```
yourname.com           → Home project
dashboard.yourname.com → Dashboard project
game.yourname.com      → Game 2048 project
```

1. Go to **Custom domains** in each project
2. Add your subdomain
3. Update DNS records (Cloudflare provides them)

### Option B: Paths with Cloudflare Workers

For path-based routing (`yourname.com/dashboard`), use Cloudflare Workers:

```javascript
// Cloudflare Worker script
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // Route to different projects
    if (path.startsWith('/landing-page')) {
      // Landing page project
      return fetch('https://mono-repo-landing.pages.dev' + path)
    } else if (path.startsWith('/dashboard')) {
      // Dashboard project
      return fetch('https://mono-repo-dashboard.pages.dev' + path)
    } else if (path.startsWith('/game-2048')) {
      // Game project
      return fetch('https://mono-repo-game.pages.dev' + path)
    } else {
      // Home project (default)
      return fetch('https://mono-repo.pages.dev' + path)
    }
  }
}
```

---

## Environment Variables (Optional)

If your apps need environment variables:

1. Go to **Settings** → **Environment variables**
2. Add variables for each environment (Production, Preview, Development)

---

## Automatic Deployments

Cloudflare Pages automatically:

- ✅ Deploys on every push to `main`
- ✅ Creates preview URLs for pull requests
- ✅ Rebuilds only changed projects

---

## Troubleshooting

### "Build failed" error

Check the build logs for specific errors. Common issues:
- Node version mismatch → Set in Environment variables: `NODE_VERSION = 18`
- pnpm not found → Cloudflare supports pnpm natively

### "404 Not Found" after deployment

1. Check the **Build output directory** setting
2. For Next.js: `.next`
3. For Vite: `dist`

### Routing not working

- For subdomain setup: Make sure DNS records are correct
- For Worker routing: Check Worker logs for errors

---

## Migration from Vercel

If you have an existing Vercel deployment:

1. Deploy to Cloudflare Pages (steps above)
2. Update DNS records to point to Cloudflare
3. Test all routes
4. Cancel Vercel deployment

---

## Build Configuration Reference

| App | Build Command | Output Directory |
|-----|---------------|------------------|
| home | `pnpm --filter @mono/home build` | `apps/home/.next` |
| landing-page | `pnpm --filter @mono/landing-page build` | `apps/landing-page/dist` |
| dashboard | `pnpm --filter @mono/dashboard build` | `apps/dashboard/.next` |
| game-2048 | `pnpm --filter @mono/game-2048 build` | `apps/game-2048/dist` |

---

## Next Steps

1. Create your first Cloudflare Pages project (home app)
2. Set up custom domain (optional)
3. Add other apps as separate projects
4. Configure DNS for subdomains or Worker routing
5. Test all routes

---

## Benefits of This Setup

| Benefit | Description |
|---------|-------------|
| **Free hosting** | Unlimited bandwidth and build minutes |
| **Multiple frameworks** | Next.js and Vite coexist happily |
| **Path or subdomain routing** | Choose what works for you |
| **Fast global CDN** | Cloudflare's edge network |
| **DDoS protection** | Included free |
| **SSL certificates** | Auto-provisioned free |
