# Vercel Deployment Guide

This guide walks through deploying your monorepo to Vercel.

---

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A GitHub account (with your code pushed)
- This monorepo structure set up

---

## Quick Start (Easiest Way)

### 1. Push Your Code to GitHub

```bash
# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "Initial monorepo setup"

# Create GitHub repo and push
gh repo create mono-repo --public --source=.
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

That's it! Vercel will auto-detect Turborepo and deploy correctly.

---

## Manual Configuration (For Custom Setup)

### Step 1: Project Settings

After connecting your repo, configure these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `./` (leave as root) |
| **Build Command** | `pnpm build` |
| **Output Directory** | (Auto-detected per app) |
| **Install Command** | `pnpm install` |

### Step 2: Environment Variables (Optional)

If your apps need environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add variables for specific apps:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | your-db-url | Production, Preview |
| `API_KEY` | your-key | Production only |

### Step 3: Deploy

Click **"Deploy"** and wait for the build.

---

## vercel.json Configuration

Your monorepo already has `vercel.json` configured:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/apps/home" },
    { "source": "/landing-page", "destination": "/apps/landing-page" },
    { "source": "/dashboard", "destination": "/apps/dashboard" },
    { "source": "/game-2048", "destination": "/apps/game-2048" }
  ]
}
```

This handles path-based routing automatically.

---

## What Gets Deployed

| Local | Production URL |
|-------|----------------|
| `apps/home` | `yourname.vercel.app/` |
| `apps/landing-page` | `yourname.vercel.app/landing-page` |
| `apps/dashboard` | `yourname.vercel.app/dashboard` |
| `apps/game-2048` | `yourname.vercel.app/game-2048` |

---

## Custom Domain (Optional)

### Step 1: Buy a Domain

Purchase from any registrar (Namecheap, GoDaddy, Google Domains, etc.)

### Step 2: Add to Vercel

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourname.com`)
4. Vercel will provide DNS records to add

### Step 3: Update DNS

Add these records to your registrar:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

### Step 4: Wait

DNS propagation takes 5-30 minutes.

---

## Deployment Workflow

### Automatic Deployments

Once connected, Vercel automatically:

- ✅ Deploys on every push to `main` branch
- ✅ Creates preview URLs for pull requests
- ✅ Rebuilds only changed apps (Turborepo caching)

### Branch Deployments

| Branch | URL |
|--------|-----|
| `main` | `yourname.vercel.app` |
| `dev` | `yourname-vercel-git-dev.vercel.app` |
| Pull Request | Auto-generated preview URL |

---

## Troubleshooting

### Build Fails: "Cannot find module '@mono/xxx'"

**Cause**: Workspace dependencies not linked.

**Solution**: Make sure `package.json` uses `workspace:*`:

```json
{
  "dependencies": {
    "@mono/ui": "workspace:*"
  }
}
```

### 404 Errors on Deployed Site

**Cause**: `vercel.json` not configured or paths wrong.

**Solution**: Check `vercel.json` rewrites match your app folders:

```json
{
  "rewrites": [
    { "source": "/my-app", "destination": "/apps/my-app" }
  ]
}
```

### "Port already in use" in Build Logs

**Cause**: App trying to use wrong port in production.

**Solution**: Vercel ignores port configs. Build command should work regardless.

### Styles Not Loading in Production

**Cause**: CSS not built correctly.

**Solution**: Make sure `globals.css` is imported:

```typescript
// Next.js - app/layout.tsx
import './globals.css'

// Vite - main.tsx
import './globals.css'
```

### Preview Deployments Work, But Main Doesn't

**Cause**: Cached build or different environment.

**Solution**:
1. Go to Vercel dashboard
2. Click **"Redeploy"** on the deployment
3. Check environment variables match

---

## Deployment Checklist

Before deploying to production:

- [ ] Code pushed to GitHub
- [ ] All apps build locally: `pnpm build`
- [ ] `vercel.json` has all routes
- [ ] Environment variables set (if needed)
- [ ] Custom domain configured (if using one)
- [ ] Tested preview deployment first

---

## Monitoring Deployments

### View Deployment Logs

1. Go to your project in Vercel
2. Click on a deployment
3. View **Build Logs** or **Function Logs**

### Deployment Status

| Status | Meaning |
|--------|---------|
| 🟢 Queued | Waiting to build |
| 🔵 Building | Currently building |
| 🟢 Ready | Deployed successfully |
| 🔴 Error | Build failed - check logs |
- ⚪ Cancelled | Deployment cancelled |

---

## Advanced: Multi-Project Deployment

If you want separate Vercel projects per app:

### Option 1: Single Monorepo (Current Setup)

✅ **Pros**: One dashboard, shared builds, simpler
❌ **Cons**: All apps share same domain

### Option 2: Separate Projects

Each app gets its own Vercel project:

1. Create separate GitHub repos (or use subfolders)
2. Connect each to Vercel separately
3. Each gets its own domain/subdomain

---

## Cost & Limits

### Vercel Free Tier

| Feature | Limit |
|---------|-------|
| Deployments | Unlimited |
| Bandwidth | 100GB/month |
| Build minutes | 6,000/month |
| Serverless Function Execution | 100GB-hours/month |
| Domains | 1 custom domain |

### When to Upgrade

- Need more bandwidth
- Want team collaboration features
- Need longer build times
- Want advanced analytics

---

## Post-Deployment

After successful deployment:

1. **Test all routes**:
   - `yourname.vercel.app/`
   - `yourname.vercel.app/landing-page`
   - `yourname.vercel.app/dashboard`
   - `yourname.vercel.app/game-2048`

2. **Check console** for errors

3. **Test on mobile** for responsive design

4. **Update DNS** if using custom domain

---

## Next Steps

- [ ] Set up automatic deployments
- [ ] Add custom domain (optional)
- [ ] Configure environment variables (if needed)
- [ ] Set up preview deployments for PRs

---

## Need Help?

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Monorepo Guide](https://vercel.com/docs/concepts/projects/monorepos)
- [Turborepo + Vercel](https://turbo.build/repo/docs/core-concepts/remote-caching#vercel)
